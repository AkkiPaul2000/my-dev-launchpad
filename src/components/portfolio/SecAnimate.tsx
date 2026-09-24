import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Slides a section down into place the first time it scrolls into view. */
export function SecAnimate({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={{
        hid: { y: -100, opacity: 0 },
        vis: { y: 0, opacity: 1 },
      }}
      initial="hid"
      animate={inView ? "vis" : "hid"}
      transition={{ duration: 0.7, delay: 1 }}
    >
      {children}
    </motion.div>
  );
}
