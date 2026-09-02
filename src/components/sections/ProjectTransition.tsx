"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { brandImages } from "@/data/images";
import { scrollToSection } from "@/lib/lenis";

const stages = ["CREATIVITY", "IMAGINATION", "TECHNOLOGY", "CREATION"];

const projects = [
  { name: "PROJECT FORESIGHT", color: "#00D9FF" },
  { name: "HEXA BILL", color: "#7C3AED" },
  { name: "OMNIROUTE", color: "#39FF88" },
  { name: "FUTURE PROJECTS", color: "#A1A1AA" },
];

/**
 * Project transition — an artistic bridge from the creator's world into the
 * project universe. The creative composite photograph sits behind a film of
 * cycling words and dissolves into the project names.
 */
export default function ProjectTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const fadeUp = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[130vh] flex items-center justify-center overflow-hidden"
    >
      {/* Creative composite background */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: bgScale, opacity: bgOpacity }}
      >
        <Image
          src={brandImages.creative.src}
          alt={brandImages.creative.alt}
          fill
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
          style={{ objectPosition: brandImages.creative.objectPosition }}
        />
        {/* Grade so text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/55 to-background" />
        <div className="absolute inset-0 bg-background/40" />
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center py-40">
        {/* Cycling stages */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-14 font-mono text-xs sm:text-sm tracking-[0.4em] text-white/70">
          {stages.map((stage, i) => (
            <motion.span
              key={stage}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.25 }}
              className="flex items-center gap-4"
            >
              <span className="text-electric-blue">{stage}</span>
              {i < stages.length - 1 && <span className="text-white/30">→</span>}
            </motion.span>
          ))}
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9 }}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-20"
        >
          THE IDEAS
          <br />
          <span className="gradient-text">BECOME REAL.</span>
        </motion.h2>

        {/* Project names bridge to the 3D universe */}
        <motion.div
          style={{ opacity: fadeUp }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
        >
          {projects.map((p) => (
            <button
              key={p.name}
              onClick={() => scrollToSection("#projects")}
              className="group relative px-7 py-4 rounded-full border border-glass-border glass hover:border-white/40 transition-all duration-500"
            >
              <span
                className="font-[family-name:var(--font-heading)] text-sm sm:text-base font-bold tracking-[0.15em]"
                style={{ color: p.color }}
              >
                {p.name}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => scrollToSection("#projects")}
            className="flex flex-col items-center gap-2 text-secondary-text hover:text-white transition-colors"
            aria-label="Enter the project universe"
          >
            <span className="text-[10px] tracking-[0.4em] font-mono">ENTER</span>
            <ArrowDown size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
