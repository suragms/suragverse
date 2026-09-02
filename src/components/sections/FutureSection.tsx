"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Section 11 — WHAT'S NEXT.
 * Quiet, forward-looking. No hype, no cliché. "Still becoming."
 */
export default function FutureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="future"
      ref={ref}
      className="relative py-28 sm:py-36 lg:py-48 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 w-[500px] h-[500px] -translate-x-1/2 rounded-full bg-electric-blue/4 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
        >
          WHAT&apos;S NEXT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.88] mb-10"
        >
          STILL
          <br />
          <span className="gradient-text">BECOMING.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-secondary-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6"
        >
          The journey is still being written. There are more ideas to explore,
          more technologies to understand, more experiences to create, and more
          possibilities ahead.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-secondary-text text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
        >
          I&apos;m focused on applied AI, meaningful digital experiences, and
          building things that matter — one step at a time.
        </motion.p>
      </div>
    </section>
  );
}
