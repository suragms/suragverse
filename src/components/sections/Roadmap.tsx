"use client";

import { motion } from "framer-motion";
import { Check, Hammer, FlaskConical, Clock } from "lucide-react";
import { projects, type ProjectStatus } from "@/data/projects";

const statusConfig: Record<
  ProjectStatus,
  { label: string; icon: typeof Check; color: string }
> = {
  completed: { label: "COMPLETED", icon: Check, color: "#39FF88" },
  building: { label: "BUILDING", icon: Hammer, color: "#00D9FF" },
  experimenting: {
    label: "EXPERIMENTING",
    icon: FlaskConical,
    color: "#7C3AED",
  },
  "coming-soon": { label: "COMING SOON", icon: Clock, color: "#A1A1AA" },
};

export default function Roadmap() {
  return (
    <section className="relative py-32 sm:py-40 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
          >
            NOW BUILDING
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]"
          >
            THE FUTURE IS
            <br />
            <span className="gradient-text">UNDER CONSTRUCTION.</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-electric-blue/30 via-purple/30 to-transparent" />

          {projects.map((project, i) => {
            const config = statusConfig[project.status];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-center gap-6 mb-12 md:mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot on line */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10"
                  style={{ borderColor: config.color, backgroundColor: "#050505" }}
                />

                {/* Content card */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                  <div className="glass rounded-2xl p-6 group hover:border-white/10 transition-all duration-300">
                    {/* Status badge */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase mb-4"
                      style={{
                        backgroundColor: `${config.color}12`,
                        color: config.color,
                      }}
                    >
                      <config.icon size={12} />
                      {config.label}
                    </div>

                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-wide mb-2">
                      {project.name.toUpperCase()}
                    </h3>

                    <p className="text-secondary-text text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Progress indicator for building projects */}
                    {project.status === "building" && (
                      <div className="mt-4">
                        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "65%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${config.color}, transparent)`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {project.status === "coming-soon" && (
                      <div className="mt-4 flex gap-1">
                        {[...Array(3)].map((_, j) => (
                          <motion.div
                            key={j}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 1.5,
                              delay: j * 0.3,
                              repeat: Infinity,
                            }}
                            className="w-1 h-1 rounded-full bg-secondary-text"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
