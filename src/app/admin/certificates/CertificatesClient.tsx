"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineCheck,
  HiOutlineExclamationCircle,
  HiOutlineEye,
  HiOutlineDownload,
  HiOutlinePlus,
  HiOutlineTrash,
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

const scoreKeys = [
  "listeningScore",
  "oralTestScore",
  "readingScore",
  "writtenExpressionScore",
] as const;

function todayDate() {
  const date = new Date();
  return [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    date.getFullYear(),
  ].join("/");
}

function certificatePrefix() {
  return `FLA-${new Date().getFullYear()}-`;
}

function createEmptyForm() {
  return {
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
    issueDate: todayDate(),
    issuePlace: "",
  };
}

type CertificateForm = ReturnType<typeof createEmptyForm>;

function calculateTotal(form: CertificateForm) {
  const values = scoreKeys.map((key) => Number(form[key]));
  if (values.some((value) => !Number.isFinite(value))) return "";

  return String(values.reduce((sum, value) => sum + value, 0));
}

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
  readOnly,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  readOnly?: boolean;
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
        readOnly={readOnly}
        placeholder={placeholder || label}
        className={[
          "w-full rounded-xl border border-black/8 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-black/30 focus:border-[#e8734a]/40 focus:ring-2 focus:ring-[#e8734a]/10",
          readOnly ? "cursor-not-allowed bg-black/[0.03] text-black/60" : "bg-white",
        ].join(" ")}
      />
    </div>
  );
}

function CertificateNumberField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-black/50">
        Certificate Number <span className="text-[#e8734a]">*</span>
      </label>
      <div className="flex overflow-hidden rounded-xl border border-black/8 bg-white focus-within:border-[#e8734a]/40 focus-within:ring-2 focus-within:ring-[#e8734a]/10">
        <span className="inline-flex shrink-0 items-center border-r border-black/8 bg-black/[0.03] px-4 text-sm font-semibold text-black/60">
          {certificatePrefix()}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="001"
          className="min-w-0 flex-1 bg-white px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-black/30"
        />
      </div>
    </div>
  );
}

