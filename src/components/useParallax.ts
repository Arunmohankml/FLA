"use client";

import { useTransform, type MotionValue } from "framer-motion";

export function useParallax(
  scrollYProgress: MotionValue<number>,
  distance: number
): MotionValue<number> {
  return useTransform(scrollYProgress, [0, 1], [0, distance]);
}