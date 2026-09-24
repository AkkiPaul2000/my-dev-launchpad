import { motion } from "framer-motion";

import { scrollToSection } from "./scroll-to";

const fadeUp = (delay: number) => ({
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5, delay },
});

export function Banner() {
  return (
    <section
      id="Home"
      className="mx-auto flex min-h-screen max-w-contentContainer flex-col gap-4 py-10 mdl:px-10 mdl:py-24 lgl:gap-8 xl:px-4"
      style={{ height: "101vh" }}
    >
      <motion.h3 {...fadeUp(0.6)} className="text-2xl tracking-wide text-textGreen lgl:text-3xl">
        Hi, My name is
      </motion.h3>
      <motion.h1 {...fadeUp(0.7)} className="flex flex-col text-4xl font-semibold lgl:text-6xl">
        Akash Paul. <span className="mt-2 text-textDark lgl:mt-4">I build things with web.</span>
      </motion.h1>
      <motion.p {...fadeUp(0.8)} className="text-base font-medium text-textDark md:max-w-[650px]">
        I am a web developer with 2+years of experience in react. I have a strong foundation in
        front-end & back-end development and skilled in creating user-friendly and web responsive
        applications using react and its ecosystem.
      </motion.p>
      <motion.button
        {...fadeUp(0.9)}
        type="button"
        className="h-14 w-52 rounded-md border border-textGreen font-titleFont text-sm tracking-wide text-textGreen duration-300 hover:bg-hoverColor"
        onClick={() => scrollToSection("#Projects")}
      >
        Check out my Project!
      </motion.button>
    </section>
  );
}