export function CertificatesClient({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const [form, setForm] = useState(createEmptyForm);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [preview, setPreview] = useState<Certificate | null>(null);
  const [list, setList] = useState(certificates);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const set = (key: keyof CertificateForm) => (v: string) =>
    setForm((current) => {
      const next = { ...current, [key]: v };
      return scoreKeys.includes(key as (typeof scoreKeys)[number])
        ? { ...next, totalScore: calculateTotal(next) }
        : next;
    });

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const certificatePdfUrl = (certificateNumber: string, download = false) =>
    `/api/certificates/pdf/${encodeURIComponent(certificateNumber)}${download ? "?download=1" : ""}`;

  const handleGenerate = async () => {
    if (!form.studentFullName || !form.certificateNumber.trim()) {
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
          id: data.id || Date.now().toString(),
          certificateNumber: data.certificateNumber,
          studentName: form.studentFullName,
          courseLevel: form.courseLevel,
          courseName: form.courseName,
          grade: form.grade,
          totalScore: form.totalScore,
          imageUrl: data.imageUrl,
          formData: data.formData || { ...form, certificateNumber: data.certificateNumber },
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      setForm(createEmptyForm());
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
      const deleteRes = await fetch(`/api/certificates?id=${encodeURIComponent(c.id)}`, {
        method: "DELETE",
      });
      const deleteData = await deleteRes.json();

      if (!deleteRes.ok) {
        showToast("err", deleteData.error || "Could not delete old certificate");
        return;
      }

      const body = new FormData();
      for (const [k, v] of Object.entries(fd)) body.append(k, v);
      body.set("certificateNumber", fd.certificateNumber || c.certificateNumber);

      const res = await fetch("/api/certificates/generate", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        showToast("err", data.error || "Regeneration failed");
        return;
      }

      showToast("ok", `Certificate ${data.certificateNumber} regenerated`);
      setList((prev) =>
        prev.map((item) =>
          item.id === c.id
            ? {
                ...item,
                id: data.id || item.id,
                certificateNumber: data.certificateNumber,
                imageUrl: data.imageUrl,
                formData: data.formData || fd,
                createdAt: new Date().toISOString(),
              }
            : item
        )
      );
    } catch {
      showToast("err", "Network error");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async (c: Certificate) => {
    try {
      const res = await fetch(certificatePdfUrl(c.certificateNumber, true));
      if (!res.ok) {
        showToast("err", "Certificate PDF could not be prepared");
        return;
      }

      const blob = await res.blob();
      if (blob.type !== "application/pdf" && blob.size < 1000) {
        showToast("err", "Certificate PDF response was invalid");
        return;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${c.certificateNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      showToast("err", "Download failed");
    }
  };

  const handleDelete = async (c: Certificate) => {
    const confirmed = window.confirm(
      `Delete certificate ${c.certificateNumber}? This removes the PDF and database record.`
    );
    if (!confirmed) return;

    setDeletingId(c.id);
    try {
      const res = await fetch(`/api/certificates?id=${encodeURIComponent(c.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        showToast("err", data.error || "Delete failed");
        return;
      }

      setList((prev) => prev.filter((item) => item.id !== c.id));
      if (preview?.id === c.id) setPreview(null);
      showToast("ok", `Certificate ${c.certificateNumber} deleted`);
    } catch {
      showToast("err", "Network error");
    } finally {
      setDeletingId(null);
    }
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
                src={certificatePdfUrl(preview.certificateNumber)}
                title={`Certificate ${preview.certificateNumber}`}
                className="h-[86vh] w-[min(92vw,760px)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
            Certificate Generator
          </h1>
          <p className="mt-1 text-sm text-black/50">
            Generate and manage student certificates
          </p>
        </div>
        <Link
          href="/admin/certificates/calibration"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0c2847] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#143b65]"
        >
          Manual Calibration
        </Link>
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
        </div>

        <h2 className="mb-4 mt-6 text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Scores
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Listening" value={form.listeningScore} onChange={set("listeningScore")} placeholder="90" />
          <Field label="Speaking" value={form.oralTestScore} onChange={set("oralTestScore")} placeholder="88" />
          <Field label="Reading" value={form.readingScore} onChange={set("readingScore")} placeholder="85" />
          <Field label="Writing" value={form.writtenExpressionScore} onChange={set("writtenExpressionScore")} placeholder="80" />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Total" value={form.totalScore} onChange={set("totalScore")} readOnly placeholder="Auto" />
          <Field label="Grade" value={form.grade} onChange={set("grade")} placeholder="Good" />
        </div>

        <h2 className="mb-4 mt-6 text-[11px] font-bold uppercase tracking-[0.15em] text-black/40">
          Certificate Info
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CertificateNumberField value={form.certificateNumber} onChange={set("certificateNumber")} />
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
                className="flex-col items-start gap-3 rounded-xl border border-black/5 bg-white p-3 transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between sm:p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground truncate sm:text-sm">
                    {c.studentName}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-black/50 sm:text-xs">
                    <span>{c.certificateNumber}</span>
                    <span>{c.courseLevel}</span>
                    {c.grade && <span>Grade: {c.grade}</span>}
                    {c.totalScore && <span>Total: {c.totalScore}</span>}
                    <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex w-full flex-wrap gap-1.5 sm:ml-4 sm:w-auto sm:flex-nowrap sm:gap-2">
                  <button
                    onClick={() => setPreview(c)}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#e8734a]/8 px-2 py-1 text-[11px] font-medium text-[#c9573a] transition-colors hover:bg-[#e8734a]/15 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    <HiOutlineEye className="size-3 sm:size-3.5" />
                    <span className="sm:inline">View</span>
                  </button>
                  <button
                    onClick={() => handleRegenerate(c)}
                    disabled={generating}
                    className="inline-flex items-center gap-1 rounded-lg bg-black/5 px-2 py-1 text-[11px] font-medium text-black/60 transition-colors hover:bg-black/10 disabled:opacity-40 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    <HiOutlineArrowPath className={`size-3 sm:size-3.5 ${generating ? "animate-spin" : ""}`} />
                    <span className="sm:inline">Regenerate</span>
                  </button>
                  <button
                    onClick={() => handleDownload(c)}
                    className="inline-flex items-center gap-1 rounded-lg bg-black/5 px-2 py-1 text-[11px] font-medium text-black/60 transition-colors hover:bg-black/10 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    <HiOutlineDownload className="size-3 sm:size-3.5" />
                    <span className="sm:inline">Download</span>
                  </button>
                  <button
                    onClick={() => handleDelete(c)}
                    disabled={deletingId === c.id || generating}
                    className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2 py-1 text-[11px] font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-40 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    {deletingId === c.id ? (
                      <span className="size-3 animate-spin rounded-full border-2 border-red-200 border-t-red-600 sm:size-3.5" />
                    ) : (
                      <HiOutlineTrash className="size-3 sm:size-3.5" />
                    )}
                    <span className="sm:inline">Delete</span>
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
