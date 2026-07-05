"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  HiOutlineCheck,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
} from "react-icons/hi";

interface LayoutField {
  x: number;
  y: number;
  fontSize: number;
  align?: "left" | "center" | "right";
  baseline?: "top" | "middle" | "alphabetic";
  color?: string;
  family?: "sans" | "serif";
  weight?: string;
  style?: string;
  maxWidth?: number;
}

interface LayoutQR {
  x: number;
  y: number;
  size: number;
}

interface CertificateLayout {
  studentName: LayoutField;
  level: LayoutField;
  language: LayoutField;
  leftGrade: LayoutField;
  monthYear: LayoutField;
  reading: LayoutField;
  listening: LayoutField;
  writing: LayoutField;
  oral: LayoutField;
  total: LayoutField;
  resultGrade: LayoutField;
  issuePlace: LayoutField;
  issueDate: LayoutField;
  certificateNumber: LayoutField;
  qr: LayoutQR;
}

const FIELD_LABELS: Record<string, string> = {
  studentName: "Student Name",
  level: "Level",
  language: "Language",
  leftGrade: "Left Grade",
  monthYear: "Month / Year",
  reading: "Reading",
  listening: "Listening",
  writing: "Writing",
  oral: "Oral",
  total: "Total",
  resultGrade: "Result Grade",
  issueDate: "Issue Date",
  issuePlace: "Issue Place",
  certificateNumber: "Certificate Number",
  qr: "QR",
};

