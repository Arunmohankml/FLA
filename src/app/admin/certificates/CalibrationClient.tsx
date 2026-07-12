"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiOutlineArrowDown,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineArrowUp,
  HiOutlineCheck,
} from "react-icons/hi";
import { CERTIFICATE_TEMPLATE_PREVIEW_PATH } from "@/lib/certificateTemplate";

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
  minFontSize?: number;
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

const FIELD_LABELS: Record<keyof CertificateLayout, string> = {
  studentName: "Name",
  level: "Level",
  language: "Course",
  leftGrade: "Line Grade",
  monthYear: "Month / Year",
  listening: "Listening",
  oral: "Speaking",
  reading: "Reading",
  writing: "Writing",
  total: "Total",
  resultGrade: "Result Grade",
  issuePlace: "Place",
  issueDate: "Date",
  certificateNumber: "Certificate No.",
  qr: "QR",
};

const SAMPLE_TEXT: Record<keyof Omit<CertificateLayout, "qr">, string> = {
  studentName: "Arun mohan k",
  level: "B1",
  language: "French",
  leftGrade: "Good",
  monthYear: "February 2026",
  listening: "44",
  oral: "234",
  reading: "86",
  writing: "44",
  total: "408",
  resultGrade: "Good",
  issuePlace: "Valasaravakkam",
  issueDate: "24/2/2026",
  certificateNumber: "FLA-2026-001",
};

const TEXT_KEYS = Object.keys(SAMPLE_TEXT) as Array<keyof Omit<CertificateLayout, "qr">>;
const ALL_KEYS = [...TEXT_KEYS, "qr"] as Array<keyof CertificateLayout>;

function fontFamily(field: LayoutField) {
  return field.family === "serif" ? '"Times New Roman", Times, serif' : "Arial, Helvetica, sans-serif";
}

function fontWeight(field: LayoutField) {
  const numeric = Number(field.weight ?? "400");
  return Number.isFinite(numeric) ? numeric : field.weight ?? "400";
}

function anchorTransform(field: LayoutField, key?: keyof CertificateLayout) {
  const align = key === "certificateNumber" ? "center" : field.align;
  if (align === "center") return "translateX(-50%)";
  if (align === "right") return "translateX(-100%)";
  return "none";
}

