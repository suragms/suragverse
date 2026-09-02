"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  MessageSquare,
  GraduationCap,
  Wrench,
  Users,
  Lightbulb,
} from "lucide-react";

const capabilities = [
  {
    icon: Code2,
    title: "Create",
    desc: "Turning ideas into working, meaningful products.",
    color: "#00D9FF",
  },
  {
    icon: MessageSquare,
    title: "Communicate",
    desc: "Expressing myself and sharing ideas with the world.",
    color: "#7C3AED",
  },
  {
    icon: GraduationCap,
    title: "Learn",
    desc: "Growing skills and understanding, continuously.",
    color: "#39FF88",
  },
  {
    icon: Wrench,
    title: "Build",
    desc: "Engineering solutions with independence and care.",
    color: "#00D9FF",
  },
  {
    icon: Users,
    title: "Connect",
    desc: "Collaborating and being part of a wider community.",
    color: "#7C3AED",
  },
  {
    icon: Lightbulb,
    title: "Imagine",
    desc: "Turning imagination into reality through technology.",
    color: "#39FF88",
  },
];

/**
 * Section 06 — TECHNOLOGY EXPANDS POSSIBILITIES.
 * Technology as a personal and professional force: a bridge between my
 * personal journey and my technology journey.
 */
export default function TechPossibilitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="technology"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-[8%] top-[20%] w-[360px] h-[360px] rounded-full bg-electric-blue/5 blur-[120px]" />
        <div className="absolute right-[6%] bottom-[15%] w-[400px] h-[400px] rounded-full bg-purple/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
        >
          TECHNOLOGY &amp; ME
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.92] mb-8"
        >
          TECHNOLOGY
          <br />
          <span className="gradient-text">EXPANDS POSSIBILITIES.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-secondary-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-4"
        >
          Technology is not only my career — it is a powerful way for me to
          create, communicate, learn, build, and connect.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28 }}
          className="text-secondary-text text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-14"
        >
          It is how I turn imagination into reality, and how I adapt and stay
          independent — including through the accessibility and assistive tools
          that make this possible.
        </motion.p>

        {/* Capability grid — subtle, no heavy 3D */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
              className="pro-card rounded-2xl border border-glass-border bg-white/[0.02] p-6 text-left"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${cap.color}12` }}
              >
                <cap.icon size={18} style={{ color: cap.color }} />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-base font-bold tracking-wide mb-2">
                {cap.title}
              </h3>
              <p className="text-secondary-text text-sm leading-relaxed">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
