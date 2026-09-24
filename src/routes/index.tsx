import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akash Paul — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Akash Paul, full stack developer. Projects, skills and contact details.",
      },
      { property: "og:title", content: "Akash Paul — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Akash Paul, full stack developer. Projects, skills and contact details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const sections = [
  { id: "about", title: "About", hint: "A short intro about you." },
  { id: "skills", title: "Skills", hint: "Languages, frameworks, tools." },
  { id: "projects", title: "Projects", hint: "Your best work, with links." },
  { id: "experience", title: "Experience", hint: "Roles and timeline." },
  { id: "contact", title: "Contact", hint: "Email and social links." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <span className="font-mono text-sm tracking-tight">akash.dev</span>
          <ul className="hidden gap-6 text-sm text-muted-foreground sm:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a className="transition-colors hover:text-foreground" href={`#${s.id}`}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6">
        <section className="py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Full stack developer
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
            Akash Paul
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            This is an empty starting point. Add your own content section by section.
          </p>
        </section>

        {sections.map((s) => (
          <section key={s.id} id={s.id} className="border-t border-border py-16">
            <h2 className="text-2xl font-semibold tracking-tight">{s.title}</h2>
            <div className="mt-6 rounded-lg border border-dashed border-border p-10 text-sm text-muted-foreground">
              {s.hint}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-border py-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Akash Paul
      </footer>
    </div>
  );
}
