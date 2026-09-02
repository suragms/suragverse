/**
 * SURAGVERSE — Brand Image System
 * =================================
 * THE SINGLE SOURCE OF TRUTH for every personal photograph used on the site.
 *
 * NEVER hardcode an image path inside a component. Import from here instead.
 *
 * Source photographs live in `Photos-1-001/` and are pre-optimized to WebP by
 * `scripts/optimize-images.mjs` into `public/images/brand/`. Width/height are
 * the ACTUAL dimensions of the optimized file, so next/image reserves space and
 * the site is CLS-free.
 */

export type BrandCategory =
  | "hero"
  | "loading"
  | "workspace"
  | "portrait"
  | "cinematic"
  | "gallery"
  | "professional"
  | "avatar"
  | "cta";

export interface BrandImage {
  id: string;
  src: string;
  alt: string;
  category: BrandCategory;
  width: number;
  height: number;
  /** Load eagerly & as high priority. Reserve for the hero only. */
  priority?: boolean;
  /** Where to anchor the image inside its crop frame. */
  objectPosition?: string;
}

const brand = (src: string) => `/images/brand/${src}`;

/**
 * Featured / critical brand images used in the primary cinematic sections.
 */
export const brandImages = {
  /** Cinematic loading poster — the SURAG typography brand reveal. */
  poster: {
    id: "poster",
    src: brand("poster.webp"),
    alt: "Surag cinematic brand poster",
    category: "loading",
    width: 1600,
    height: 1987,
    objectPosition: "center",
  },
  /** Primary hero — blue suit, smoke, dramatic cinematic lighting. */
  hero: {
    id: "hero",
    src: brand("hero.webp"),
    alt: "Cinematic portrait of Surag M S in a blue suit",
    category: "hero",
    width: 1080,
    height: 1080,
    priority: true,
    objectPosition: "center 25%",
  } as BrandImage,
  /** Cartoon avatar / brand mascot — small, playful. NOT the hero image. */
  avatar: {
    id: "avatar",
    src: brand("avatar.webp"),
    alt: "Illustrated Surag avatar",
    category: "avatar",
    width: 800,
    height: 1050,
    objectPosition: "center",
  },
  /** Creative composite — pink shirt + B&W sunglasses overlay. */
  creative: {
    id: "creative",
    src: brand("creative.webp"),
    alt: "Creative artistic portrait of Surag M S",
    category: "portrait",
    width: 1400,
    height: 1421,
    objectPosition: "center",
  },
  /** B&W studio portrait — the real human behind the universe (About). */
  aboutBw: {
    id: "about-bw",
    src: brand("about-bw.webp"),
    alt: "Black and white studio portrait of Surag M S",
    category: "portrait",
    width: 1400,
    height: 1048,
    objectPosition: "center 35%",
  },
  /** AI B&W contemplative portrait — secondary About visual layer. */
  aboutAi: {
    id: "about-ai",
    src: brand("about-ai.webp"),
    alt: "Artistic black and white portrait",
    category: "portrait",
    width: 1000,
    height: 1250,
    objectPosition: "center",
  },
  /** AI dramatic studio portrait — final CTA / contact closing. */
  cta: {
    id: "cta",
    src: brand("cta.webp"),
    alt: "Dramatic studio portrait representing the future of SURAGVERSE",
    category: "cta",
    width: 1024,
    height: 1536,
    objectPosition: "center 20%",
  },
  /** Professional — blue checkered suit, resume/credibility. */
  professional: {
    id: "professional",
    src: brand("professional.webp"),
    alt: "Professional portrait of Surag M S in a blue checkered suit",
    category: "professional",
    width: 800,
    height: 800,
    objectPosition: "center",
  },
  /** Compact fallback profile (contact/metadata only). */
  passport: {
    id: "passport",
    src: brand("passport.webp"),
    alt: "Profile photo of Surag M S",
    category: "professional",
    width: 413,
    height: 531,
    objectPosition: "center",
  },
} as const satisfies Record<string, BrandImage>;

/** A single image can be looked up by id from the master list. */
export const allBrandImages: BrandImage[] = [
  brandImages.poster,
  brandImages.hero,
  brandImages.avatar,
  brandImages.creative,
  brandImages.aboutBw,
  brandImages.aboutAi,
  brandImages.cta,
  brandImages.professional,
  brandImages.passport,
];

/* ————————————————————————————————————————————————
 * WORKSPACE STORY — the 4-chapter creator narrative
 * ———————————————————————————————————————————————— */

export interface StoryChapter {
  id: string;
  index: string;
  headline: string[];
  text: string;
  image: BrandImage;
  /** Animation variant used for this chapter's reveal. */
  animation: "vertical-mask" | "blur" | "horizontal" | "fade-scale";
  /** Aspect ratio of the display frame (w/h). */
  aspect: string;
}

