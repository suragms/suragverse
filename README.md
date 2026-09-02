# SURAGVERSE

**Explore. Experience. Imagine the Future.**

A premium, immersive, 3D-animated digital brand universe built with Next.js, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Framer Motion, GSAP, and Lenis smooth scrolling.

> A digital universe of websites, ideas, innovation, AI, and creativity.

---

## 🚀 Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve production build
npm run lint       # eslint check
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, SEO metadata
│   ├── page.tsx            # Home page composition
│   ├── globals.css         # Tailwind theme, design tokens, utilities
│   └── sitemap.ts
├── components/
│   ├── animations/
│   │   └── SmoothScroll.tsx        # Lenis wrapper
│   ├── layout/
│   │   ├── Navbar.tsx              # Floating glass navbar + mobile menu
│   │   ├── Footer.tsx               # Footer with social links
│   │   ├── LoadingScreen.tsx        # Cinematic boot sequence
│   │   ├── CustomCursor.tsx         # Desktop custom cursor
│   │   └── ScrollProgress.tsx       # Scroll progress bar
│   ├── sections/
│   │   ├── HeroSection.tsx          # 3D cinematic hero
│   │   ├── UniverseSection.tsx      # "Many Digital Worlds" cards
│   │   ├── FeaturedProjects.tsx     # Website showcase grid
│   │   ├── ProjectGalaxy.tsx        # Interactive project galaxy
│   │   ├── AboutSection.tsx         # About the creator
│   │   ├── TechStack.tsx            # Technology showcase
│   │   ├── Roadmap.tsx              # "Now Building" timeline
│   │   └── CTASection.tsx           # Final call-to-action
│   ├── three/
│   │   └── HeroScene.tsx            # React Three Fiber scene
│   └── ui/
│       └── MagneticButton.tsx       # Reusable magnetic button
├── data/
│   ├── projects.ts          # ← EDIT HERE to add projects
│   └── technologies.ts      # ← EDIT HERE to add technologies
├── hooks/
└── lib/
    └── lenis.ts            # Shared Lenis instance for smooth anchor scroll
```

---

## ➕ Add a New Website / Project

Open `src/data/projects.ts` and append to the `projects` array:

```ts
{
  name: "My New Website",
  slug: "my-new-website",                 // unique id
  description: "A short powerful description.",
  longDescription: "Optional longer text shown in the galaxy modal.",
  image: "/images/projects/my-new-website.jpg",   // put image in public/images/projects/
  technologies: ["Next.js", "React", "AI"],
  websiteUrl: "https://example.com",      // external link (optional)
  githubUrl: "https://github.com/...",    // optional
  featured: true,                         // shows in the websites showcase grid
  category: "website",                    // website | ai | application | creative | experiment
  status: "building",                     // completed | building | experimenting | coming-soon
  color: "#00D9FF",                       // accent color for the card
}
```

That's it — the card grid, galaxy, and roadmap all read from this single file.

### Replacing the images

All project images live in `public/images/projects/`. Drop in a new image at
`1200×800` and update the `image` path in `projects.ts`. Images use
`next/image` so they are automatically optimized and lazy-loaded.

---

## 🎨 Design System

| Token                | Value        |
| -------------------- | ------------ |
| Background           | `#050505`    |
| Secondary background | `#0B0B0F`    |
| Primary text         | `#FFFFFF`    |
| Secondary text       | `#A1A1AA`    |
| Electric Blue        | `#00D9FF`    |
| Purple               | `#7C3AED`    |
| Neon Green           | `#39FF88`    |

Headings use **Space Grotesk**, body uses **Inter** — both loaded via
`next/font` and exposed as `--font-heading` / `--font-body`.

Accents are used sparingly; the design stays mostly elegant black & white.

---

## 🔧 Platform Configuration

- **Social / contact links** — edit the `socialLinks` array in
  `src/components/layout/Footer.tsx` (LinkedIn, GitHub, Instagram placeholders).
- **Email** — change `hello@suragverse.com` in the footer.
- **SEO / domain** — update `metadataBase` in `src/app/layout.tsx` and the
  URLs in `src/app/sitemap.ts` to your real domain.
- **Photo placeholder** — the About section has a `SM` avatar placeholder;
  drop your photo into the section to replace it permanently.
- **OG image** — `public/og-image.png` (1200×630). Regenerate with
  `node scripts/generate-og-image.js`, or replace with your own design.

---

## 🧠 Performance & Accessibility

- 3D scene is lazy-loaded with `next/dynamic` + Suspense.
- All images use `next/image` with lazy loading and `sizes`.
- `prefers-reduced-motion` disables animations globally.
- Semantic HTML, ARIA labels, keyboard focus states, custom cursor hidden on
  mobile/touch devices.
- Canvas renders at `dpr={[1, 2]}` with a transparent background and reduced
  particle counts for lower-powered devices.

---

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Three.js ·
React Three Fiber · Drei · Framer Motion · GSAP · Lenis · Lucide

---

© 2026 SURAGVERSE. All rights reserved.
