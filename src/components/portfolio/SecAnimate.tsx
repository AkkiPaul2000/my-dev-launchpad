import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Slides a section down into place the first time it scrolls into view. */
export function SecAnimate({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={{
        hid: { y: reduceMotion ? 0 : 24, opacity: reduceMotion ? 1 : 0 },
        vis: { y: 0, opacity: 1 },
      }}
      initial="hid"
      animate={inView ? "vis" : "hid"}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
