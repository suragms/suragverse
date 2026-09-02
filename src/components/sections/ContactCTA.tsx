"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { scrollToSection } from "@/lib/lenis";
import { brandImages } from "@/data/images";

/**
 * Final CTA — the cinematic closing scene.
 * The dramatic studio portrait slowly emerges from darkness while the copy
 * lands. Minimal, dark, emotional.
 */
export default function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [0.82, 1.05]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 1]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden border-t border-glass-border"
    >
      {/* Dark dramatic backdrop */}
      <div className="absolute inset-0 bg-background" />
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[520px] h-[720px] rounded-full bg-electric-blue/8 blur-[120px]" />
        <div className="absolute left-[15%] bottom-[10%] w-[360px] h-[360px] rounded-full bg-purple/6 blur-[110px]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Portrait emerging from darkness */}
        <div className="relative order-2 lg:order-1 flex justify-center">
          <motion.div
            style={{ scale: imgScale, opacity: imgOpacity }}
            className="relative w-full max-w-[400px]"
          >
            <div
              className="absolute inset-0 rounded-[2rem] blur-3xl"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(0,217,255,0.22), transparent 70%)",
              }}
            />
            <div className="relative aspect-[2/3] rounded-3xl overflow-hidden border border-white/5">
              <Image
                src={brandImages.cta.src}
                alt={brandImages.cta.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                loading="lazy"
                quality={85}
                className="object-cover"
                style={{ objectPosition: brandImages.cta.objectPosition }}
              />
              {/* emerge-from-dark grade */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.55), transparent 35%, transparent 70%, rgba(5,5,5,0.6))",
                }}
              />
              {/* subtle light sweep */}
              <div
                className="absolute inset-0 mix-blend-screen pointer-events-none"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(50% 35% at 50% 22%, rgba(255,255,255,0.12), transparent 70%)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-xs tracking-[0.5em] text-electric-blue mb-6 font-mono"
          >
            YOUR NEXT CHAPTER
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-8"
          >
            THE JOURNEY
            <br />
            IS JUST
            <br />
            <span className="gradient-text">BEGINNING.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-secondary-text text-lg mb-10 max-w-lg mx-auto lg:mx-0"
          >
            HAVE AN IDEA? LET&apos;S MAKE IT REAL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={() => scrollToSection("#enquiry-form")}
              className="group inline-flex items-center gap-3 px-9 py-4.5 rounded-full bg-white text-black text-sm font-bold tracking-wider hover:bg-electric-blue transition-colors duration-500 hover:shadow-[0_0_50px_rgba(0,217,255,0.3)]"
            >
              START A PROJECT
              <ArrowRight
                size={17}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </button>
            <a
              href={contactInfo.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-9 py-4.5 rounded-full border border-electric-blue/40 text-electric-blue text-sm font-bold tracking-wider hover:bg-electric-blue/10 transition-all duration-500"
            >
              EXPLORE MY DIGITAL HUB
              <ArrowUpRight
                size={17}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
