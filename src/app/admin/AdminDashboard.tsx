"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  HiOutlineUserGroup,
  HiOutlineMail,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineAcademicCap,
  HiOutlineCalendar,
} from "react-icons/hi";

interface DashboardProps {
  todayRegistrations: number;
  totalRegistrations: number;
  totalEnquiries: number;
  recentRegistrations: {
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
  }[];
  recentEnquiries: {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    createdAt: string;
  }[];
}

function BubbleCard({
  children,
  defaultOpen,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white transition-shadow hover:shadow-md">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        {children}
        {open ? (
          <HiOutlineChevronUp className="size-5 shrink-0 text-black/30" />
        ) : (
          <HiOutlineChevronDown className="size-5 shrink-0 text-black/30" />
        )}
      </button>
    </div>
  );
}

export function AdminDashboard({
  todayRegistrations,
  totalRegistrations,
  totalEnquiries,
  recentRegistrations,
  recentEnquiries,
}: DashboardProps) {
  const [tab, setTab] = useState<"registrations" | "enquiries">(
    "registrations"
  );

  const stats = [
    {
      label: "Today",
      value: todayRegistrations,
      icon: HiOutlineCalendar,
      color: "bg-blue-50 text-blue-500",
    },
    {
      label: "Total Registrations",
      value: totalRegistrations,
      icon: HiOutlineUserGroup,
      color: "bg-[#e8734a]/8 text-[#e8734a]",
    },
    {
      label: "Total Enquiries",
      value: totalEnquiries,
      icon: HiOutlineMail,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Languages",
      value: 9,
      icon: HiOutlineAcademicCap,
      color: "bg-purple-50 text-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-black/50">
          Manage your academy
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-black/5 bg-white p-4 sm:p-5"
            >
              <div className={`mb-3 inline-flex rounded-xl p-2.5 ${s.color}`}>
                <Icon className="size-5" />
              </div>
              <p className="text-2xl font-bold sm:text-3xl">{s.value}</p>
              <p className="mt-0.5 text-xs text-black/40 sm:text-sm">
                {s.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 rounded-full border border-black/5 bg-[#faf5f0] p-1">
        <button
          onClick={() => setTab("registrations")}
          className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${
            tab === "registrations"
              ? "bg-[#e8734a] text-white shadow-sm"
              : "text-black/40 hover:text-black/60"
          }`}
        >
          Registrations ({totalRegistrations})
        </button>
        <button
          onClick={() => setTab("enquiries")}
          className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${
            tab === "enquiries"
              ? "bg-[#e8734a] text-white shadow-sm"
              : "text-black/40 hover:text-black/60"
          }`}
        >
          Enquiries ({totalEnquiries})
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === "registrations" && (
          <motion.div
            key="registrations"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {recentRegistrations.length === 0 && (
              <p className="py-12 text-center text-sm text-black/40">
                No registrations yet
              </p>
            )}
            {recentRegistrations.map((r) => (
              <BubbleCard key={r.id}>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8734a]/8 text-sm font-bold text-[#e8734a]">
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-xs text-black/40">
                      {r.language} &middot;{" "}
                      {new Date(r.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  </div>
                </div>
              </BubbleCard>
            ))}
          </motion.div>
        )}

        {tab === "enquiries" && (
          <motion.div
            key="enquiries"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {recentEnquiries.length === 0 && (
              <p className="py-12 text-center text-sm text-black/40">
                No enquiries yet
              </p>
            )}
            {recentEnquiries.map((e) => (
              <BubbleCard key={e.id}>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8734a]/6 text-sm font-bold text-[#c9573a]">
                    {e.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{e.name}</p>
                    <p className="text-xs text-black/40">
                      {e.subject} &middot;{" "}
                      {new Date(e.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </BubbleCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Link
        href={`/admin/${tab}`}
        className="inline-flex h-10 items-center rounded-full bg-[#e8734a]/8 px-5 text-sm font-medium text-[#e8734a] transition-colors hover:bg-[#e8734a]/15"
      >
        View all {tab}
      </Link>
    </div>
  );
}
