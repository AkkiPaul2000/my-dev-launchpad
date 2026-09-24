import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import resumeAsset from "@/assets/Akash-Paul-Resume.pdf.asset.json";

import { scrollToSection } from "./scroll-to";

const links = [
  { target: "#About", label: "About" },
  { target: "#Skills", label: "Skills" },
  { target: "#Experience", label: "Experience" },
  { target: "#Projects", label: "Work" },
  { target: "#Contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = (target: string) => {
    scrollToSection(target);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto grid h-16 max-w-container grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:px-12">
        <button type="button" onClick={() => navigate("#Home")} className="w-fit font-titleFont text-xl font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          AP<span className="text-primary">.</span>
        </button>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <button key={link.target} type="button" onClick={() => navigate(link.target)} className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-primary">
              {link.label}
            </button>
          ))}
          <a href={resumeAsset.url} target="_blank" rel="noreferrer" className="rounded-md border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Résumé
          </a>
        </div>
        <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-md border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t border-border bg-background md:hidden">
            <div className="grid gap-1 px-5 py-4">
              {links.map((link) => (
                <button key={link.target} type="button" onClick={() => navigate(link.target)} className="rounded-md px-3 py-3 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
                  {link.label}
                </button>
              ))}
              <a href={resumeAsset.url} target="_blank" rel="noreferrer" className="mt-2 rounded-md bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground">Open résumé</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
