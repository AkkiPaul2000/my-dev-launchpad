import { ArrowUpRight, Github } from "lucide-react";

import { SectionTitle } from "./SectionTitle";

type Project = {
  title: string;
  url: string;
  image: string;
  description: string;
  stack: string[];
  /** Text block on the left and screenshot on the right (the default is the reverse). */
  textFirst?: boolean;
  rowClassName?: string;
  imageLinkClassName?: string;
};

const projects: Project[] = [
  {
    title: "CryptoXplorers",
    url: "https://crypto-xplorers-port.vercel.app/",
    image: "/cryptoProject.png",
    description: "A cryptocurrency analytics experience that helps investors explore market data and understand the statistical profile of preferred coins.",
    stack: ["JavaScript", "React", "Material UI", "ChartJS", "Vercel"],
  },
  {
    title: "BookStore",
    url: "https://book-store-tawny.vercel.app/",
    image: "/BookStore.PNG",
    description: "A seller-managed storefront for publishing books with clear descriptions, inventory quantities, and customer-facing product details.",
    stack: ["Next JS", "TailWind CSS", "FireStore"],
    textFirst: true,
    imageLinkClassName: "mt-[30px]",
  },
  {
    title: "Pokedex",
    url: "https://pokedex-ten-blond.vercel.app/pokemon/1",
    image: "/Pokedex.PNG",
    description: "A data-rich Pokédex for exploring individual Pokémon profiles and comparing their attributes and performance statistics.",
    stack: ["TypeScript", "SCSS", "Redux", "FireStore"],
    rowClassName: "items-center",
    imageLinkClassName: "mt-[20px]",
  },
];

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`group overflow-hidden rounded-lg border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/60 ${featured ? "md:col-span-2" : ""}`}>
      <a href={project.url} target="_blank" rel="noreferrer" className={`block overflow-hidden border-b border-border ${featured ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
        <img src={project.image} alt={`${project.title} project interface`} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]" />
      </a>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div><p className="font-mono text-[11px] uppercase text-primary">Selected project</p><h3 className="mt-2 font-titleFont text-2xl font-semibold text-foreground">{project.title}</h3></div>
          <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`} className="grid size-10 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"><ArrowUpRight size={18} /></a>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2 font-mono text-[11px] text-muted-foreground">
        {project.stack.map((tech) => (
          <li key={tech} className="tech-chip">{tech}</li>
        ))}
        </ul>
        {project.title === "Pokedex" && <a href="https://github.com/AkkiPaul2000/pokedex" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"><Github size={16} /> View source</a>}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section
      id="Projects"
      className="section-shell"
    >
      <SectionTitle title="Selected work" titleNo="03" />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} featured={index === 0} />
        ))}
      </div>
    </section>
  );
}
