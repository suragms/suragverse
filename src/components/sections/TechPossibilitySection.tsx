"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const capabilities = [
  {
    title: "Create.",
    desc: "Turning ideas into working, meaningful things.",
  },
  {
    title: "Learn.",
    desc: "Growing skills and understanding, continuously.",
  },
  {
    title: "Communicate.",
    desc: "Expressing myself and sharing ideas with the world.",
  },
  {
    title: "Build.",
    desc: "Engineering solutions with independence and care.",
  },
  {
    title: "Connect.",
    desc: "Collaborating and being part of a wider community.",
  },
  {
    title: "Explore.",
    desc: "Pushing into new tools, new ideas, new possibilities.",
  },
];

/**
 * Section 06 — TECHNOLOGY & POSSIBILITY.
 * A narrative bridge between the personal journey and technology.
 * Expressed as editorial typography — not a logo grid.
 */
export default function TechPossibilitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="technology"
      ref={ref}
      className="relative py-28 sm:py-36 lg:py-48 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/4 w-[560px] h-[560px] -translate-x-1/2 rounded-full bg-electric-blue/4 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
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
          <span className="gradient-text">OPENS POSSIBILITIES.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-secondary-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-4"
        >
          Technology is not only my career — it is how I create, learn,
          communicate, build, connect, and explore.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28 }}
          className="text-secondary-text text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-20"
        >
          It is how I turn imagination into reality, and how I adapt and stay
          independent — including through accessibility and assistive tools.
        </motion.p>

        {/* Editorial capability list */}
        <div className="text-left">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
              className="group flex items-center gap-6 sm:gap-10 py-6 sm:py-7 border-b border-white/8 last:border-b-0"
            >
              <span className="font-mono text-[10px] sm:text-xs text-secondary-text/70 tracking-[0.3em] w-8 flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none text-white/85 group-hover:text-electric-blue transition-colors duration-500">
                {cap.title}
              </h3>
              <span className="flex-1 h-px bg-white/10 group-hover:bg-electric-blue/50 transition-colors duration-500" />
              <p className="hidden md:block text-secondary-text text-sm leading-relaxed max-w-xs">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
