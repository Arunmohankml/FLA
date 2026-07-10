import { certificateLayout, type CertificateLayout } from "@/lib/certificateLayout";
import { supabaseAdmin } from "@/lib/supabase";

const CERTIFICATE_LAYOUT_KEY = "certificate-layout";

function formatStorageError(message?: string) {
  if (!message) return null;

  if (
    message.includes("site_settings") ||
    message.toLowerCase().includes("could not find the table")
  ) {
    return "Certificate layout storage is not set up. Run the site_settings SQL from src/app/api/certificates/SETUP.sql in Supabase.";
  }

  return message;
}

export function validateCertificateLayout(layout: CertificateLayout) {
  const keys = Object.keys(certificateLayout) as Array<keyof CertificateLayout>;

  for (const key of keys) {
    if (!layout[key]) {
      return `Missing field: ${key}`;
    }
  }

  return null;
}

export async function getCertificateLayout() {
  const { data, error } = await supabaseAdmin
    .from("site_settings")
    .select("value")
    .eq("key", CERTIFICATE_LAYOUT_KEY)
    .maybeSingle();

  if (error || !data?.value) {
    return certificateLayout;
  }

  try {
    const parsed = JSON.parse(data.value) as CertificateLayout;
    if (validateCertificateLayout(parsed)) return certificateLayout;
    parsed.certificateNumber.color = "#000000";
    return parsed;
  } catch {
    return certificateLayout;
  }
}

export async function saveCertificateLayout(layout: CertificateLayout) {
  const validationError = validateCertificateLayout(layout);
  if (validationError) {
    return { error: validationError };
  }

  const { error } = await supabaseAdmin
    .from("site_settings")
    .upsert(
      { key: CERTIFICATE_LAYOUT_KEY, value: JSON.stringify(layout) },
      { onConflict: "key" },
    );

  return { error: formatStorageError(error?.message) };
}
