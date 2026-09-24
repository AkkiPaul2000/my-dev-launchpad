import { ArrowUpRight, Github } from "lucide-react";

import { publicUrl } from "@/lib/public-url";

import { Reveal } from "./SecAnimate";
import { SectionTitle } from "./SectionTitle";

type Project = {
  title: string;
  liveUrl: string;
  repoUrl: string;
  image: string;
  description: string;
  stack: string[];
};

const projects: Project[] = [
  {
    title: "Pokedex",
    liveUrl: "https://pokedex-ten-blond.vercel.app/pokemon/1",
    repoUrl: "https://github.com/AkkiPaul2000/pokedex",
    image: "Pokedex.PNG",
    description:
      "A data-rich Pokédex for exploring individual Pokémon profiles and comparing their attributes and performance statistics.",
    stack: ["TypeScript", "SCSS", "Redux", "FireStore"],
  },
  {
    title: "CryptoXplorers",
    liveUrl: "https://crypto-xplorers-port.vercel.app/",
    repoUrl: "https://github.com/AkkiPaul2000/cryptoXplorers-port",
    image: "cryptoProject.png",
    description:
      "A cryptocurrency analytics experience that helps investors explore market data and understand the statistical profile of preferred coins.",
    stack: ["JavaScript", "React", "Material UI", "ChartJS", "Vercel"],
  },
];

const linkClass =
  "inline-flex min-h-10 items-center gap-2 rounded-md border border-border px-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/60">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} live`}
        className="block aspect-16/10 overflow-hidden border-b border-border"
      >
        <img
          src={publicUrl(project.image)}
          alt={`${project.title} project interface`}
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
        />
      </a>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[11px] text-primary uppercase">
          {featured ? "Featured project" : "Selected project"}
        </p>
        <h3 className="mt-2 font-titleFont text-2xl font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground">
          {project.stack.map((tech) => (
            <li key={tech} className="tech-chip">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className={linkClass}>
            <ArrowUpRight size={16} /> Live demo
          </a>
          <a href={project.repoUrl} target="_blank" rel="noreferrer" className={linkClass}>
            <Github size={16} /> Source code
          </a>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="Projects" className="section-shell">
      <SectionTitle title="Selected work" titleNo="03" />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.08} className="h-full">
            <ProjectCard project={project} featured={index === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
