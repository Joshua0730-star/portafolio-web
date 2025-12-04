type Skill = {
  name: string;
  level: string;
  icon: string;
};

export const skills: Skill[] = [
  { name: "HTML", level: "Advanced", icon: "/skills/html.svg" },
  { name: "CSS", level: "Advanced", icon: "/skills/css.svg" },
  { name: "JavaScript", level: "Advanced", icon: "/skills/javascript.svg" },
  { name: "TypeScript", level: "Intermediate", icon: "/skills/typescript.svg" },
  { name: "Tailwind CSS", level: "Advanced", icon: "/skills/tailwindcss.svg" },
  { name: "Node.js", level: "Advanced", icon: "/skills/nodejs.svg" },
  { name: "Astro", level: "Advanced", icon: "/skills/astro.svg" },
  { name: "Python", level: "Intermediate", icon: "/skills/python.svg" },
  { name: "React", level: "Intermediate", icon: "/skills/react.svg" },
  { name: "Next JS", level: "Basic", icon: "/skills/nextjs.svg" },
  { name: "MongoDB", level: "Intermediate", icon: "/skills/mongodb.svg" },
  { name: "Express.js", level: "Intermediate", icon: "/skills/expressjs.svg" },
  { name: "SQL", level: "Advanced", icon: "/skills/sql.svg" },
  { name: "SQLite", level: "Intermediate", icon: "/skills/sqlite.svg" },
  { name: "Figma", level: "Advanced", icon: "/skills/figma.svg" },
  { name: "UX/UI", level: "Advanced", icon: "/skills/ui.svg" },
  { name: "Gsap", level: "Intermediate", icon: "/skills/gsap.svg" },
  { name: "Git", level: "Advanced", icon: "/skills/git.svg" },
  { name: "Github", level: "Advanced", icon: "/skills/github.svg" },
  { name: "Terminal", level: "Advanced", icon: "/skills/terminal.svg" }
];

export const skillsPerSlide: number = 4;
export const totalSlides: number = Math.ceil(skills.length / skillsPerSlide);