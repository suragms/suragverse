"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BrainCircuit, Rocket, Lightbulb, Handshake } from "lucide-react";

const focuses = [
  {
    icon: BrainCircuit,
    title: "AI",
    desc: "Continuing to learn and build with applied AI.",
  },
  {
    icon: Rocket,
    title: "TECHNOLOGY",
    desc: "Exploring new tools and pushing what's possible.",
  },
  {
    icon: Lightbulb,
    title: "CREATIVITY",
    desc: "Turning new ideas into meaningful experiences.",
  },
  {
    icon: Handshake,
    title: "COLLABORATION",
    desc: "Open to teaming up on things that matter.",
  },
];

/**
 * Section 12 — THE FUTURE.
 * Aspirational but authentic — focused on curiosity and growth, not hype.
 */
export default function FutureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="future"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 w-[600px] h-[600px] -translate-x-1/2 rounded-full bg-electric-blue/5 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
        >
          THE FUTURE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-[family-name:var(--font-heading)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.92] mb-8"
        >
          THE BEST PART?
          <br />
          I&apos;M STILL
          <br />
          <span className="gradient-text">JUST GETTING STARTED.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-secondary-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-14"
        >
          I&apos;m focused on continued learning, AI, technology, creativity, and
          new ideas — building meaningful digital experiences, one step at a
          time.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {focuses.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              className="pro-card rounded-2xl border border-glass-border bg-white/[0.02] p-6"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-electric-blue/10">
                <f.icon size={18} className="text-electric-blue" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-widest mb-2">
                {f.title}
              </h3>
              <p className="text-secondary-text text-xs leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
