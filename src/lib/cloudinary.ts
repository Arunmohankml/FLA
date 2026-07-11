import { createHash } from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

const DEFAULT_UPLOAD_FOLDER = "certificates";
const SUPABASE_CERTIFICATE_BUCKET = "certificates";

type UploadResult = {
  secure_url?: string;
  url?: string;
  public_id?: string;
  error?: { message?: string };
};

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const hasAnyCloudinaryValue = Boolean(cloudName || apiKey || apiSecret);

  if (!cloudName || !apiKey || !apiSecret) {
    if (hasAnyCloudinaryValue) {
      throw new Error(
        "Cloudinary is partially configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET, or remove all three to use Supabase certificate storage."
      );
    }

    return null;
  }

  if (cloudName === "certificates" || cloudName.startsWith("REPLACE_WITH_")) {
    throw new Error(
      "CLOUDINARY_CLOUD_NAME must be your Cloudinary account cloud name, not the certificates key name or upload folder."
    );
  }

  return { cloudName, apiKey, apiSecret };
}

function signParams(params: Record<string, string>, apiSecret: string) {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

export function getCertificateCloudinaryPublicId(certificateNumber: string) {
  const folder = process.env.CLOUDINARY_CERTIFICATE_FOLDER || DEFAULT_UPLOAD_FOLDER;
  return `${folder.replace(/^\/|\/$/g, "")}/${certificateNumber}`;
}

function getCertificateStoragePath(certificateNumber: string) {
  return `${getCertificateCloudinaryPublicId(certificateNumber)}.pdf`;
}

async function ensureCertificateBucket() {
  const { error } = await supabaseAdmin.storage.createBucket(SUPABASE_CERTIFICATE_BUCKET, {
    public: true,
    allowedMimeTypes: ["application/pdf"],
    fileSizeLimit: "10MB",
  });

  if (error && !/already exists/i.test(error.message)) {
    throw error;
  }
}

async function uploadCertificatePdfToSupabase(certificateNumber: string, pdfBuffer: Buffer) {
  await ensureCertificateBucket();

  const path = getCertificateStoragePath(certificateNumber);
  const { error } = await supabaseAdmin.storage
    .from(SUPABASE_CERTIFICATE_BUCKET)
    .upload(path, pdfBuffer, {
      cacheControl: "3600",
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    throw new Error(`Supabase certificate upload failed: ${error.message}`);
  }

  const { data } = supabaseAdmin.storage.from(SUPABASE_CERTIFICATE_BUCKET).getPublicUrl(path);

  return {
    publicId: path,
    url: data.publicUrl,
  };
}

export async function uploadCertificatePdfToCloudinary(
  certificateNumber: string,
  pdfBuffer: Buffer
) {
  const config = getCloudinaryConfig();
  if (!config) {
    return uploadCertificatePdfToSupabase(certificateNumber, pdfBuffer);
  }

  const { cloudName, apiKey, apiSecret } = config;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const publicId = getCertificateCloudinaryPublicId(certificateNumber);
  const paramsToSign = {
    overwrite: "true",
    public_id: publicId,
    timestamp,
  };
  const pdfArrayBuffer = new ArrayBuffer(pdfBuffer.byteLength);
  new Uint8Array(pdfArrayBuffer).set(pdfBuffer);
  const form = new FormData();
  form.set("file", new Blob([pdfArrayBuffer], { type: "application/pdf" }), `${certificateNumber}.pdf`);
  form.set("api_key", apiKey);
  form.set("timestamp", timestamp);
  form.set("public_id", publicId);
  form.set("overwrite", "true");
  form.set("signature", signParams(paramsToSign, apiSecret));

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
    method: "POST",
    body: form,
  });
  const data = (await res.json()) as UploadResult;

  if (!res.ok || data.error) {
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  return {
    publicId: data.public_id || publicId,
    url: data.secure_url || data.url,
  };
}

export async function deleteCertificatePdfFromCloudinary(certificateNumber: string) {
  const config = getCloudinaryConfig();
  if (!config) {
    await supabaseAdmin.storage
      .from(SUPABASE_CERTIFICATE_BUCKET)
      .remove([getCertificateStoragePath(certificateNumber)]);
    return;
  }

  const { cloudName, apiKey, apiSecret } = config;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const publicId = getCertificateCloudinaryPublicId(certificateNumber);
  const paramsToSign = {
    invalidate: "true",
    public_id: publicId,
    timestamp,
  };
  const form = new FormData();
  form.set("api_key", apiKey);
  form.set("timestamp", timestamp);
  form.set("public_id", publicId);
  form.set("invalidate", "true");
  form.set("signature", signParams(paramsToSign, apiSecret));

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/destroy`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const data = (await res.json()) as UploadResult;
    throw new Error(data.error?.message || "Cloudinary delete failed");
  }
}
