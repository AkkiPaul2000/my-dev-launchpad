import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { SectionTitle } from "./SectionTitle";

type Job = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

const jobs: Job[] = [
  {
    company: "ONOv8",
    role: "Full Stack Developer",
    period: "Sep 2025 — Present",
    points: [
      "Engineered NestJS and MongoDB services for the EZMS and Dear Tomorrow enterprise SaaS platforms.",
      "Led Dear Tomorrow back-end delivery, mentoring two developers and accelerating feature delivery by 25%.",
      "Designed secure REST APIs and direct-to-S3 media uploads, reducing server processing load by 30%.",
      "Optimized MongoDB and MySQL data flows to decrease query latency by 40%.",
      "Automated CI/CD pipelines and helped sustain 99.9% uptime during UAT.",
    ],
  },
  {
    company: "Chainscore.finance",
    role: "Software Development Engineer I",
    period: "Nov 2024 — Aug 2025 · Pune",
    points: [
      "Developed the TelosX cryptocurrency exchange experience with Next.js and responsive HTML/CSS.",
      "Built Python state-transition features for the Polkadot v2 JAM project.",
      "Coordinated an eight-member Agile team and reduced merge conflicts by 50% through disciplined Git workflows.",
      "Integrated KYC providers and Bitget APIs through Node.js and NestJS, strengthening user validation.",
    ],
  },
  {
    company: "Wipro Limited",
    role: "Project Engineer",
    period: "Apr 2022 — Jul 2024 · Kolkata",
    points: [
      "Built 120+ reusable React components for data-intensive analytical platforms.",
      "Reduced unnecessary re-renders with a five-member team, improving page speed by 20% and lowering bug density by 25%.",
      "Created 50+ custom data-fetching hooks and implemented Firebase Cloud Messaging with a 98% delivery rate.",
      "Developed REST APIs with Java to connect front-end products with secure databases.",
    ],
  },
];

export function Experience() {
  const firstJob = jobs[0];
  const [active, setActive] = useState(firstJob?.company ?? "");
  const job = jobs.find((item) => item.company === active) ?? firstJob;

  if (!job) return null;

  return (
    <section id="Experience" className="section-shell">
      <SectionTitle title="Professional trajectory" titleNo="02" />
      <div className="grid overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="portfolio-scrollbar flex gap-1 overflow-x-auto border-b border-border p-2 lg:flex-col lg:border-r lg:border-b-0 lg:p-3">
          {jobs.map(({ company }) => (
            <button
              key={company}
              onClick={() => setActive(company)}
              className={`shrink-0 rounded-md px-3 py-2.5 text-left text-xs transition-colors duration-300 sm:px-4 sm:py-3 sm:text-sm lg:w-full ${
                active === company
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {company}
            </button>
          ))}
        </div>
        <motion.div
          key={job.company}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="p-5 sm:p-7 lg:min-h-[430px] lg:p-10"
        >
          <h3 className="font-titleFont text-xl font-semibold text-foreground sm:text-2xl">
            {job.role}
            <span className="mt-1 block text-primary">@ {job.company}</span>
          </h3>
          <p className="mt-3 font-mono text-[11px] text-muted-foreground sm:text-xs">{job.period}</p>
          <ul className="mt-6 flex flex-col gap-3.5 sm:mt-8 sm:gap-4">
            {job.points.map((point, index) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-3 text-sm leading-6 text-muted-foreground sm:text-base"
              >
                <ArrowRight className="mt-1 size-4 shrink-0 text-primary" />
                <span className="min-w-0">{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
