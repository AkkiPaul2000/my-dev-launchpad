import { Reveal } from "./SecAnimate";
import { SectionTitle } from "./SectionTitle";

const skillGroups = [
  { title: "Languages", skills: ["TypeScript", "JavaScript (ES6+)", "Python", "Java", "HTML / CSS"] },
  { title: "Applications", skills: ["React", "Next.js", "Angular", "NestJS", "Node.js", "Material UI"] },
  { title: "Data", skills: ["MongoDB", "MySQL", "Oracle", "NeonDB", "RocksDB"] },
  { title: "Cloud & delivery", skills: ["AWS S3", "Docker", "Kubernetes", "Vercel", "GitHub Actions", "CI/CD", "Postman"] },
];

export function About() {
  return (
    <section id="About" className="section-shell">
      <SectionTitle title="Engineering across the stack" titleNo="01" />
      <div className="grid gap-4 sm:gap-5 md:grid-cols-12">
        <Reveal className="md:col-span-5 lg:col-span-4">
          <div className="h-full overflow-hidden rounded-lg border border-border bg-card">
            <img
              src="/profileImg.jpeg"
              alt="Akash Paul"
              className="h-56 w-full object-cover object-top grayscale transition duration-500 hover:grayscale-0 sm:h-72 md:h-full md:aspect-square md:object-center"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-7 lg:col-span-8">
          <div className="h-full rounded-lg border border-border bg-card p-5 sm:p-7 lg:p-8">
            <p className="font-titleFont text-xl font-semibold leading-snug text-foreground sm:text-2xl lg:text-3xl">
              I turn complex product requirements into dependable systems people can use.
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
              <p>Across enterprise SaaS, cryptocurrency platforms, and analytical products, I have designed secure REST APIs, optimized relational and NoSQL data layers, and shipped responsive user interfaces.</p>
              <p>My approach combines clean architecture, SOLID principles, practical collaboration, and close attention to performance from concept through production.</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div id="Skills" className="mt-4 grid scroll-mt-24 gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.07}>
            <article className="h-full rounded-lg border border-border bg-secondary p-5 transition-colors duration-300 hover:border-primary/60">
              <h3 className="font-titleFont text-base font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="size-1 shrink-0 rounded-full bg-primary" />
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
