"use client";

import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type ReactNode } from "react";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      anchors: true,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      autoRaf: true,
      prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTrigger);

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
    };
  }, []);

  return children;
}
