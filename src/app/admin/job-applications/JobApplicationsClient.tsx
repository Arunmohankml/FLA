"use client";

import { useMemo, useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineSearch,
} from "react-icons/hi";

interface Application {
  id: string;
  jobTitle: string;
  jobCode: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  message: string;
  resumeUrl: string;
  status: string;
  createdAt: string;
}

function formatDate(value: string) {
  return value ? new Date(value).toLocaleString() : "New";
}

export function JobApplicationsClient({
  applications,
  error = "",
}: {
  applications: Application[];
  error?: string;
}) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return applications.filter((item) =>
      [item.name, item.email, item.phone, item.jobTitle, item.jobCode, item.status]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [applications, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-medium tracking-tight">Job Applications</h1>
          <p className="mt-1 text-sm text-black/50">Applications submitted from the Careers page.</p>
        </div>
        <span className="rounded-full bg-[#faf5f0] px-4 py-2 text-sm font-medium text-black/50">
          {applications.length} applications
        </span>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Could not load job applications: {error}
        </div>
      )}

      <div className="rounded-2xl border border-black/6 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.035)]">
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black/30" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search applications..."
            className="h-11 w-full rounded-full border border-black/8 bg-[#faf5f0] pl-10 pr-4 text-sm outline-none focus:border-[#e8734a]/40 focus:ring-2 focus:ring-[#e8734a]/10"
          />
        </div>

        <div className="mt-5 divide-y divide-black/6">
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-black/40">No applications found.</p>
          )}
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <article key={item.id} className="py-4">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="grid w-full cursor-pointer gap-4 rounded-2xl px-3 py-3 text-left transition hover:bg-[#F5FAFF] focus:outline-none focus:ring-2 focus:ring-[#0c2847]/20 md:grid-cols-[1.2fr_1fr_auto]"
                  aria-expanded={isExpanded}
                  aria-controls={`application-${item.id}`}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate font-heading text-lg font-medium text-[#0F172A]">
                        {item.name}
                      </h2>
                      <span className="rounded-full bg-[#e8734a]/8 px-2.5 py-1 text-xs font-semibold text-[#c9573a]">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm font-medium text-black/55">
                      {item.jobTitle} {item.jobCode ? `- ID:${item.jobCode}` : ""}
                    </p>
                  </div>

                  <div className="grid gap-1 text-sm text-black/55 sm:grid-cols-2 md:block">
                    <p className="truncate">{item.phone}</p>
                    <p className="truncate">{item.email}</p>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm text-black/45 md:justify-end">
                    <span>{formatDate(item.createdAt)}</span>
                    <HiOutlineChevronDown
                      className={`size-5 shrink-0 transition-transform ${isExpanded ? "rotate-180 text-[#0c2847]" : ""}`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div
                    id={`application-${item.id}`}
                    className="mx-3 mt-3 rounded-2xl border border-[#DCE8F5] bg-[#F8FBFF] p-4"
                  >
                    <div className="grid gap-4 text-sm text-black/65 md:grid-cols-3">
                      <p>
                        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
                          Applied for
                        </span>
                        {item.jobTitle || "Not specified"}
                      </p>
                      <p>
                        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
                          Job ID
                        </span>
                        {item.jobCode || "Not specified"}
                      </p>
                      <p>
                        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
                          Experience
                        </span>
                        {item.experience || "Not specified"}
                      </p>
                    </div>

                    <div className="mt-4 grid gap-4 text-sm text-black/65 md:grid-cols-2">
                      <p className="break-all">
                        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
                          Email
                        </span>
                        {item.email}
                      </p>
                      <p>
                        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
                          Phone
                        </span>
                        {item.phone}
                      </p>
                    </div>

                    <div className="mt-4">
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
                        Message
                      </span>
                      <p className="mt-1 max-w-4xl whitespace-pre-wrap text-sm leading-6 text-black/60">
                        {item.message || "No message added."}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <a href={`tel:${item.phone}`} className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background">
                        <HiOutlinePhone className="size-4" />
                        Call
                      </a>
                      <a href={`mailto:${item.email}`} className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-semibold">
                        <HiOutlineMail className="size-4" />
                        Email
                      </a>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
