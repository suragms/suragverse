"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { brandImages } from "@/data/images";
import { personalStory } from "@/data/personal";

/**
 * Section 05 — MY STORY.
 * Quiet, honest, and dignified. No pity, no cliché, no helplessness.
 * The disability is part of the story — never the whole of it.
 */
export default function ChallengesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section
      id="my-story"
      ref={ref}
      className="relative py-28 sm:py-36 lg:py-48 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      {/* Calm, restrained atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 w-[540px] h-[540px] -translate-x-1/2 rounded-full bg-electric-blue/4 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Content — given the space to breathe */}
        <div className="order-1 lg:order-1 lg:col-span-7 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-5 font-mono"
          >
            MY STORY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] mb-10"
          >
            {personalStory.heading.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight text-white/90 max-w-2xl mx-auto lg:mx-0 mb-10"
          >
            {personalStory.statement}
            <br />
            <span className="text-soft-blue mt-2 block text-xl sm:text-2xl md:text-3xl font-semibold">
              {personalStory.statementHighlight}
            </span>
          </motion.p>

          <div className="space-y-5 mb-12 max-w-xl mx-auto lg:mx-0 text-left">
            {personalStory.realities.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.7 }}
                className="flex items-start gap-4 text-secondary-text text-base leading-relaxed"
              >
                <span className="mt-3 w-px h-4 bg-electric-blue/60 flex-shrink-0" />
                <span>{line}</span>
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-secondary-text text-base leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            {personalStory.closing}
          </motion.p>
        </div>

        {/* Visual — a dignified portrait, unadorned */}
        <motion.div style={{ y }} className="order-2 lg:order-2 lg:col-span-5">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src={brandImages.creative.src}
              alt={brandImages.creative.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              loading="lazy"
              quality={85}
              className="object-cover"
              style={{ objectPosition: brandImages.creative.objectPosition }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,5,5,0.15), transparent 50%, rgba(5,5,5,0.5))",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
