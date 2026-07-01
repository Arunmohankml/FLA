"use client";

import { useEffect, useRef } from "react";

const LETTERS = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "Ä","Ö","Ü","ß","Ñ","É","Á","Í","Ó","Ú",
  "Ж","Ш","Щ","Ъ","Ы","Э","Ю","Я","Д","Л","Ф","Ц","Ч","П","И","К",
  "Ω","Σ","Δ","Φ","Ψ","Λ","Ξ","Θ","Π",
  "அ","ஆ","இ","க","ங","ச","ஞ","ட","ண","த","ந","ப","ம","ய","ர","ல","வ","ழ","ள","ற","ன",
  "അ","ആ","ഇ","ക","ഖ","ഗ","ങ","ച","ജ","ഞ","ട","ണ","ത","ദ","ന","പ","മ","യ","ര","ല","വ","ശ","ഷ","സ","ഹ","ള","ഴ","റ",
  "अ","आ","क","ख","ग","घ","च","ज","ट","ड","त","द","न","प","ब","म","य","र","ल","व","श","स","ह",
  "ا","ب","ت","ث","ج","ح","خ","د","ر","س","ش","ص","ض","ط","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي",
  "א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת",
  "あ","い","う","え","お","か","き","く","さ","し","愛","光","風","空","月","星","海","花","語","文","字","世","界",
  "한","글","사","랑","빛","바","람","하","늘",
  "ก","ข","ค","ง","จ","ฉ","ช","ซ","ญ","ด","ต","ท","น","บ","ป","ผ",
];

export default function LetterGlobe() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const globe = document.createElement("div");
    globe.className = "globe";
    stage.appendChild(globe);
    const N = 120;
    const radius = 260;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodes: { el: HTMLSpanElement; x: number; y: number; z: number }[] = [];

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const span = document.createElement("span");
      span.className = "letter";
      span.textContent = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      span.style.color = "#000";
      const size = 22 + Math.random() * 16;
      span.style.fontSize = `${size}px`;
      globe.appendChild(span);
      nodes.push({ el: span, x: x * radius, y: y * radius, z: z * radius });
    }

    let rotY = 0;
    const rotX = -0.1;
    let raf = 0;
    let ticking = true;

    const handleScroll = () => {
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const wh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));
      rotY = progress * Math.PI * 4;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const ob = new IntersectionObserver(
      ([entry]) => {
        ticking = entry.isIntersecting;
        if (ticking && !raf) tick();
      },
      { rootMargin: "200px" }
    );
    ob.observe(stage);

    const tick = () => {
      if (!ticking) { raf = 0; return; }
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x1 = n.x * cosY + n.z * sinY;
        const z1 = -n.x * sinY + n.z * cosY;
        const z2 = n.y * sinX + z1 * cosX;
        const y2 = n.y * cosX - z1 * sinX;
        const depth = (z2 + radius) / (radius * 2);
        const scale = 0.55 + depth * 0.75;
        n.el.style.transform = `translate3d(${x1}px, ${y2}px, ${z2}px) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ob.disconnect();
      window.removeEventListener("scroll", handleScroll);
      stage.removeChild(globe);
    };
  }, []);

  return (
    <div ref={stageRef} className="globe-stage relative h-full w-full" />
  );
}