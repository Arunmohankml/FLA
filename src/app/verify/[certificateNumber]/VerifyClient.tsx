"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineCheckCircle, HiOutlineArrowLeft } from "react-icons/hi";

interface VerifyProps {
  certificateNumber: string;
  studentName: string;
  courseLevel: string;
  courseName: string;
  grade: string;
  totalScore: string;
  imageUrl: string;
  createdAt: string;
}

export function VerifyClient({
  certificateNumber,
  studentName,
  courseLevel,
  courseName,
  grade,
  totalScore,
  imageUrl,
  createdAt,
}: VerifyProps) {
  return (
    <div className="min-h-screen bg-[#faf5f0]">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Verified badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-emerald-50"
          >
            <HiOutlineCheckCircle className="size-10 text-emerald-500" />
          </motion.div>

          <h1 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-foreground">
            Certificate Verified
          </h1>
          <p className="mt-2 text-sm text-black/50">
            This certificate is authentic and issued by Foreign Language Academy
          </p>

          {/* Certificate details */}
          <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 text-left shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">Student Name</p>
                <p className="mt-0.5 font-heading text-sm font-medium text-foreground">{studentName}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">Certificate Number</p>
                <p className="mt-0.5 font-heading text-sm font-medium text-foreground">{certificateNumber}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">Course Level</p>
                <p className="mt-0.5 font-heading text-sm font-medium text-foreground">{courseLevel}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">Course Name</p>
                <p className="mt-0.5 font-heading text-sm font-medium text-foreground">{courseName}</p>
              </div>
              {grade && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">Grade</p>
                  <p className="mt-0.5 font-heading text-sm font-medium text-foreground">{grade}</p>
                </div>
              )}
              {totalScore && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">Total Score</p>
                  <p className="mt-0.5 font-heading text-sm font-medium text-foreground">{totalScore}</p>
                </div>
              )}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40">Issue Date</p>
                <p className="mt-0.5 font-heading text-sm font-medium text-foreground">
                  {new Date(createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
          </div>

          {/* Certificate preview */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={`Certificate ${certificateNumber}`}
              className="w-full"
            />
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-black/50 transition-colors hover:text-black/80"
          >
            <HiOutlineArrowLeft className="size-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
