"use client";

import { useMemo, useState } from "react";
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
import { downloadCsv } from "@/lib/csvExport";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  message: string;
  status: string;
  created_at: string;
}

function statusBadge(s: string) {
  switch (s) {
    case "new":
      return "bg-[#e8734a]/10 text-[#c9573a]";
    case "contacted":
      return "bg-blue-50 text-blue-600";
    case "booked":
      return "bg-emerald-50 text-emerald-600";
    case "closed":
      return "bg-black/5 text-black/40";
    default:
      return "bg-[#e8734a]/10 text-[#c9573a]";
  }
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

function BookingCard({
  item,
  onDelete,
}: {
  item: Booking;
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
            {item.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold">{item.name}</p>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusBadge(item.status)}`}>
                {item.status}
              </span>
            </div>
            <p className="text-xs text-black/40">
              {item.preferred_date
                ? `Preferred: ${item.preferred_date}`
                : "No preferred date"}{" "}
              &middot;{" "}
              {item.created_at
                ? new Date(item.created_at).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "—"}
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
                <CopyButton text={item.email} />
                <CallButton phone={item.phone} />
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
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
                  <p className="mt-0.5">{item.phone}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Email
                  </p>
                  <p className="mt-0.5 break-all">{item.email}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Preferred Date
                  </p>
                  <p className="mt-0.5">{item.preferred_date || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Status
                  </p>
                  <p className="mt-0.5">{item.status}</p>
                </div>
                {item.message && (
                  <div className="sm:col-span-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                      Message
                    </p>
                    <p className="mt-0.5 whitespace-pre-wrap leading-relaxed text-black/60">
                      {item.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DemoBookingsClient({
  bookings,
  error = "",
}: {
  bookings: Booking[];
  error?: string;
}) {
  const [items, setItems] = useState(bookings);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<"all" | string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.includes(q) ||
        item.preferred_date.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q)
    );
  }, [items, search]);

  const handleExport = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Preferred Date", "Message", "Status", "Created At"];
    const rows = filtered.map((item) => [
      item.id,
      item.name,
      item.email,
      item.phone,
      item.preferred_date,
      item.message,
      item.status,
      item.created_at,
    ]);
    downloadCsv("demo-bookings.csv", headers, rows);
  };

  async function deleteBookings(target: "all" | string) {
    setDeleting(true);
    try {
      const response = await fetch("/api/demo-bookings", {
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
          Demo Bookings
        </h1>
        <p className="mt-1 text-sm text-black/50">
          {items.length} total requests
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Could not load demo bookings: {error}
        </div>
      )}

      <div className="flex gap-3">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black/30" />
          <input
            placeholder="Search by name, email, phone, status..."
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
        {filtered.map((item) => (
          <BookingCard key={item.id} item={item} onDelete={setDeleteTarget} />
        ))}
      </div>

      <p className="text-xs text-black/40">
        Showing {filtered.length} of {items.length} entries
      </p>

      <ConfirmDialog
        open={deleteTarget !== null}
        title={deleteTarget === "all" ? "Clear all demo bookings" : "Delete demo booking"}
        message={
          deleteTarget === "all"
            ? "Are you sure you want to delete every demo booking request? This action cannot be undone."
            : "Are you sure you want to delete this demo booking request? This action cannot be undone."
        }
        confirmLabel={deleting ? "Deleting..." : deleteTarget === "all" ? "Clear all" : "Delete"}
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => deleteTarget && deleteBookings(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
