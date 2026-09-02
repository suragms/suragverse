"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { brandImages } from "@/data/images";

const realities = [
  "I am a person first — a creator, a learner, a professional.",
  "I live with a physical disability. It is part of my story, not the whole of it.",
  "Technology and assistive tools help me interact, create, learn, and keep building.",
  "My challenges shape my approach, but they don't define my limits.",
];

/**
 * Section 05 — MY STORY & CHALLENGES.
 * Written with dignity and authenticity — no pity, no cliché, no helplessness.
 * Focus: independence, skills, determination, and the role of technology.
 */
export default function ChallengesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="my-story"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      {/* Calm ambient glow — powerful, not dramatic */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/4 w-[520px] h-[520px] -translate-x-1/2 rounded-full bg-electric-blue/5 blur-[130px]" />
        <div className="absolute right-[10%] bottom-[15%] w-[340px] h-[340px] rounded-full bg-purple/5 blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Content */}
        <div className="order-1 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
          >
            MY STORY &amp; CHALLENGES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] mb-8"
          >
            MY JOURNEY
            <br />
            <span className="gradient-text">IS DIFFERENT.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-8 text-white/90"
          >
            MY LIMITATIONS
            <br />
            DO NOT DEFINE
            <br />
            <span className="text-electric-blue">MY POSSIBILITIES.</span>
          </motion.div>

          <div className="space-y-4 mb-10">
            {realities.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12 }}
                className="flex items-start gap-3 text-secondary-text text-base leading-relaxed"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-electric-blue flex-shrink-0" />
                <span>{line}</span>
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="text-secondary-text text-base leading-relaxed max-w-xl"
          >
            Technology has always been more than a career for me. It is how I
            adapt, how I communicate, how I create — and how I keep moving
            forward, one build at a time.
          </motion.p>
        </div>

        {/* Visual — dignified studio portrait */}
        <motion.div
          style={{ y }}
          className="order-2 lg:order-2 relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-glass-border">
            <Image
              src={brandImages.creative.src}
              alt={brandImages.creative.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              loading="lazy"
              quality={85}
              className="object-cover"
              style={{ objectPosition: brandImages.creative.objectPosition }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,5,5,0.1), transparent 45%, rgba(5,5,5,0.5))",
              }}
            />
          </div>
          <div
            className="absolute -inset-3 -z-10 rounded-[2rem] opacity-50 blur-3xl"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(124,58,237,0.12), transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
