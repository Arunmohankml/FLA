import { createHash } from "crypto";

const DEFAULT_UPLOAD_FOLDER = "certificates";

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

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
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

export async function uploadCertificatePdfToCloudinary(
  certificateNumber: string,
  pdfBuffer: Buffer
) {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
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
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
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
