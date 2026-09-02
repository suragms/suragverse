"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { technologies } from "@/data/technologies";

function TechBadge({
  tech,
  index,
}: {
  tech: (typeof technologies)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.04,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -4,
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      data-cursor-card
      className="glass rounded-2xl px-6 py-4 flex items-center gap-4 group cursor-default"
    >
      {/* Color dot */}
      <div
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: tech.color }}
      />

      <div>
        <p className="text-sm font-semibold tracking-wide">{tech.name}</p>
        <p className="text-[10px] text-secondary-text tracking-wider uppercase">
          {tech.category}
        </p>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${tech.color}06, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-20 sm:py-32 lg:py-40 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] text-electric-blue mb-4 font-mono"
          >
            TECHNOLOGY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
          >
            THE STACK
            <br />
            <span className="gradient-text">BEHIND THE MAGIC.</span>
          </motion.h2>
        </div>

        {/* Tech grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 relative"
        >
          {technologies.map((tech, i) => (
            <TechBadge key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
