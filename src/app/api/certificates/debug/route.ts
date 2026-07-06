import { NextRequest, NextResponse } from "next/server";
import { renderSampleCertificatePdf } from "@/lib/certificateRenderer";

export const dynamic = "force-dynamic";
const CERTIFICATE_TEMPLATE_PATH = "/ourcert/fla-certificate.pdf";

export async function GET(req: NextRequest) {
  const templateRes = await fetch(`${req.nextUrl.origin}${CERTIFICATE_TEMPLATE_PATH}`);
  if (!templateRes.ok) {
    return new NextResponse("Template not found", { status: 500 });
  }

  const pdfBuf = await renderSampleCertificatePdf(await templateRes.arrayBuffer());
  return new NextResponse(new Uint8Array(pdfBuf), {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store",
      "Content-Disposition": 'inline; filename="certificate-sample.pdf"',
    },
  });
}
