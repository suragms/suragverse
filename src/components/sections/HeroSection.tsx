"use client";

import { useRef, useState, useEffect, lazy, Suspense } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToSection } from "@/lib/lenis";
import { brandImages } from "@/data/images";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const INTRO_EVENT = "suragverse:intro:complete";

const roles = [
  "APPLIED AI ENGINEER",
  "FULL-STACK DEVELOPER",
  "AI AUTOMATION ENTHUSIAST",
  "DIGITAL CREATOR",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const [started, setStarted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax (depth layers)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const portraitX = useTransform(sx, [-1, 1], [-12, 12]);
  const portraitY = useTransform(sy, [-1, 1], [-8, 8]);
  const glowX = useTransform(sx, [-1, 1], [18, -18]);
  const glowY = useTransform(sy, [-1, 1], [14, -14]);
  // Slow cinematic zoom that never distorts the photograph.
  const zoom = useTransform(sx, [-1, 1], [1.02, 1.1]);

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
    // Skip mouse parallax on touch devices
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

  const handleWork = () => scrollToSection("#my-work");
  const handleStory = () => scrollToSection("#my-story");

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Ambient 3D environment — activates with the timeline */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000" style={{ opacity: started ? 1 : 0 }}>
        <Suspense fallback={null}>
          <HeroScene mouseX={mouse.x} mouseY={mouse.y} onObjectClick={handleStory} />
        </Suspense>
      </div>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 sm:from-background/70 via-transparent to-background/70 sm:to-background/85" />
      <motion.div
        className="pointer-events-none absolute z-[1] rounded-full blur-[80px] sm:blur-[140px]"
        style={{ x: glowX, y: glowY, width: "min(640px, 80vw)", height: "min(640px, 80vw)", left: "60%", top: "8%" }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        aria-hidden="true"
      />

      <div className="relative z-[2] w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 sm:pt-28 sm:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 lg:gap-x-16 lg:gap-y-10 items-center text-center lg:text-left">
        {/* ——— TITLE (mobile top / desktop left) ——— */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
          animate={started ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: EASE }}
          className="order-1 lg:col-start-1 lg:row-start-1"
        >
          <p className="text-[10px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.5em] text-electric-blue mb-4 sm:mb-6 font-mono">
            HELLO, I&apos;M SURAG M S.
          </p>
          <h1
            className="font-[family-name:var(--font-heading)] font-bold tracking-tight leading-[0.9]"
            style={{ fontSize: "clamp(2.4rem, 9vw, 6.5rem)" }}
          >
            WELCOME TO
            <br />
            MY <span className="text-electric-blue">UNIVERSE.</span>
          </h1>
        </motion.div>

        {/* ——— CINEMATIC PORTRAIT (mobile middle / desktop right) ——— */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
          animate={started ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
          className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 flex justify-center"
        >
          <motion.div
            style={{ x: portraitX, y: portraitY }}
            className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px]"
          >
            <div
              className="absolute -inset-4 sm:-inset-6 rounded-[1.5rem] sm:rounded-[2rem] opacity-70 blur-2xl sm:blur-3xl"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(0,217,255,0.18), transparent 70%)",
              }}
            />
            <motion.div
              className="hero-frame aspect-[3/4] w-full will-change-transform"
              style={{ scale: zoom }}
            >
              <Image
                src={brandImages.hero.src}
                alt={brandImages.hero.alt}
                fill
                priority
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 40vw"
                className="hero-img object-cover"
                quality={88}
              />
              {/* soft smoke atmosphere */}
              <div
                className="absolute inset-0 opacity-60 mix-blend-screen pointer-events-none"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(60% 40% at 50% 20%, rgba(255,255,255,0.10), transparent 70%)",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ——— DESCRIPTION + CTAs (mobile bottom / desktop left-below) ——— */}
        <motion.div
          initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
          animate={started ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          className="order-3 lg:col-start-1 lg:row-start-2"
        >
          <p className="text-secondary-text text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 mb-5 sm:mb-7 leading-relaxed">
            A journey of curiosity, technology, creativity, challenges,
            determination, and endless possibilities.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 mb-7 sm:mb-9 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.28em] text-white/70">
            {roles.map((role) => (
              <span key={role} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-electric-blue" />
                {role}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <MagneticButton
              onClick={handleStory}
              className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-white text-black text-xs sm:text-sm font-semibold tracking-wider rounded-full hover:bg-electric-blue hover:text-black transition-colors duration-300 hover:shadow-[0_0_40px_rgba(0,217,255,0.35)] min-h-[48px] w-full sm:w-auto"
            >
              DISCOVER MY STORY
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              onClick={handleWork}
              className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 border border-glass-border text-xs sm:text-sm font-semibold tracking-wider rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300 min-h-[48px] w-full sm:w-auto"
            >
              EXPLORE MY WORK
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ delay: 3.6 }}
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
