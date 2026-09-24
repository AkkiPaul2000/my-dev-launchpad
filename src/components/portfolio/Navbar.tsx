import { motion } from "framer-motion";

import { scrollToSection } from "./scroll-to";

const links = [
  { target: "#Home", label: "Home" },
  { target: "#About", no: "01.", label: "About" },
  { target: "#Experience", no: "02.", label: "Experience" },
  { target: "#Projects", no: "03.", label: "Projects" },
  { target: "#Contact", no: "04.", label: "Contacts" },
];

export function Navbar() {
  return (
    <div
      className="sticky top-0 z-50 h-20 w-full px-4 shadow-navbarShadow"
      style={{ backgroundColor: "#000080" }}
    >
      <div className="mx-auto flex h-full max-w-container items-center justify-between py-1 font-titleFont">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/logo1.png" alt="logo" width={100} height={100} />
        </motion.div>
        <div className="hidden items-center gap-7 mdl:inline-flex">
          <ul className="flex gap-7 text-[13px]">
            {links.map((link, i) => (
              <motion.li
                key={link.target}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.2 }}
              >
                <button
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                  className="nav-link flex cursor-pointer items-center gap-1 font-medium text-textDark duration-300 hover:text-textGreen"
                >
                  {link.no && <span>{link.no}</span>} {link.label}
                </button>
              </motion.li>
            ))}
          </ul>
          <motion.a
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-md border border-textGreen px-4 py-2 text-[13px] text-textGreen duration-300 hover:bg-hoverColor"
          >
            Resume
          </motion.a>
        </div>
      </div>
    </div>
  );
}
