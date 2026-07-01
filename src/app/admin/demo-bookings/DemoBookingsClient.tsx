"use client";

import { useMemo, useState } from "react";
import { HiOutlineDownload, HiOutlineMail, HiOutlinePhone, HiOutlineSearch } from "react-icons/hi";

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  qualification: string;
  state: string;
  course: string;
  status: string;
  createdAt: string;
}

export function DemoBookingsClient({ bookings }: { bookings: Booking[] }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return bookings.filter((item) =>
      [item.name, item.phone, item.email, item.qualification, item.state, item.course, item.status]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [bookings, search]);

  function exportCsv() {
    const headers = ["Name", "Phone", "Email", "Qualification", "State", "Course", "Status", "Date"];
    const rows = bookings.map((item) => [item.name, item.phone, item.email, item.qualification, item.state, item.course, item.status, item.createdAt]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "demo-bookings.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-medium tracking-tight">Demo Bookings</h1>
          <p className="mt-1 text-sm text-black/50">Counsellor follow-ups from the Book a Demo page.</p>
        </div>
        <span className="rounded-full bg-[#faf5f0] px-4 py-2 text-sm font-medium text-black/50">
          {bookings.length} requests
        </span>
      </div>

      <div className="rounded-2xl border border-black/6 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.035)]">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black/30" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, course, phone, status..."
              className="h-11 w-full rounded-full border border-black/8 bg-[#faf5f0] pl-10 pr-4 text-sm outline-none focus:border-[#e8734a]/40 focus:ring-2 focus:ring-[#e8734a]/10"
            />
          </div>
          <button onClick={exportCsv} className="inline-flex h-11 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-sm font-medium hover:bg-[#faf5f0]">
            <HiOutlineDownload className="size-4" />
            Export
          </button>
        </div>

        <div className="mt-5 divide-y divide-black/6">
          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-black/40">No demo bookings found.</p>
          )}
          {filtered.map((item) => (
            <article key={item.id} className="py-5">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-heading text-xl font-medium">{item.name}</p>
                    <span className="rounded-full bg-[#faf5f0] px-3 py-1 text-xs font-semibold text-black/45">{item.course}</span>
                    <span className="rounded-full bg-[#e8734a]/8 px-3 py-1 text-xs font-semibold text-[#c9573a]">{item.status}</span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-black/55 sm:grid-cols-2 xl:grid-cols-4">
                    <p><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/30">Qualification</span>{item.qualification}</p>
                    <p><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/30">State</span>{item.state}</p>
                    <p><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/30">Date</span>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "New"}</p>
                    <p className="break-all"><span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/30">Email</span>{item.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <a href={`tel:${item.phone}`} className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background">
                    <HiOutlinePhone className="size-4" />
                    Call
                  </a>
                  <a href={`mailto:${item.email}`} className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-semibold">
                    <HiOutlineMail className="size-4" />
                    Email
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
