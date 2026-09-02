"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { status } from "@/data/status";

/**
 * Section 08 — MY STATUS / WHERE I AM RIGHT NOW.
 * Fully driven by the centralized src/data/status.ts configuration.
 */
export default function StatusSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="status"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
        >
          MY STATUS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.92] mb-12 sm:mb-16"
        >
          {status.heading.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left">
          {status.items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
              className="pro-card rounded-2xl border border-glass-border bg-white/[0.02] p-6 flex items-start gap-4"
            >
              <span className="relative mt-1 flex-shrink-0" aria-hidden="true">
                <span
                  className="block w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color || "#38BDF8" }}
                />
                <span
                  className="absolute inset-0 w-2.5 h-2.5 rounded-full animate-ping opacity-40"
                  style={{ backgroundColor: item.color || "#38BDF8" }}
                />
              </span>
              <div>
                <h3
                  className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-wide mb-1.5"
                  style={{ color: item.color || "#FFFFFF" }}
                >
                  {item.label}
                </h3>
                <p className="text-secondary-text text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
