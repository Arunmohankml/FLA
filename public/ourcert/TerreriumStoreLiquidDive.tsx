'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Playfair_Display, Inter } from 'next/font/google';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { MotionValue, Variants } from 'framer-motion';
import {
  ArrowRight,
  Box,
  ChevronDown,
  Droplets,
  Headset,
  Heart,
  Leaf,
  Menu,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  User,
  X,
  RotateCcw,
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const serif = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const scrollDepthRef: { current: number } = { current: 0 };
const MAX_DEPTH_M = 24.8;

const NAV_LINKS = [
  { label: 'Shop', href: '#categories', hasDropdown: true },
  { label: 'Live Plants', href: '#categories' },
  { label: 'Fishes', href: '#featured' },
  { label: 'Mosses', href: '#featured' },
  { label: 'Accessories', href: '#featured' },
];

const HERO_BADGES = [
  { icon: Droplets, label: 'Live arrival guarantee' },
  { icon: ShieldCheck, label: 'Healthy & handpicked' },
  { icon: Leaf, label: 'Sustainable & ethical' },
  { icon: PackageCheck, label: 'Secure packaging' },
];

const CATEGORIES = [
  {
    title: 'Terrariums',
    subtitle: 'Miniature landscapes enclosed in glass.',
    image: '/terrerium 1.png',
    stat: '38 designs',
  },
  {
    title: 'Aquariums',
    subtitle: 'Living underwater worlds for calm spaces.',
    image: '/terrerium 2.png',
    stat: '24 setups',
  },
  {
    title: 'Fishes',
    subtitle: 'Vibrant, healthy species chosen with care.',
    image: '/fighter fish 3.png',
    stat: '16 species',
  },
  {
    title: 'Mosses',
    subtitle: 'Soft natural textures for every ecosystem.',
    image: '/decor moss 3.png',
    stat: '12 varieties',
  },
  {
    title: 'Accessories',
    subtitle: 'Tools, lighting and details that finish it.',
    image: '/moss long.png',
    stat: '60+ essentials',
  },
];

const PRODUCTS = [
  {
    name: 'Glass Terrarium Bowl',
    subtitle: '20 cm · handcrafted glass',
    price: '$49.99',
    image: '/terrerium 2.png',
    label: 'Best seller',
  },
  {
    name: 'AquaScape Cube',
    subtitle: '25 cm · complete starter set',
    price: '$79.99',
    image: '/terrerium 3.png',
    label: 'Starter kit',
  },
  {
    name: 'Betta Splendens',
    subtitle: 'Galaxy · responsibly raised',
    price: '$24.99',
    image: '/fighter fish2.png',
    label: 'Live arrival',
  },
  {
    name: 'Christmas Moss',
    subtitle: 'Vesicularia · fresh portion',
    price: '$9.99',
    image: '/decor moss 2.png',
    label: 'Fresh stock',
  },
  {
    name: 'Aquascaping Kit',
    subtitle: 'Five-piece precision set',
    price: '$39.99',
    image: '/decor moss.png',
    label: 'Essential',
  },
];

const BENEFITS = [
  { icon: Truck, title: 'Fast & safe shipping', text: 'Protected delivery with live-arrival support.' },
  { icon: Headset, title: 'Real expert support', text: 'Practical guidance before and after purchase.' },
  { icon: ShieldCheck, title: 'Secure payments', text: 'Trusted checkout with protected transactions.' },
  { icon: RotateCcw, title: 'Simple returns', text: 'Clear, hassle-free returns within 14 days.' },
];

const FOOTER_COLUMNS = [
  { title: 'Shop', links: ['Terrariums', 'Aquariums', 'Fishes', 'Mosses', 'Accessories'] },
  { title: 'Company', links: ['About Us', 'Care Guides', 'Journal', 'Contact Us', 'FAQs'] },
  { title: 'Policies', links: ['Shipping', 'Returns', 'Privacy', 'Terms'] },
];

const FISH_POOL = ['/fighter fish.png', '/fighter fish2.png', '/fighter fish 3.png'];

function GlobalUnderwaterStyles() {
  return (
    <style jsx global>{`
      :root {
        --ink: #03131d;
        --deep: #041a25;
        --ocean: #063141;
        --teal: #0d5a63;
        --aqua: #4fe4d2;
        --mint: #b9f8e8;
        --foam: #ebfff8;
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
        background: var(--ink);
      }

      body {
        margin: 0;
        background: var(--ink);
        color: white;
      }

      ::selection {
        background: rgba(79, 228, 210, 0.28);
        color: white;
      }

      .fixed-ocean-background {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
        background: #03131d;
      }

      .ocean-layer {
        position: absolute;
        inset: 0;
      }

      .surface-layer {
        background:
          radial-gradient(85% 60% at 52% -4%, rgba(210, 255, 246, 0.42), transparent 62%),
          radial-gradient(65% 50% at 12% 12%, rgba(67, 222, 205, 0.22), transparent 70%),
          linear-gradient(180deg, #0d5c65 0%, #0a4552 42%, #072d3c 100%);
      }

      .shallow-layer {
        background:
          radial-gradient(55% 45% at 80% 18%, rgba(44, 199, 183, 0.2), transparent 72%),
          linear-gradient(180deg, #0a4854 0%, #073341 52%, #052634 100%);
      }

      .deep-layer {
        background:
          radial-gradient(50% 35% at 30% 10%, rgba(18, 105, 111, 0.16), transparent 75%),
          linear-gradient(180deg, #062c38 0%, #041f2c 46%, #02101a 100%);
      }

      .abyss-layer {
        background:
          radial-gradient(50% 30% at 75% 20%, rgba(20, 89, 92, 0.12), transparent 78%),
          linear-gradient(180deg, rgba(2, 18, 28, 0.15), #010a12 72%);
      }

      .ocean-vignette {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(90deg, rgba(0, 5, 12, 0.27), transparent 18%, transparent 82%, rgba(0, 5, 12, 0.29)),
          linear-gradient(180deg, transparent 52%, rgba(0, 4, 10, 0.38));
      }

      .ocean-noise {
        position: absolute;
        inset: -30%;
        opacity: 0.05;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
        animation: noiseShift 12s steps(2, end) infinite;
      }

      .ambient-caustics {
        position: absolute;
        inset: -20%;
        opacity: 0.12;
        filter: blur(18px);
        background:
          repeating-radial-gradient(ellipse at 30% 20%, transparent 0 34px, rgba(181, 255, 242, 0.13) 36px 38px, transparent 40px 76px),
          repeating-radial-gradient(ellipse at 70% 50%, transparent 0 48px, rgba(125, 245, 226, 0.09) 50px 53px, transparent 55px 92px);
        background-size: 340px 240px, 420px 300px;
        animation: causticAmbient 18s linear infinite;
      }

      #bubbles-canvas {
        position: fixed;
        inset: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .liquid-glass {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        border: 1px solid rgba(222, 255, 248, 0.15);
        background:
          linear-gradient(145deg, rgba(255, 255, 255, 0.105), rgba(255, 255, 255, 0.025) 54%, rgba(54, 218, 199, 0.035)),
          rgba(4, 33, 43, 0.18);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(255, 255, 255, 0.035),
          0 24px 80px rgba(0, 7, 14, 0.25);
        -webkit-backdrop-filter: blur(26px) saturate(145%);
        backdrop-filter: blur(26px) saturate(145%);
      }

      .liquid-glass::before {
        content: '';
        position: absolute;
        z-index: -1;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(110% 90% at 0% 0%, rgba(255, 255, 255, 0.18), transparent 38%),
          radial-gradient(90% 90% at 100% 100%, rgba(63, 225, 207, 0.08), transparent 48%);
      }

      .liquid-glass::after {
        content: '';
        position: absolute;
        z-index: -1;
        width: 52%;
        height: 160%;
        top: -70%;
        left: -34%;
        pointer-events: none;
        border-radius: 999px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.075), transparent);
        transform: rotate(26deg);
        transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
      }

      .liquid-glass:hover::after {
        transform: translateX(210%) rotate(26deg);
      }

      .glass-image-well {
        background:
          radial-gradient(circle at 50% 38%, rgba(102, 235, 219, 0.12), transparent 58%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(0, 8, 15, 0.15));
        box-shadow: inset 0 0 40px rgba(0, 4, 10, 0.2);
      }

      .depth-section {
        position: relative;
        z-index: 5;
        overflow: clip;
      }

      .section-depth-shallow {
        background: linear-gradient(180deg, rgba(7, 54, 65, 0.12), rgba(5, 41, 53, 0.3));
      }

      .section-depth-mid {
        background: linear-gradient(180deg, rgba(4, 35, 47, 0.25), rgba(3, 27, 39, 0.55));
      }

      .section-depth-deep {
        background: linear-gradient(180deg, rgba(2, 24, 35, 0.42), rgba(1, 14, 23, 0.8));
      }

      .depth-section::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(50% 60% at 4% 18%, rgba(42, 180, 168, 0.08), transparent 70%),
          radial-gradient(44% 48% at 96% 68%, rgba(28, 125, 131, 0.07), transparent 74%);
      }

      .water-body {
        background:
          linear-gradient(180deg, rgba(21, 143, 149, 0.66) 0%, rgba(5, 62, 79, 0.84) 22%, rgba(2, 25, 39, 0.96) 100%);
        -webkit-backdrop-filter: blur(1.2px) saturate(130%);
        backdrop-filter: blur(1.2px) saturate(130%);
      }

      .water-caustics {
        position: absolute;
        inset: -20%;
        opacity: 0.38;
        filter: blur(8px);
        background:
          repeating-radial-gradient(ellipse at 30% 20%, transparent 0 31px, rgba(218, 255, 248, 0.21) 33px 35px, transparent 37px 70px),
          repeating-radial-gradient(ellipse at 70% 50%, transparent 0 43px, rgba(181, 255, 242, 0.14) 45px 48px, transparent 50px 86px);
        background-size: 300px 220px, 390px 280px;
        animation: waterCaustics 11s linear infinite;
      }

      .water-shimmer {
        position: absolute;
        inset: 0;
        opacity: 0.25;
        background:
          linear-gradient(108deg, transparent 18%, rgba(225, 255, 249, 0.11) 34%, transparent 51%),
          linear-gradient(72deg, transparent 44%, rgba(177, 255, 241, 0.08) 58%, transparent 74%);
        background-size: 220% 100%, 190% 100%;
        animation: shimmerSweep 9s ease-in-out infinite alternate;
      }

      .hero-surface-glints {
        position: absolute;
        inset: 0;
        opacity: 0.22;
        background:
          radial-gradient(ellipse at 20% 20%, rgba(242, 255, 251, 0.55), transparent 22%),
          radial-gradient(ellipse at 75% 10%, rgba(214, 255, 246, 0.28), transparent 27%),
          linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.12) 50%, transparent 65%);
        background-size: auto, auto, 220% 100%;
        animation: shimmerSweep 10s ease-in-out infinite alternate;
      }

      .surface-ray {
        position: absolute;
        top: -18%;
        height: 132%;
        transform-origin: top center;
        border-radius: 999px;
        filter: blur(22px);
        background: linear-gradient(180deg, rgba(221, 255, 248, 0.34), transparent 74%);
        animation: rayPulse 10s ease-in-out infinite;
      }

      .floating-fish {
        animation: fishDrift 8s ease-in-out infinite;
        will-change: transform;
      }

      .soft-float {
        animation: gentleFloat 8s ease-in-out infinite;
        will-change: transform;
      }

      .hud {
        position: fixed;
        right: clamp(1rem, 3vw, 2.4rem);
        top: 50%;
        z-index: 40;
        display: flex;
        transform: translateY(-50%);
        flex-direction: column;
        align-items: center;
        gap: 0.8rem;
        pointer-events: none;
      }

      .hud-track {
        position: relative;
        width: 1px;
        height: min(38vh, 320px);
        border-radius: 999px;
        background: linear-gradient(180deg, rgba(210, 255, 247, 0.38), rgba(80, 211, 197, 0.12));
      }

      .hud-marker {
        position: absolute;
        left: 50%;
        width: 10px;
        height: 10px;
        transform: translate(-50%, -50%);
        border: 2px solid rgba(232, 255, 251, 0.7);
        border-radius: 50%;
        background: var(--aqua);
        box-shadow: 0 0 18px rgba(79, 228, 210, 0.82);
      }

      .hud-readout {
        text-align: center;
        font-family: var(--font-sans);
        font-size: 0.67rem;
        letter-spacing: 0.14em;
        color: rgba(226, 255, 249, 0.65);
      }

      .hud-depth {
        display: block;
        font-size: 0.92rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: var(--aqua);
      }

      @keyframes waveSlideA {
        from { transform: translate3d(0, 0, 0); }
        to { transform: translate3d(-50%, 0, 0); }
      }

      @keyframes waveSlideB {
        from { transform: translate3d(-50%, 0, 0); }
        to { transform: translate3d(0, 0, 0); }
      }

      @keyframes shimmerSweep {
        0% { background-position: 100% 0, 0 0; }
        100% { background-position: -100% 0, 100% 0; }
      }

      @keyframes waterCaustics {
        0% { transform: translate3d(-2%, -2%, 0) rotate(0deg) scale(1.04); }
        50% { transform: translate3d(3%, 2%, 0) rotate(2deg) scale(1.08); }
        100% { transform: translate3d(-2%, -2%, 0) rotate(0deg) scale(1.04); }
      }

      @keyframes causticAmbient {
        from { transform: translate3d(-2%, -2%, 0) rotate(0deg); }
        to { transform: translate3d(3%, 2%, 0) rotate(2deg); }
      }

      @keyframes noiseShift {
        0%, 100% { transform: translate3d(0, 0, 0); }
        25% { transform: translate3d(2%, -1%, 0); }
        50% { transform: translate3d(-1%, 2%, 0); }
        75% { transform: translate3d(1%, 1%, 0); }
      }

      @keyframes rayPulse {
        0%, 100% { opacity: 0.18; transform: rotate(var(--rotation)) translateX(0); }
        50% { opacity: 0.34; transform: rotate(var(--rotation)) translateX(14px); }
      }

      @keyframes fishDrift {
        0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
        50% { transform: translate3d(-16px, -13px, 0) rotate(2deg); }
      }

      @keyframes gentleFloat {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(0, -14px, 0); }
      }

      @keyframes scrollBounce {
        0%, 100% { transform: translateY(0); opacity: 0.48; }
        50% { transform: translateY(7px); opacity: 1; }
      }

      @media (max-width: 900px) {
        .hud { display: none; }
      }

      @media (max-width: 640px) {
        .liquid-glass {
          -webkit-backdrop-filter: blur(18px) saturate(130%);
          backdrop-filter: blur(18px) saturate(130%);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        .ocean-noise,
        .ambient-caustics,
        .surface-ray,
        .floating-fish,
        .soft-float,
        .water-caustics,
        .water-shimmer,
        .hero-surface-glints {
          animation: none !important;
        }
        #bubbles-canvas { display: none; }
      }
    `}</style>
  );
}

function FixedOceanBackground({ progress }: { progress: MotionValue<number> }) {
  const surfaceOpacity = useTransform(progress, [0, 0.12, 0.26], [1, 0.9, 0]);
  const shallowOpacity = useTransform(progress, [0.06, 0.2, 0.52], [0, 1, 0.65]);
  const deepOpacity = useTransform(progress, [0.32, 0.63, 1], [0, 0.88, 1]);
  const abyssOpacity = useTransform(progress, [0.68, 1], [0, 1]);
  const causticOpacity = useTransform(progress, [0, 0.18, 0.7], [0.28, 0.18, 0.03]);

  return (
    <div className="fixed-ocean-background" aria-hidden="true">
      <motion.div className="ocean-layer surface-layer" style={{ opacity: surfaceOpacity }} />
      <motion.div className="ocean-layer shallow-layer" style={{ opacity: shallowOpacity }} />
      <motion.div className="ocean-layer deep-layer" style={{ opacity: deepOpacity }} />
      <motion.div className="ocean-layer abyss-layer" style={{ opacity: abyssOpacity }} />
      <motion.div className="ambient-caustics" style={{ opacity: causticOpacity }} />
      <div className="ocean-noise" />
      <div className="ocean-vignette" />
    </div>
  );
}

function BubbleCanvas() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;

    const bubbles: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      phase: number;
      phaseSpeed: number;
      drift: number;
      opacity: number;
    }> = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (randomY = false) => {
      const radius = 1.2 + Math.random() * 5.7;
      bubbles.push({
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + radius + Math.random() * 100,
        radius,
        speed: 0.25 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.008 + Math.random() * 0.02,
        drift: 7 + Math.random() * 22,
        opacity: 0.1 + Math.random() * 0.28,
      });
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 12; i += 1) spawn(true);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const depth = scrollDepthRef.current;
      const maxCount = width < 700 ? 34 : 66;
      const targetCount = Math.round(maxCount * Math.max(0, Math.min(1, (depth - 0.035) * 1.45)));

      while (bubbles.length < targetCount) spawn(false);
      if (bubbles.length > targetCount) bubbles.splice(targetCount);

      bubbles.forEach((bubble) => {
        bubble.y -= bubble.speed + depth * 1.2;
        bubble.phase += bubble.phaseSpeed;
        const x = bubble.x + Math.sin(bubble.phase) * bubble.drift;

        if (bubble.y < -20) {
          bubble.y = height + 20 + Math.random() * 90;
          bubble.x = Math.random() * width;
        }

        const gradient = ctx.createRadialGradient(
          x - bubble.radius * 0.35,
          bubble.y - bubble.radius * 0.35,
          bubble.radius * 0.08,
          x,
          bubble.y,
          bubble.radius,
        );
        gradient.addColorStop(0, `rgba(255,255,255,${bubble.opacity + 0.25})`);
        gradient.addColorStop(0.42, `rgba(205,255,247,${bubble.opacity * 0.42})`);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.beginPath();
        ctx.arc(x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.lineWidth = 0.7;
        ctx.strokeStyle = `rgba(235,255,252,${bubble.opacity * 0.52})`;
        ctx.stroke();
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  if (reduced) return null;
  return <canvas ref={canvasRef} id="bubbles-canvas" aria-hidden="true" />;
}

function DepthHud() {
  const depthRef = useRef<HTMLSpanElement>(null);
  const zoneRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let currentZone = 'SURFACE';

    const update = () => {
      const progress = scrollDepthRef.current;
      const nextZone =
        progress > 0.78
          ? 'THE ABYSS'
          : progress > 0.5
            ? 'THE DEEP'
            : progress > 0.17
              ? 'THE SHALLOWS'
              : 'SURFACE';

      if (depthRef.current) {
        depthRef.current.textContent = `${(progress * MAX_DEPTH_M).toFixed(1)}M`;
      }
      if (markerRef.current) {
        markerRef.current.style.top = `${progress * 100}%`;
      }
      if (zoneRef.current && nextZone !== currentZone) {
        currentZone = nextZone;
        zoneRef.current.textContent = nextZone;
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <aside className="hud" aria-hidden="true">
      <div className="hud-readout">
        <span ref={depthRef} className="hud-depth">0.0M</span>
      </div>
      <div className="hud-track">
        <div ref={markerRef} className="hud-marker" />
      </div>
      <div className="hud-readout">
        <span ref={zoneRef}>SURFACE</span>
      </div>
    </aside>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-6 ${
          scrolled
            ? 'rounded-none border-b border-white/10 bg-[#031923]/[0.58] py-3 backdrop-blur-2xl md:rounded-full md:border md:px-6'
            : ''
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-xl">
            <Leaf className="h-4 w-4 text-[var(--mint)]" />
          </span>
          <span className="text-base tracking-wide text-white sm:text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
            TerreriumStore
          </span>
        </a>

        <ul className="hidden items-center gap-7 text-sm text-white/[0.78] md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a className="flex items-center gap-1 transition-colors hover:text-[var(--mint)]" href={link.href}>
                {link.label}
                {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 text-white/[0.78] md:flex">
          <button aria-label="Search" className="transition-colors hover:text-[var(--mint)]">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Account" className="transition-colors hover:text-[var(--mint)]">
            <User className="h-5 w-5" />
          </button>
          <button aria-label="Cart" className="relative transition-colors hover:text-[var(--mint)]">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--aqua)] text-[10px] font-bold text-[#03131d]">
              2
            </span>
          </button>
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="mx-4 mt-3 rounded-3xl border border-white/10 bg-[#031923]/[0.92] p-6 backdrop-blur-2xl md:hidden">
          <div className="space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-white/[0.80]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-6 border-t border-white/10 pt-5 text-white/[0.75]">
            <Search className="h-5 w-5" />
            <User className="h-5 w-5" />
            <ShoppingCart className="h-5 w-5" />
          </div>
        </div>
      )}
    </header>
  );
}

const heroTextVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

const heroLineVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
};

function SurfaceRays() {
  const rays = [
    { left: '7%', width: '11vw', rotation: '8deg', delay: '0s' },
    { left: '27%', width: '14vw', rotation: '4deg', delay: '1.2s' },
    { left: '56%', width: '12vw', rotation: '-7deg', delay: '2.7s' },
    { left: '79%', width: '9vw', rotation: '-4deg', delay: '0.8s' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {rays.map((ray, index) => (
        <div
          key={index}
          className="surface-ray"
          style={
            {
              left: ray.left,
              width: ray.width,
              animationDelay: ray.delay,
              '--rotation': ray.rotation,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function FishFloatLayer({
  positions,
}: {
  positions: Array<{
    src: string;
    top: string;
    left: string;
    size: number;
    delay: string;
    flip?: boolean;
    opacity?: number;
  }>;
}) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {positions.map((position, index) => (
        <div
          key={`${position.src}-${index}`}
          className="floating-fish absolute"
          style={{
            top: position.top,
            left: position.left,
            width: position.size,
            height: position.size,
            opacity: position.opacity ?? 1,
            animationDelay: position.delay,
            animationDuration: `${7 + index * 1.1}s`,
          }}
        >
          <div className="relative h-full w-full" style={{ transform: position.flip ? 'scaleX(-1)' : undefined }}>
            <Image src={position.src} alt="" fill sizes="120px" className="object-contain drop-shadow-2xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

function AnimatedWaterSurface() {
  return (
    <div className="pointer-events-none absolute -top-[64px] left-0 h-[84px] w-full overflow-visible" aria-hidden="true">
      <svg
        className="absolute bottom-0 left-0 h-[84px] w-[200%] opacity-95"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        style={{ animation: 'waveSlideA 12s linear infinite' }}
      >
        <defs>
          <linearGradient id="waveA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(218,255,248,0.68)" />
            <stop offset="0.22" stopColor="rgba(76,225,211,0.78)" />
            <stop offset="1" stopColor="rgba(15,123,137,0.88)" />
          </linearGradient>
        </defs>
        <path
          d="M0 62 C160 24 330 100 500 59 C690 13 850 96 1030 56 C1220 13 1400 102 1600 60 C1790 20 1980 92 2160 55 C2255 35 2330 38 2400 62 L2400 120 L0 120 Z"
          fill="url(#waveA)"
        />
      </svg>

      <svg
        className="absolute bottom-[-8px] left-0 h-[78px] w-[200%] opacity-55 blur-[1px]"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        style={{ animation: 'waveSlideB 17s linear infinite' }}
      >
        <path
          d="M0 70 C180 110 350 22 540 68 C730 110 910 30 1090 69 C1280 109 1460 31 1650 66 C1840 103 2030 28 2200 64 C2290 82 2350 82 2400 70 L2400 120 L0 120 Z"
          fill="rgba(30,155,163,0.82)"
        />
      </svg>

      <div className="absolute bottom-[12px] left-0 h-[2px] w-full bg-white/[0.35] blur-[1px]" />
      <div className="absolute bottom-[5px] left-0 h-9 w-full bg-gradient-to-b from-white/15 to-transparent blur-lg" />
    </div>
  );
}

function DiveHero() {
  const stageRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });

  const rawWaterProgress = useTransform(scrollYProgress, [0, 0.98], [0, 1]);
  const waterProgress = useSpring(rawWaterProgress, {
    stiffness: 72,
    damping: 24,
    mass: 0.48,
  });

  const waterTop = useTransform(waterProgress, [0, 1], ['102%', '-1%']);
  const contentScale = useTransform(scrollYProgress, [0, 0.82, 1], [1, 0.985, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.72, 1], ['0%', '-2%', '-8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.88, 1], [1, 1, 0.24]);
  const surfaceOpacity = useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 0.72, 0.2]);
  const instructionOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 0.4, 0]);
  const depthLabelOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.92], [0, 1, 1]);
  const depthLabelY = useTransform(scrollYProgress, [0.08, 0.18], [10, 0]);

  return (
    <section ref={stageRef} id="top" className="relative z-10 h-[245svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity: surfaceOpacity }}>
          <SurfaceRays />
          <div className="hero-surface-glints" />
        </motion.div>

        <motion.div
          className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center gap-5 px-5 pb-14 pt-28 md:flex-row md:gap-10 md:px-6 md:pb-10 md:pt-24"
          style={reduced ? undefined : { scale: contentScale, y: contentY, opacity: contentOpacity }}
        >
          <div className="relative min-h-[32svh] w-full flex-1 sm:min-h-[38svh] md:min-h-[620px]">
            <div className="soft-float absolute left-[2%] top-[3%] h-[88%] w-[94%]">
              <Image
                src="/terrerium 1.png"
                alt="A living glass terrarium"
                fill
                sizes="(max-width: 768px) 92vw, 620px"
                priority
                className="object-contain drop-shadow-[0_32px_60px_rgba(0,7,15,0.48)]"
              />
            </div>

            <div className="absolute -left-3 top-[12%] hidden h-44 w-20 opacity-75 md:block">
              <Image src="/moss long.png" alt="" fill sizes="100px" className="object-contain" />
            </div>

            <FishFloatLayer
              positions={[
                { src: FISH_POOL[0], top: '8%', left: '76%', size: 68, delay: '0s' },
                { src: FISH_POOL[1], top: '26%', left: '7%', size: 43, delay: '1s', flip: true },
                { src: FISH_POOL[2], top: '48%', left: '59%', size: 55, delay: '1.7s' },
                { src: FISH_POOL[0], top: '67%', left: '30%', size: 37, delay: '0.4s', flip: true },
              ]}
            />
          </div>

          <motion.div
            className="relative w-full flex-1 pb-8 md:pb-0"
            variants={heroTextVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={heroLineVariants}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--aqua)]" />
              Living design, delivered
            </motion.div>

            <motion.h1
              variants={heroLineVariants}
              className="max-w-[680px] text-[clamp(3rem,7.2vw,6.5rem)] leading-[0.88] tracking-[-0.055em] text-white"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Bring <span className="text-[var(--mint)]">nature</span>
              <br />
              to life.
            </motion.h1>

            <motion.p variants={heroLineVariants} className="mt-6 max-w-lg text-sm leading-7 text-white/[0.68] sm:text-base">
              Terrariums, aquariums, healthy fish, mosses and precision accessories—curated as one complete living world.
            </motion.p>

            <motion.div variants={heroLineVariants} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#categories"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--mint)] to-[var(--aqua)] px-6 py-3.5 text-sm font-semibold text-[#03131d] shadow-[0_16px_45px_rgba(42,218,198,0.2)] transition-transform hover:-translate-y-0.5"
              >
                Explore the collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#featured"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.08] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition-colors hover:bg-white/[0.13]"
              >
                Build a custom setup
                <Box className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              variants={heroLineVariants}
              className="liquid-glass mt-9 grid grid-cols-2 gap-px rounded-3xl p-2 sm:grid-cols-4"
            >
              {HERO_BADGES.map((badge) => (
                <div key={badge.label} className="flex min-h-20 flex-col justify-between rounded-2xl px-3 py-3.5 transition-colors hover:bg-white/[0.04]">
                  <badge.icon className="h-4 w-4 text-[var(--aqua)]" />
                  <span className="mt-3 text-[10px] leading-4 text-white/[0.66] sm:text-[11px]">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 bottom-8 z-20 text-center"
          style={{ opacity: instructionOpacity }}
        >
          <p className="mb-2 text-[10px] uppercase tracking-[0.33em] text-white/[0.58]">Scroll to submerge</p>
          <ChevronDown className="mx-auto h-4 w-4 text-white/60" style={{ animation: 'scrollBounce 2s ease-in-out infinite' }} />
        </motion.div>

        <motion.div
          className="absolute left-5 top-24 z-30 rounded-full border border-white/15 bg-[#02141d]/[0.28] px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/[0.72] backdrop-blur-xl sm:left-7 md:left-10"
          style={{ opacity: depthLabelOpacity, y: depthLabelY }}
        >
          Entering the shallows
        </motion.div>

        <motion.div className="water-body pointer-events-none absolute inset-x-0 bottom-0 z-20" style={{ top: waterTop }}>
          <AnimatedWaterSurface />
          <div className="water-caustics" />
          <div className="water-shimmer" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#02121e]/[0.45]" />

          <FishFloatLayer
            positions={[
              { src: FISH_POOL[2], top: '18%', left: '10%', size: 52, delay: '0.2s', opacity: 0.62 },
              { src: FISH_POOL[0], top: '46%', left: '82%', size: 42, delay: '1.3s', flip: true, opacity: 0.56 },
              { src: FISH_POOL[1], top: '72%', left: '23%', size: 35, delay: '0.7s', opacity: 0.45 },
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
      <div>
        <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[var(--aqua)]/[0.80]">
          <span className="h-px w-8 bg-[var(--aqua)]/[0.55]" />
          {eyebrow}
        </div>
        <h2 className="max-w-3xl text-3xl leading-tight tracking-[-0.035em] text-white sm:text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
          {title}
        </h2>
        {description && <p className="mt-4 max-w-2xl text-sm leading-7 text-white/[0.56] sm:text-base">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function RevealSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduced ? undefined : { opacity: 0, y: 54 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function CategorySection() {
  return (
    <div className="depth-section section-depth-shallow">
      <RevealSection id="categories" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
        <SectionHeading
          eyebrow="Curated ecosystems"
          title="Choose the world you want to grow."
          description="Every collection is designed to feel complete, not crowded—clean forms, healthy life and the exact tools needed to maintain it."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {CATEGORIES.map((category, index) => {
            const span = index === 0 || index === 1 ? 'lg:col-span-6' : 'lg:col-span-4';
            const height = index < 2 ? 'min-h-[380px]' : 'min-h-[330px]';

            return (
              <motion.a
                key={category.title}
                href="#featured"
                className={`liquid-glass group ${span} ${height} rounded-[2rem] p-5 sm:p-6`}
                whileHover={{ y: -7 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-full flex-col">
                  <div className="glass-image-well relative flex-1 overflow-hidden rounded-[1.55rem] border border-white/[0.06]">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 560px"
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#031923]/[0.38] to-transparent" />
                  </div>

                  <div className="flex items-end justify-between gap-5 pt-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--aqua)]/[0.76]">{category.stat}</p>
                      <h3 className="mt-1 text-2xl text-white" style={{ fontFamily: 'var(--font-serif)' }}>{category.title}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-white/[0.52]">{category.subtitle}</p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.055] text-white/[0.75] transition-all group-hover:border-[var(--aqua)]/[0.55] group-hover:bg-[var(--aqua)] group-hover:text-[#03131d]">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </RevealSection>
    </div>
  );
}

function FeaturedProductsSection() {
  return (
    <div className="depth-section section-depth-mid">
      <RevealSection id="featured" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
        <SectionHeading
          eyebrow="At 8.4 metres"
          title="Objects that look alive before anything is added."
          description="Soft glass, precise tools and healthy natural material—all presented in clear liquid-glass cards instead of heavy background imagery."
          action={
            <a href="#" className="inline-flex items-center gap-2 text-sm text-white/[0.64] transition-colors hover:text-[var(--mint)]">
              View all products <ArrowRight className="h-4 w-4" />
            </a>
          }
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {PRODUCTS.map((product) => (
            <motion.article
              key={product.name}
              className="liquid-glass group rounded-[1.7rem] p-3.5 sm:p-4"
              whileHover={{ y: -7 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass-image-well relative aspect-[4/4.4] overflow-hidden rounded-[1.35rem] border border-white/[0.055]">
                <span className="absolute left-3 top-3 z-10 rounded-full border border-white/[0.12] bg-[#041923]/[0.42] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.13em] text-white/[0.68] backdrop-blur-xl">
                  {product.label}
                </span>
                <button
                  type="button"
                  aria-label={`Add ${product.name} to favorites`}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.12] bg-[#041923]/[0.42] text-white/60 backdrop-blur-xl transition-colors hover:text-[var(--mint)]"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 45vw, 240px"
                  className="object-contain p-5 transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="px-1 pb-1 pt-4">
                <h3 className="text-sm leading-5 text-white sm:text-base" style={{ fontFamily: 'var(--font-serif)' }}>{product.name}</h3>
                <p className="mt-1 min-h-8 text-[10px] leading-4 text-white/[0.43] sm:text-xs">{product.subtitle}</p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-[var(--mint)]">{product.price}</span>
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--aqua)]/[0.14] text-[var(--aqua)] transition-all hover:bg-[var(--aqua)] hover:text-[#03131d]"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </RevealSection>
    </div>
  );
}

function BenefitsStrip() {
  return (
    <div className="depth-section section-depth-mid">
      <RevealSection className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 md:py-12">
        <div className="liquid-glass grid grid-cols-1 rounded-[2rem] p-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`flex gap-4 rounded-[1.4rem] px-4 py-5 ${index > 0 ? 'lg:border-l lg:border-white/[0.075]' : ''}`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.055] text-[var(--aqua)]">
                <benefit.icon className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">{benefit.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/[0.45]">{benefit.text}</p>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>
    </div>
  );
}

function ImmersiveCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const fishY = useTransform(scrollYProgress, [0, 1], ['12%', '-18%']);
  const plantY = useTransform(scrollYProgress, [0, 1], ['7%', '-8%']);

  return (
    <div className="depth-section section-depth-deep">
      <RevealSection className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-36">
        <section ref={sectionRef} className="liquid-glass relative min-h-[620px] overflow-hidden rounded-[2.5rem] px-7 py-12 sm:px-10 md:px-16 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(44,207,193,0.16),transparent_30%),linear-gradient(120deg,rgba(255,255,255,0.035),transparent_45%)]" />
          <div className="water-caustics opacity-20" />

          <motion.div
            className="absolute -right-5 bottom-[-4%] h-[56%] w-[44%] opacity-80 md:right-[2%] md:h-[76%] md:w-[40%]"
            style={reduced ? undefined : { y: plantY }}
          >
            <Image src="/decor moss.png" alt="" fill sizes="480px" className="object-contain object-bottom" />
          </motion.div>

          <motion.div
            className="absolute right-[11%] top-[22%] h-32 w-44 md:right-[16%] md:h-44 md:w-64"
            style={reduced ? undefined : { y: fishY }}
          >
            <Image src="/fighter fish 3.png" alt="A colourful fish" fill sizes="260px" className="object-contain drop-shadow-2xl" />
          </motion.div>

          <FishFloatLayer
            positions={[
              { src: FISH_POOL[0], top: '18%', left: '58%', size: 38, delay: '0s', opacity: 0.6 },
              { src: FISH_POOL[1], top: '63%', left: '73%', size: 30, delay: '1.2s', flip: true, opacity: 0.55 },
              { src: FISH_POOL[0], top: '72%', left: '55%', size: 25, delay: '0.6s', opacity: 0.4 },
            ]}
          />

          <div className="relative z-10 flex min-h-[520px] max-w-xl flex-col justify-center">
            <div className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[var(--aqua)]/[0.78]">
              <Droplets className="h-4 w-4" />
              The deep collection
            </div>
            <h2 className="text-[clamp(3rem,6vw,5.8rem)] leading-[0.9] tracking-[-0.055em] text-white" style={{ fontFamily: 'var(--font-serif)' }}>
              Create.
              <br />
              Nurture.
              <br />
              <span className="text-[var(--mint)]">Disappear.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/[0.56] sm:text-base">
              Build a quiet world that changes the mood of the entire room. We help with the setup, life selection and long-term care.
            </p>
            <a
              href="#"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[var(--mint)] to-[var(--aqua)] px-6 py-3.5 text-sm font-semibold text-[#03131d] shadow-[0_16px_45px_rgba(42,218,198,0.18)] transition-transform hover:-translate-y-0.5"
            >
              Start your setup
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </section>
      </RevealSection>
    </div>
  );
}

function SocialProofSection() {
  const gallery = ['/terrerium 1.png', '/decor moss 2.png', '/terrerium 2.png', '/decor moss 3.png'];

  return (
    <div className="depth-section section-depth-deep">
      <RevealSection className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 md:py-32">
        <SectionHeading
          eyebrow="At 18.6 metres"
          title="A community built around slower, living spaces."
          description="The deepest part of the page is intentionally quieter, darker and more focused—like descending below the bright surface."
        />

        <div className="grid gap-4 md:grid-cols-12">
          <div className="liquid-glass rounded-[2rem] p-7 md:col-span-5 md:p-9">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--aqua)]/[0.72]">Customer signal</p>
            <div className="mt-6 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-[var(--mint)] text-[var(--mint)]" />
              ))}
            </div>
            <p className="mt-5 text-4xl tracking-[-0.04em] text-white sm:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>4.9 / 5</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/[0.52]">Rated by more than 2,500 plant keepers, aquascapers and first-time builders.</p>
            <div className="mt-8 flex -space-x-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-11 w-11 rounded-full border-2 border-[#041923] bg-gradient-to-br from-[var(--aqua)]/[0.55] to-[#0b3948]" />
              ))}
            </div>
          </div>

          <div className="liquid-glass rounded-[2rem] p-6 md:col-span-7 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--aqua)]/[0.72]">Daily inspiration</p>
                <h3 className="mt-2 text-2xl text-white" style={{ fontFamily: 'var(--font-serif)' }}>Follow the living archive.</h3>
              </div>
              <a href="#" className="text-sm text-[var(--mint)]">@terreriumstore</a>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.map((src, index) => (
                <motion.div
                  key={src}
                  className="glass-image-well relative aspect-square overflow-hidden rounded-[1.3rem] border border-white/[0.06]"
                  whileHover={{ y: -5, rotate: index % 2 === 0 ? -1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image src={src} alt="" fill sizes="180px" className="object-contain p-3" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}

function Footer() {
  return (
    <footer className="depth-section relative z-10 overflow-hidden border-t border-white/[0.07] bg-[#010a12]/[0.78]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_0%,rgba(28,132,134,0.12),transparent_38%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.055]">
                <Leaf className="h-4 w-4 text-[var(--mint)]" />
              </span>
              <span className="text-xl text-white" style={{ fontFamily: 'var(--font-serif)' }}>TerreriumStore</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/[0.44]">
              Living nature for everyday spaces—thoughtfully sourced, carefully packed and supported by real guidance.
            </p>
            <p className="mt-7 text-xs text-white/30">© 2026 TerreriumStore. All rights reserved.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-5">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h4 className="text-sm font-medium text-white">{column.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/40 transition-colors hover:text-[var(--mint)]">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-medium text-white">Stay below the surface</h4>
            <p className="mt-4 text-sm leading-6 text-white/[0.42]">Care tips, new arrivals and quiet inspiration.</p>
            <form
              className="liquid-glass mt-5 flex items-center gap-2 rounded-full p-1.5 pl-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Email address"
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/[0.28] focus:outline-none"
              />
              <button type="submit" aria-label="Subscribe" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--aqua)] text-[#03131d]">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-6 flex items-center gap-4 text-white/[0.42]">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-[var(--mint)]"><FaInstagram className="h-4 w-4" /></a>
              <a href="#" aria-label="YouTube" className="transition-colors hover:text-[var(--mint)]"><FaYoutube className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="transition-colors hover:text-[var(--mint)]"><FaFacebookF className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    scrollDepthRef.current = value;
  });

  return (
    <main
      className={`${serif.variable} ${sans.variable} relative overflow-x-hidden bg-[#03131d]`}
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <GlobalUnderwaterStyles />
      <FixedOceanBackground progress={scrollYProgress} />
      <BubbleCanvas />
      <DepthHud />
      <Navbar />

      <DiveHero />
      <CategorySection />
      <FeaturedProductsSection />
      <BenefitsStrip />
      <ImmersiveCta />
      <SocialProofSection />
      <Footer />
    </main>
  );
}
