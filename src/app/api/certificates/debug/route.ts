import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";
import { drawCertificate } from "@/lib/certificateRenderer";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const templateRes = await fetch(`${req.nextUrl.origin}/certificate.png`);
  if (!templateRes.ok) {
    return new NextResponse("Template not found", { status: 500 });
  }

  const templateBuf = Buffer.from(await templateRes.arrayBuffer());
  const template = await loadImage(templateBuf);
  const canvas = createCanvas(template.width, template.height);
  const ctx = canvas.getContext("2d");

  await drawCertificate({
    ctx,
    template,
    values: {},
    verifyUrl: `${req.nextUrl.origin}/verify/CALIBRATION`,
    mode: "calibration",
  });

  const pngBuf = canvas.toBuffer("image/png");
  return new NextResponse(new Uint8Array(pngBuf), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}
