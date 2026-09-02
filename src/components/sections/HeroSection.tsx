"use client";

import { useRef, useState, useEffect, lazy, Suspense } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToSection } from "@/lib/lenis";
import { brandImages } from "@/data/images";
import { contactInfo } from "@/data/contact";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const INTRO_EVENT = "suragverse:intro:complete";

const roles = [
  "APPLIED AI ENGINEER",
  "FULL-STACK DEVELOPER",
  "AI AUTOMATION",
  "DIGITAL CREATOR",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const [started, setStarted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Gentle portrait parallax (subtle — photography stays the focus).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const portraitX = useTransform(sx, [-1, 1], [-10, 10]);
  const portraitY = useTransform(sy, [-1, 1], [-6, 6]);
  const zoom = useTransform(sx, [-1, 1], [1.03, 1.08]);

  useEffect(() => {
    const onIntro = () => setStarted(true);
    window.addEventListener(INTRO_EVENT, onIntro);
    const fallback = window.setTimeout(() => setStarted(true), 7500);
    return () => {
      window.removeEventListener(INTRO_EVENT, onIntro);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mx.set(nx);
      my.set(ny);
      setMouse({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mx, my]);

  const handleStory = () => scrollToSection("#my-story");

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Ambient 3D environment — activates with the timeline */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity: started ? 0.5 : 0 }}
      >
        <Suspense fallback={null}>
          <HeroScene
            mouseX={mouse.x}
            mouseY={mouse.y}
            onObjectClick={handleStory}
          />
        </Suspense>
      </div>

      {/* Cinematic grade */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/70 via-transparent to-background/80" />

      <div className="relative z-[2] w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 sm:pt-36 sm:pb-24 lg:pt-36 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-10 lg:gap-x-12">
          {/* ——— EDITORIAL TEXT & ACTIONS (col-span-7) ——— */}
          <div className="order-1 lg:order-1 lg:col-span-7 text-center lg:text-left">
            {/* 04: HELLO, I'M appears */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="text-[10px] sm:text-[11px] tracking-[0.5em] text-electric-blue mb-4 sm:mb-6 font-mono"
            >
              HELLO, I&apos;M
            </motion.p>

            {/* 05: SURAG M S rises through mask */}
            <div className="overflow-hidden pb-1">
              <motion.h1
                initial={{ y: "115%", opacity: 0 }}
                animate={started ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 1.0, delay: 0.38, ease: EASE }}
                className="font-[family-name:var(--font-heading)] font-bold tracking-tight leading-[0.86]"
                style={{ fontSize: "clamp(3.4rem, 10vw, 8.5rem)" }}
              >
                SURAG
                <br />
                M S<span className="text-electric-blue">.</span>
              </motion.h1>
            </div>

            {/* 06: Professional identity fades in */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-2.5 my-6 sm:my-7 font-mono text-[9px] sm:text-[10px] tracking-[0.2em]"
            >
              {roles.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/80"
                >
                  {role}
                </span>
              ))}
            </motion.div>

            {/* Tagline & bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              className="font-[family-name:var(--font-heading)] text-lg sm:text-2xl md:text-3xl font-semibold tracking-tight text-soft-blue mb-4 leading-tight"
            >
              A CREATOR BUILDING WITH TECHNOLOGY.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.78, ease: EASE }}
              className="text-secondary-text text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed"
            >
              I explore ideas through technology, creativity, and digital
              experiences — continuously learning, building, and discovering
              what is possible.
            </motion.p>

            {/* 07: CTA gently arrives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.88, ease: EASE }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <MagneticButton
                onClick={handleStory}
                className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-white !text-black text-xs sm:text-sm font-bold tracking-wider rounded-full hover:bg-electric-blue hover:!text-black transition-colors duration-300 min-h-[48px] w-full sm:w-auto shadow-lg"
              >
                DISCOVER MY STORY
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </MagneticButton>
              <a
                href={contactInfo.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 border border-glass-border text-xs sm:text-sm font-semibold tracking-wider rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-h-[48px] w-full sm:w-auto btn-antigravity"
              >
                EXPLORE MY WORK
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </a>
            </motion.div>
          </div>

          {/* ——— 03: PORTRAIT slowly reveals with gentle Antigravity float (col-span-5) ——— */}
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            animate={started ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
            className="order-2 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end"
          >
            <motion.div
              style={{ x: portraitX, y: portraitY }}
              className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px]"
            >
              {/* Subtle Antigravity weightless breathing */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="hero-frame aspect-[4/5] w-full will-change-transform"
                style={{ scale: zoom }}
              >
                <Image
                  src={brandImages.hero.src}
                  alt={brandImages.hero.alt}
                  fill
                  priority
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 38vw"
                  className="hero-img object-cover"
                  style={{ objectPosition: brandImages.hero.objectPosition }}
                  quality={88}
                />
                {/* soft atmosphere */}
                <div
                  className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(60% 40% at 50% 20%, rgba(255,255,255,0.08), transparent 70%)",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ delay: 3.4 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] text-secondary-text">SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={15} className="text-secondary-text" />
        </motion.div>
      </motion.div>
    </section>
  );
}
