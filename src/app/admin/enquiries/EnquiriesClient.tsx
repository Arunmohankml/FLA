"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePhone,
  HiOutlineClipboardCheck,
  HiOutlineCheck,
  HiOutlineSearch,
  HiOutlineDownload,
  HiOutlineTrash,
} from "react-icons/hi";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleCopy();
      }}
      className="inline-flex items-center gap-1.5 rounded-full bg-[#e8734a]/8 px-3 py-1 text-xs font-medium text-[#c9573a] transition-colors hover:bg-[#e8734a]/15"
    >
      {copied ? (
        <>
          <HiOutlineCheck className="size-3.5" />
          Copied
        </>
      ) : (
        <>
          <HiOutlineClipboardCheck className="size-3.5" />
          {text}
        </>
      )}
    </button>
  );
}

function CallButton({ phone }: { phone: string }) {
  return (
    <a
      href={`tel:${phone}`}
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/8 px-3 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-500/15"
    >
      <HiOutlinePhone className="size-3.5" />
      Call
    </a>
  );
}

function EnquiryBubble({
  e,
  onDelete,
}: {
  e: Enquiry;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white transition-shadow hover:shadow-md">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8734a]/6 text-sm font-bold text-[#c9573a]">
            {e.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold">{e.name}</p>
            <p className="text-xs text-black/40">
              {e.subject} &middot;{" "}
              {new Date(e.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {open ? (
            <HiOutlineChevronUp className="size-5 shrink-0 text-black/30" />
          ) : (
            <HiOutlineChevronDown className="size-5 shrink-0 text-black/30" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/5 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2 pb-3">
                <CopyButton text={e.email} />
                <CallButton phone={e.phone} />
                <button
                  type="button"
                  onClick={() => onDelete(e.id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  <HiOutlineTrash className="size-3.5" />
                  Delete
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Phone
                  </p>
                  <p className="mt-0.5">{e.phone}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Email
                  </p>
                  <p className="mt-0.5 break-all">{e.email}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Subject
                  </p>
                  <p className="mt-0.5">{e.subject}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Message
                  </p>
                  <p className="mt-0.5">{e.message}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EnquiriesClient({
  enquiries,
}: {
  enquiries: Enquiry[];
}) {
  const [items, setItems] = useState(enquiries);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<"all" | string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = items.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    const headers = ["Name", "Email", "Phone", "Subject", "Message", "Date"];
    const rows = items.map((e) => [
      e.name,
      e.email,
      e.phone,
      e.subject,
      e.message,
      e.createdAt,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.map((c) => `"${(c || "").replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enquiries.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  async function deleteEnquiries(target: "all" | string) {
    setDeleting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(target === "all" ? { all: true } : { id: target }),
      });

      if (response.ok) {
        setItems((current) => target === "all" ? [] : current.filter((item) => item.id !== target));
        setDeleteTarget(null);
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          Enquiries
        </h1>
        <p className="mt-1 text-sm text-black/50">
          {items.length} total enquiries
        </p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black/30" />
          <input
            placeholder="Search by name, email, phone, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-full border border-black/8 bg-[#faf5f0] pl-10 pr-4 text-sm transition-colors placeholder:text-black/30 focus:border-[#e8734a]/40 focus:outline-none focus:ring-2 focus:ring-[#e8734a]/10"
          />
        </div>
        <button
          onClick={handleExport}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-sm font-medium transition-colors hover:bg-[#faf5f0]"
        >
          <HiOutlineDownload className="size-4" />
          Export
        </button>
        <button
          onClick={() => setDeleteTarget("all")}
          disabled={items.length === 0}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-red-50 px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <HiOutlineTrash className="size-4" />
          Clear all
        </button>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-black/40">
            No results found
          </p>
        )}
        {filtered.map((e) => (
          <EnquiryBubble key={e.id} e={e} onDelete={setDeleteTarget} />
        ))}
      </div>

      <p className="text-xs text-black/40">
        Showing {filtered.length} of {items.length} entries
      </p>

      <ConfirmDialog
        open={deleteTarget !== null}
        title={deleteTarget === "all" ? "Clear all enquiries" : "Delete enquiry"}
        message={
          deleteTarget === "all"
            ? "Are you sure you want to delete every enquiry? This action cannot be undone."
            : "Are you sure you want to delete this enquiry? This action cannot be undone."
        }
        confirmLabel={deleting ? "Deleting..." : deleteTarget === "all" ? "Clear all" : "Delete"}
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => deleteTarget && deleteEnquiries(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
