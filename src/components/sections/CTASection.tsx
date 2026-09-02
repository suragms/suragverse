"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToSection } from "@/lib/lenis";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  const handleExplore = () => {
    scrollToSection("#home");
  };

  return (
    <section ref={ref} className="relative py-20 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-electric-blue/5 blur-[80px] sm:blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] rounded-full bg-purple/5 blur-[60px] sm:blur-[100px]" />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.5em] text-electric-blue mb-8 font-mono"
        >
          YOUR JOURNEY AWAITS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.85] mb-8 sm:mb-12"
        >
          READY TO
          <br />
          EXPLORE THE
          <br />
          <span className="gradient-text">FUTURE?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <MagneticButton
            onClick={handleExplore}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-sm font-bold tracking-wider rounded-full hover:bg-electric-blue transition-colors duration-500 hover:shadow-[0_0_50px_rgba(0,217,255,0.3)]"
          >
            ENTER SURAGVERSE
            <ArrowRight
              size={18}
              className="group-hover:translate-x-2 transition-transform duration-300"
            />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
