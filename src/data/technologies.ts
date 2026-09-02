export interface Technology {
  name: string;
  category: string;
  icon?: string;
  color: string;
}

export const technologies: Technology[] = [
  { name: "React", category: "Frontend", color: "#61DAFB" },
  { name: "Next.js", category: "Framework", color: "#FFFFFF" },
  { name: "TypeScript", category: "Language", color: "#3178C6" },
  { name: "JavaScript", category: "Language", color: "#F7DF1E" },
  { name: "Python", category: "Language", color: "#3776AB" },
  { name: "Tailwind CSS", category: "Styling", color: "#06B6D4" },
  { name: "Three.js", category: "3D", color: "#FFFFFF" },
  { name: "Node.js", category: "Backend", color: "#339933" },
  { name: "TensorFlow", category: "AI/ML", color: "#FF6F00" },
  { name: "AI Tools", category: "AI/ML", color: "#7C3AED" },
  { name: "Data Science", category: "Data", color: "#00D9FF" },
  { name: "Machine Learning", category: "AI/ML", color: "#39FF88" },
  { name: "PostgreSQL", category: "Database", color: "#4169E1" },
  { name: "Docker", category: "DevOps", color: "#2496ED" },
  { name: "Framer Motion", category: "Animation", color: "#BB4BFF" },
  { name: "GSAP", category: "Animation", color: "#88CE02" },
];

export const technologyCategories = [
  "Frontend",
  "Framework",
  "Language",
  "Styling",
  "3D",
  "Backend",
  "AI/ML",
  "Data",
  "Database",
  "DevOps",
  "Animation",
];
