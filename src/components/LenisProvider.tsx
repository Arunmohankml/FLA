"use client";

import { useEffect, type ReactNode } from "react";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const setup = async () => {
      const [{ gsap }, { default: Lenis }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("lenis"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        anchors: true,
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.08,
        touchInertiaExponent: 1.45,
        touchMultiplier: 1,
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

      cleanup = () => {
        gsap.ticker.remove(tickLenis);
        lenis.off("scroll", updateScrollTrigger);
        lenis.destroy();
      };
    };

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(() => void setup(), { timeout: 1600 })
      : window.setTimeout(() => void setup(), 1200);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      cleanup?.();
    };
  }, []);

  return children;
}
