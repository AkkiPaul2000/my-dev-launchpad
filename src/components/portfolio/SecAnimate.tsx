import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Slides a section into place the first time it scrolls into view. */
export function SecAnimate({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={{
        hid: { y: reduceMotion ? 0 : 28, opacity: reduceMotion ? 1 : 0 },
        vis: { y: 0, opacity: 1 },
      }}
      initial="hid"
      animate={inView ? "vis" : "hid"}
      transition={{ duration: 0.55, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Reveals a single item (card, row, paragraph) as it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px -8% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className ?? ""}
      variants={{
        hid: { y: reduceMotion ? 0 : 18, opacity: reduceMotion ? 1 : 0 },
        vis: { y: 0, opacity: 1 },
      }}
      initial="hid"
      animate={inView ? "vis" : "hid"}
      transition={{ duration: 0.45, delay: reduceMotion ? 0 : delay, ease }}
    >
      {children}
    </motion.div>
  );
}
