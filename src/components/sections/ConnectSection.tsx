"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { brandImages } from "@/data/images";
import { contactInfo } from "@/data/contact";
import { scrollToSection } from "@/lib/lenis";

const availableFor = [
  "Freelance Projects",
  "Full-Stack Development",
  "AI-related Work",
  "AI Automation",
  "Business Support",
  "Business Development",
  "Architectural Consultations",
  "Technology Collaborations",
];

/**
 * Section 13 — LET'S CONNECT.
 * Cinematic closing with the dramatic studio portrait and enquiry options.
 */
export default function ConnectSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.05]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);

  return (
    <section
      id="connect"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[440px] h-[640px] rounded-full bg-electric-blue/8 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Portrait emerging from darkness */}
        <div className="relative order-2 lg:order-1 flex justify-center">
          <motion.div
            style={{ scale: imgScale, opacity: imgOpacity }}
            className="relative w-full max-w-[380px]"
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
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.5), transparent 35%, transparent 70%, rgba(5,5,5,0.6))",
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
            className="text-[10px] sm:text-xs tracking-[0.5em] text-electric-blue mb-6 font-mono"
          >
            LET&apos;S CONNECT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-6"
          >
            LET&apos;S CREATE
            <br />
            SOMETHING
            <br />
            <span className="gradient-text">MEANINGFUL.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="text-secondary-text text-base sm:text-lg mb-8 max-w-lg mx-auto lg:mx-0"
          >
            Whether you have an idea, an opportunity, a collaboration, or simply
            want to connect — I&apos;d love to hear from you.
          </motion.p>

          {/* DM for enquiries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="mb-8"
          >
            <p className="text-[10px] tracking-[0.4em] text-secondary-text font-mono mb-4">
              DM FOR ENQUIRIES
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {availableFor.map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-1.5 rounded-full border border-glass-border text-[10px] tracking-wider text-secondary-text"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a
              href={contactInfo.emailHref}
              className="group inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-black text-xs sm:text-sm font-bold tracking-wider hover:bg-electric-blue transition-colors duration-500 min-h-[48px] w-full sm:w-auto"
            >
              <Mail size={16} />
              SEND AN ENQUIRY
              <ArrowRight
                size={16}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </a>
            <a
              href={contactInfo.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full border border-electric-blue/40 text-electric-blue text-xs sm:text-sm font-bold tracking-wider hover:bg-electric-blue/10 transition-all duration-500 min-h-[48px] w-full sm:w-auto"
            >
              EXPLORE MY DIGITAL HUB
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
