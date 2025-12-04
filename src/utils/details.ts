type Skill = {
  name: string;
  level: string;
  icon: string;
};

export const skills: Skill[] = [
  { name: "HTML", level: "Avanzado", icon: "/skills/html.svg" },
  { name: "CSS", level: "Avanzado", icon: "/skills/css.svg" },
  { name: "JavaScript", level: "Avanzado", icon: "/skills/javascript.svg" },
  { name: "TypeScript", level: "Intermedio", icon: "/skills/typescript.svg" },
  { name: "Tailwind CSS", level: "Avanzado", icon: "/skills/tailwindcss.svg" },
  { name: "Node.js", level: "Avanzado", icon: "/skills/nodejs.svg" },
  { name: "Astro", level: "Avanzado", icon: "/skills/astro.svg" },
  { name: "Python", level: "Intermedio", icon: "/skills/python.svg" },
{name: "React", level: "Intermedio", icon: "/skills/react.svg" },
{name: "Next JS", level: "Básico", icon: "/skills/nextjs.svg" },
{name: "MongoDB", level: "Intermedio", icon: "/skills/mongodb.svg" },
  { name: "Express.js", level: "Intermedio", icon: "/skills/expressjs.svg" },
  { name: "SQL", level: "Avanzado", icon: "/skills/sql.svg" },
  { name: "SQLite", level: "Intermedio", icon: "/skills/sqlite.svg" },
  { name: "Figma", level: "Avanzado", icon: "/skills/figma.svg" },
  { name: "UX/UI", level: "Avanzado", icon: "/skills/ui.svg" },
  { name: "Gsap", level: "Intermedio", icon: "/skills/gsap.svg" },
  { name: "Git", level: "Avanzado", icon: "/skills/git.svg" },
  { name: "Github", level: "Avanzado", icon: "/skills/github.svg" },
  { name: "Terminal", level: "Avanzado", icon: "/skills/terminal.svg" }
];

export const skillsPerSlide: number = 4;
export const totalSlides: number = Math.ceil(skills.length / skillsPerSlide);