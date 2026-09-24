import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function SectionTitle({ title, titleNo }: { title: string; titleNo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div ref={ref} className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 sm:gap-4">
        <motion.span
          className="font-mono text-xs font-semibold tracking-widest text-primary sm:text-sm"
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.35, ease }}
        >
          /{titleNo}
        </motion.span>
        <motion.span
          className="h-px flex-1 origin-left bg-border"
          initial={{ scaleX: reduceMotion ? 1 : 0 }}
          animate={inView ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.08, ease }}
        />
      </div>
      <motion.h2
        className="mt-3 font-titleFont text-[clamp(1.75rem,6vw,3.25rem)] font-semibold leading-[1.05] text-foreground"
        initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.1, ease }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
