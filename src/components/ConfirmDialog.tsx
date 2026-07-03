"use client";

import { useEffect, useRef } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => confirmRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />
          <motion.div
            className="relative w-full max-w-sm rounded-2xl border border-black/6 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="alertdialog"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-message"
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                  variant === "danger"
                    ? "bg-red-50 text-red-600"
                    : "bg-[#F5FAFF] text-black/70"
                }`}
              >
                <HiOutlineExclamationTriangle className="size-5" />
              </span>
              <h2
                id="confirm-title"
                className="text-lg font-semibold tracking-tight text-black/80"
              >
                {title}
              </h2>
            </div>
            <p
              id="confirm-message"
              className="mb-6 text-[15px] leading-7 text-black/75"
            >
              {message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl border border-black/8 bg-[#F5FAFF] px-4 py-2.5 text-sm font-semibold text-black/60 transition-all hover:bg-white hover:text-black/80"
              >
                {cancelLabel}
              </button>
              <button
                ref={confirmRef}
                onClick={onConfirm}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all ${
                  variant === "danger"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-foreground hover:opacity-90"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
