import { EMAIL } from "./social-links";
import { ArrowUpRight, Mail } from "lucide-react";

export function Contact() {
  return (
    <section
      id="Contact"
      className="section-shell"
    >
      <div className="relative overflow-hidden rounded-lg border border-border bg-primary p-7 text-primary-foreground sm:p-12 lg:p-16">
        <p className="font-mono text-xs font-semibold uppercase">/04 · Contact</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 className="max-w-3xl font-titleFont text-4xl font-bold leading-none sm:text-6xl">Have a complex product to build?</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 opacity-80">I’m open to full-stack engineering opportunities where thoughtful architecture, reliable delivery, and a strong product experience matter.</p>
          </div>
          <a href={`mailto:${EMAIL}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-background px-5 text-sm font-bold text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Mail size={17} /> Start a conversation <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}