function numberValue(value: string, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function CalibrationClient() {
  const [layout, setLayout] = useState<CertificateLayout | null>(null);
  const [selected, setSelected] = useState<keyof CertificateLayout>("studentName");
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [templateSize, setTemplateSize] = useState({ w: 794, h: 1123 });
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    fetch("/api/certificates/layout")
      .then((r) => r.json())
      .then((data: CertificateLayout) => setLayout(data));
  }, []);

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const updateDisplaySize = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    setTemplateSize({ w: img.naturalWidth || 794, h: img.naturalHeight || 1123 });
    setDisplaySize({ w: img.clientWidth, h: img.clientHeight });
  }, []);

  useEffect(() => {
    updateDisplaySize();
    window.addEventListener("resize", updateDisplaySize);
    return () => window.removeEventListener("resize", updateDisplaySize);
  }, [updateDisplaySize]);

  const scaleX = displaySize.w / templateSize.w || 1;
  const scaleY = displaySize.h / templateSize.h || 1;

  const updateField = (key: keyof CertificateLayout, patch: Partial<LayoutField & LayoutQR>) => {
    setLayout((current) => {
      if (!current) return current;
      return {
        ...current,
        [key]: { ...current[key], ...patch },
      };
    });
  };

  const moveSelected = useCallback(
    (dx: number, dy: number) => {
      if (!layout) return;
      const field = layout[selected];
      updateField(selected, { x: field.x + dx, y: field.y + dy });
    },
    [layout, selected]
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement | null)?.tagName === "INPUT") return;
      const step = event.shiftKey ? 10 : event.altKey ? 0.5 : 1;
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") moveSelected(-step, 0);
      if (event.key === "ArrowRight") moveSelected(step, 0);
      if (event.key === "ArrowUp") moveSelected(0, -step);
      if (event.key === "ArrowDown") moveSelected(0, step);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [moveSelected]);

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
      showToast("ok", "Layout saved");
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

  const selectedField = layout[selected];
  const isQrSelected = selected === "qr";

  return (
    <div>
      {toast && (
        <div
          className={`fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-medium shadow-lg ${
            toast.type === "ok"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {toast.type === "ok" ? "Saved: " : "Error: "}
          {toast.msg}
        </div>
      )}

      <div className="mb-6 rounded-2xl border border-black/5 bg-[#faf5f0] p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
              Manual Certificate Calibration
            </h2>
            <p className="mt-1 text-xs text-black/45">
              Preview text uses the same sample values, font sizes, colors, and alignment used by PDF generation.
            </p>
          </div>

          <div className="ml-auto flex gap-2">
            <a
              href="/api/certificates/debug"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-black/5 px-5 py-2 text-sm font-semibold text-black/60 transition-all hover:bg-black/10"
            >
              Open PDF Preview
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

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap gap-1.5">
              {ALL_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
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

          <div className="rounded-xl border border-black/5 bg-white p-3">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/45">
                  {FIELD_LABELS[selected]}
                </p>
                <p className="text-xs text-black/35">
                  Arrow = 1px, Shift = 10px, Alt = 0.5px
                </p>
              </div>
              <div className="flex gap-1">
                <button className="rounded-lg bg-black/5 p-1.5 text-black/60 hover:bg-black/10" onClick={() => moveSelected(-1, 0)}>
                  <HiOutlineArrowLeft className="size-3.5" />
                </button>
                <button className="rounded-lg bg-black/5 p-1.5 text-black/60 hover:bg-black/10" onClick={() => moveSelected(1, 0)}>
                  <HiOutlineArrowRight className="size-3.5" />
                </button>
                <button className="rounded-lg bg-black/5 p-1.5 text-black/60 hover:bg-black/10" onClick={() => moveSelected(0, -1)}>
                  <HiOutlineArrowUp className="size-3.5" />
                </button>
                <button className="rounded-lg bg-black/5 p-1.5 text-black/60 hover:bg-black/10" onClick={() => moveSelected(0, 1)}>
                  <HiOutlineArrowDown className="size-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/45">
                X
                <input
                  type="number"
                  step="0.5"
                  value={selectedField.x}
                  onChange={(e) => updateField(selected, { x: numberValue(e.target.value, selectedField.x) })}
                  className="mt-1 w-full rounded-lg border border-black/8 px-2 py-1.5 text-sm text-black outline-none focus:border-[#e8734a]/40"
                />
              </label>
              <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/45">
                Y
                <input
                  type="number"
                  step="0.5"
                  value={selectedField.y}
                  onChange={(e) => updateField(selected, { y: numberValue(e.target.value, selectedField.y) })}
                  className="mt-1 w-full rounded-lg border border-black/8 px-2 py-1.5 text-sm text-black outline-none focus:border-[#e8734a]/40"
                />
              </label>
              {isQrSelected ? (
                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/45">
                  Size
                  <input
                    type="number"
                    step="0.5"
                    value={(selectedField as LayoutQR).size}
                    onChange={(e) => updateField(selected, { size: numberValue(e.target.value, (selectedField as LayoutQR).size) })}
                    className="mt-1 w-full rounded-lg border border-black/8 px-2 py-1.5 text-sm text-black outline-none focus:border-[#e8734a]/40"
                  />
                </label>
              ) : (
                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/45">
                  Font
                  <input
                    type="number"
                    step="0.5"
                    value={(selectedField as LayoutField).fontSize}
                    onChange={(e) => updateField(selected, { fontSize: numberValue(e.target.value, (selectedField as LayoutField).fontSize) })}
                    className="mt-1 w-full rounded-lg border border-black/8 px-2 py-1.5 text-sm text-black outline-none focus:border-[#e8734a]/40"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative inline-block w-full max-w-5xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={CERTIFICATE_TEMPLATE_PREVIEW_PATH}
          alt="Certificate template"
          onLoad={updateDisplaySize}
          className="w-full rounded-xl border border-black/10"
        />

        {TEXT_KEYS.map((key) => {
          const field = layout[key];
          const active = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`absolute z-10 whitespace-nowrap bg-transparent p-0 text-left leading-none transition-[filter] ${
                active ? "drop-shadow-[0_0_4px_rgba(232,115,74,0.65)]" : ""
              }`}
              style={{
                left: field.x * scaleX,
                top: field.y * scaleY,
                transform: anchorTransform(field, key),
                color: field.color || "#111111",
                fontFamily: fontFamily(field),
                fontSize: field.fontSize * scaleX,
                fontStyle: field.style || "normal",
                fontWeight: fontWeight(field),
                maxWidth: field.maxWidth ? field.maxWidth * scaleX : undefined,
              }}
              title={`${FIELD_LABELS[key]}: ${SAMPLE_TEXT[key]}`}
            >
              <span className={active ? "rounded-sm outline outline-2 outline-[#e8734a]" : ""}>
                {SAMPLE_TEXT[key]}
              </span>
            </button>
          );
        })}

        <button
          onClick={() => setSelected("qr")}
          className={`absolute z-10 border-2 bg-white/80 ${
            selected === "qr" ? "border-[#e8734a]" : "border-[#0c2847]"
          }`}
          style={{
            left: layout.qr.x * scaleX,
            top: layout.qr.y * scaleY,
            width: layout.qr.size * scaleX,
            height: layout.qr.size * scaleY,
          }}
          title="QR preview"
        >
          <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-[#0c2847]">
            QR
          </span>
        </button>
      </div>
    </div>
  );
}
