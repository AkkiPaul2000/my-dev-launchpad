import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, FileText } from "lucide-react";

import { RESUME_URL } from "@/lib/public-url";

import { scrollToSection } from "./scroll-to";

const fadeUp = (delay: number) => ({
  initial: { y: 16, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.4, delay, ease: "easeOut" as const },
});

export function Banner() {
  return (
    <section
      id="Home"
      className="mx-auto grid max-w-container min-h-[calc(100svh-4rem)] content-center gap-5 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-16"
    >
      <motion.div
        {...fadeUp(0.04)}
        className="relative overflow-hidden rounded-lg border border-border bg-card p-6 sm:p-9 lg:col-span-8 lg:p-12"
      >
        <div className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase text-primary">
          <span className="status-dot" /> Available for focused opportunities
        </div>
        <p className="mb-3 font-mono text-xs uppercase text-muted-foreground">
          Full Stack Developer · 4+ years
        </p>
        <h1 className="max-w-3xl font-titleFont text-5xl font-bold leading-[0.96] text-foreground sm:text-7xl lg:text-8xl">
          Akash <span className="text-muted-foreground">Paul</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          I engineer scalable back-end systems and responsive front-end products with TypeScript,
          React, NestJS, Node.js, and modern cloud infrastructure.
        </p>
        <div className="mt-8 flex flex-col gap-3 mdl:flex-row">
          <button
            type="button"
            onClick={() => scrollToSection("#Projects")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View selected work <ArrowDownRight size={17} />
          </button>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-border bg-secondary px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FileText size={17} /> Open resume
          </a>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 gap-5 lg:col-span-4 lg:grid-cols-1">
        <div className="metric-card">
          <span className="metric-value">40%</span>
          <span className="metric-label">lower database query latency</span>
        </div>
        <div className="metric-card">
          <span className="metric-value">99.9%</span>
          <span className="metric-label">system uptime during UAT</span>
        </div>
      </motion.div>

      <motion.div
        {...fadeUp(0.16)}
        className="flex min-w-0 flex-col justify-between gap-6 rounded-lg border border-border bg-secondary p-6 lg:col-span-12 lg:flex-row lg:items-center"
      >
        <div className="flex flex-wrap gap-2">
          {["TypeScript", "React", "NestJS", "Node.js", "AWS", "Docker", "Kubernetes"].map(
            (skill) => (
              <span key={skill} className="tech-chip">
                {skill}
              </span>
            ),
          )}
        </div>
        <a
          href="mailto:skypaul2000@gmail.com"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
        >
          Let’s work together <ArrowUpRight size={17} />
        </a>
      </motion.div>
    </section>
  );
}
