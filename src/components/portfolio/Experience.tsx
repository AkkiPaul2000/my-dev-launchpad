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
      "Developed REST APIs with Java and Spring Boot to connect front-end products with secure databases.",
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
      <div className="grid overflow-hidden rounded-lg border border-border bg-card md:grid-cols-[260px_minmax(0,1fr)]">
        <div className="flex overflow-x-auto border-b border-border p-2 md:flex-col md:border-r md:border-b-0 md:p-3">
          {jobs.map(({ company }) => (
            <button
              key={company}
              onClick={() => setActive(company)}
              className={`shrink-0 rounded-md px-4 py-3 text-left text-sm transition-colors md:w-full ${
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="min-h-[430px] p-6 sm:p-8 lg:p-10"
        >
          <h3 className="font-titleFont text-2xl font-semibold text-foreground">
            {job.role}
            <span className="mt-1 block text-primary">@ {job.company}</span>
          </h3>
          <p className="mt-3 font-mono text-xs text-muted-foreground">{job.period}</p>
          <ul className="mt-8 flex flex-col gap-4">
            {job.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-6 text-muted-foreground sm:text-base">
                <ArrowRight className="mt-1 size-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
