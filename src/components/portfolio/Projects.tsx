import type { ReactNode } from "react";

import { SectionTitle } from "./SectionTitle";

type Project = {
  title: string;
  url: string;
  image: string;
  description: ReactNode;
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
    description: (
      <>
        An <span className="text-textGreen"> Crypto Analytic website</span> for the cryptic
        investors to get a breif statiscal visual understanding about their preffered coin and other
        coins in the market right now.
      </>
    ),
    stack: ["JavaScript", "React", "Material UI", "ChartJS", "Vercel"],
  },
  {
    title: "BookStore",
    url: "https://book-store-tawny.vercel.app/",
    image: "/BookStore.PNG",
    description: (
      <>
        An <span className="text-textGreen"> Store Website</span> where any seller can update their
        items into our database to display their items with breif description and quantity for their
        customer.
      </>
    ),
    stack: ["Next JS", "TailWind CSS", "FireStore"],
    textFirst: true,
    imageLinkClassName: "mt-[30px]",
  },
  {
    title: "Pokedex",
    url: "https://pokedex-ten-blond.vercel.app/pokemon/1",
    image: "/Pokedex.PNG",
    description: (
      <>
        A <span className="text-textGreen"> Poket monster analytical website</span> to get a breif
        description and their stats to compare it with other monsters as well.
        <span style={{ color: "red", display: "inline-block", width: "100%" }}>
          The website is heavy asset loaded so on deployment it might crash on loading details
          Follow{" "}
          <a
            href="https://github.com/AkkiPaul2000/pokedex"
            target="_blank"
            rel="noreferrer"
            style={{ color: "blue" }}
          >
            HERE
          </a>{" "}
          to got to its github repo.
        </span>
      </>
    ),
    stack: ["TypeScript", "SCSS", "Redux", "FireStore"],
    rowClassName: "items-center",
    imageLinkClassName: "mt-[20px]",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const image = (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={`group relative h-auto w-full xl:w-1/2 ${project.imageLinkClassName ?? ""}`}
    >
      <img
        src={project.image}
        alt={project.title}
        className={`h-full w-full object-contain ${project.textFirst ? "mr-16" : ""}`}
      />
    </a>
  );

  const text = (
    <div
      className={`z-10 flex w-full flex-col gap-6 lgl:justify-between xl:w-1/2 ${
        project.textFirst ? "items-start text-left" : "items-end text-right"
      }`}
    >
      <p className="font-titleFont text-sm tracking-wide text-textGreen">Featured Project</p>
      <h3 className="text-2xl font-bold">{project.title}</h3>
      <p className="rounded-md bg-navy p-2 text-sm md:p-6 md:text-base">{project.description}</p>
      <ul className="flex justify-between gap-2 font-titleFont text-xs tracking-wide text-textDark md:gap-5 md:text-sm">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`flex flex-col gap-6 xl:flex-row ${project.rowClassName ?? ""}`}>
      {project.textFirst ? (
        <>
          {text}
          {image}
        </>
      ) : (
        <>
          {image}
          {text}
        </>
      )}
    </div>
  );
}

export function Projects() {
  return (
    <section
      id="Projects"
      className="mx-auto flex min-h-screen max-w-containerSmall flex-col gap-8 py-10 lgl:py-32"
    >
      <SectionTitle title="What I have built" titleNo="03" />
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-28">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
