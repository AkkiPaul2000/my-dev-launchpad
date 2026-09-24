import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/portfolio/About";
import { Banner } from "@/components/portfolio/Banner";
import { Contact } from "@/components/portfolio/Contact";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { Navbar } from "@/components/portfolio/Navbar";
import { Projects } from "@/components/portfolio/Projects";
import { SecAnimate } from "@/components/portfolio/SecAnimate";

const title = "Akash Paul — Full Stack Developer";
const description = "Full Stack Developer with 4+ years of experience building scalable APIs, data systems, and responsive products with React, NestJS, Node.js, and cloud infrastructure.";

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

function Index() {
  return (
    <main className="portfolio-scrollbar min-h-screen overflow-x-hidden bg-background font-bodyFont text-foreground">
      <Navbar />
      <Banner />
      <SecAnimate><About /></SecAnimate>
      <SecAnimate><Experience /></SecAnimate>
      <SecAnimate><Projects /></SecAnimate>
      <SecAnimate><Contact /></SecAnimate>
      <Footer />
    </main>
  );
}
