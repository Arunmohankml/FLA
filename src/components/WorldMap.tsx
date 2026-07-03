"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteMedia } from "@/components/SiteMediaProvider";

interface Marker {
  id: string;
  code: string;
  name: string;
  flag: string;
  levels: string;
  x: number;
  y: number;
}

const markers: Marker[] = [
  { id: "en", code: "EN", name: "English", flag: "🇬🇧", levels: "A1–C2", x: 47.5, y: 30 },
  { id: "de", code: "DE", name: "German", flag: "🇩🇪", levels: "A1–C2", x: 51, y: 31 },
  { id: "fr", code: "FR", name: "French", flag: "🇫🇷", levels: "A1–C2", x: 49, y: 33 },
  { id: "es", code: "ES", name: "Spanish", flag: "🇪🇸", levels: "A1–C2", x: 47, y: 35.5 },
  { id: "it", code: "IT", name: "Italian", flag: "🇮🇹", levels: "A1–C2", x: 52, y: 34.5 },
  { id: "ru", code: "RU", name: "Russian", flag: "🇷🇺", levels: "A1–C2", x: 62, y: 23 },
  { id: "ja", code: "JA", name: "Japanese", flag: "🇯🇵", levels: "N5–N1", x: 85, y: 34 },
  { id: "ko", code: "KO", name: "Korean", flag: "🇰🇷", levels: "TOPIK 1–6", x: 82.5, y: 35.5 },
  { id: "zh", code: "ZH", name: "Chinese", flag: "🇨🇳", levels: "HSK 1–6", x: 77, y: 36.5 },
  { id: "hi", code: "HI", name: "Hindi", flag: "🇮🇳", levels: "A1–C2", x: 70, y: 38 },
  { id: "ar", code: "AR", name: "Arabic", flag: "🇸🇦", levels: "A1–C2", x: 58, y: 39 },
  { id: "pt", code: "PT", name: "Portuguese", flag: "🇧🇷", levels: "A1–C2", x: 30, y: 52 },
  { id: "es2", code: "ES", name: "Spanish", flag: "🇲🇽", levels: "A1–C2", x: 18, y: 38 },
  { id: "af", code: "AF", name: "Afrikaans", flag: "🇿🇦", levels: "A1–C2", x: 52, y: 62 },
  { id: "sw", code: "SW", name: "Swahili", flag: "🇰🇪", levels: "A1–C2", x: 56, y: 52 },
];

export function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const mapImg = useSiteMedia("map", "/image35.png");

  return (
    <div className="relative w-full">
      <img
        src={mapImg}
        alt=""
        className="h-auto w-full rounded-2xl"
      />

      <div className="absolute inset-0">
        {markers.map((m, i) => {
          const isHovered = hovered === m.id;

          return (
            <div
              key={m.id}
              className="absolute"
              style={{ left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Breathing glow ring */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10"
                animate={{
                  width: isHovered ? 32 : [20, 28, 20],
                  height: isHovered ? 32 : [20, 28, 20],
                  opacity: isHovered ? 0.4 : [0.08, 0.18, 0.08],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />

              {/* Soft pulse ring */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20"
                animate={{
                  width: isHovered ? [12, 30] : [10, 22],
                  height: isHovered ? [12, 30] : [10, 22],
                  opacity: isHovered ? [0.3, 0] : [0.12, 0],
                }}
                transition={{
                  duration: isHovered ? 1.5 : 3.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.2,
                }}
              />

              {/* Main dot */}
              <motion.div
                className="relative z-10 rounded-full bg-blue-400/70 shadow-[0_0_6px_rgba(251,191,36,0.3)]"
                animate={{
                  width: isHovered ? 8 : [5, 6.5, 5],
                  height: isHovered ? 8 : [5, 6.5, 5],
                  opacity: isHovered ? 1 : [0.5, 0.75, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />

              {/* Code label */}
              <motion.span
                className="absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-white/60 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-foreground/50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] backdrop-blur-sm"
                animate={{ opacity: isHovered ? 1 : 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {m.code}
              </motion.span>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-20 rounded-xl border border-[#ececec] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            style={{
              left: `${markers.find((m) => m.id === hovered)?.x}%`,
              top: `${(markers.find((m) => m.id === hovered)?.y || 0) - 8}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <p className="text-sm font-bold text-foreground">
              {markers.find((m) => m.id === hovered)?.flag}{" "}
              {markers.find((m) => m.id === hovered)?.name}
            </p>
            <p className="mt-0.5 text-xs text-[#334155]">
              {markers.find((m) => m.id === hovered)?.levels}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
