"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { brandImages } from "@/data/images";
import { contactInfo } from "@/data/contact";

/**
 * Section 10 — MY DIGITAL WORLD.
 * A cinematic gateway to the dedicated portfolio. SURAGVERSE tells the story;
 * the portfolio holds the detailed work.
 */
export default function DigitalWorldSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="my-work"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
        >
          MY WORK
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.92] mb-6"
        >
          THE STORY
          <br />
          CONTINUES
          <br />
          <span className="gradient-text">THROUGH MY WORK.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-secondary-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-14"
        >
          SURAGVERSE tells the story. The portfolio holds the work — every
          project, website, and creation, all in one place.
        </motion.p>

        {/* Cinematic portal card */}
        <motion.a
          href={contactInfo.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="group relative block max-w-3xl mx-auto rounded-[2rem] overflow-hidden border border-glass-border text-left"
          aria-label={`Open my portfolio at ${contactInfo.portfolioLabel}`}
        >
          {/* Background image */}
          <div className="relative aspect-[16/9] sm:aspect-[2/1]">
            <Image
              src={brandImages.creative.src}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              loading="lazy"
              quality={80}
              className="object-cover object-center transition-transform duration-[1.5s] group-hover:scale-105"
              style={{ objectPosition: "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <Sparkles size={20} className="text-electric-blue mb-4" />
              <p className="font-[family-name:var(--font-heading)] text-lg sm:text-2xl font-bold tracking-tight leading-tight mb-6 max-w-lg">
                DISCOVER THE
                <br />
                DETAILED WORK.
              </p>
              <span className="inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-black text-xs sm:text-sm font-bold tracking-wider group-hover:bg-electric-blue transition-colors duration-500 min-h-[48px]">
                ENTER MY PORTFOLIO
                <ArrowUpRight
                  size={17}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </span>
              <span className="mt-4 text-[11px] text-secondary-text font-mono tracking-[0.2em]">
                {contactInfo.portfolioLabel}
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
