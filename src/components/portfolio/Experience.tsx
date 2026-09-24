import { motion } from "framer-motion";
import { useState } from "react";
import { TiArrowForward } from "react-icons/ti";

import { SectionTitle } from "./SectionTitle";

type Job = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

const jobs: Job[] = [
  {
    company: "Wipro",
    role: "Project Engineer",
    period: "April 2022 - present",
    points: [
      "Designed and developed user interface components of an analytical website using React.js.",
      "Implemented several libraries like Chart JS,Framer Js and Material UI or ShadCN to enhance user Experience.",
      "Built reusable components and front-end libraries for future use.",
      "Created lots of customized hooks for api calls.",
      "Used firebase as an cloud messaging platform to notify client apps.",
      "Paired with other developers to fix and sort out different bugs and unimportant rerenders throughout the website.",
      "Learned SSR framework like NextJS , to reduce api response time and increase the Seo as well as the efficiency of the project",
    ],
  },
  {
    company: "Qdesq",
    role: "Project Engineer",
    period: "April 2022 - present",
    points: [
      "Learned to develop test plans, create and execute test cases, find and log bugs",
      "Built several test cases for several individual components and apis and used to run daily tests with the help of a auto selenium based testing software like test-project",
      "Gained immense experience on teamwork and collaboration skills.",
    ],
  },
];

export function Experience() {
  const [active, setActive] = useState(jobs[0]!.company);
  const job = jobs.find((j) => j.company === active) ?? jobs[0]!;

  return (
    <section id="Experience" className="mx-auto max-w-containerSmall px-4 py-10 lgl:py-24">
      <SectionTitle title="Where I have Worked" titleNo="02" />
      <div className="mt-10 flex w-full flex-col gap-16 md:flex-row">
        <ul className="flex flex-col md:w-32">
          {jobs.map(({ company }) => (
            <li
              key={company}
              onClick={() => setActive(company)}
              className={`cursor-pointer border-l-2 bg-transparent px-8 py-3 text-sm duration-300 hover:bg-navy ${
                active === company
                  ? "border-l-textGreen text-textGreen"
                  : "border-l-hoverColor text-textDark"
              }`}
            >
              {company}
            </li>
          ))}
        </ul>
        <motion.div
          key={job.company}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full"
        >
          <h3 className="flex gap-1 font-titleFont text-xl font-medium">
            {job.role}
            <span className="tracking-wide text-textGreen">@{job.company}</span>
          </h3>
          <p className="mt-1 text-sm font-medium text-textDark">{job.period}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {job.points.map((point) => (
              <li key={point} className="flex gap-2 text-base text-textDark">
                <span className="mt-1 text-textGreen">
                  <TiArrowForward />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
