"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { brandImages } from "@/data/images";
import { contactInfo } from "@/data/contact";

const pillars = [
  {
    title: "AI ENGINEERING",
    desc: "Intelligent systems, models, and data-driven product intelligence.",
  },
  {
    title: "FULL-STACK DEVELOPMENT",
    desc: "Robust applications engineered across the entire modern stack.",
  },
  {
    title: "DIGITAL PRODUCTS",
    desc: "From MVP to polished, scalable products designed and shipped.",
  },
  {
    title: "BUSINESS DEVELOPMENT",
    desc: "Strategy, scoping, and launch support that turns ideas into revenue.",
  },
  {
    title: "TECHNOLOGY SOLUTIONS",
    desc: "Research, innovation, and emerging-technology partnerships.",
  },
  {
    title: "FREELANCE COLLABORATION",
    desc: "End-to-end delivery of ambitious digital builds, on time.",
  },
];

/**
 * Professional credibility section — clean, business-focused, less
 * experimental. Anchored by the formal blue-checkered-suit portrait.
 */
export default function ProfessionalSection() {
  return (
    <section className="relative py-20 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 sm:gap-14 lg:gap-20 items-center mb-14 sm:mb-20">
          {/* Portrait card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
              className="absolute -inset-2 sm:-inset-3 -z-10 rounded-[1.5rem] sm:rounded-[2rem] opacity-60 blur-2xl sm:blur-3xl"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(0,217,255,0.12), transparent 70%)",
              }}
            />
          </motion.div>

          {/* Heading */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
            >
              THE PROFESSIONAL
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[0.92] mb-4 sm:mb-6"
            >
              MORE THAN
              <br />
              <span className="gradient-text">JUST CODE.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-secondary-text text-base leading-relaxed max-w-xl mb-8"
            >
              Professional, creative, future-focused — I partner with people and
              businesses to build technology that is reliable, intelligent, and
              built to last.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              href={contactInfo.emailHref}
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-white hover:text-electric-blue transition-colors"
            >
              LET&apos;S WORK TOGETHER
              <ArrowUpRight size={16} />
            </motion.a>
          </div>
        </div>

        {/* Service pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              className="pro-card rounded-2xl border border-glass-border bg-white/[0.02] p-6"
            >
              <div className="w-9 h-9 rounded-full border border-electric-blue/30 flex items-center justify-center mb-4">
                <span className="text-electric-blue font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-base font-bold tracking-wide mb-2">
                {pillar.title}
              </h3>
              <p className="text-secondary-text text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
