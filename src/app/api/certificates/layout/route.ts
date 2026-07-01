import { NextRequest, NextResponse } from "next/server";
import { certificateLayout, CertificateLayout } from "@/lib/certificateLayout";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(certificateLayout);
}

export async function PUT(req: NextRequest) {
  try {
    const layout = (await req.json()) as CertificateLayout;
    const keys = Object.keys(certificateLayout);

    for (const key of keys) {
      if (!layout[key as keyof CertificateLayout]) {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
      }
    }

    const fileContent = `/**
 * Certificate layout.
 *
 * Coordinates are absolute pixels on public/certificate.png.
 * The template is the final artwork; only these values are drawn onto it.
 */

export type TextAlign = "left" | "center" | "right";
export type TextBaseline = "top" | "middle" | "alphabetic";
export type FontFamily = "sans" | "serif";

export interface LayoutField {
  x: number;
  y: number;
  fontSize: number;
  align?: TextAlign;
  baseline?: TextBaseline;
  color?: string;
  family?: FontFamily;
  weight?: string;
  style?: string;
  maxWidth?: number;
}

export interface LayoutQR {
  x: number;
  y: number;
  size: number;
}

export interface CertificateLayout {
  studentName: LayoutField;
  level: LayoutField;
  language: LayoutField;
  leftGrade: LayoutField;
  monthYear: LayoutField;
  firstName: LayoutField;
  surname: LayoutField;
  dob: LayoutField;
  birthPlace: LayoutField;
  examDate: LayoutField;
  examPlace: LayoutField;
  reading: LayoutField;
  listening: LayoutField;
  writing: LayoutField;
  oral: LayoutField;
  total: LayoutField;
  resultGrade: LayoutField;
  issuePlace: LayoutField;
  issueDate: LayoutField;
  certificateNumber: LayoutField;
  qr: LayoutQR;
}

export const certificateLayout: CertificateLayout = ${JSON.stringify(layout, null, 2)};
`;

    const filePath = path.join(process.cwd(), "src", "lib", "certificateLayout.ts");
    fs.writeFileSync(filePath, fileContent, "utf-8");

    return NextResponse.json({ ok: true, layout });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
