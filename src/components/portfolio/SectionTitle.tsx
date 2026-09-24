import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SectionTitle({ title, titleNo }: { title: string; titleNo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const state = inView ? "vis" : "hid";

  return (
    <div ref={ref} className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 sm:gap-4">
        <motion.span
          className="font-mono text-xs font-semibold tracking-widest text-primary sm:text-sm"
          variants={{
            hid: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 },
            vis: { opacity: 1, y: 0 },
          }}
          initial="hid"
          animate={state}
          transition={{ duration: 0.35, ease }}
        >
          /{titleNo}
        </motion.span>
        <motion.span
          className="h-px flex-1 origin-left bg-border"
          variants={{ hid: { scaleX: reduceMotion ? 1 : 0 }, vis: { scaleX: 1 } }}
          initial="hid"
          animate={state}
          transition={{ duration: 0.6, delay: 0.08, ease }}
        />
      </div>
      <motion.h2
        className="mt-3 font-titleFont text-[clamp(1.75rem,6vw,3.25rem)] font-semibold leading-[1.05] text-foreground"
        variants={{
          hid: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 },
          vis: { opacity: 1, y: 0 },
        }}
        initial="hid"
        animate={state}
        transition={{ duration: 0.5, delay: 0.1, ease }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
