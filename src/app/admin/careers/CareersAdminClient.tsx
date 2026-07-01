"use client";

import { useState } from "react";
import { HiOutlineChevronDown, HiOutlinePencil, HiOutlinePlus, HiOutlineSave, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface Career {
  id: string;
  title: string;
  description: string;
  location: string;
  workMode: string;
  employmentType: string;
  code: string;
  isActive: boolean;
}

type CareerDraft = Omit<Career, "id">;

const emptyDraft: CareerDraft = {
  title: "",
  description: "",
  location: "",
  workMode: "",
  employmentType: "",
  code: "",
  isActive: true,
};

const roleTemplates = [
  {
    title: "German Language Faculty",
    description: "Teach German language batches with exam-focused guidance, speaking practice, and learner progress tracking.",
  },
  {
    title: "French Language Faculty",
    description: "Lead French classes for beginner to advanced learners with structured DELF-oriented support.",
  },
  {
    title: "Soft Skills Trainer",
    description: "Train students and professionals in communication, interviews, presentation skills, and workplace readiness.",
  },
  {
    title: "Learner Experience Officer",
    description: "Guide students through counselling, onboarding, batch coordination, and course follow-ups.",
  },
  {
    title: "Education Counsellor",
    description: "Help prospective learners choose the right course, level, batch timing, and learning pathway.",
  },
  {
    title: "B2B Executive",
    description: "Build institutional and corporate relationships for language training and professional learning programs.",
  },
];

const workModeOptions = ["Online", "Offline", "Hybrid", "Remote"];
const employmentTypeOptions = ["Full-time", "Part-time"];

function SelectField({
  value,
  onChange,
  options,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  className: string;
}) {
  const hasCustomValue = value.length > 0 && !options.includes(value);

  return (
    <div className="group relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        aria-label={placeholder}
        className={`${className} ${value ? "text-black/75" : "text-black/40"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {hasCustomValue && <option value={value}>{value}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-black/45 shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition group-hover:text-[#c9573a]">
        <HiOutlineChevronDown className="size-4" />
      </span>
    </div>
  );
}

function mapCareer(row: {
  id: string;
  title: string;
  description: string;
  location: string;
  work_mode: string;
  employment_type: string;
  code: string;
  is_active: boolean;
}): Career {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    workMode: row.work_mode,
    employmentType: row.employment_type,
    code: row.code,
    isActive: row.is_active,
  };
}

export function CareersAdminClient({ careers: initialCareers }: { careers: Career[] }) {
  const [careers, setCareers] = useState(initialCareers);
  const [draft, setDraft] = useState<CareerDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState<CareerDraft>(emptyDraft);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const json = await res.json();
      if (res.ok && json.career) {
        setCareers((prev) => [mapCareer(json.career), ...prev]);
        setDraft(emptyDraft);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateCareer(id: string, values: Partial<CareerDraft>) {
    const res = await fetch(`/api/careers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    if (res.ok && json.career) {
      setCareers((prev) => prev.map((job) => (job.id === id ? mapCareer(json.career) : job)));
    }
  }

  async function saveEdit(id: string) {
    setLoading(true);
    try {
      await updateCareer(id, editingDraft);
      setEditingId(null);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCareer(id: string) {
    const res = await fetch(`/api/careers/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCareers((prev) => prev.filter((job) => job.id !== id));
      setDeleteTarget(null);
    }
  }

  const inputClass = "h-11 rounded-xl border border-black/8 bg-[#faf5f0] px-4 text-sm outline-none focus:border-[#e8734a]/40 focus:ring-2 focus:ring-[#e8734a]/10";
  const selectClass = "h-11 w-full cursor-pointer appearance-none rounded-xl border border-[#eadfd6] bg-[#fffaf6] px-4 pr-11 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_6px_18px_rgba(0,0,0,0.025)] outline-none transition hover:border-[#e8734a]/30 hover:bg-white focus:border-[#e8734a]/50 focus:ring-4 focus:ring-[#e8734a]/10";
  const textAreaClass = "w-full rounded-xl border border-black/8 bg-[#faf5f0] px-4 py-3 text-sm outline-none focus:border-[#e8734a]/40 focus:ring-2 focus:ring-[#e8734a]/10";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-medium tracking-tight">Career Listings</h1>
          <p className="mt-1 text-sm text-black/50">Create, edit, publish, and remove openings shown on the public Careers page.</p>
        </div>
        <span className="rounded-full bg-[#faf5f0] px-4 py-2 text-sm font-medium text-black/50">
          {careers.length} listings
        </span>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-black/6 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HiOutlinePlus className="size-5 text-[#c9573a]" />
            <p className="font-heading text-lg font-medium">Add new role</p>
          </div>
          <p className="text-xs text-black/40">Type or choose from suggestions for the role title, then adjust the description if needed.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required placeholder="e.g. German Language Faculty" list="role-suggestions" className={inputClass} />
          <datalist id="role-suggestions">
            {roleTemplates.map((role) => <option key={role.title} value={role.title} />)}
          </datalist>
          <input value={draft.code} onChange={(e) => setDraft({ ...draft, code: e.target.value })} required placeholder="ID, e.g. LAN018" className={inputClass} />
          <input value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} required placeholder="e.g. Chennai, Remote" className={inputClass} />
          <SelectField value={draft.workMode} onChange={(value) => setDraft({ ...draft, workMode: value })} options={workModeOptions} placeholder="Choose mode" className={selectClass} />
          <SelectField value={draft.employmentType} onChange={(value) => setDraft({ ...draft, employmentType: value })} options={employmentTypeOptions} placeholder="Choose job type" className={selectClass} />
        </div>
        <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} required rows={3} placeholder="Short role description" className={`${textAreaClass} mt-4`} />
        <button disabled={loading} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground text-sm font-semibold text-background disabled:opacity-60 lg:w-[31.5%]">
          <HiOutlinePlus className="size-4" />
          {loading ? "Adding..." : "Add Career"}
        </button>
      </form>

      <div className="rounded-2xl border border-black/6 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.035)]">
        <div className="border-b border-black/6 px-5 py-4">
          <p className="font-heading text-lg font-medium">Existing roles</p>
        </div>
        <div className="divide-y divide-black/6">
          {careers.length === 0 && (
            <p className="px-5 py-12 text-center text-sm text-black/40">No career listings yet.</p>
          )}
          {careers.map((job) => {
            const isEditing = editingId === job.id;
            return (
              <article key={job.id} className="p-5">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 lg:grid-cols-3">
                      <input value={editingDraft.title} onChange={(e) => {
                        const template = roleTemplates.find((role) => role.title === e.target.value);
                        setEditingDraft({
                          ...editingDraft,
                          title: e.target.value,
                          description: template?.description ?? editingDraft.description,
                        });
                      }} className={inputClass} list="role-suggestions" />
                      <input value={editingDraft.code} onChange={(e) => setEditingDraft({ ...editingDraft, code: e.target.value })} className={inputClass} />
                      <input value={editingDraft.location} onChange={(e) => setEditingDraft({ ...editingDraft, location: e.target.value })} className={inputClass} />
                      <SelectField value={editingDraft.workMode} onChange={(value) => setEditingDraft({ ...editingDraft, workMode: value })} options={workModeOptions} placeholder="Choose mode" className={selectClass} />
                      <SelectField value={editingDraft.employmentType} onChange={(value) => setEditingDraft({ ...editingDraft, employmentType: value })} options={employmentTypeOptions} placeholder="Choose job type" className={selectClass} />
                    </div>
                    <textarea value={editingDraft.description} onChange={(e) => setEditingDraft({ ...editingDraft, description: e.target.value })} rows={3} className={textAreaClass} />
                    <div className="flex flex-wrap gap-3">
                      <button onClick={() => saveEdit(job.id)} disabled={loading} className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background disabled:opacity-60">
                        <HiOutlineSave className="size-4" />
                        Save
                      </button>
                      <button onClick={() => setEditingId(null)} className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-semibold">
                        <HiOutlineX className="size-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-heading text-xl font-medium">{job.title}</h2>
                        <span className="rounded-full bg-[#faf5f0] px-3 py-1 text-xs font-semibold text-black/45">ID:{job.code}</span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${job.isActive ? "bg-emerald-50 text-emerald-700" : "bg-black/5 text-black/45"}`}>
                          {job.isActive ? "Published" : "Hidden"}
                        </span>
                      </div>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-black/55">{job.description}</p>
                      <p className="mt-4 text-sm text-black/45">{job.workMode} · {job.employmentType} · {job.location}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      <button onClick={() => updateCareer(job.id, { isActive: !job.isActive })} className="h-10 rounded-full border border-black/10 px-4 text-sm font-semibold">
                        {job.isActive ? "Hide" : "Publish"}
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(job.id);
                          setEditingDraft({
                            title: job.title,
                            description: job.description,
                            location: job.location,
                            workMode: job.workMode,
                            employmentType: job.employmentType,
                            code: job.code,
                            isActive: job.isActive,
                          });
                        }}
                        className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-semibold"
                      >
                        <HiOutlinePencil className="size-4" />
                        Edit
                      </button>
                      <button onClick={() => setDeleteTarget(job.id)} className="inline-flex h-10 items-center gap-2 rounded-full bg-red-50 px-4 text-sm font-semibold text-red-600">
                        <HiOutlineTrash className="size-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete career"
        message="Are you sure you want to delete this career listing? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => deleteTarget && deleteCareer(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
