"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ApproachSection = dynamic(
  () => import("@/components/AboutSections").then((mod) => mod.ApproachSection),
  { ssr: false },
);

const TrainersSection = dynamic(
  () => import("@/components/AboutSections").then((mod) => mod.TrainersSection),
  { ssr: false },
);

function DeferredMount({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return <div ref={ref}>{shouldLoad ? children : null}</div>;
}

export function ApproachSectionDeferred() {
  return (
    <DeferredMount>
      <ApproachSection />
    </DeferredMount>
  );
}

export function TrainersSectionDeferred() {
  return (
    <DeferredMount>
      <TrainersSection />
    </DeferredMount>
  );
}
