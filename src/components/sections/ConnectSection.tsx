"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { brandImages } from "@/data/images";
import { contactInfo } from "@/data/contact";
import { socials } from "@/data/socials";

const availability = [
  "Freelance Projects",
  "Applied AI Work",
  "Full-Stack Development",
  "AI Automation",
  "Business Support",
  "Business Development",
  "Technology Collaboration",
  "Architectural Consultations",
];

/**
 * Section 12 — LET'S CONNECT.
 * The single unified contact experience: portrait, message, availability,
 * primary CTAs, direct details, and social links.
 * "LET'S CREATE WHAT'S NEXT."
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
      className="relative py-28 sm:py-36 lg:py-48 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[440px] h-[640px] rounded-full bg-electric-blue/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Portrait */}
        <div className="relative order-2 lg:order-1 lg:col-span-5 flex justify-center">
          <motion.div
            style={{ scale: imgScale, opacity: imgOpacity }}
            className="relative w-full max-w-[380px]"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/5">
              <Image
                src={brandImages.cta.src}
                alt={brandImages.cta.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 36vw"
                loading="lazy"
                quality={85}
                className="object-cover"
                style={{ objectPosition: brandImages.cta.objectPosition }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,5,5,0.4), transparent 35%, transparent 70%, rgba(5,5,5,0.5))",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Copy + contact details */}
        <div className="order-1 lg:order-2 lg:col-span-7 text-center lg:text-left">
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
            className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] mb-6"
          >
            LET&apos;S BUILD
            <br />
            <span className="gradient-text">WHAT&apos;S NEXT.</span>
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

          {/* Professional availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.32 }}
            className="mb-10"
          >
            <p className="text-[10px] tracking-[0.4em] text-secondary-text font-mono mb-4 text-center lg:text-left">
              DM FOR ENQUIRIES
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {availability.map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-1.5 rounded-full border border-glass-border text-[10px] tracking-wider text-secondary-text"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
          >
            <a
              href={contactInfo.emailHref}
              className="group inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-black text-xs sm:text-sm font-bold tracking-wider hover:bg-electric-blue transition-colors duration-500 min-h-[48px] w-full sm:w-auto"
            >
              <Mail size={16} />
              START A CONVERSATION
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
              VISIT MY DIGITAL HUB
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </a>
          </motion.div>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-lg mx-auto lg:mx-0"
          >
            <div>
              <p className="text-[10px] tracking-[0.4em] text-secondary-text font-mono mb-2">
                EMAIL
              </p>
              <a
                href={contactInfo.emailHref}
                className="text-sm text-white/80 hover:text-electric-blue transition-colors"
              >
                {contactInfo.email}
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] text-secondary-text font-mono mb-2">
                PHONE
              </p>
              <a
                href={contactInfo.phoneHref}
                className="text-sm text-white/80 hover:text-electric-blue transition-colors"
              >
                {contactInfo.phone}
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] text-secondary-text font-mono mb-2">
                PORTFOLIO
              </p>
              <a
                href={contactInfo.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-electric-blue transition-colors"
              >
                {contactInfo.portfolioLabel}
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.4em] text-secondary-text font-mono mb-2">
                LINKTREE
              </p>
              <a
                href={contactInfo.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-electric-blue transition-colors"
              >
                linktr.ee/suragdevstudio
              </a>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-[10px] tracking-[0.4em] text-secondary-text font-mono mb-5 text-center lg:text-left">
              FIND ME ONLINE
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.name} — ${social.username}`}
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-glass-border text-[11px] tracking-wider text-secondary-text hover:text-white hover:border-white/30 transition-colors duration-300 min-h-[44px]"
                  >
                    <Icon size={14} />
                    {social.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
