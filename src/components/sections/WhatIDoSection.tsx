"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { brandImages } from "@/data/images";
import { services } from "@/data/services";

/**
 * Section 07 — WHAT I DO.
 * An editorial, numbered service list — not eight identical cards.
 * The professional portrait anchors the section.
 */
export default function WhatIDoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="what-i-do"
      ref={ref}
      className="relative py-28 sm:py-36 lg:py-48 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Professional portrait + heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-5 font-mono"
            >
              WHAT I DO
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.88] mb-8"
            >
              WHAT
              <br />
              <span className="gradient-text">I DO.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-secondary-text text-base leading-relaxed max-w-md mb-10"
            >
              Professional, creative, and future-focused — I bring ideas to life
              across AI, development, and digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={brandImages.professional.src}
                  alt={brandImages.professional.alt}
                  fill
                  sizes="40vw"
                  loading="lazy"
                  quality={85}
                  className="object-cover"
                  style={{ objectPosition: brandImages.professional.objectPosition }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,5,5,0.1), transparent 50%, rgba(5,5,5,0.45))",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Editorial service list */}
          <div className="lg:col-span-7">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.6 }}
                className="group relative py-6 sm:py-7 border-b border-white/8 last:border-b-0 cursor-default"
              >
                {/* Hover wash */}
                <div className="absolute inset-0 -z-10 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-baseline gap-6 sm:gap-8">
                  <span className="font-mono text-xs text-secondary-text/70 tracking-[0.3em] w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg sm:text-2xl md:text-3xl font-bold tracking-tight uppercase group-hover:text-electric-blue transition-colors duration-500">
                    {service.title}
                  </h3>
                  <span className="flex-1" />
                  <ArrowUpRight
                    size={18}
                    className="text-secondary-text opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-electric-blue transition-all duration-500 flex-shrink-0"
                  />
                </div>
                <p className="mt-2 ml-14 sm:ml-16 text-secondary-text text-sm leading-relaxed max-w-lg">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
