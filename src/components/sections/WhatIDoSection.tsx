"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { brandImages } from "@/data/images";

const services = [
  {
    title: "APPLIED AI ENGINEERING",
    desc: "Building practical AI-powered experiences and intelligent solutions.",
  },
  {
    title: "FULL-STACK DEVELOPMENT",
    desc: "Creating modern, responsive, scalable web applications.",
  },
  {
    title: "AI AUTOMATION",
    desc: "Exploring intelligent workflows and automation solutions.",
  },
  {
    title: "WEB DEVELOPMENT",
    desc: "Designing and building modern digital experiences.",
  },
  {
    title: "BUSINESS SUPPORT & DEVELOPMENT",
    desc: "Supporting digital ideas and technology-focused business initiatives.",
  },
  {
    title: "ARCHITECTURAL CONSULTATIONS",
    desc: "Blueprinting products and systems before a single line of code is written.",
  },
  {
    title: "DIGITAL CREATIVE WORK",
    desc: "Exploring creative technology, interfaces, experiences, and ideas.",
  },
];

/**
 * Section 07 — WHAT I DO / WHAT I CREATE.
 * Professional, elegant service cards — NOT a project portfolio.
 */
export default function WhatIDoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="what-i-do"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center mb-16 lg:mb-20">
          {/* Professional portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-glass-border">
              <Image
                src={brandImages.professional.src}
                alt={brandImages.professional.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                loading="lazy"
                quality={85}
                className="object-cover"
                style={{ objectPosition: brandImages.professional.objectPosition }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.1), transparent 45%, rgba(5,5,5,0.45))",
                }}
              />
            </div>
            <div
              className="absolute -inset-3 -z-10 rounded-[2rem] opacity-60 blur-3xl"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(0,217,255,0.12), transparent 70%)",
              }}
            />
          </motion.div>

          {/* Heading */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
            >
              WHAT I DO
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.92] mb-6"
            >
              WHAT I
              <br />
              <span className="gradient-text">CREATE.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-secondary-text text-base leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Professional, creative, and future-focused — I bring ideas to life
              across AI, development, and digital experiences.
            </motion.p>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + (i % 3) * 0.1, duration: 0.6 }}
              className="pro-card rounded-2xl border border-glass-border bg-white/[0.02] p-6"
            >
              <div className="w-9 h-9 rounded-full border border-electric-blue/30 flex items-center justify-center mb-4">
                <span className="text-electric-blue font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-wide mb-2">
                {service.title}
              </h3>
              <p className="text-secondary-text text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
