"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cropper from "react-easy-crop";
import {
  HiOutlinePhotograph,
  HiOutlineUpload,
  HiOutlineCheck,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineLink,
} from "react-icons/hi";

interface MediaSlot {
  key: string;
  label: string;
  description: string;
  aspect: number;
}

const slots: MediaSlot[] = [
  { key: "hero", label: "Hero Background", description: "Main homepage background", aspect: 16 / 9 },
  { key: "courses-hero", label: "Courses Hero", description: "Courses page hero section", aspect: 16 / 9 },
  { key: "banner-10", label: "Why Choose Us Banner", description: "Banner below features", aspect: 3 / 1 },
  { key: "banner-11", label: "Reasons Banner", description: "Banner below reasons", aspect: 3 / 1 },
  { key: "about-hero", label: "About Hero", description: "About page hero image", aspect: 16 / 9 },
  { key: "map", label: "World Map", description: "Map image in Our Journey", aspect: 4 / 3 },
];

function getCroppedImg(imageSrc: string, pixelCrop: { x: number; y: number; width: number; height: number }): Promise<File> {
  const image = new Image();
  image.crossOrigin = "anonymous";
  return new Promise((resolve) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
      canvas.toBlob((blob) => {
        resolve(new File([blob!], "cropped.png", { type: "image/png" }));
      }, "image/png");
    };
    image.src = imageSrc;
  });
}

function CropModal({
  imageSrc,
  aspect,
  onCrop,
  onClose,
}: {
  imageSrc: string;
  aspect: number;
  onCrop: (file: File) => void;
  onClose: () => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const onCropComplete = useCallback(
    (_: unknown, areaPixels: { x: number; y: number; width: number; height: number }) => {
      setCroppedAreaPixels(areaPixels);
    },
    []
  );

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    const file = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCrop(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <h3 className="font-semibold">Crop Image</h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-[#faf5f0]">
            <HiOutlineX className="size-5" />
          </button>
        </div>

        <div className="relative h-72 w-full bg-black sm:h-80">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="border-t border-black/5 px-5 py-4">
          <label className="mb-3 block text-xs font-medium text-black/50">
            Zoom
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-[#e8734a]"
          />
        </div>

        <div className="flex gap-3 border-t border-black/5 px-5 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-black/8 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#faf5f0]"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="flex-1 rounded-xl bg-[#e8734a] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d65a30]"
          >
            Save Crop
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminMediaPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [cropModal, setCropModal] = useState<{
    key: string;
    src: string;
    aspect: number;
  } | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [mapUrl, setMapUrl] = useState("");
  const [mapSaving, setMapSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  function fetchConfig() {
    fetch("/api/media")
      .then((r) => r.json())
      .then((data) => {
        setConfig(data);
        if (data["map-url"]) setMapUrl(data["map-url"]);
      })
      .catch(() => {});
  }

  const handleSaveMapUrl = async () => {
    setMapSaving(true);
    try {
      const formData = new FormData();
      formData.append("key", "map-url");
      formData.append("url", mapUrl);
      const res = await fetch("/api/media", { method: "POST", body: formData });
      const data = await res.json();
      if (data.error) {
        console.error("Map URL save error:", data.error);
      }
      fetchConfig();
    } catch (e) {
      console.error("Map URL save failed:", e);
    } finally {
      setMapSaving(false);
    }
  };

  const handleFileSelect = (key: string, aspect: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCropModal({ key, src: reader.result as string, aspect });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropSave = async (file: File) => {
    if (!cropModal) return;
    const key = cropModal.key;
    setCropModal(null);
    setUploading(key);

    const formData = new FormData();
    formData.append("key", key);
    formData.append("file", file);

    try {
      const res = await fetch("/api/media", { method: "POST", body: formData });
      const data = await res.json();
      if (data.error) {
        console.error("Upload error:", data.error);
      }
      if (data.url) {
        setConfig((prev) => ({ ...prev, [key]: `${data.url}?t=${Date.now()}` }));
      }
    } catch (e) {
      console.error("Upload failed:", e);
    } finally {
      setUploading(null);
    }
  };

  const handleDelete = async (key: string) => {
    setSaving(key);
    try {
      await fetch("/api/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      setConfig((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      fetchConfig();
    } catch {
      // silent
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">Site Content</h1>
        <p className="mt-1 text-sm text-black/50">
          Manage images, banners, and site settings
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {slots.map((slot) => {
          const url = config[slot.key];
          const isUploading = uploading === slot.key;

          return (
            <motion.div
              key={slot.key}
              layout
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white transition-shadow hover:shadow-md"
            >
              {/* Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#faf5f0]">
                {url ? (
                  <img
                    src={url}
                    alt={slot.label}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-2 text-black/30">
                    <HiOutlinePhotograph className="size-8" />
                    <span className="text-xs">No image set</span>
                  </div>
                )}

                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </div>
                )}

                {url && (
                  <button
                    onClick={() => handleDelete(slot.key)}
                    disabled={saving === slot.key}
                    className="absolute right-2 top-2 rounded-lg bg-black/50 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 disabled:opacity-50"
                  >
                    {saving === slot.key ? (
                      <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <HiOutlineTrash className="size-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Info + upload */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{slot.label}</p>
                  <p className="text-xs text-black/40">{slot.description}</p>
                </div>
                <label className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-black/8 bg-white px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[#faf5f0]">
                  {url ? (
                    <>
                      <HiOutlineCheck className="size-3.5 text-emerald-500" />
                      Change
                    </>
                  ) : (
                    <>
                      <HiOutlineUpload className="size-3.5" />
                      Upload
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileSelect(slot.key, slot.aspect, e)}
                  />
                </label>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Map URL Section */}
      <div className="rounded-2xl border border-black/5 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <HiOutlineLink className="size-5 text-black/30" />
          <h2 className="text-sm font-semibold">Google Maps Embed URL</h2>
        </div>
        <p className="mb-3 text-xs text-black/40">
          Paste the Google Maps embed URL for the contact page map
        </p>
        <div className="flex gap-3">
          <input
            type="url"
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
            placeholder="https://www.google.com/maps/embed?..."
            className="flex-1 rounded-xl border border-black/8 bg-[#faf5f0] px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-black/30 focus:border-[#e8734a]/40 focus:ring-2 focus:ring-[#e8734a]/10"
          />
          <button
            onClick={handleSaveMapUrl}
            disabled={mapSaving || !mapUrl}
            className="shrink-0 rounded-xl bg-[#e8734a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d65a30] disabled:opacity-50"
          >
            {mapSaving ? "Saving..." : "Save"}
          </button>
        </div>
        {config["map-url"] && (
          <div className="mt-3 overflow-hidden rounded-xl border border-black/5">
            <iframe
              src={config["map-url"]}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map preview"
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {cropModal && (
          <CropModal
            imageSrc={cropModal.src}
            aspect={cropModal.aspect}
            onCrop={handleCropSave}
            onClose={() => setCropModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
