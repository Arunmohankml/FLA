import type { Metadata } from "next";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { CalibrationClient } from "../CalibrationClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certificate Calibration",
  robots: { index: false, follow: false },
};

export default function CertificateCalibrationPage() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
            Certificate Calibration
          </h1>
          <p className="mt-1 text-sm text-black/50">
            Move each printed value until it matches the certificate template.
          </p>
        </div>
        <Link
          href="/admin/certificates"
          className="inline-flex items-center gap-2 rounded-xl bg-black/5 px-4 py-2 text-sm font-semibold text-black/60 transition-colors hover:bg-black/10"
        >
          <HiOutlineArrowLeft className="size-4" />
          Back to Certificates
        </Link>
      </div>

      <CalibrationClient />
    </div>
  );
}
