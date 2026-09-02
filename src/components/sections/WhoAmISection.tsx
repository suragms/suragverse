"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { brandImages } from "@/data/images";

/**
 * Section 03 — WHO AM I?
 * A deeply personal introduction before the professional identity.
 * Anchored by the genuine black-and-white portrait.
 */
export default function WhoAmISection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="who-i-am"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <motion.div style={{ y }} className="relative order-2 lg:order-1">
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
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.15), transparent 40%, rgba(5,5,5,0.45))",
                }}
              />
              <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-white/10 pointer-events-none" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-white/10 pointer-events-none" />
            </div>

            {/* Secondary AI portrait — artistic layer, kept smaller */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -bottom-8 -right-3 sm:-right-8 w-32 sm:w-44 aspect-[4/5] rounded-2xl overflow-hidden border border-glass-border shadow-2xl"
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
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-4 font-mono"
            >
              WHO AM I?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.92] mb-8"
            >
              MORE THAN
              <br />
              <span className="gradient-text">A DEVELOPER.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-secondary-text text-base leading-relaxed mb-6 text-left lg:text-left"
            >
              I&apos;m Surag M S — a technology enthusiast, developer, creator,
              and lifelong learner from Kerala, India.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-secondary-text text-base leading-relaxed mb-6 text-left lg:text-left"
            >
              I believe technology can turn ideas into meaningful experiences —
              and possibilities into reality.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-secondary-text text-base leading-relaxed text-left lg:text-left"
            >
              My journey isn&apos;t only about writing code or building websites.
              It&apos;s about learning, adapting, creating, overcoming challenges,
              and continuing to move forward.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
