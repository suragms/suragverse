export interface Service {
  icon: string;
  title: string;
  description: string;
}

/**
 * The professional services & collaborations on offer.
 * Edit this array to add or remove offerings — they render as an editorial list.
 */
export const services: Service[] = [
  {
    icon: "ai",
    title: "Applied AI Engineering",
    description: "A practical approach to building intelligent digital solutions.",
  },
  {
    icon: "code",
    title: "Full-Stack Development",
    description: "Modern, responsive, scalable applications engineered across the entire stack.",
  },
  {
    icon: "workflow",
    title: "AI Automation",
    description: "Intelligent workflows and automation that save time and scale effort.",
  },
  {
    icon: "globe",
    title: "Web Development",
    description: "Premium, fast, immersive websites built to convert and impress.",
  },
  {
    icon: "growth",
    title: "Business Support & Development",
    description: "Technical guidance and momentum for growing teams — strategy, scoping, and support.",
  },
  {
    icon: "network",
    title: "Technology Collaboration",
    description: "Partnering on research, innovation, and emerging technology.",
  },
  {
    icon: "drafting",
    title: "Architectural Consultations",
    description: "Blueprinting products and systems before a single line of code is written.",
  },
];
