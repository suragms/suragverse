"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { brandImages } from "@/data/images";
import { whoAmI, identityPoints } from "@/data/personal";

/**
 * Section 03 — WHO AM I.
 * Editorial magazine layout: a large statement, a personal introduction,
 * and identity points expressed as typography — not skill cards.
 */
export default function WhoAmISection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="who-i-am"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-44 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Portrait — the genuine human, the anchor */}
          <motion.div style={{ y }} className="relative order-2 lg:order-1 lg:col-span-6">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src={brandImages.aboutBw.src}
                alt={brandImages.aboutBw.alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 48vw"
                quality={85}
                className="object-cover"
                style={{ objectPosition: brandImages.aboutBw.objectPosition }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.2), transparent 45%, rgba(5,5,5,0.5))",
                }}
              />
            </div>
          </motion.div>

          {/* Editorial content */}
          <div className="order-1 lg:order-2 lg:col-span-6 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-5 font-mono"
            >
              WHO I AM
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] mb-8"
            >
              MORE THAN
              <br />
              <span className="gradient-text">WHAT I DO.</span>
            </motion.h2>

            {/* Personal introduction */}
            <div className="space-y-4 mb-10 max-w-xl mx-auto lg:mx-0">
              {whoAmI.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-secondary-text text-base leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Identity points — editorial, not cards */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 max-w-lg mx-auto lg:mx-0 text-left">
              {identityPoints.map((point, i) => (
                <motion.div
                  key={point.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="group border-l border-white/10 pl-4 hover:border-electric-blue/50 transition-colors duration-500"
                >
                  <span className="font-mono text-[10px] text-secondary-text tracking-[0.3em]">
                    {point.index}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-bold tracking-tight mt-1">
                    {point.label}
                  </h3>
                  <p className="text-secondary-text text-sm leading-relaxed mt-1">
                    {point.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
