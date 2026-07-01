"use client";

import { useMemo, useState } from "react";
import { HiOutlineDownload, HiOutlineMail, HiOutlinePhone, HiOutlineSearch } from "react-icons/hi";

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

export function JobApplicationsClient({ applications }: { applications: Application[] }) {
  const [search, setSearch] = useState("");
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
          {filtered.map((item) => (
            <article key={item.id} className="py-5">
              <div className="grid gap-5 xl:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-heading text-xl font-medium">{item.name}</h2>
                    <span className="rounded-full bg-[#faf5f0] px-3 py-1 text-xs font-semibold text-black/45">{item.jobTitle}</span>
                    <span className="rounded-full bg-[#e8734a]/8 px-3 py-1 text-xs font-semibold text-[#c9573a]">ID:{item.jobCode}</span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-black/55 md:grid-cols-3">
                    <p><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/30">Experience</span>{item.experience || "Not specified"}</p>
                    <p><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/30">Date</span>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "New"}</p>
                    <p className="break-all"><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/30">Email</span>{item.email}</p>
                  </div>
                  {item.message && <p className="mt-4 max-w-3xl text-sm leading-6 text-black/55">{item.message}</p>}
                </div>
                <div className="flex flex-wrap gap-2 xl:justify-end">
                  <a href={`tel:${item.phone}`} className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background">
                    <HiOutlinePhone className="size-4" />
                    Call
                  </a>
                  <a href={`mailto:${item.email}`} className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-semibold">
                    <HiOutlineMail className="size-4" />
                    Email
                  </a>
                  {item.resumeUrl && (
                    <a href={item.resumeUrl} target="_blank" className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-semibold">
                      <HiOutlineDownload className="size-4" />
                      Resume
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
