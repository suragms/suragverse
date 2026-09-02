"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/lenis";

/**
 * Final CTA — the cinematic closing statement.
 * "THE JOURNEY / CONTINUES." leading into the last impression.
 */
export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const handleWork = () => scrollToSection("#my-work");
  const handleConnect = () => scrollToSection("#connect");

  return (
    <section
      ref={ref}
      className="relative py-28 sm:py-36 lg:py-48 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-electric-blue/5 blur-[150px]" />
      </div>

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-6 font-mono"
        >
          THE JOURNEY CONTINUES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.88] mb-10 sm:mb-14"
        >
          THE JOURNEY
          <br />
          <span className="gradient-text">CONTINUES.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="text-secondary-text text-lg sm:text-xl md:text-2xl leading-snug mb-12 sm:mb-16 max-w-2xl mx-auto"
        >
          THIS IS NOT
          <br />
          THE END.
          <br />
          <span className="text-white font-semibold">IT&apos;S JUST</span>
          <br />
          THE NEXT CHAPTER.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleWork}
            className="group inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-black text-xs sm:text-sm font-bold tracking-wider hover:bg-electric-blue transition-colors duration-500 min-h-[48px] w-full sm:w-auto"
          >
            EXPLORE MY WORK
            <ArrowRight
              size={16}
              className="group-hover:translate-x-2 transition-transform duration-300"
            />
          </button>
          <button
            onClick={handleConnect}
            className="group inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full border border-electric-blue/40 text-electric-blue text-xs sm:text-sm font-bold tracking-wider hover:bg-electric-blue/10 transition-all duration-500 min-h-[48px] w-full sm:w-auto"
          >
            CONNECT WITH ME
            <ArrowRight
              size={16}
              className="group-hover:translate-x-2 transition-transform duration-300"
            />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
