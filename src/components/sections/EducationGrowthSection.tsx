"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timeline = [
  { step: "LEARNING", desc: "Building the foundation." },
  { step: "EXPLORING", desc: "Finding what excites me." },
  { step: "BUILDING", desc: "Turning knowledge into work." },
  { step: "CREATING", desc: "Making something of my own." },
  { step: "EVOLVING", desc: "Growing, always." },
];

/**
 * Section 09 — EDUCATION & GROWTH.
 * Professional journey. Only verified facts are shown (MCA, first class
 * with distinction) — no invented institutions or dates.
 */
export default function EducationGrowthSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="education"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
        >
          EDUCATION &amp; GROWTH
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.92] mb-10"
        >
          LEARNING
          <br />
          <span className="gradient-text">NEVER STOPS.</span>
        </motion.h2>

        {/* Education card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-16 rounded-3xl border border-glass-border bg-white/[0.02] p-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-electric-blue/30 text-electric-blue text-[10px] font-bold tracking-[0.2em] mb-5">
            MASTER OF COMPUTER APPLICATIONS
          </span>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight mb-2">
            MCA
          </h3>
          <p className="text-secondary-text text-sm tracking-wide">
            FIRST CLASS WITH DISTINCTION
          </p>
        </motion.div>

        {/* Growth timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-3 items-stretch">
          {timeline.map((t, i) => (
            <motion.div
              key={t.step}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
              className="relative rounded-2xl border border-glass-border bg-white/[0.02] p-6 flex flex-col items-center text-center"
            >
              <span className="w-10 h-10 rounded-full border border-electric-blue/40 flex items-center justify-center mb-4">
                <span className="text-electric-blue font-mono text-sm font-bold">
                  {i + 1}
                </span>
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-widest mb-2">
                {t.step}
              </h3>
              <p className="text-secondary-text text-xs leading-relaxed">
                {t.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
