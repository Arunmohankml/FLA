import { readFile } from "fs/promises";
import path from "path";
import { CERTIFICATE_TEMPLATE_PATH } from "@/lib/certificateTemplate";

export async function loadCertificateTemplatePdf() {
  const templatePath = path.join(process.cwd(), "public", CERTIFICATE_TEMPLATE_PATH);
  return readFile(templatePath);
}
