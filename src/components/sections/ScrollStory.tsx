"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { journeyChapters, journeyIntro } from "@/data/journey";
import type { StoryChapter } from "@/data/images";

/**
 * Creator scroll story — 4 cinematic chapters.
 * Each chapter uses a different reveal animation so the sequence never feels
 * repetitive. Image frames get subtle scroll parallax.
 */

function chapterVariants(animation: StoryChapter["animation"]): Variants {
  switch (animation) {
    case "vertical-mask":
      return {
        hidden: { clipPath: "inset(0 0 100% 0)" },
        show: {
          clipPath: "inset(0 0 0% 0)",
          transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
        },
      };
    case "horizontal":
      return {
        hidden: { clipPath: "inset(0 100% 0 0)" },
        show: {
          clipPath: "inset(0 0% 0 0)",
          transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
        },
      };
    case "blur":
      return {
        hidden: { opacity: 0, filter: "blur(18px)", scale: 1.12 },
        show: {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        },
      };
    case "fade-scale":
    default:
      return {
        hidden: { opacity: 0, scale: 1.16 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
        },
      };
  }
}

function Chapter({
  chapter,
  index,
}: {
  chapter: StoryChapter;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const reversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-20 sm:py-28 lg:py-36"
    >
      {/* Image */}
      <div className={reversed ? "lg:order-2" : ""}>
        <motion.div
          style={{ y: imgY }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="chapter-frame rounded-2xl"
        >
          <motion.div
            variants={chapterVariants(chapter.animation)}
            className="relative"
            style={{ aspectRatio: chapter.aspect }}
          >
            <Image
              src={chapter.image.src}
              alt={chapter.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading={index === 0 ? "eager" : "lazy"}
              quality={80}
              className="object-cover"
              style={{ objectPosition: chapter.image.objectPosition }}
            />
            {/* Cinematic grade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,5,5,0.25), transparent 35%, transparent 65%, rgba(5,5,5,0.4))",
              }}
            />
            {/* Index */}
            <span className="absolute top-5 left-6 font-mono text-[10px] tracking-[0.4em] text-white/80">
              CHAPTER&nbsp;{chapter.index}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Text */}
      <div className={reversed ? "lg:order-1" : ""}>
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="font-mono text-sm text-electric-blue tracking-[0.3em]">
            CHAPTER {chapter.index}
          </span>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9] mt-5 mb-6 sm:mb-7">
            {chapter.headline.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h3>
          <p className="text-secondary-text text-base sm:text-lg leading-relaxed max-w-md">
            {chapter.text}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function ScrollStory() {
  return (
    <section id="journey" className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 sm:mb-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] text-electric-blue mb-4 font-mono"
          >
            {journeyIntro.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
          >
            {journeyIntro.heading.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </motion.h2>
        </div>

        {journeyChapters.map((chapter, i) => (
          <Chapter key={chapter.id} chapter={chapter} index={i} />
        ))}
      </div>
    </section>
  );
}
