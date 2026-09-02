"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, type GalleryImage } from "@/data/images";

/**
 * MOMENTS FROM THE JOURNEY — cinematic masonry gallery.
 * Responsive columns with varied aspect ratios, lazy thumbnails, hover zoom,
 * and a full cinematic lightbox (keyboard + swipe + ESC).
 */

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = galleryImages[index];
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll while open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) onNext();
      else onPrev();
    }
    touchX.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-xl flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Image */}
      <motion.div
        key={image.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[92vw] max-h-[82vh]"
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="92vw"
          quality={85}
          className="object-contain rounded-lg"
          style={{ maxHeight: "82vh", width: "auto", height: "auto" }}
        />
        {image.caption && (
          <p className="mt-4 text-center text-sm text-secondary-text">
            {image.caption}
          </p>
        )}
      </motion.div>

      {/* Counter */}
      <span className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.3em] text-secondary-text">
        {index + 1} / {galleryImages.length}
      </span>

      {/* Controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-auto sm:h-auto sm:p-3 rounded-full border border-glass-border glass hover:border-white/40 transition-colors flex items-center justify-center"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-auto sm:h-auto sm:p-3 rounded-full border border-glass-border glass hover:border-white/40 transition-colors flex items-center justify-center"
      >
        <ChevronRight size={22} />
      </button>
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 sm:top-6 right-4 sm:right-6 w-11 h-11 sm:w-auto sm:h-auto sm:p-3 rounded-full border border-glass-border glass hover:border-white/40 hover:rotate-90 transition-all flex items-center justify-center"
      >
        <X size={20} />
      </button>
    </motion.div>
  );
}

export default function GallerySection() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length
      ),
    []
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % galleryImages.length)),
    []
  );

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden border-t border-glass-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] text-electric-blue mb-4 font-mono"
          >
            THE GALLERY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
          >
            MOMENTS FROM
            <br />
            <span className="gradient-text">THE JOURNEY.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-4 sm:mt-6 text-secondary-text text-sm sm:text-base max-w-xl mx-auto px-4"
          >
            The human side of the creator. Tap any moment to view it full-screen.
          </motion.p>
        </div>

        {/* Masonry columns */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-3 sm:gap-4 [column-fill:_balance]">
          {galleryImages.map((img: GalleryImage, i) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              onClick={() => setActive(i)}
              className="gallery-tile block w-full mb-3 sm:mb-4 break-inside-avoid group text-left"
              aria-label={`Open image: ${img.alt}`}
            >
              <div style={{ aspectRatio: img.aspect }}>
                <Image
                  src={img.thumbSrc}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                  quality={72}
                  className="object-cover"
                />
              </div>
              {/* Hover caption - always visible on touch devices via CSS */}
              {img.caption && (
                <div className="gallery-caption absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-opacity duration-500 p-3 sm:p-4">
                  <span className="text-[11px] sm:text-xs text-white/90 tracking-wide">
                    {img.caption}
                  </span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <Lightbox
            index={active}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
