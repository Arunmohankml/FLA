"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineCheck,
  HiOutlineExclamationCircle,
  HiOutlineEye,
  HiOutlineDownload,
  HiOutlinePlus,
  HiOutlineX,
} from "react-icons/hi";
import { HiOutlineArrowPath } from "react-icons/hi2";

interface Certificate {
  id: string;
  certificateNumber: string;
  studentName: string;
  courseLevel: string;
  courseName: string;
  grade: string;
  totalScore: string;
  imageUrl: string;
  formData?: Record<string, string> | null;
  createdAt: string;
}

const emptyForm = {
  studentFullName: "",
  courseLevel: "",
  courseName: "",
  grade: "",
  readingScore: "",
  listeningScore: "",
  writtenExpressionScore: "",
  oralTestScore: "",
  totalScore: "",
  certificateNumber: "",
  issueDate: "",
  issuePlace: "",
};

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-black/50">
        {label} {required && <span className="text-[#e8734a]">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="w-full rounded-xl border border-black/8 bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-black/30 focus:border-[#e8734a]/40 focus:ring-2 focus:ring-[#e8734a]/10"
      />
    </div>
  );
}

export function CertificatesClient({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const [form, setForm] = useState(emptyForm);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [preview, setPreview] = useState<Certificate | null>(null);
  const [list, setList] = useState(certificates);

  const set = (key: string) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleGenerate = async () => {
    if (!form.studentFullName || !form.certificateNumber) {
      showToast("err", "Student name and certificate number are required");
      return;
    }

    setGenerating(true);
    try {
      const fd = new FormData();
      for (const [k, v] of Object.entries(form)) fd.append(k, v);

      const res = await fetch("/api/certificates/generate", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        showToast("err", data.error || "Generation failed");
        return;
      }

      showToast("ok", `Certificate ${data.certificateNumber} generated`);

      setList((prev) => [
        {
          id: Date.now().toString(),
          certificateNumber: data.certificateNumber,
          studentName: form.studentFullName,
          courseLevel: form.courseLevel,
          courseName: form.courseName,
          grade: form.grade,
          totalScore: form.totalScore,
          imageUrl: data.imageUrl,
          formData: { ...form },
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      setForm(emptyForm);
    } catch {
      showToast("err", "Network error");
    } finally {
      setGenerating(false);
    }
  };

  const handleRegenerate = async (c: Certificate) => {
    const fd = c.formData || {};
    setGenerating(true);
    try {
      const body = new FormData();
      body.append("id", c.id);
      // Send saved form data so coordinates re-align with the same values
      for (const [k, v] of Object.entries(fd)) body.append(k, v);

      const res = await fetch("/api/certificates/generate", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        showToast("err", data.error || "Regeneration failed");
        return;
      }

      showToast("ok", `Certificate ${c.certificateNumber} regenerated`);
      setList((prev) =>
        prev.map((item) =>
          item.id === c.id ? { ...item, imageUrl: data.imageUrl } : item
        )
      );
    } catch {
      showToast("err", "Network error");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = (c: Certificate) => {
    const a = document.createElement("a");
    a.href = c.imageUrl;
    a.download = `${c.certificateNumber}.pdf`;
    a.click();
  };

  return (
    <div>
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-medium shadow-lg ${
              toast.type === "ok"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            <span className="mr-2 inline-flex items-center gap-1.5">
              {toast.type === "ok" ? (
                <HiOutlineCheck className="size-4" />
              ) : (
                <HiOutlineExclamationCircle className="size-4" />
              )}
            </span>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute right-3 top-3 z-10 flex gap-2">
                <button
                  onClick={() => handleDownload(preview)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-black/50 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-black/70"
                >
                  <HiOutlineDownload className="size-3.5" />
                  Download
                </button>
                <button
                  onClick={() => setPreview(null)}
                  className="rounded-lg bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70"
                >
                  <HiOutlineX className="size-4" />
                </button>
              </div>
              <iframe
                src={preview.imageUrl}
                title={`Certificate ${preview.certificateNumber}`}
                className="h-[86vh] w-[min(92vw,760px)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
          Certificate Generator
        </h1>
        <p className="mt-1 text-sm text-black/50">
          Generate and manage student certificates
        </p>
      </div>

      {/* Form */}
      <div className="mb-10 rounded-2xl border border-black/5 bg-[#faf5f0] p-6">
        <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Student Details
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Full Name" value={form.studentFullName} onChange={set("studentFullName")} required placeholder="e.g. John Smith" />
          <Field label="Course Level" value={form.courseLevel} onChange={set("courseLevel")} placeholder="e.g. B1" />
          <Field label="Course Name" value={form.courseName} onChange={set("courseName")} placeholder="e.g. French Language" />
          <Field label="Grade" value={form.grade} onChange={set("grade")} placeholder="e.g. Good" />
        </div>

        <h2 className="mb-4 mt-6 text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Scores
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Reading Score" value={form.readingScore} onChange={set("readingScore")} placeholder="e.g. 85" />
          <Field label="Listening Score" value={form.listeningScore} onChange={set("listeningScore")} placeholder="e.g. 90" />
          <Field label="Written Expression" value={form.writtenExpressionScore} onChange={set("writtenExpressionScore")} placeholder="e.g. 80" />
          <Field label="Oral Test Score" value={form.oralTestScore} onChange={set("oralTestScore")} placeholder="e.g. 88" />
          <Field label="Total Score" value={form.totalScore} onChange={set("totalScore")} placeholder="e.g. 343" />
        </div>

        <h2 className="mb-4 mt-6 text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Certificate Info
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Certificate Number" value={form.certificateNumber} onChange={set("certificateNumber")} required placeholder="e.g. FLA-2026-001" />
          <Field label="Issue Date" value={form.issueDate} onChange={set("issueDate")} placeholder="DD/MM/YYYY" />
          <Field label="Issue Place" value={form.issuePlace} onChange={set("issuePlace")} placeholder="e.g. Chennai" />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-2 rounded-xl bg-[#e8734a] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#d65a30] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating...
              </>
            ) : (
              <>
                <HiOutlinePlus className="size-4" />
                Generate Certificate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Certificate List */}
      <div>
        <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Generated Certificates ({list.length})
        </h2>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/10 py-16 text-center">
            <p className="text-sm text-black/40">No certificates generated yet</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {list.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-white p-4 transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-semibold text-foreground truncate">
                    {c.studentName}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/50">
                    <span>{c.certificateNumber}</span>
                    <span>{c.courseLevel}</span>
                    {c.grade && <span>Grade: {c.grade}</span>}
                    {c.totalScore && <span>Total: {c.totalScore}</span>}
                    <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="ml-4 flex shrink-0 gap-2">
                  <button
                    onClick={() => setPreview(c)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#e8734a]/8 px-3 py-1.5 text-xs font-medium text-[#c9573a] transition-colors hover:bg-[#e8734a]/15"
                  >
                    <HiOutlineEye className="size-3.5" />
                    View
                  </button>
                  <button
                    onClick={() => handleRegenerate(c)}
                    disabled={generating}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-black/5 px-3 py-1.5 text-xs font-medium text-black/60 transition-colors hover:bg-black/10 disabled:opacity-40"
                  >
                    <HiOutlineArrowPath className={`size-3.5 ${generating ? "animate-spin" : ""}`} />
                    Regenerate
                  </button>
                  <button
                    onClick={() => handleDownload(c)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-black/5 px-3 py-1.5 text-xs font-medium text-black/60 transition-colors hover:bg-black/10"
                  >
                    <HiOutlineDownload className="size-3.5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
