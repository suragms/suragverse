"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/lenis";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "MY STORY", href: "#my-story" },
  { label: "MY JOURNEY", href: "#journey" },
  { label: "WHO I AM", href: "#who-i-am" },
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
      setScrolled(window.scrollY > 50);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-bold tracking-[0.2em] hover:text-electric-blue transition-colors min-h-[44px] flex items-center"
          >
            SURAG<span className="text-electric-blue">VERSE</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-[11px] font-medium tracking-[0.15em] text-secondary-text hover:text-white transition-colors duration-300 relative group min-h-[44px] flex items-center"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-electric-blue transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => handleNavClick("#my-work")}
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-[11px] font-semibold tracking-[0.15em] border border-glass-border rounded-full hover:border-electric-blue/50 hover:bg-electric-blue/5 transition-all duration-300 min-h-[44px]"
          >
            EXPLORE MY WORLD
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
      </motion.header>

      {/* Mobile Menu Overlay */}
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
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[55] lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/98 backdrop-blur-2xl" />

            {/* Ambient glow effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-electric-blue/5 blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple/5 blur-[100px]" />
            </div>

            {/* Subtle particles */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-electric-blue/30"
                  style={{
                    left: `${15 + i * 10}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animation: `particleFloat ${5 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.7}s`,
                  }}
                />
              ))}
            </div>

            {/* Navigation content */}
            <nav
              className="relative z-10 h-full flex flex-col items-center justify-center px-6"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleNavClick(link.href)}
                    className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold tracking-[0.08em] text-secondary-text hover:text-white active:text-electric-blue transition-colors duration-200 min-h-[56px] flex items-center px-4"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: navLinks.length * 0.06 + 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8"
              >
                <button
                  onClick={() => handleNavClick("#my-work")}
                  className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-[0.15em] border border-electric-blue/50 rounded-full text-electric-blue hover:bg-electric-blue/10 active:bg-electric-blue/15 transition-all duration-200 min-h-[48px]"
                >
                  EXPLORE MY WORLD
                </button>
              </motion.div>

              {/* Close hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-secondary-text/40 font-mono"
              >
                PRESS ESC TO CLOSE
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
