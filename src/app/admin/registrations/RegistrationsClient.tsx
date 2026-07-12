"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePhone,
  HiOutlineClipboardCheck,
  HiOutlineCheck,
  HiOutlineSearch,
  HiOutlineDownload,
  HiOutlineAdjustments,
  HiOutlineX,
  HiOutlineTrash,
} from "react-icons/hi";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const ALL_LANGUAGES = [
  "German",
  "French",
  "Japanese",
  "Spanish",
  "Chinese",
  "English",
  "Russian",
  "Korean",
  "Italian",
];

type TimePeriod = "all" | "today" | "week" | "month";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  level: string;
  timeSlot: string;
  purpose: string;
  address: string;
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

function RegistrationBubble({
  r,
  onDelete,
}: {
  r: Registration;
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
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8734a]/8 text-sm font-bold text-[#e8734a]">
            {r.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold">{r.name}</p>
            <p className="text-xs text-black/40">
              {r.language} &middot; {r.level}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-black/40 sm:inline">
            {new Date(r.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
          </span>
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
                <CopyButton text={r.email} />
                <CallButton phone={r.phone} />
                <button
                  type="button"
                  onClick={() => onDelete(r.id)}
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
                  <p className="mt-0.5">{r.phone}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Email
                  </p>
                  <p className="mt-0.5 break-all">{r.email}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Language
                  </p>
                  <p className="mt-0.5">{r.language}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Level
                  </p>
                  <p className="mt-0.5">{r.level}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Time Slot
                  </p>
                  <p className="mt-0.5">{r.timeSlot || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Purpose
                  </p>
                  <p className="mt-0.5">{r.purpose || "—"}</p>
                </div>
                {r.address && (
                  <div className="sm:col-span-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-black/35">
                      Class Mode
                    </p>
                    <p className="mt-0.5">{r.address}</p>
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

function isWithinPeriod(dateStr: string, period: TimePeriod): boolean {
  if (period === "all") return true;
  const date = new Date(dateStr);
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (period === "today") {
    return date >= startOfDay;
  }
  if (period === "week") {
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    return date >= startOfWeek;
  }
  if (period === "month") {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return date >= startOfMonth;
  }
  return true;
}

export function RegistrationsClient({
  registrations,
}: {
  registrations: Registration[];
}) {
  const [items, setItems] = useState(registrations);
  const [search, setSearch] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<"all" | string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const activeFilterCount =
    selectedLanguages.length + (timePeriod !== "all" ? 1 : 0);

  const filtered = useMemo(() => {
    return items.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.phone.includes(search) ||
        r.language.toLowerCase().includes(search.toLowerCase());

      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.includes(r.language);

      const matchesPeriod = isWithinPeriod(r.createdAt, timePeriod);

      return matchesSearch && matchesLanguage && matchesPeriod;
    });
  }, [items, search, selectedLanguages, timePeriod]);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const clearFilters = () => {
    setSelectedLanguages([]);
    setTimePeriod("all");
  };

  const handleExport = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Language",
      "Level",
      "Time Slot",
      "Purpose",
      "Class Mode",
      "Date",
    ];
    const rows = filtered.map((r) => [
      r.name,
      r.email,
      r.phone,
      r.language,
      r.level,
      r.timeSlot,
      r.purpose,
      r.address,
      r.createdAt,
    ]);
    const csv = [
      headers.join(","),
      ...rows
        .map((row) =>
          row.map((c) => `"${(c || "").replace(/"/g, '""')}"`).join(",")
        )
        .join("\n"),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registrations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  async function deleteRegistrations(target: "all" | string) {
    setDeleting(true);
    try {
      const response = await fetch("/api/registration", {
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

  const timeOptions: { label: string; value: TimePeriod }[] = [
    { label: "All Time", value: "all" },
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          Registrations
        </h1>
        <p className="mt-1 text-sm text-black/50">
          {items.length} total registrations
        </p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black/30" />
          <input
            placeholder="Search by name, email, phone, language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-full border border-black/8 bg-[#faf5f0] pl-10 pr-4 text-sm transition-colors placeholder:text-black/30 focus:border-[#e8734a]/40 focus:outline-none focus:ring-2 focus:ring-[#e8734a]/10"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-sm font-medium transition-colors hover:bg-[#faf5f0]"
          >
            <HiOutlineAdjustments className="size-4" />
            Filter
            {activeFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-[#e8734a] text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-xl"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold">Filters</p>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-[#e8734a] hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Time Period
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {timeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setTimePeriod(opt.value)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                          timePeriod === opt.value
                            ? "bg-[#e8734a] text-white"
                            : "bg-[#faf5f0] text-black/40 hover:text-black/60"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-black/35">
                    Languages
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_LANGUAGES.map((lang) => {
                      const active = selectedLanguages.includes(lang);
                      return (
                        <button
                          key={lang}
                          onClick={() => toggleLanguage(lang)}
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                            active
                              ? "bg-[#e8734a] text-white"
                              : "bg-[#faf5f0] text-black/40 hover:text-black/60"
                          }`}
                        >
                          {active && <HiOutlineCheck className="size-3" />}
                          {lang}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {timePeriod !== "all" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e8734a]/8 px-3 py-1 text-xs font-medium text-[#e8734a]">
              {timeOptions.find((o) => o.value === timePeriod)?.label}
              <button onClick={() => setTimePeriod("all")}>
                <HiOutlineX className="size-3" />
              </button>
            </span>
          )}
          {selectedLanguages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center gap-1 rounded-full bg-[#e8734a]/8 px-3 py-1 text-xs font-medium text-[#e8734a]"
            >
              {lang}
              <button onClick={() => toggleLanguage(lang)}>
                <HiOutlineX className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-black/40">
            No results found
          </p>
        )}
        {filtered.map((r) => (
          <RegistrationBubble key={r.id} r={r} onDelete={setDeleteTarget} />
        ))}
      </div>

      <p className="text-xs text-black/40">
        Showing {filtered.length} of {items.length} entries
      </p>

      <ConfirmDialog
        open={deleteTarget !== null}
        title={deleteTarget === "all" ? "Clear all registrations" : "Delete registration"}
        message={
          deleteTarget === "all"
            ? "Are you sure you want to delete every registration? This action cannot be undone."
            : "Are you sure you want to delete this registration? This action cannot be undone."
        }
        confirmLabel={deleting ? "Deleting..." : deleteTarget === "all" ? "Clear all" : "Delete"}
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => deleteTarget && deleteRegistrations(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
