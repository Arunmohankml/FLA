"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "left" | "right" | "bottom";

export function Reveal({ children, direction = "bottom", delay = 0, className }: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const fromX = direction === "left" ? -120 : direction === "right" ? 120 : 0;
  const fromY = direction === "bottom" ? 120 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX, y: fromY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