export const storyChapters: StoryChapter[] = [
  {
    id: "chapter-01",
    index: "01",
    headline: ["CURIOSITY."],
    text: "It begins with a pull toward how things work — and toward what could be.",
    image: {
      id: "ws-01",
      src: brand("ws-01.webp"),
      alt: "Surag focused while working at a laptop",
      category: "workspace",
      width: 1600,
      height: 900,
      objectPosition: "center 35%",
    },
    animation: "vertical-mask",
    aspect: "16/10",
  },
  {
    id: "chapter-02",
    index: "02",
    headline: ["LEARNING."],
    text: "Every new tool, every new idea — a step forward. Learning never stops.",
    image: {
      id: "ws-02",
      src: brand("ws-02.webp"),
      alt: "Surag smiling in his workspace with a trophy cabinet behind",
      category: "workspace",
      width: 1600,
      height: 900,
      objectPosition: "center 40%",
    },
    animation: "blur",
    aspect: "16/10",
  },
  {
    id: "chapter-03",
    index: "03",
    headline: ["CREATING."],
    text: "Turning ideas into real things — technology becomes meaningful when it solves real problems.",
    image: {
      id: "ws-03",
      src: brand("ws-03.webp"),
      alt: "Side profile of Surag in his workspace",
      category: "workspace",
      width: 1600,
      height: 900,
      objectPosition: "center",
    },
    animation: "horizontal",
    aspect: "16/10",
  },
  {
    id: "chapter-04",
    index: "04",
    headline: ["GROWING."],
    text: "Every build makes the next one better. The journey keeps moving forward.",
    image: {
      id: "ws-04",
      src: brand("ws-04.webp"),
      alt: "Surag laughing naturally while working",
      category: "workspace",
      width: 1600,
      height: 900,
      objectPosition: "center 40%",
    },
    animation: "fade-scale",
    aspect: "16/10",
  },
];

/* ————————————————————————————————————————————————
 * GALLERY — MOMENTS FROM THE JOURNEY
 * Remaining workspace, casual and lifestyle photographs.
 * ———————————————————————————————————————————————— */

export interface GalleryImage extends BrandImage {
  /** Aspect ratio of the masonry tile (used to vary sizes). */
  aspect: string;
  /** Optional caption for the lightbox. */
  caption?: string;
  /** Optimized thumbnail used in the masonry grid (lazy). */
  thumbSrc: string;
  thumbWidth: number;
  thumbHeight: number;
}

const gallery = (src: string, w: number, h: number): GalleryImage => {
  const thumb = src.replace(".webp", "-thumb.webp");
  return {
    id: src.replace(".webp", ""),
    src: brand(src),
    thumbSrc: brand(thumb),
    alt: "A moment from the SURAGVERSE journey",
    category: "gallery",
    width: w,
    height: h,
    // Optimized thumbs are 700px wide.
    thumbWidth: 700,
    thumbHeight: Math.round((h / w) * 700),
    aspect: `${w}/${h}`,
  };
};

export const galleryImages: GalleryImage[] = [
  { ...gallery("g12.webp", 1200, 1200), aspect: "1/1", caption: "A quiet moment, off the clock." },
  { ...gallery("g01.webp", 1400, 788), caption: "Deep in the build." },
  { ...gallery("g13.webp", 1080, 1078), aspect: "1/1", caption: "Golden hour, golden ideas." },
  { ...gallery("g02.webp", 1400, 788), caption: "Between the lines." },
  { ...gallery("g14.webp", 1080, 1080), aspect: "1/1", caption: "Work, but make it fun." },
  { ...gallery("g03.webp", 1400, 788), caption: "Focused." },
  { ...gallery("g04.webp", 1400, 788), caption: "Ready for what's next." },
  { ...gallery("g15.webp", 1100, 1100), aspect: "1/1", caption: "Same mission, new day." },
  { ...gallery("g05.webp", 1400, 788), caption: "The craft never stops." },
  { ...gallery("g06.webp", 1400, 788), caption: "Solving the hard problems." },
  { ...gallery("g07.webp", 1400, 788), caption: "A plan taking shape." },
  { ...gallery("g08.webp", 1400, 788), caption: "Making it happen." },
  { ...gallery("g09.webp", 1400, 788), caption: "Every detail counts." },
  { ...gallery("g10.webp", 1400, 788), caption: "Ideas in motion." },
  { ...gallery("g11.webp", 1400, 788), caption: "Another day, another build." },
];

/* ————————————————————————————————————————————————
 * RESPONSIVE OBJECT POSITIONING
 * A single hero image needs different crops per breakpoint so the face stays
 * fully in frame. Use these in the Hero's responsive <Image> / containers.
 * ———————————————————————————————————————————————— */
export const heroObjectPositions = {
  mobile: "center 20%",
  tablet: "center 28%",
  desktop: "center 32%",
} as const;
