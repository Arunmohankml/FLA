import { promises as fs } from "fs";
import path from "path";
import { fallbackCareers } from "@/lib/careers";
import { supabaseAdmin } from "@/lib/supabase";

export interface CareerRow {
  id: string;
  title: string;
  description: string;
  location: string;
  work_mode: string;
  employment_type: string;
  code: string;
  accent?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface CareerInput {
  title: string;
  description: string;
  location: string;
  workMode: string;
  employmentType: string;
  code: string;
  isActive?: boolean;
}

const storePath = path.join(process.cwd(), ".data", "careers.json");

function generateId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }
}

function isMissingCareersTable(error: { message?: string } | null) {
  const message = error?.message?.toLowerCase() ?? "";
  return message.includes("could not find the table") || message.includes("schema cache") || message.includes("relation") && message.includes("careers");
}

function fallbackRows(): CareerRow[] {
  return fallbackCareers.map((career) => ({
    id: career.id,
    title: career.title,
    description: career.description,
    location: career.location,
    work_mode: career.workMode,
    employment_type: career.employmentType,
    code: career.code,
    accent: career.accent ?? null,
    is_active: true,
    created_at: career.createdAt ?? new Date(0).toISOString(),
  }));
}

async function readLocalCareers() {
  try {
    const json = await fs.readFile(storePath, "utf8");
    return JSON.parse(json) as CareerRow[];
  } catch {
    return fallbackRows();
  }
}

async function writeLocalCareers(careers: CareerRow[]) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(careers, null, 2), "utf8");
}

function toRow(input: CareerInput): CareerRow {
  const now = new Date().toISOString();

  return {
    id: generateId(),
    title: input.title,
    description: input.description,
    location: input.location,
    work_mode: input.workMode,
    employment_type: input.employmentType,
    code: input.code,
    accent: null,
    is_active: input.isActive ?? true,
    created_at: now,
  };
}

export async function listCareerRows({ activeOnly = false }: { activeOnly?: boolean } = {}) {
  const query = supabaseAdmin
    .from("careers")
    .select("*")
    .order("created_at", { ascending: false });

  const { data, error } = activeOnly ? await query.eq("is_active", true) : await query;
  if (!error) return (data ?? []) as CareerRow[];
  if (!isMissingCareersTable(error)) throw new Error(error.message);

  const localRows = await readLocalCareers();
  const rows = activeOnly ? localRows.filter((career) => career.is_active) : localRows;
  return rows.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function createCareerRow(input: CareerInput) {
  const record = {
    id: generateId(),
    title: input.title,
    description: input.description,
    location: input.location,
    work_mode: input.workMode,
    employment_type: input.employmentType,
    code: input.code,
    is_active: input.isActive ?? true,
  };

  const { data, error } = await supabaseAdmin.from("careers").insert(record).select().single();
  if (!error) return data as CareerRow;
  if (!isMissingCareersTable(error)) throw new Error(error.message);

  const rows = await readLocalCareers();
  const career = toRow(input);
  await writeLocalCareers([career, ...rows.filter((row) => row.id !== career.id)]);
  return career;
}

export async function updateCareerRow(id: string, input: Partial<CareerInput>) {
  const record = {
    ...(input.title !== undefined ? { title: input.title } : {}),
    ...(input.description !== undefined ? { description: input.description } : {}),
    ...(input.location !== undefined ? { location: input.location } : {}),
    ...(input.workMode !== undefined ? { work_mode: input.workMode } : {}),
    ...(input.employmentType !== undefined ? { employment_type: input.employmentType } : {}),
    ...(input.code !== undefined ? { code: input.code } : {}),
    ...(input.isActive !== undefined ? { is_active: input.isActive } : {}),
  };

  const { data, error } = await supabaseAdmin.from("careers").update(record).eq("id", id).select().single();
  if (!error) return data as CareerRow;
  if (!isMissingCareersTable(error)) throw new Error(error.message);

  const rows = await readLocalCareers();
  const updatedRows = rows.map((career) => (
    career.id === id
      ? {
          ...career,
          ...(input.title !== undefined ? { title: input.title } : {}),
          ...(input.description !== undefined ? { description: input.description } : {}),
          ...(input.location !== undefined ? { location: input.location } : {}),
          ...(input.workMode !== undefined ? { work_mode: input.workMode } : {}),
          ...(input.employmentType !== undefined ? { employment_type: input.employmentType } : {}),
          ...(input.code !== undefined ? { code: input.code } : {}),
          ...(input.isActive !== undefined ? { is_active: input.isActive } : {}),
        }
      : career
  ));
  await writeLocalCareers(updatedRows);
  return updatedRows.find((career) => career.id === id) ?? null;
}

export async function deleteCareerRow(id: string) {
  const { error } = await supabaseAdmin.from("careers").delete().eq("id", id);
  if (!error) return;
  if (!isMissingCareersTable(error)) throw new Error(error.message);

  const rows = await readLocalCareers();
  await writeLocalCareers(rows.filter((career) => career.id !== id));
}