export function CalibrationClient() {
  const [layout, setLayout] = useState<CertificateLayout | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [templateSize, setTemplateSize] = useState({ w: 0, h: 0 });
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load layout from API
  useEffect(() => {
    fetch("/api/certificates/layout")
      .then((r) => r.json())
      .then((data: CertificateLayout) => setLayout(data));
  }, []);

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  // When image loads, capture its natural size for coordinate mapping
  const handleImgLoad = () => {
    const img = imgRef.current;
    if (img) {
      setTemplateSize({ w: img.naturalWidth, h: img.naturalHeight });
      setDisplaySize({ w: img.clientWidth, h: img.clientHeight });
    }
  };

  useEffect(() => {
    const updateDisplaySize = () => {
      const img = imgRef.current;
      if (img) setDisplaySize({ w: img.clientWidth, h: img.clientHeight });
    };

    updateDisplaySize();
    window.addEventListener("resize", updateDisplaySize);
    return () => window.removeEventListener("resize", updateDisplaySize);
  }, []);

  // Convert template coords to screen coords
  const toScreen = useCallback(
    (x: number, y: number) => {
      if (!templateSize.w || !displaySize.w) return { sx: 0, sy: 0 };
      const scaleX = displaySize.w / templateSize.w;
      const scaleY = displaySize.h / templateSize.h;
      return { sx: x * scaleX, sy: y * scaleY };
    },
    [displaySize, templateSize]
  );

  // Move a field by delta in template coords
  const moveField = useCallback(
    (key: string, dx: number, dy: number) => {
      if (!layout) return;
      const field = layout[key as keyof CertificateLayout] as LayoutField;
      if (!field) return;
      setLayout((prev) => ({
        ...prev!,
        [key]: { ...field, x: field.x + dx, y: field.y + dy },
      }));
    },
    [layout]
  );

  // Keyboard arrow handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selected) return;
      const step = e.shiftKey ? 10 : 1;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          moveField(selected, -step, 0);
          break;
        case "ArrowRight":
          e.preventDefault();
          moveField(selected, step, 0);
          break;
        case "ArrowUp":
          e.preventDefault();
          moveField(selected, 0, -step);
          break;
        case "ArrowDown":
          e.preventDefault();
          moveField(selected, 0, step);
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, moveField]);

  // Save layout
  const handleSave = async () => {
    if (!layout) return;
    setSaving(true);
    try {
      const res = await fetch("/api/certificates/layout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(layout),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("err", data.error || "Save failed");
        return;
      }
      showToast("ok", "Layout saved — restart dev server to apply");
    } catch {
      showToast("err", "Network error");
    } finally {
      setSaving(false);
    }
  };

  if (!layout) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-6 animate-spin rounded-full border-2 border-black/10 border-t-[#e8734a]" />
      </div>
    );
  }

  const fieldKeys = Object.keys(FIELD_LABELS);
  const textFieldKeys = fieldKeys.filter((key) => key !== "qr");

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-medium shadow-lg ${
            toast.type === "ok"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {toast.type === "ok" ? "✓ " : "⚠ "}
          {toast.msg}
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-6 rounded-2xl border border-black/5 bg-[#faf5f0] p-4">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
            Calibration Mode
          </h2>

          {/* Selected field controls */}
          {selected && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                {FIELD_LABELS[selected] || selected}
              </span>
              <span className="text-xs text-black/40">
                ({layout[selected as keyof CertificateLayout]?.x}, {layout[selected as keyof CertificateLayout]?.y})
              </span>

              {/* Arrow buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => moveField(selected, -1, 0)}
                  className="rounded-lg bg-black/5 p-1.5 text-black/60 transition-colors hover:bg-black/10"
                  title="Left 1px (Shift=10px)"
                >
                  <HiOutlineArrowLeft className="size-3.5" />
                </button>
                <button
                  onClick={() => moveField(selected, 1, 0)}
                  className="rounded-lg bg-black/5 p-1.5 text-black/60 transition-colors hover:bg-black/10"
                  title="Right 1px"
                >
                  <HiOutlineArrowRight className="size-3.5" />
                </button>
                <button
                  onClick={() => moveField(selected, 0, -1)}
                  className="rounded-lg bg-black/5 p-1.5 text-black/60 transition-colors hover:bg-black/10"
                  title="Up 1px"
                >
                  <HiOutlineArrowUp className="size-3.5" />
                </button>
                <button
                  onClick={() => moveField(selected, 0, 1)}
                  className="rounded-lg bg-black/5 p-1.5 text-black/60 transition-colors hover:bg-black/10"
                  title="Down 1px"
                >
                  <HiOutlineArrowDown className="size-3.5" />
                </button>
              </div>

              {/* Font size control */}
              {selected !== "qr" && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-black/40">Size:</span>
                  <input
                    type="number"
                    value={(layout[selected as keyof CertificateLayout] as LayoutField)?.fontSize || 14}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setLayout((prev) => ({
                        ...prev!,
                        [selected]: { ...(prev![selected as keyof CertificateLayout] as LayoutField), fontSize: val },
                      }));
                    }}
                    className="w-14 rounded-lg border border-black/8 bg-white px-2 py-1 text-xs outline-none focus:border-[#e8734a]/40"
                  />
                </div>
              )}

              <span className="text-xs text-black/30">Arrow=1px · Shift+Arrow=10px</span>
            </div>
          )}

          <div className="ml-auto flex gap-2">
            <a
              href="/api/certificates/debug"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-black/5 px-5 py-2 text-sm font-semibold text-black/60 transition-all hover:bg-black/10"
            >
              Calibration PNG
            </a>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#e8734a] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#d65a30] disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Saving...
                </>
              ) : (
                <>
                  <HiOutlineCheck className="size-4" />
                  Save Layout
                </>
              )}
            </button>
          </div>
        </div>

        {/* Field selector pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {fieldKeys.map((key) => (
            <button
              key={key}
              onClick={() => setSelected(selected === key ? null : key)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                selected === key
                  ? "bg-[#e8734a] text-white"
                  : "bg-black/5 text-black/50 hover:bg-black/10"
              }`}
            >
              {FIELD_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Certificate image with calibration dots */}
      <div ref={containerRef} className="relative inline-block w-full max-w-5xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/ourcert/Peter%20changes.pdf%20(A4).svg"
          alt="Certificate template"
          onLoad={handleImgLoad}
          className="w-full rounded-xl border border-black/10"
        />

        {/* Calibration dots overlay */}
        {templateSize.w > 0 &&
          textFieldKeys.map((key) => {
            const field = layout[key as keyof CertificateLayout] as LayoutField;
            if (!field) return null;
            const { sx, sy } = toScreen(field.x, field.y);
            const isSelected = selected === key;
            return (
              <button
                key={key}
                onClick={() => setSelected(isSelected ? null : key)}
                className={`absolute z-10 flex items-center gap-1 transition-transform ${
                  isSelected ? "scale-125" : "hover:scale-110"
                }`}
                style={{
                  left: `${sx}px`,
                  top: `${sy}px`,
                  transform: "translate(-50%, -50%)",
                }}
                title={`${FIELD_LABELS[key]} (${field.x}, ${field.y})`}
              >
                <span
                  className={`block size-3 rounded-full border-2 ${
                    isSelected
                      ? "border-white bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]"
                      : "border-red-500 bg-red-400"
                  }`}
                />
                <span
                  className={`whitespace-nowrap rounded px-1 py-0.5 text-[10px] font-bold leading-none ${
                    isSelected
                      ? "bg-red-600 text-white"
                      : "bg-white/90 text-red-600 shadow-sm"
                  }`}
                >
                  {FIELD_LABELS[key]}
                </span>
              </button>
            );
          })}

        {/* QR dot */}
        {templateSize.w > 0 && (() => {
          const { sx, sy } = toScreen(layout.qr.x, layout.qr.y);
          const isSelected = selected === "qr";
          return (
            <button
              onClick={() => setSelected(isSelected ? null : "qr")}
              className={`absolute z-10 flex items-center gap-1 transition-transform ${
                isSelected ? "scale-125" : "hover:scale-110"
              }`}
              style={{
                left: `${sx}px`,
                top: `${sy}px`,
                transform: "translate(-50%, -50%)",
              }}
              title={`QR Code (${layout.qr.x}, ${layout.qr.y})`}
            >
              <span
                className={`block size-3 rounded-full border-2 ${
                  isSelected
                    ? "border-white bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]"
                    : "border-blue-500 bg-blue-400"
                }`}
              />
              <span
                className={`whitespace-nowrap rounded px-1 py-0.5 text-[10px] font-bold leading-none ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-white/90 text-blue-600 shadow-sm"
                }`}
              >
                QR Code
              </span>
            </button>
          );
        })()}
      </div>
    </div>
  );
}
