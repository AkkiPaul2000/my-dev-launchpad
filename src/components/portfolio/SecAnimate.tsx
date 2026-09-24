import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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

/** Opacity for a section: fades in while arriving, fades part-way out while leaving. */
function useSectionOpacity(enter: MotionValue<number>, exit: MotionValue<number>) {
  return useTransform(() => Math.min(0.25 + enter.get() * 0.75, 1 - exit.get() * 0.55));
}

/**
 * Viewport-sized page transition driven by scroll position. A section rises and fades in as
 * it comes up to the navbar, then sinks back and dims as the next section takes over the screen,
 * so moving between "pages" reads as one continuous motion in both scroll directions.
 */
export function ScrollSection({
  children,
  first = false,
}: {
  children: ReactNode;
  /** The first section is already on screen at load, so it only animates on the way out. */
  first?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 → 1 while the section's top travels from the bottom of the viewport to the top.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 20%"] });
  // 0 → 1 while the section's bottom travels from mid-viewport to the top: it only recedes once
  // the next section fills half the screen, so tall sections stay put while being read.
  const { scrollYProgress: exit } = useScroll({ target: ref, offset: ["end 50%", "end start"] });

  const y = useTransform(enter, [0, 1], [first ? 0 : 72, 0]);
  const scale = useTransform(exit, [0, 1], [1, 0.95]);
  const opacity = useSectionOpacity(enter, exit);
  const firstOpacity = useTransform(exit, [0, 1], [1, 0.45]);

  // The outer element never moves, so scroll progress is measured against a stable box.
  return (
    <div ref={ref}>
      {reduceMotion ? (
        children
      ) : (
        <motion.div
          style={{ y, scale, opacity: first ? firstOpacity : opacity, transformOrigin: "50% 100%" }}
          className="will-change-transform"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
