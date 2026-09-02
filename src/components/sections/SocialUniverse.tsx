"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { socials } from "@/data/socials";
import TiltCard from "@/components/ui/TiltCard";

export default function SocialUniverse() {
  return (
    <section className="relative py-32 sm:py-40 px-6 overflow-hidden border-t border-glass-border">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-electric-blue/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
          >
            SOCIAL UNIVERSE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]"
          >
            CONNECT ACROSS
            <br />
            <span className="gradient-text">THE UNIVERSE.</span>
          </motion.h2>
        </div>

        {/* Social cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.div
                key={social.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: (i % 3) * 0.1,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <TiltCard className="h-full" maxTilt={9}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-card
                    className="group relative block h-full rounded-2xl glass p-6 overflow-hidden hover:-translate-y-1.5 transition-transform duration-500"
                  >
                    {/* Identity accent glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 20% 0%, ${social.accent}1F, transparent 65%)`,
                      }}
                    />
                    {/* Accent edge */}
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-16 transition-all duration-500 rounded-full"
                      style={{ background: social.accent }}
                    />

                    <div className="flex items-start justify-between mb-8">
                      <span
                        className="w-12 h-12 rounded-xl border border-glass-border bg-white/[0.04] flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
                        style={{
                          boxShadow: "0 0 0 0 rgba(0,0,0,0)",
                        }}
                      >
                        <Icon
                          size={22}
                          className="transition-colors duration-500"
                        />
                      </span>

                      <span className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center text-secondary-text group-hover:text-white group-hover:border-transparent transition-all duration-500">
                        <ArrowUpRight
                          size={16}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                        />
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-1">
                      {social.name}
                    </h3>
                    <p className="text-sm text-secondary-text truncate">
                      {social.username}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.2em] text-secondary-text group-hover:text-electric-blue transition-colors duration-500">
                      FOLLOW
                      <span className="h-px w-0 group-hover:w-6 bg-electric-blue transition-all duration-500" />
                    </span>
                  </a>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
