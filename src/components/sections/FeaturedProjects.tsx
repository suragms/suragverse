"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { featuredProjects, type Project } from "@/data/projects";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      data-cursor-card
      className="group relative glass rounded-3xl overflow-hidden"
    >
      {/* Image area */}
      <div className="relative h-56 sm:h-64 bg-secondary-bg overflow-hidden">
        <Image
          src={project.image}
          alt={`Preview of ${project.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
          loading="lazy"
          quality={80}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Color tint overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${project.color}, transparent)`,
          }}
        />

        {/* Status badge */}
        <div className="absolute top-4 left-4 z-10">
          <div
            className="px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1.5"
            style={{
              backgroundColor: `${project.color}15`,
              color: project.color,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: project.color,
                animation: project.status === "building" ? "pulse 2s infinite" : undefined,
              }}
            />
            {project.status.replace("-", " ")}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-wide mb-2">
          {project.name.toUpperCase()}
        </h3>
        <p className="text-secondary-text text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full border border-glass-border text-secondary-text"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-white hover:text-electric-blue transition-colors group/link"
          >
            VISIT WEBSITE
            <ExternalLink
              size={12}
              className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
            />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="websites" className="relative py-32 sm:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
          >
            FEATURED CREATIONS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]"
          >
            EXPLORE MY
            <br />
            <span className="gradient-text">DIGITAL CREATIONS.</span>
          </motion.h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
