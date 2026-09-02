"use client";

import { Suspense, lazy, type ComponentType } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  DraftingCompass,
  LifeBuoy,
  TrendingUp,
  Code2,
  Network,
  Globe,
  Box,
  Mail,
  Phone,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { services } from "@/data/services";
import { contactInfo } from "@/data/contact";
import { LinktreeIcon } from "@/components/icons/BrandIcons";
import TiltCard from "@/components/ui/TiltCard";

const ContactScene = lazy(() => import("@/components/three/ContactScene"));

type IconType = ComponentType<{ size?: number; className?: string }>;

const serviceIcons: Record<string, IconType> = {
  briefcase: Briefcase,
  drafting: DraftingCompass,
  lifebuoy: LifeBuoy,
  growth: TrendingUp,
  code: Code2,
  network: Network,
  globe: Globe,
  box: Box,
};

const contactChannels = [
  {
    label: "Portfolio",
    value: contactInfo.portfolioLabel,
    href: contactInfo.portfolio,
    external: true,
    Icon: Globe,
  },
  {
    label: "Business Email",
    value: contactInfo.email,
    href: contactInfo.emailHref,
    external: false,
    Icon: Mail,
  },
  {
    label: "Phone",
    value: contactInfo.phone,
    href: contactInfo.phoneHref,
    external: false,
    Icon: Phone,
  },
  {
    label: "Linktree",
    value: "linktr.ee/suragdevstudio",
    href: contactInfo.linktree,
    external: true,
    Icon: LinktreeIcon,
  },
];

export default function EnquiriesSection() {
  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden"
    >
      {/* 3D network background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Suspense fallback={null}>
          <ContactScene />
        </Suspense>
      </div>

      {/* Ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-24 -left-32 w-[480px] h-[480px] rounded-full bg-electric-blue/5 blur-[140px]" />
        <div className="absolute bottom-24 -right-32 w-[480px] h-[480px] rounded-full bg-purple/5 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] text-electric-blue mb-4 sm:mb-6 font-mono"
          >
            ENQUIRIES &amp; COLLABORATIONS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.9]"
          >
            LET&apos;S BUILD
            <br />
            <span className="gradient-text">SOMETHING AMAZING.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-8 text-secondary-text text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Have an idea, project, or opportunity? Let&apos;s connect and create
            something meaningful.
          </motion.p>
        </div>

        {/* Services */}
        <div className="mb-28">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.4em] text-electric-blue mb-12 font-mono"
          >
            — DM FOR ENQUIRIES
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => {
              const Icon = serviceIcons[service.icon] ?? Briefcase;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: (i % 4) * 0.08,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <TiltCard className="h-full">
                    <div
                      data-cursor-card
                      className="glass group relative h-full rounded-2xl p-6 overflow-hidden transition-colors duration-500 hover:bg-white/[0.07]"
                    >
                      {/* Hover accent */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(0,217,255,0.12),transparent_70%)]" />

                      <div
                        className="w-12 h-12 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center text-electric-blue mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,217,255,0.25)]"
                      >
                        <Icon size={22} className="transition-transform duration-500 group-hover:-rotate-6" />
                      </div>

                      <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold mb-2 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-secondary-text leading-relaxed">
                        {service.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1 text-xs text-electric-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        ENQUIRE <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Contact panel + Linktree feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Contact panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 sm:p-10"
          >
            <p className="text-sm tracking-[0.4em] text-electric-blue mb-2 font-mono">
              CONTACT INFORMATION
            </p>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-tight mb-8">
              REACH OUT
              <br />
              <span className="gradient-text">ANY TIME.</span>
            </h3>

            <div className="flex flex-col gap-3">
              {contactChannels.map(({ label, value, href, external, Icon }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  data-cursor-card
                  className="group flex items-center gap-4 rounded-2xl border border-glass-border bg-glass px-5 py-4 hover:border-electric-blue/40 hover:bg-electric-blue/5 transition-all duration-400"
                >
                  <span className="w-11 h-11 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center text-electric-blue transition-transform duration-500 group-hover:scale-110">
                    <Icon size={20} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[10px] tracking-[0.25em] text-secondary-text uppercase">
                      {label}
                    </span>
                    <span className="block text-sm font-medium text-white/90 truncate">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-secondary-text group-hover:text-electric-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-400 flex-shrink-0"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Linktree feature card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <TiltCard className="h-full" maxTilt={6}>
              <a
                href={contactInfo.linktree}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-card
                className="relative block h-full rounded-3xl overflow-hidden gradient-border group"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Animated 3D rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-56 h-56" style={{ transformStyle: "preserve-3d" }}>
                    <div className="absolute inset-0 rounded-full border border-electric-blue/30 ring-3d-1" />
                    <div className="absolute inset-0 rounded-full border border-purple/30 ring-3d-2" />
                    <div className="absolute inset-0 rounded-full border border-electric-blue/10 ring-3d-3" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-electric-blue/20 blur-2xl" />
                    <LinktreeIcon size={56} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-electric-blue" />
                  </div>
                </div>

                {/* Floating particles */}
                <span className="particle particle-1" />
                <span className="particle particle-2" />
                <span className="particle particle-3" />
                <span className="particle particle-4" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center h-full py-16 px-8">
                  <p className="text-[10px] tracking-[0.4em] text-electric-blue mb-4 font-mono">
                    MY DIGITAL HUB
                  </p>
                  <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05] mb-4">
                    ONE LINK.
                    <br />
                    <span className="gradient-text">EVERYTHING I CREATE.</span>
                  </h3>
                  <p className="text-secondary-text text-sm mb-8 max-w-xs">
                    Portfolio, projects, socials and more — all in one place.
                  </p>
                  <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-xs font-bold tracking-widest group-hover:bg-electric-blue transition-colors duration-500">
                    EXPLORE MY LINKS
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </a>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
