import { AiFillThunderbolt } from "react-icons/ai";

import { SectionTitle } from "./SectionTitle";

const technologies = [
  "Javascript[ES6]",
  "ReactJS",
  "HTML",
  "CSS",
  "NextJS",
  "Flutter",
  "Figma",
  "Git",
];

export function About() {
  return (
    <section
      id="About"
      className="mx-auto flex min-h-screen max-w-containerSmall flex-col gap-8 py-10 lgl:py-32"
    >
      <SectionTitle title="About me" titleNo="01" />
      <div className="flex flex-col gap-16 lgl:flex-row">
        <div className="flex w-full flex-col gap-4 text-base font-medium text-textDark lgl:w-2/3">
          <p>
            Hello! My name is Akash Paul and I enjoy creating things that live on internet. My
            interest in web development started back in 2017 when I started exploring some famous
            applications and through some of their open community source code, I found the front-end
            part to be more fascinating, hence went ahead with experimenting and exploring the UI
            which taught me a lot about how HTML and CSS communicate between each other!
          </p>
          <p>
            Fast-forward to today after completing my B-Tech and after going through several ins and
            outs of web-app development I had the privilege of working as a project dev in a
            multinational company also known as Wipro.
            <span className="text-textGreen">
              {" "}
              A MNC&apos; Employee, A Curious Explorer and a Passionate Developer.
            </span>
          </p>
          <p className="text-textGreen">
            Still interested and looking for some better opportunities to find a perfect fit for me
            and my capabilities.
          </p>
          <p>Here are a few technologies I have been working with recently:</p>
          <ul className="mt-6 grid max-w-[450px] grid-cols-2 gap-2 font-titleFont text-sm">
            {technologies.map((tech) => (
              <li key={tech} className="flex items-center gap-2">
                <span className="text-textGreen">
                  <AiFillThunderbolt />
                </span>
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className="group relative h-80 lgl:w-1/3">
          <div className="absolute -top-6 -left-6 h-80 rounded-lg">
            <div className="relative z-20 flex h-full pl-6 lgl:pl-0">
              <img
                src="/profileImg.jpeg"
                alt="Akash Paul"
                className="z-20 h-full rounded-lg object-cover"
              />
              <div className="absolute top-0 left-0 z-30 hidden h-80 w-full rounded-md bg-textGreen/20 duration-300 group-hover:bg-transparent lgl:inline-block"></div>
              <div className="absolute hidden h-80 w-full items-center rounded-md border-2 border-textGreen transition-transform duration-300 group-hover:translate-x-10 group-hover:translate-y-10 lgl:inline-flex"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
