import { NextResponse } from "next/server";
import { getCertificateLayout } from "@/lib/certificateLayoutStore";
import { renderSampleCertificatePdf } from "@/lib/certificateRenderer";
import { loadCertificateTemplatePdf } from "@/lib/certificateTemplate.server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const layout = await getCertificateLayout();
    const pdfBuf = await renderSampleCertificatePdf(await loadCertificateTemplatePdf(), layout);
    return new NextResponse(new Uint8Array(pdfBuf), {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "no-store",
        "Content-Disposition": 'inline; filename="certificate-sample.pdf"',
      },
    });
  } catch {
    return new NextResponse("Template not found", { status: 500 });
  }
}
