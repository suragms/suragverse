"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { brandImages } from "@/data/images";

/**
 * Cinematic opening sequence.
 *
 * SCENE 01  Black screen + "SURAGVERSE" subtle typography
 * SCENE 02  "INITIALIZING MY STORY..." — animated line + particles
 * SCENE 03  The SURAG poster reveals from darkness (clip-path + blur)
 * SCENE 04  "THIS IS / SURAGVERSE"
 * SCENE 05  The poster dissolves into the hero behind it
 *
 * When the overlay begins to dissolve we dispatch `suragverse:intro:complete`
 * so the HeroSection can start its entrance timeline in sync.
 */

const INTRO_EVENT = "suragverse:intro:complete";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Deterministic floating particles rendered as tiny divs. */
function Particles({ count = 20 }: { count?: number }) {
  const seeds = useRef<number[]>([]);
  if (seeds.current.length === 0) {
    for (let i = 0; i < count; i++) {
      seeds.current.push(i * 137.508); // golden-angle spacing
    }
  }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {seeds.current.map((seed, i) => {
        const left = (seed % 100) / 100;
        const top = ((seed * 7) % 100) / 100;
        const size = 1.5 + ((seed * 13) % 30) / 10;
        return (
          <span
            key={i}
            className="particle-field"
            style={{
              left: `${left * 100}%`,
              top: `${top * 100}%`,
              width: size,
              height: size,
              animationDelay: `${(seed % 40) / 10}s`,
              animationDuration: `${5 + (seed % 30) / 10}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function LoadingScreen() {
  const reduced = usePrefersReducedMotion();
  const [hidden, setHidden] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const posterWrapRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const thisIsRef = useRef<HTMLDivElement>(null);
  const dissolveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => setHidden(true),
    });

    const dur = reduced ? 0.12 : 1;

    // SCENE 01 — black screen, subtle wordmark
    tl.to(wordRef.current, { opacity: 1, duration: 1.4 * dur, ease: "power1.inOut" })
      // SCENE 02 — status + animated progress line
      .to(statusRef.current, { opacity: 1, duration: 0.6 * dur }, "-=0.2")
      .to(
        progressRef.current,
        { scaleX: 1, duration: 2.6 * dur, ease: "power2.inOut" },
        "-=0.2"
      )
      // wordmark recedes so the poster takes the stage
      .to(wordRef.current, { opacity: 0, duration: 0.5 * dur }, "+=0.1")
      // SCENE 03 — poster reveals from darkness (mask + blur → sharp)
      .fromTo(
        posterWrapRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.2 * dur },
        "-=0.1"
      )
      .fromTo(
        posterRef.current,
        {
          clipPath: "inset(0 100% 0 0)",
          filter: "blur(14px) brightness(0.4) saturate(0.6)",
          scale: 1.08,
        },
        {
          clipPath: "inset(0 0% 0 0)",
          filter: "blur(0px) brightness(1) saturate(1)",
          scale: 1,
          duration: 1.8 * dur,
          ease: "power2.inOut",
        },
        "-=0.1"
      )
      // SCENE 04 — "THIS IS / SURAGVERSE"
      .fromTo(
        thisIsRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7 * dur },
        "-=0.9"
      )
      .to(thisIsRef.current, { autoAlpha: 0, y: -12, duration: 0.6 * dur }, "+=0.6")
      // SCENE 05 — poster dissolves into the hero
      .to(
        posterRef.current,
        {
          scale: 1.18,
          filter: "blur(8px) brightness(1.4)",
          autoAlpha: 0.55,
          duration: 1.1 * dur,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(
        dissolveRef.current,
        { autoAlpha: 0.9, duration: 1.2 * dur, ease: "power1.inOut" },
        "<"
      )
      // let the hero behind begin animating
      .add(() => window.dispatchEvent(new Event(INTRO_EVENT)))
      .to(root, { autoAlpha: 0, duration: 0.9 * dur, ease: "power2.inOut" });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
      role="status"
      aria-label="Loading SURAGVERSE"
    >
      <Particles />

      {/* SCENE 01 wordmark */}
      <div
        ref={wordRef}
        className="absolute inset-0 flex items-center justify-center opacity-0"
      >
        <span className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-5xl font-bold tracking-[0.3em] sm:tracking-[0.45em] text-white/85">
          SURAG<span className="text-electric-blue">VERSE</span>
        </span>
      </div>

      {/* SCENE 02 status + progress line (not a % loader) */}
      <p
        ref={statusRef}
        className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-secondary-text font-mono opacity-0"
      >
        INITIALIZING MY STORY...
      </p>
      <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 w-40 sm:w-52 lg:w-72 h-px bg-white/10 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-electric-blue via-purple to-neon-green"
        />
      </div>

      {/* SCENE 03 — SURAG poster reveal */}
      <div
        ref={posterWrapRef}
        className="absolute inset-0 flex items-center justify-center opacity-0"
      >
        <div
          ref={posterRef}
          className="relative h-[50vh] sm:h-[62vh] lg:h-[74vh] aspect-[1600/1987] overflow-hidden will-change-transform"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <Image
            src={brandImages.poster.src}
            alt={brandImages.poster.alt}
            fill
            priority
            sizes="(max-width: 640px) 80vw, 45vw"
            className="object-cover"
            style={{ objectPosition: brandImages.poster.objectPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />

          {/* SCENE 04 — THIS IS / SURAGVERSE */}
          <div
            ref={thisIsRef}
            className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 opacity-0"
          >
            <span className="text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] text-secondary-text font-mono">
              THE STORY BEHIND THE CREATOR
            </span>
            <span className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.2em] sm:tracking-[0.25em] text-white">
              SURAG<span className="text-electric-blue">VERSE</span>
            </span>
          </div>
        </div>
      </div>

      {/* SCENE 05 — dissolve fragments */}
      <div
        ref={dissolveRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(0,217,255,0.12), transparent 55%)",
        }}
      />

      {/* Accessible skip */}
      <button
        onClick={() => {
          window.dispatchEvent(new Event(INTRO_EVENT));
          setHidden(true);
        }}
        className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 z-10 px-3 py-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-secondary-text border border-glass-border rounded-full hover:text-white hover:border-white/30 transition-colors min-h-[40px]"
      >
        SKIP INTRO
      </button>
    </div>
  );
}
