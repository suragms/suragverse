"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/lenis";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "MY STORY", href: "#my-story" },
  { label: "JOURNEY", href: "#journey" },
  { label: "WHAT I DO", href: "#what-i-do" },
  { label: "MY WORK", href: "#my-work" },
  { label: "CONNECT", href: "#connect" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      scrollToSection(href);
    },
    []
  );

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
        {/* Centered floating bar — shrinks & gains glass on scroll */}
        <div className="max-w-6xl mx-auto px-3 sm:px-5 pt-3 sm:pt-4">
          <div
            className={`flex items-center justify-between rounded-full transition-all duration-500 ${
              scrolled
                ? "bg-background/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] px-4 sm:px-6 py-2.5"
                : "bg-transparent border border-transparent px-4 sm:px-6 py-4"
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => handleNavClick("#home")}
              className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-bold tracking-[0.2em] hover:text-electric-blue transition-colors min-h-[44px] flex items-center"
            >
              SURAG<span className="text-electric-blue">VERSE</span>
            </button>

            {/* Desktop Nav — centered (hidden on mobile, shown md+) */}
            <nav
              className="hidden md:flex items-center gap-7 xl:gap-9"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[11px] font-medium tracking-[0.18em] text-secondary-text hover:text-white transition-colors duration-300 relative group min-h-[44px] flex items-center"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-electric-blue scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <button
              onClick={() => handleNavClick("#connect")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-semibold tracking-[0.15em] bg-white text-black rounded-full hover:bg-electric-blue hover:text-black transition-colors duration-300 min-h-[40px] btn-antigravity"
            >
              LET&apos;S TALK
              <ArrowRight size={14} />
            </button>

          </div>
        </div>
      </motion.header>
  );
}
