"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/lenis";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "STORY", href: "#my-story" },
  { label: "JOURNEY", href: "#journey" },
  { label: "WHAT I DO", href: "#what-i-do" },
  { label: "MY WORK", href: "#my-work" },
  { label: "CONNECT", href: "#connect" },
];

const MENU_ID = "mobile-nav-menu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("menu-open");
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [mobileOpen]);

  // ESC key closes menu
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      // Small delay to allow menu close animation before scrolling
      setTimeout(() => scrollToSection(href), 100);
    },
    []
  );

  const toggleMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  return (
    <>
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

            {/* Desktop Nav — centered */}
            <nav
              className="hidden lg:flex items-center gap-7 xl:gap-9"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[11px] font-medium tracking-[0.18em] text-secondary-text hover:text-white transition-colors duration-300 relative group min-h-[44px] flex items-center"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-electric-blue transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <button
              onClick={() => handleNavClick("#connect")}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-semibold tracking-[0.15em] bg-white text-black rounded-full hover:bg-electric-blue hover:text-black transition-colors duration-300 min-h-[40px]"
            >
              LET&apos;S TALK
              <ArrowRight size={14} />
            </button>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={toggleMenu}
              className="lg:hidden relative z-[60] w-11 h-11 flex items-center justify-center text-white rounded-xl hover:bg-white/5 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={mobileOpen ? MENU_ID : undefined}
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay — cinematic chapter selector */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id={MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/98 backdrop-blur-2xl" />

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-electric-blue/5 blur-[120px]" />
            </div>

            {/* Navigation content */}
            <nav
              className="relative z-10 h-full flex flex-col justify-center px-8"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: 0.15 + i * 0.08,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleNavClick(link.href)}
                    className="group flex items-baseline gap-4 py-3 min-h-[52px] text-left"
                  >
                    <span className="font-mono text-[10px] text-electric-blue tracking-[0.3em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-[0.05em] text-secondary-text group-hover:text-white active:text-electric-blue transition-colors duration-200">
                      {link.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.2 + navLinks.length * 0.08, duration: 0.5 }}
                className="mt-10"
              >
                <button
                  onClick={() => handleNavClick("#connect")}
                  className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-[0.15em] border border-electric-blue/50 rounded-full text-electric-blue hover:bg-electric-blue/10 active:bg-electric-blue/15 transition-all duration-200 min-h-[48px]"
                >
                  LET&apos;S TALK
                  <ArrowRight size={16} />
                </button>
              </motion.div>

              {/* Identity */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-8 right-8"
              >
                <div className="pt-6 border-t border-white/10">
                  <p className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-[0.2em]">
                    SURAG M S
                  </p>
                  <p className="mt-2 text-[10px] tracking-[0.25em] text-secondary-text font-mono leading-relaxed">
                    APPLIED AI ENGINEER
                    <br />
                    DIGITAL CREATOR
                  </p>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
