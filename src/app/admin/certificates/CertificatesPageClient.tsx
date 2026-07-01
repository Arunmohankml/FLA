"use client";

import { useState } from "react";
import { CertificatesClient } from "./CertificatesClient";
import { CalibrationClient } from "./CalibrationClient";

interface Certificate {
  id: string;
  certificateNumber: string;
  studentName: string;
  courseLevel: string;
  courseName: string;
  grade: string;
  totalScore: string;
  imageUrl: string;
  formData?: Record<string, string> | null;
  createdAt: string;
}

export function CertificatesPageClient({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const [tab, setTab] = useState<"generate" | "calibrate">("generate");

  return (
    <div>
      {/* Tab Toggle */}
      <div className="mb-6 flex gap-1 rounded-xl border border-black/5 bg-[#faf5f0] p-1">
        <button
          onClick={() => setTab("generate")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            tab === "generate"
              ? "bg-white text-foreground shadow-sm"
              : "text-black/50 hover:text-black/70"
          }`}
        >
          Generate Certificates
        </button>
        <button
          onClick={() => setTab("calibrate")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            tab === "calibrate"
              ? "bg-white text-foreground shadow-sm"
              : "text-black/50 hover:text-black/70"
          }`}
        >
          Calibration Mode
        </button>
      </div>

      {tab === "generate" ? (
        <CertificatesClient certificates={certificates} />
      ) : (
        <CalibrationClient />
      )}
    </div>
  );
}
