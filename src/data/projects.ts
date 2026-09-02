export interface Project {
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  websiteUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: ProjectCategory;
  status: ProjectStatus;
  color: string;
}

export type ProjectCategory =
  | "website"
  | "ai"
  | "application"
  | "creative"
  | "experiment";

export type ProjectStatus =
  | "completed"
  | "building"
  | "experimenting"
  | "coming-soon";

export const projects: Project[] = [
  {
    name: "Project Foresight",
    slug: "project-foresight",
    description: "A powerful AI and data intelligence project.",
    longDescription:
      "Project Foresight leverages advanced machine learning algorithms and real-time data processing to deliver intelligent insights and predictive analytics.",
    image: "/images/projects/foresight.jpg",
    technologies: ["Python", "TensorFlow", "React", "Node.js"],
    websiteUrl: "https://foresight.suragverse.com",
    featured: true,
    category: "ai",
    status: "building",
    color: "#00D9FF",
  },
  {
    name: "Hexa Bill",
    slug: "hexa-bill",
    description: "A modern intelligent billing and business platform.",
    longDescription:
      "Hexa Bill is a comprehensive billing solution with smart invoicing, automated reminders, and powerful business analytics built for the modern era.",
    image: "/images/projects/hexabill.jpg",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    websiteUrl: "https://hexabill.suragverse.com",
    featured: true,
    category: "application",
    status: "completed",
    color: "#7C3AED",
  },
  {
    name: "OmniRoute",
    slug: "omniroute",
    description: "A smart technology platform for seamless digital routing.",
    longDescription:
      "OmniRoute connects digital experiences through intelligent routing, enabling seamless navigation across complex web architectures.",
    image: "/images/projects/omniroute.jpg",
    technologies: ["React", "Go", "Docker", "Redis"],
    websiteUrl: "https://omniroute.suragverse.com",
    featured: true,
    category: "website",
    status: "building",
    color: "#39FF88",
  },
  {
    name: "SuragVerse",
    slug: "suragverse",
    description: "Your entry point into a digital universe of innovation.",
    longDescription:
      "The central hub for all digital experiences, projects, and creative works by Surag M S.",
    image: "/images/projects/suragverse.jpg",
    technologies: ["Next.js", "Three.js", "Tailwind CSS", "Framer Motion"],
    websiteUrl: "https://suragverse.com",
    featured: true,
    category: "creative",
    status: "completed",
    color: "#00D9FF",
  },
  {
    name: "Future Project",
    slug: "future-project",
    description: "An exciting new venture on the horizon.",
    longDescription:
      "Something extraordinary is being crafted in the lab. Stay tuned for a groundbreaking digital experience.",
    image: "/images/projects/future.jpg",
    technologies: ["TBA"],
    featured: false,
    category: "experiment",
    status: "coming-soon",
    color: "#A1A1AA",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProjectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
