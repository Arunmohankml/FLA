"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { OwnerGuard } from "@/components/OwnerGuard";
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineShieldCheck,
  HiOutlineUser,
  HiOutlineExclamationCircle,
} from "react-icons/hi";

interface Admin {
  id: string;
  email: string;
  role: string;
  addedBy: string;
  createdAt: string;
}

export function AdminsClient({ admins: initialAdmins }: { admins: Admin[] }) {
  const { user } = useAuth();
  const [admins, setAdmins] = useState(initialAdmins);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [removing, setRemoving] = useState<string | null>(null);

  const handleAdd = async () => {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Enter an email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email address");
      return;
    }

    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          addedBy: user?.email || "unknown",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add admin");
        return;
      }

      setAdmins((prev) => [data, ...prev]);
      setSuccess(`${email} added as admin`);
      setEmail("");
    } catch {
      setError("Something went wrong");
    }
  };

  const handleRemove = async (id: string, adminEmail: string) => {
    setRemoving(id);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admins", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to remove admin");
        setRemoving(null);
        return;
      }

      setAdmins((prev) => prev.filter((a) => a.id !== id));
      setSuccess(`${adminEmail} removed`);
      setRemoving(null);
    } catch {
      setError("Something went wrong");
      setRemoving(null);
    }
  };

  return (
    <OwnerGuard>
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          Manage Admins
        </h1>
        <p className="mt-1 text-sm text-black/50">
          Add or remove staff accounts
        </p>
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-6">
        <p className="mb-3 text-sm font-semibold">Add new admin</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="staff@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="h-10 flex-1 rounded-full border border-black/8 bg-[#faf5f0] px-4 text-sm transition-colors placeholder:text-black/30 focus:border-[#e8734a]/40 focus:outline-none focus:ring-2 focus:ring-[#e8734a]/10"
          />
          <button
            onClick={handleAdd}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#e8734a] px-5 text-sm font-medium text-white transition-colors hover:bg-[#d65a30]"
          >
            <HiOutlinePlus className="size-4" />
            Add
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 flex items-center gap-1.5 text-sm text-red-500"
            >
              <HiOutlineExclamationCircle className="size-4" />
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 flex items-center gap-1.5 text-sm text-emerald-600"
            >
              <HiOutlineCheck className="size-4" />
              {success}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">
          Current admins ({admins.length})
        </p>
        {admins.length === 0 && (
          <p className="py-8 text-center text-sm text-black/40">
            No admins found
          </p>
        )}
        {admins.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-4 py-3 transition-shadow hover:shadow-md sm:px-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8734a]/8">
                {a.role === "owner" ? (
                  <HiOutlineShieldCheck className="size-5 text-[#e8734a]" />
                ) : (
                  <HiOutlineUser className="size-5 text-black/30" />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{a.email}</p>
                <p className="text-xs text-black/40 capitalize">
                  {a.role}
                </p>
              </div>
            </div>
            {a.role !== "owner" && (
              <button
                onClick={() => handleRemove(a.id, a.email)}
                disabled={removing === a.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-500/8 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/15 disabled:opacity-50"
              >
                <HiOutlineTrash className="size-3.5" />
                {removing === a.id ? "Removing..." : "Remove"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
    </OwnerGuard>
  );
}
