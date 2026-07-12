"use client";

import { useEffect, useState } from "react";
import { HiOutlineLink } from "react-icons/hi";

export default function AdminMediaPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [mapUrl, setMapUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/media")
      .then((response) => response.json())
      .then((data) => {
        setConfig(data);
        setMapUrl(data["map-url"] || "");
      })
      .catch(() => {
        setMessage("Could not load the current map URL.");
      });
  }, []);

  async function handleSaveMapUrl() {
    setSaving(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("key", "map-url");
      formData.append("url", mapUrl.trim());

      const response = await fetch("/api/media", { method: "POST", body: formData });
      const data = await response.json();

      if (!response.ok || data.error) {
        setMessage(data.error || "Could not save the Google Maps URL.");
        return;
      }

      setConfig((current) => ({ ...current, "map-url": data.url }));
      setMapUrl(data.url);
      setMessage("Google Maps URL saved.");
    } catch {
      setMessage("Could not save the Google Maps URL.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          Site Content
        </h1>
        <p className="mt-1 text-sm text-black/50">
          Manage the Google Maps embed shown on the contact page.
        </p>
      </div>

      <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.035)]">
        <div className="mb-4 flex items-center gap-2">
          <HiOutlineLink className="size-5 text-black/30" />
          <h2 className="text-sm font-semibold">Google Maps Embed URL</h2>
        </div>

        <label className="block text-sm font-medium text-black/60" htmlFor="map-url">
          Paste the Google Maps embed URL for the contact page map
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="map-url"
            type="url"
            value={mapUrl}
            onChange={(event) => setMapUrl(event.target.value)}
            placeholder="https://www.google.com/maps/embed?..."
            className="min-h-11 flex-1 rounded-xl border border-black/8 bg-[#faf5f0] px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-black/30 focus:border-[#e8734a]/40 focus:ring-2 focus:ring-[#e8734a]/10"
          />
          <button
            type="button"
            onClick={handleSaveMapUrl}
            disabled={saving || !mapUrl.trim()}
            className="min-h-11 shrink-0 cursor-pointer rounded-xl bg-[#e8734a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d65a30] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {message && (
          <p className="mt-3 rounded-xl border border-black/6 bg-[#faf5f0] px-3.5 py-2 text-sm text-black/60">
            {message}
          </p>
        )}

        {config["map-url"] && (
          <div className="mt-5 overflow-hidden rounded-xl border border-black/5">
            <iframe
              src={config["map-url"]}
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map preview"
            />
          </div>
        )}
      </section>
    </div>
  );
}
