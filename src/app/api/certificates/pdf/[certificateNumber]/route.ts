import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ certificateNumber: string }> }
) {
  const { certificateNumber } = await params;
  const download = req.nextUrl.searchParams.get("download") === "1";
  const { data, error } = await supabaseAdmin
    .from("certificates")
    .select("image_url")
    .eq("certificate_number", certificateNumber)
    .single();

  if (error || !data?.image_url) {
    return new Response("Certificate PDF not found", { status: 404 });
  }

  const pdfRes = await fetch(data.image_url, { cache: "no-store" });
  if (!pdfRes.ok) {
    return new Response("Certificate PDF could not be loaded", { status: 502 });
  }

  const filename = `${certificateNumber}.pdf`;
  return new Response(await pdfRes.arrayBuffer(), {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
      "Content-Type": "application/pdf",
    },
  });
}
