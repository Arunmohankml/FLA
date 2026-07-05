"use client";

import { gsap } from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

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
      prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTrigger);

    const tickLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickLenis);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
    };
  }, []);

  return children;
}
