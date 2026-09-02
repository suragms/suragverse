"use client";

import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/lib/lenis";
import { contactInfo } from "@/data/contact";
import { socials } from "@/data/socials";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "My Story", href: "#my-story" },
  { label: "My Journey", href: "#journey" },
  { label: "Who I Am", href: "#who-i-am" },
  { label: "What I Do", href: "#what-i-do" },
  { label: "My Work", href: "#my-work" },
  { label: "Connect", href: "#connect" },
];

const footerServices = [
  "Applied AI Engineering",
  "Full-Stack Development",
  "AI Automation",
  "Business Support & Development",
  "Architectural Consultations",
];

const connectSocials = socials.filter((s) =>
  ["linkedin", "instagram", "github", "youtube", "facebook"].includes(s.id)
);

export default function Footer() {
  const handleNavClick = (href: string) => {
    scrollToSection(href);
  };

  return (
    <footer className="relative border-t border-glass-border safe-area-bottom">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8 sm:pt-20 sm:pb-8">
        {/* Mobile: clean vertical stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-bold tracking-[0.2em]">
              SURAG<span className="text-electric-blue">VERSE</span>
            </h3>
            <p className="text-secondary-text text-sm leading-relaxed max-w-xs">
              A journey of curiosity, technology, creativity, and endless possibilities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-secondary-text">
              EXPLORE
            </h4>
            <nav className="flex flex-col gap-1">
              {footerLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-secondary-text hover:text-white active:text-electric-blue transition-colors w-fit min-h-[44px] flex items-center"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Professional Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-secondary-text">
              SERVICES
            </h4>
            <nav className="flex flex-col gap-1">
              {footerServices.map((service) => (
                <button
                  key={service}
                  onClick={() => handleNavClick("#what-i-do")}
                  className="text-sm text-secondary-text hover:text-white active:text-electric-blue transition-colors w-fit text-left min-h-[44px] flex items-center"
                >
                  {service}
                </button>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-secondary-text">
              CONNECT
            </h4>
            <nav className="flex flex-col gap-1">
              {connectSocials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary-text hover:text-white active:text-electric-blue transition-colors w-fit min-h-[44px] flex items-center"
                >
                  {social.name}
                </a>
              ))}
            </nav>
            <div className="pt-1">
              <p className="text-xs font-semibold tracking-[0.2em] text-secondary-text mb-2">
                BUSINESS EMAIL
              </p>
              <a
                href={contactInfo.emailHref}
                className="flex items-center gap-2 text-sm text-secondary-text hover:text-white active:text-electric-blue transition-colors group min-h-[44px]"
              >
                <span className="truncate">{contactInfo.email}</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-xs text-secondary-text">
            &copy; {new Date().getFullYear()} SURAGVERSE. All rights reserved.
          </p>
          <p className="text-xs text-secondary-text/50">
            Designed &amp; Built by Surag M S
          </p>
        </div>
      </div>
    </footer>
  );
}
