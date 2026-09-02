"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { brandImages } from "@/data/images";

const skills = [
  "AI",
  "WEB DEVELOPMENT",
  "REACT",
  "NEXT.JS",
  "DATA SCIENCE",
  "UI/UX",
  "PYTHON",
  "CREATIVE TECHNOLOGY",
];

const stats = [
  { value: "10+", label: "PROJECTS" },
  { value: "5+", label: "TECHNOLOGIES" },
  { value: "∞", label: "IDEAS" },
];

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: "backOut" }}
        className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-2"
      >
        {value}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xs tracking-[0.3em] text-secondary-text"
      >
        {label}
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" ref={ref} className="relative py-20 sm:py-32 lg:py-40 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image / Visual */}
          <motion.div style={{ y }} className="relative order-2 lg:order-1">
            {/* Primary — the real human portrait */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass">
              <Image
                src={brandImages.aboutBw.src}
                alt={brandImages.aboutBw.alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                quality={85}
                className="object-cover"
                style={{ objectPosition: brandImages.aboutBw.objectPosition }}
              />

              {/* Cinematic grade over the real photo */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.2), transparent 40%, rgba(5,5,5,0.5))",
                }}
              />

              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Corner accents */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-6 sm:w-8 h-6 sm:h-8 border-l border-t border-white/10 pointer-events-none" />
              <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-6 sm:w-8 h-6 sm:h-8 border-r border-b border-white/10 pointer-events-none" />
            </div>

            {/* Secondary — AI contemplative portrait (artistic layer) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -bottom-6 -right-2 sm:-right-8 w-28 sm:w-36 md:w-44 aspect-[4/5] rounded-2xl overflow-hidden border border-glass-border shadow-2xl"
            >
              <Image
                src={brandImages.aboutAi.src}
                alt={brandImages.aboutAi.alt}
                fill
                sizes="(max-width: 640px) 40vw, 180px"
                loading="lazy"
                quality={80}
                className="object-cover"
                style={{ objectPosition: brandImages.aboutAi.objectPosition }}
              />
              <div className="absolute inset-0 bg-electric-blue/10 mix-blend-overlay pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
            >
              ABOUT THE CREATOR
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-6 sm:mb-8"
            >
              THE MIND
              <br />
              <span className="gradient-text">BEHIND THE UNIVERSE.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-secondary-text text-base leading-relaxed mb-6"
            >
              I am <span className="text-white font-medium">Surag M S</span>, a
              digital creator passionate about building meaningful websites,
              applications, AI-powered solutions, and innovative technology
              experiences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-secondary-text text-base leading-relaxed mb-8"
            >
              My mission is to transform ideas into powerful digital experiences
              that push the boundaries of what&apos;s possible on the web.
            </motion.p>

            {/* Skill badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-12"
            >
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="px-4 py-2 text-[10px] font-semibold tracking-wider rounded-full border border-glass-border text-secondary-text hover:border-electric-blue/30 hover:text-white transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
