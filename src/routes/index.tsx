import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { About } from "@/components/portfolio/About";
import { Banner } from "@/components/portfolio/Banner";
import { Contact } from "@/components/portfolio/Contact";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { LeftSide } from "@/components/portfolio/LeftSide";
import { Navbar } from "@/components/portfolio/Navbar";
import { Projects } from "@/components/portfolio/Projects";
import { RightSide } from "@/components/portfolio/RightSide";
import { SecAnimate } from "@/components/portfolio/SecAnimate";

const title = "Akash Paul — Full Stack Developer";
const description =
  "Portfolio of Akash Paul, web developer. About, experience, projects and contact details.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const sideRailAnimation = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay: 1.5 },
};

function Index() {
  return (
    <main
      className="portfolio-scrollbar h-screen w-full overflow-x-hidden overflow-y-scroll font-bodyFont text-textLight"
      style={{ background: "linear-gradient(to bottom, #000080, #007FFF)" }}
    >
      <Navbar />
      <div className="h-[88vh] w-full items-center justify-between gap-20 xl:flex">
        <motion.div
          {...sideRailAnimation}
          className="fixed bottom-0 left-0 hidden h-full w-32 xl:inline-flex"
        >
          <LeftSide />
        </motion.div>
        <div className="mx-auto h-[88vh] p-4">
          <Banner />
          <SecAnimate>
            <About />
          </SecAnimate>
          <SecAnimate>
            <Experience />
          </SecAnimate>
          <SecAnimate>
            <Projects />
          </SecAnimate>
          <SecAnimate>
            <Contact />
          </SecAnimate>
          <SecAnimate>
            <Footer />
          </SecAnimate>
        </div>
        <motion.div
          {...sideRailAnimation}
          className="fixed right-0 bottom-0 hidden h-full w-32 xl:inline-flex"
        >
          <RightSide />
        </motion.div>
      </div>
    </main>
  );
}
