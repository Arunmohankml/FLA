import { NextRequest, NextResponse } from "next/server";
import type { CertificateLayout } from "@/lib/certificateLayout";
import {
  getCertificateLayout,
  saveCertificateLayout,
  validateCertificateLayout,
} from "@/lib/certificateLayoutStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const layout = await getCertificateLayout();
  return NextResponse.json(layout, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function PUT(req: NextRequest) {
  try {
    const layout = (await req.json()) as CertificateLayout;
    const validationError = validateCertificateLayout(layout);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const result = await saveCertificateLayout(layout);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, layout });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
