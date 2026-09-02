"use client";

import { useRef } from "react";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { Globe, Bot, Monitor, Palette, Rocket } from "lucide-react";

const categories = [
  {
    icon: Globe,
    title: "Websites",
    description: "Modern, responsive web experiences",
    color: "#00D9FF",
  },
  {
    icon: Bot,
    title: "AI Projects",
    description: "Intelligent solutions powered by AI",
    color: "#7C3AED",
  },
  {
    icon: Monitor,
    title: "Applications",
    description: "Full-featured digital products",
    color: "#39FF88",
  },
  {
    icon: Palette,
    title: "Creative Work",
    description: "Design, motion & visual experiments",
    color: "#00D9FF",
  },
  {
    icon: Rocket,
    title: "Experiments",
    description: "Pushing boundaries of technology",
    color: "#7C3AED",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as unknown as Easing },
  },
};

export default function UniverseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="universe" className="relative py-32 sm:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
          >
            THE DIGITAL UNIVERSE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]"
          >
            ONE CREATOR.
            <br />
            <span className="gradient-text">MANY DIGITAL WORLDS.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-secondary-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Explore a growing universe of websites, applications, AI projects,
            and creative digital experiences.
          </motion.p>
        </div>

        {/* Category Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              data-cursor-card
              className="group glass rounded-2xl p-6 cursor-pointer relative overflow-hidden"
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${cat.color}08, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${cat.color}10` }}
                >
                  <cat.icon size={18} style={{ color: cat.color }} />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold tracking-wide mb-2">
                  {cat.title.toUpperCase()}
                </h3>
                <p className="text-xs text-secondary-text leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
