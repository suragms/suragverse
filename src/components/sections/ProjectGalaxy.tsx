"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";

// Generate deterministic positions in a galaxy-like layout
function generateGalaxyPositions(count: number) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const pseudoRand1 = Math.sin(i * 12.9898) * 0.5 + 0.5;
    const pseudoRand2 = Math.cos(i * 78.233) * 0.5 + 0.5;
    const pseudoRand3 = Math.sin(i * 45.164) * 0.5 + 0.5;

    const angle = (i / count) * Math.PI * 2 + pseudoRand1 * 0.5;
    const radius = 120 + pseudoRand2 * 180;
    positions.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.6,
      size: 60 + pseudoRand3 * 40,
    });
  }
  return positions;
}

function ProjectNode({
  project,
  position,
  onClick,
  index,
}: {
  project: Project;
  position: { x: number; y: number; size: number };
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "backOut" }}
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      data-cursor-card
      className="absolute group"
      style={{
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          width: position.size,
          height: position.size,
          background: `radial-gradient(circle at 35% 35%, ${project.color}30, ${project.color}08)`,
          border: `1px solid ${project.color}25`,
          boxShadow: `0 0 ${position.size * 0.5}px ${project.color}10`,
        }}
      >
        <span className="text-[10px] font-bold tracking-wider text-center px-2 leading-tight">
          {project.name.split(" ")[0]}
        </span>
      </div>

      <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-center">
        <p className="text-xs font-semibold">{project.name}</p>
        <p className="text-[10px] text-secondary-text">{project.description.slice(0, 40)}...</p>
      </div>
    </motion.button>
  );
}

function ConnectionLines({ positions }: { positions: { x: number; y: number }[] }) {
  const lines = useMemo(() => {
    const result = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          result.push({
            x1: positions[i].x,
            y1: positions[i].y,
            x2: positions[j].x,
            y2: positions[j].y,
            opacity: 1 - dist / 250,
          });
        }
      }
    }
    return result;
  }, [positions]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {lines.map((line, i) => (
        <motion.line
          key={i}
          x1={`calc(50% + ${line.x1}px)`}
          y1={`calc(50% + ${line.y1}px)`}
          x2={`calc(50% + ${line.x2}px)`}
          y2={`calc(50% + ${line.y2}px)`}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: i * 0.05 }}
        />
      ))}
    </svg>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative glass rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full border border-glass-border flex items-center justify-center hover:bg-white/5 transition-colors"
          aria-label="Close project details"
        >
          <X size={14} />
        </button>

        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase mb-6"
          style={{
            backgroundColor: `${project.color}15`,
            color: project.color,
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          {project.status.replace("-", " ")}
        </div>

        <h3 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold tracking-wide mb-3">
          {project.name.toUpperCase()}
        </h3>

        <p className="text-secondary-text text-sm leading-relaxed mb-6">
          {project.longDescription || project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full border border-glass-border text-secondary-text"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider border border-white/20 rounded-full hover:bg-white/5 transition-all min-h-[44px]"
          >
            VISIT WEBSITE
            <ArrowUpRight size={14} />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ProjectGalaxy() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const positions = useMemo(() => generateGalaxyPositions(projects.length), []);

  return (
    <section id="projects" className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] text-electric-blue mb-4 font-mono"
          >
            NAVIGATE THE GALAXY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
          >
            PROJECT <span className="gradient-text">GALAXY.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 sm:mt-6 text-secondary-text text-sm sm:text-base max-w-xl mx-auto px-4"
          >
            {isMobile ? "Tap any project to explore." : "Click on any node to explore the project."}
          </motion.p>
        </div>

        {/* Desktop/Tablet: Galaxy visualization */}
        {!isMobile && (
          <div className="relative w-full h-[500px] sm:h-[600px] hidden md:block">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-electric-blue/5 blur-3xl" />
            <ConnectionLines positions={positions} />
            {projects.map((project, i) => (
              <ProjectNode
                key={project.slug}
                project={project}
                position={positions[i]}
                onClick={() => setSelected(project)}
                index={i}
              />
            ))}
          </div>
        )}

        {/* Mobile: Vertical project list */}
        {isMobile && (
          <div className="md:hidden flex flex-col gap-3">
            {projects.map((project, i) => (
              <motion.button
                key={project.slug}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onClick={() => setSelected(project)}
                className="glass rounded-2xl p-5 text-left flex items-center gap-4 active:bg-white/[0.06] transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${project.color}30, ${project.color}08)`,
                    border: `1px solid ${project.color}25`,
                  }}
                >
                  <span className="text-[10px] font-bold tracking-wider">
                    {project.name.split(" ")[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-wide truncate">
                    {project.name}
                  </p>
                  <p className="text-[11px] text-secondary-text truncate">
                    {project.description}
                  </p>
                </div>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: project.color }}
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
