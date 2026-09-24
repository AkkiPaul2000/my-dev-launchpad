import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { RESUME_URL } from "@/lib/public-url";

import { scrollToSection } from "./scroll-to";

const links = [
  { target: "#About", label: "About" },
  { target: "#Skills", label: "Skills" },
  { target: "#Experience", label: "Experience" },
  { target: "#Projects", label: "Work" },
  { target: "#Contact", label: "Contact" },
];

const trackedSections = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];

/**
 * The last section (in page order) whose top has passed the upper third of the viewport.
 * Works for nested sections too (#Skills lives inside #About).
 */
function useActiveSection() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = trackedSections[0]!;
      for (const id of trackedSections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last section may never reach that line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = trackedSections[trackedSections.length - 1]!;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  // Mobile menu: scroll only after it has collapsed. It sits in the sticky header, so its
  // height would otherwise shift the page while the smooth scroll is running.
  const pendingTarget = useRef<string | null>(null);

  const navigate = (target: string) => {
    if (open) {
      pendingTarget.current = target;
      setOpen(false);
    } else {
      scrollToSection(target);
    }
  };

  const onMenuClosed = () => {
    if (pendingTarget.current) scrollToSection(pendingTarget.current);
    pendingTarget.current = null;
  };

  const isActive = (target: string) => active === target.slice(1);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto grid h-16 max-w-container grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => navigate("#Home")}
          className="w-fit font-titleFont text-xl font-bold text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          AP<span className="text-primary">.</span>
        </button>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <button
              key={link.target}
              type="button"
              onClick={() => navigate(link.target)}
              aria-current={isActive(link.target) ? "true" : undefined}
              className={`relative py-1 text-sm transition-colors duration-300 hover:text-foreground focus-visible:text-primary focus-visible:outline-none ${
                isActive(link.target) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
              {isActive(link.target) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-0 -bottom-0.5 h-px bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Resume
          </a>
        </div>
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid size-10 place-items-center rounded-md border border-border text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:hidden"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>
      <AnimatePresence onExitComplete={onMenuClosed}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="grid gap-1 px-5 py-4">
              {links.map((link) => (
                <button
                  key={link.target}
                  type="button"
                  onClick={() => navigate(link.target)}
                  className={`rounded-md px-3 py-3 text-left text-sm hover:bg-secondary hover:text-foreground ${
                    isActive(link.target) ? "bg-secondary text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-md bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground"
              >
                Open resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
