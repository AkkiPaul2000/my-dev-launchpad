import { SectionTitle } from "./SectionTitle";

const skillGroups = [
  { title: "Languages", skills: ["TypeScript", "JavaScript (ES6+)", "Python", "Java", "HTML / CSS", "Ruby"] },
  { title: "Applications", skills: ["React", "Next.js", "Angular", "NestJS", "Node.js", "Spring Boot", "Material UI"] },
  { title: "Data", skills: ["MongoDB", "MySQL", "Oracle", "NeonDB", "RocksDB"] },
  { title: "Cloud & delivery", skills: ["AWS S3", "Docker", "Kubernetes", "Vercel", "GitHub Actions", "CI/CD", "Postman"] },
];

export function About() {
  return (
    <section
      id="About"
      className="section-shell"
    >
      <SectionTitle title="Engineering across the stack" titleNo="01" />
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="overflow-hidden rounded-lg border border-border bg-card lg:col-span-4">
          <img src="/profileImg.jpeg" alt="Akash Paul" className="aspect-square h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0" />
        </div>
        <div className="rounded-lg border border-border bg-card p-6 sm:p-8 lg:col-span-8">
          <p className="font-titleFont text-2xl font-semibold leading-tight text-foreground sm:text-3xl">I turn complex product requirements into dependable systems people can use.</p>
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>Across enterprise SaaS, cryptocurrency platforms, and analytical products, I have designed secure REST APIs, optimized relational and NoSQL data layers, and shipped responsive user interfaces.</p>
            <p>My approach combines clean architecture, SOLID principles, practical collaboration, and close attention to performance from concept through production.</p>
          </div>
        </div>
      </div>

      <div id="Skills" className="grid scroll-mt-24 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <article key={group.title} className="rounded-lg border border-border bg-secondary p-5 transition-colors hover:border-primary/60">
            <h3 className="font-titleFont text-base font-semibold text-foreground">{group.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {group.skills.map((skill) => <li key={skill} className="flex items-center gap-2"><span className="size-1 rounded-full bg-primary" />{skill}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
