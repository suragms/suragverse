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

      <div className="relative z-[2] w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-10 lg:gap-x-6">
          {/* ——— TEXT (approx 55%) ——— */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="order-1 lg:col-span-7 text-center lg:text-left"
          >
            <p className="text-[10px] sm:text-[11px] tracking-[0.5em] text-electric-blue mb-5 sm:mb-7 font-mono">
              HELLO, I&apos;M
            </p>
            <h1
              className="font-[family-name:var(--font-heading)] font-bold tracking-tight leading-[0.86]"
              style={{ fontSize: "clamp(3.4rem, 11vw, 9rem)" }}
            >
              SURAG
              <br />
              M S<span className="text-electric-blue">.</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
              className="font-[family-name:var(--font-heading)] text-lg sm:text-2xl md:text-3xl font-semibold tracking-tight text-soft-blue mt-5 sm:mt-7"
            >
              WELCOME TO MY UNIVERSE.
            </motion.p>
          </motion.div>

          {/* ——— PORTRAIT (approx 45%, extends toward edge) ——— */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            className="order-2 lg:col-span-5 flex justify-center lg:justify-end lg:-mr-4 xl:-mr-6"
          >
            <motion.div
              style={{ x: portraitX, y: portraitY }}
              className="relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[440px]"
            >
              <motion.div
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
                  quality={88}
                />
                {/* soft atmosphere, kept subtle */}
                <div
                  className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(60% 40% at 50% 20%, rgba(255,255,255,0.08), transparent 70%)",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ——— DESCRIPTION + CTAs ——— */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="order-3 lg:col-span-12 mt-2 lg:mt-6 text-center lg:text-left"
          >
            <p className="text-secondary-text text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 mb-7 sm:mb-9 leading-relaxed">
              A journey through technology, creativity, challenges, growth, and
              the ideas that continue to shape who I am.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mb-8 sm:mb-10 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-white/70">
              {roles.map((role, i) => (
                <span key={role} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-electric-blue" />
                  {role}
                  {i < roles.length - 1 && (
                    <span className="text-white/20 hidden sm:inline">/</span>
                  )}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <MagneticButton
                onClick={handleStory}
                className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-black text-xs sm:text-sm font-semibold tracking-wider rounded-full hover:bg-electric-blue hover:text-black transition-colors duration-300 min-h-[48px] w-full sm:w-auto"
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
                className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 border border-glass-border text-xs sm:text-sm font-semibold tracking-wider rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-h-[48px] w-full sm:w-auto"
              >
                EXPLORE MY WORK
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </a>
            </div>
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
