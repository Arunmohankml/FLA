"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroParallax() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const x1 = useTransform(scrollYProgress, [0, 0.3], [0, isMobile ? -20 : -80]);
  const x2 = useTransform(scrollYProgress, [0, 0.3], [0, isMobile ? 20 : 80]);
  const x3 = useTransform(scrollYProgress, [0, 0.3], [0, isMobile ? -15 : -60]);
  const x4 = useTransform(scrollYProgress, [0, 0.3], [0, isMobile ? 15 : 60]);

  return (
    <div className="w-full gap-1">
      <motion.div
        style={{ x: x1, willChange: "transform" }}
        className="hero-line text-center"
      >
        MASTER THE
      </motion.div>
      <motion.div
        style={{ x: x2, willChange: "transform" }}
        className="hero-line hero-grad text-center"
      >
        LANGUAGE.
      </motion.div>
      <motion.div
        style={{ x: x3, willChange: "transform" }}
        className="hero-line text-center"
      >
        EXPAND THE
      </motion.div>
      <motion.div
        style={{ x: x4, willChange: "transform" }}
        className="hero-line hero-grad text-center"
      >
        WORLD.
      </motion.div>
    </div>
  );
}
