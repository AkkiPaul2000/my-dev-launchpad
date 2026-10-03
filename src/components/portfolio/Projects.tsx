import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  FlaskConical,
  Gauge,
  Github,
  Heart,
  Leaf,
  Lock,
  Newspaper,
  Sparkles,
  Swords,
  type LucideIcon,
} from "lucide-react";
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { MdCatchingPokemon } from "react-icons/md";
import { SiBitcoin, SiEthereum } from "react-icons/si";

import { publicUrl } from "@/lib/public-url";

import { SectionTitle } from "./SectionTitle";

/** A decorative chip floating around a screenshot. Higher depth = nearer = more parallax. */
type Chip = { at: string; depth: number; node: ReactNode };

type Project = {
  title: string;
  tagline: string;
  liveUrl: string;
  repoUrl: string;
  image: { src: string; width: number; height: number };
  description: string;
  highlights: { icon: LucideIcon; text: string }[];
  stack: string[];
  /** The app's own palette (from its theme), picked up by the card's glows, beam, buttons and chips. */
  brand: string;
  brand2: string;
  chips: Chip[];
};

const ease = [0.22, 1, 0.36, 1] as const;

/*
 * Entrance choreography: the card rises, its browser frame scales in while the screen wipes open,
 * the copy staggers up, then the chips spring into place and fill their charts. Delays set on a
 * child override the parent's stagger, so the chip timings below are measured from the card's start.
 */
const cardIn: Variants = {
  hid: { opacity: 0, y: 48 },
  vis: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delayChildren: 0.1, staggerChildren: 0.07 },
  },
};
const frameIn: Variants = {
  hid: { opacity: 0, scale: 0.94 },
  vis: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } },
};
const wipe: Variants = {
  hid: { clipPath: "inset(0% 0% 100% 0%)" },
  vis: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, delay: 0.2, ease } },
};
const rise: Variants = {
  hid: { opacity: 0, y: 16 },
  vis: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const pop: Variants = {
  hid: { opacity: 0, scale: 0.5 },
  vis: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.55 + i * 0.12 },
  }),
};
const grow: Variants = {
  hid: { scaleX: 0 },
  vis: { scaleX: 1, transition: { duration: 1.1, delay: 1.1, ease } },
};
const draw: Variants = {
  hid: { pathLength: 0 },
  vis: { pathLength: 1, transition: { duration: 1.6, delay: 1, ease } },
};
const fadeIn: Variants = {
  hid: { opacity: 0 },
  vis: { opacity: 1, transition: { duration: 1, delay: 1.8 } },
};

// Fixed rather than random, so the server render and hydration agree.
const sparks: CSSProperties[] = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 7) % 100}%`,
  top: `${40 + ((i * 23) % 55)}%`,
  animationDelay: `${-i * 0.9}s`,
  animationDuration: `${8 + (i % 5)}s`,
}));

const pill =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase";
const up = "text-[oklch(0.74_0.171_158)]";

function Pokeball() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="size-12 origin-[50%_90%] animate-wobble drop-shadow-[0_14px_22px_oklch(0.57_0.226_24_/_45%)] md:size-16"
    >
      <circle cx="32" cy="32" r="30" fill="oklch(0.57 0.226 24)" />
      <path d="M2 32a30 30 0 0 0 60 0Z" fill="oklch(0.97 0.005 85)" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="oklch(0.18 0.01 270)" strokeWidth="3" />
      <path d="M3 32h58" stroke="oklch(0.18 0.01 270)" strokeWidth="4" />
      <circle
        cx="32"
        cy="32"
        r="8.5"
        fill="oklch(0.97 0.005 85)"
        stroke="oklch(0.18 0.01 270)"
        strokeWidth="4"
      />
      <ellipse
        cx="21"
        cy="16"
        rx="8"
        ry="3.5"
        fill="oklch(1 0 0 / 40%)"
        transform="rotate(-32 21 16)"
      />
    </svg>
  );
}

function BaseStats() {
  const stats = [
    ["HP", 45],
    ["Attack", 49],
    ["Sp. Atk", 65],
  ] as const;
  return (
    <div className="glass-chip w-44 p-3">
      <p className="flex justify-between font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
        Base stats <span className="text-foreground">318</span>
      </p>
      {stats.map(([label, value]) => (
        <div key={label} className="mt-2 flex items-center gap-2 font-mono text-[10px]">
          <span className="w-11 text-muted-foreground">{label}</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.span
              variants={grow}
              style={{ width: `${value}%` }}
              className="block h-full origin-left rounded-full bg-(--brand)"
            />
          </span>
          <span className="w-4 text-right text-foreground">{value}</span>
        </div>
      ))}
    </div>
  );
}

function TypePills() {
  return (
    <div className="glass-chip flex gap-2 p-2">
      <span className={`${pill} bg-[oklch(0.75_0.175_136)] text-[oklch(0.22_0.05_136)]`}>
        <Leaf className="size-3" /> Grass
      </span>
      <span className={`${pill} bg-[oklch(0.54_0.178_328)] text-white`}>
        <FlaskConical className="size-3" /> Poison
      </span>
    </div>
  );
}

function DexEntry() {
  return (
    <div className="glass-chip flex items-center gap-3 py-2 pr-4 pl-2">
      <span className="grid size-9 place-items-center rounded-full bg-(--brand)/15 text-(--brand)">
        <MdCatchingPokemon className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-mono text-[10px] text-muted-foreground">
          #001 · Seed Pokémon
        </span>
        <span className="block text-sm font-semibold text-foreground">Bulbasaur</span>
      </span>
    </div>
  );
}

function CrxOrb() {
  return (
    <div className="relative grid size-16 place-items-center md:size-20">
      <span className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full border border-dashed border-(--brand)/45">
        <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-(--brand-2) shadow-[0_0_12px_var(--brand-2)]" />
      </span>
      <span className="grid size-11 place-items-center rounded-xl bg-linear-to-br from-[oklch(0.87_0.152_93)] to-[oklch(0.72_0.143_89)] font-titleFont text-xs font-bold text-[oklch(0.22_0.03_85)] shadow-[0_14px_30px_-10px_oklch(0.82_0.162_88_/_70%)] md:size-14 md:text-sm">
        CRX
      </span>
    </div>
  );
}

function Ticker() {
  return (
    <div className="glass-chip flex items-center gap-3 py-2 pr-3 pl-2">
      <span className="grid size-9 place-items-center rounded-full bg-[oklch(0.75_0.166_63)] text-white">
        <SiBitcoin className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-mono text-[10px] text-muted-foreground">BTC · USD</span>
        <span className="block text-sm font-semibold text-foreground">$84,578.68</span>
      </span>
      <span
        className={`rounded-md bg-[oklch(0.74_0.171_158_/_14%)] px-1.5 py-0.5 font-mono text-[11px] font-semibold ${up}`}
      >
        ▲ 1.05%
      </span>
    </div>
  );
}

const sparkline = "M0 26 L12 22 L24 25 L36 15 L48 18 L60 10 L72 14 L84 8 L96 12 L108 5 L120 7";

function Sparkline() {
  return (
    <div className="glass-chip w-48 p-3">
      <p className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <SiEthereum className="size-3 text-foreground" /> ETH · 24h
        </span>
        <span className={up}>▲ 0.38%</span>
      </p>
      <svg viewBox="0 0 120 34" className="mt-2 h-9 w-full overflow-visible">
        <defs>
          <linearGradient id="sparkline-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(0.74 0.171 158)" stopOpacity="0.35" />
            <stop offset="1" stopColor="oklch(0.74 0.171 158)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          variants={fadeIn}
          d={`${sparkline} L120 34 L0 34 Z`}
          fill="url(#sparkline-fill)"
        />
        <motion.path
          variants={draw}
          d={sparkline}
          fill="none"
          stroke="oklch(0.74 0.171 158)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function LiveBadge() {
  return (
    <div className="glass-chip flex items-center gap-2 px-3.5 py-2 font-mono text-[11px] text-foreground">
      <span className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-[oklch(0.74_0.171_158)]" />
        <span className="relative size-2 rounded-full bg-[oklch(0.74_0.171_158)]" />
      </span>
      Live · top 100 coins
    </div>
  );
}

const projects: Project[] = [
  {
    title: "Pokedex",
    tagline: "A handheld Pokédex, rebuilt for the browser",
    liveUrl: "https://akkipaul2000.github.io/pokedex/",
    repoUrl: "https://github.com/AkkiPaul2000/pokedex",
    image: { src: "pokedex.jpg", width: 1600, height: 867 },
    description:
      "A device-styled Pokédex where every Pokémon gets a scene themed to its type: 3D-rendered art on a Poké Ball stand, flavour text, abilities, base stats and a full type-matchup chart, with evolutions, catch locations and moves one tab away.",
    highlights: [
      { icon: Sparkles, text: "Type-themed scenes with animated page transitions" },
      { icon: Swords, text: "Weakness, resistance and matchup charts for every type pairing" },
      { icon: Heart, text: "Side-by-side compare and a personal list synced with Firebase" },
    ],
    stack: ["TypeScript", "React", "Redux Toolkit", "Framer Motion", "SCSS", "Firebase", "PokéAPI"],
    brand: "oklch(0.75 0.175 136)",
    brand2: "oklch(0.57 0.226 24)",
    chips: [
      { at: "-left-2 -top-8 md:-left-7 md:-top-10", depth: 1.4, node: <Pokeball /> },
      { at: "-top-7 right-[4%] hidden md:block", depth: 0.7, node: <DexEntry /> },
      // Lifted out of the screenshot's own base-stats panel, leaving the type matchups visible.
      { at: "-right-6 bottom-[12%] hidden md:block", depth: 0.9, node: <BaseStats /> },
      { at: "-bottom-7 left-[4%] md:-bottom-9", depth: 1.2, node: <TypePills /> },
    ],
  },
  {
    title: "CryptoXplorers",
    tagline: "Real-time crypto market intelligence",
    liveUrl: "https://akkipaul2000.github.io/cryptoXplorers-port",
    repoUrl: "https://github.com/AkkiPaul2000/cryptoXplorers-port",
    image: { src: "cryptoxplorers.jpg", width: 1600, height: 875 },
    description:
      "A live dashboard for the top 100 cryptocurrencies, built to help investors spot the next move and buy safely: a ticker tape, biggest movers, a searchable screener, heatmaps, risk scores, order-book depth and headlines in one place.",
    highlights: [
      {
        icon: Activity,
        text: "Live ticker, top-100 screener and biggest movers in USD, INR or EUR",
      },
      { icon: Gauge, text: "Risk scores, Fear & Greed sentiment and Binance order-book depth" },
      { icon: Newspaper, text: "News & signals from CoinDesk and Cointelegraph feeds" },
    ],
    stack: ["React", "Material UI", "Chart.js", "React Router", "Axios", "CoinPaprika", "Vercel"],
    brand: "oklch(0.82 0.162 88)",
    brand2: "oklch(0.64 0.2 293)",
    chips: [
      { at: "-left-3 -top-9 md:-left-8 md:-top-11", depth: 1.4, node: <CrxOrb /> },
      { at: "-right-6 top-[12%] hidden md:block", depth: 0.9, node: <Ticker /> },
      { at: "-bottom-8 left-[4%] md:-bottom-10", depth: 1.2, node: <Sparkline /> },
      { at: "-bottom-6 right-[6%] hidden md:block", depth: 0.7, node: <LiveBadge /> },
    ],
  },
];

function FloatingChip({
  chip,
  index,
  x,
  y,
  scroll,
}: {
  chip: Chip;
  index: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  scroll: MotionValue<number>;
}) {
  const { depth } = chip;
  // Nearer chips travel further with the pointer and the scroll, which reads as depth.
  const offsetX = useTransform(() => x.get() * depth * 40);
  const offsetY = useTransform(() => y.get() * depth * 40 + (0.5 - scroll.get()) * depth * 100);

  return (
    <motion.div
      aria-hidden
      custom={index}
      variants={pop}
      style={{ x: offsetX, y: offsetY }}
      className={`pointer-events-none absolute z-10 ${chip.at}`}
    >
      {/* The CSS bob lives on its own element so it never fights the motion transforms above. */}
      <div
        className="animate-float max-md:scale-75"
        style={{ animationDelay: `${index * -1.7}s`, animationDuration: `${6 + index * 1.4}s` }}
      >
        {chip.node}
      </div>
    </motion.div>
  );
}

const dots = ["oklch(0.7 0.19 25)", "oklch(0.84 0.16 85)", "oklch(0.77 0.17 150)"];

function Showcase({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  // Pointer over the card, -0.5..0.5 per axis, sprung so the tilt and chips glide after it.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerX, { stiffness: 140, damping: 18, mass: 0.5 });
  const tiltY = useSpring(pointerY, { stiffness: 140, damping: 18, mass: 0.5 });
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [7, -7]);
  const glareX = useTransform(tiltX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(tiltY, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, oklch(1 0 0 / 16%), transparent 55%)`;

  // Pointer in pixels, for the brand-coloured spotlight that follows it across the card.
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${spotX}px ${spotY}px, color-mix(in oklab, var(--brand) 13%, transparent), transparent 70%)`;

  // 0 → 1 while the card crosses the viewport (held mid-way for reduced motion).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scroll = useTransform(scrollYProgress, (p) => (still ? 0.5 : p));
  const frameY = useTransform(scroll, [0, 1], [40, -40]);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    spotX.set(event.clientX - box.left);
    spotY.set(event.clientY - box.top);
    // Tilt stays under reduced motion: it only moves while the pointer does.
    if (event.pointerType !== "mouse") return;
    pointerX.set((event.clientX - box.left) / box.width - 0.5);
    pointerY.set((event.clientY - box.top) / box.height - 0.5);
  };
  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const reverse = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      variants={cardIn}
      initial={still ? false : "hid"}
      animate={still || inView ? "vis" : "hid"}
      style={{ "--brand": project.brand, "--brand-2": project.brand2 } as MotionStyle}
      className="group/card relative isolate overflow-hidden rounded-2xl border border-border bg-card/60 p-5 md:p-8 lgl:p-12"
    >
      {/* Ambient layer: drifting glows, a dotted field, rising sparks and the pointer spotlight. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="showcase-grid absolute inset-0" />
        <div
          className={`showcase-orb -top-56 size-[36rem] ${reverse ? "-right-40" : "-left-40"}`}
        />
        <div
          className={`showcase-orb -bottom-60 size-[30rem] [animation-delay:-11s] [--orb:var(--brand-2)] ${reverse ? "-left-32" : "-right-32"}`}
        />
        {sparks.map((style, i) => (
          <span
            key={i}
            style={style}
            className="absolute size-1 animate-rise rounded-full bg-(--brand) opacity-0"
          />
        ))}
        <motion.div
          style={{ background: spotlight }}
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        />
      </div>

      <div className="grid items-center gap-12 lgl:grid-cols-12 lgl:gap-14">
        <div
          className={`relative min-w-0 perspective-[1600px] lgl:col-span-7 ${reverse ? "lgl:order-last" : ""}`}
        >
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title} live demo`}
            variants={frameIn}
            style={{ y: frameY, rotateX, rotateY }}
            className="group/frame relative block rounded-xl border border-white/10 bg-background shadow-[0_40px_120px_-50px_var(--brand)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-t-xl border-b border-white/10 bg-white/3 px-3 py-2 sm:px-4">
              <span className="flex gap-1.5">
                {dots.map((color, i) => (
                  <span
                    key={color}
                    style={{ "--dot": color, transitionDelay: `${i * 60}ms` } as CSSProperties}
                    className="size-2.5 rounded-full bg-white/15 transition-colors duration-300 group-hover/frame:bg-(--dot)"
                  />
                ))}
              </span>
              <span className="flex min-w-0 items-center gap-1.5 rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] text-muted-foreground sm:text-[11px]">
                <Lock className="size-3 shrink-0" />
                <span className="truncate">{new URL(project.liveUrl).host}</span>
              </span>
            </div>
            <motion.div variants={wipe} className="relative overflow-hidden rounded-b-xl">
              <img
                src={publicUrl(project.image.src)}
                width={project.image.width}
                height={project.image.height}
                alt={`${project.title} interface`}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full transition-transform duration-[1.4s] ease-out group-hover/frame:scale-[1.035]"
              />
              <motion.div
                aria-hidden
                style={{ background: glare }}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
              />
              <span className="absolute inset-0 grid place-items-center transition-colors duration-500 group-hover/frame:bg-background/40 group-focus-visible/frame:bg-background/40">
                <span className="glass-chip flex translate-y-3 items-center gap-2 px-4 py-2 text-sm font-semibold text-foreground opacity-0 transition duration-500 group-hover/frame:translate-y-0 group-hover/frame:opacity-100 group-focus-visible/frame:translate-y-0 group-focus-visible/frame:opacity-100">
                  Open live demo <ArrowUpRight className="size-4" />
                </span>
              </span>
            </motion.div>
            <span aria-hidden className="border-beam" />
          </motion.a>

          {project.chips.map((chip, i) => (
            <FloatingChip key={i} chip={chip} index={i} x={tiltX} y={tiltY} scroll={scroll} />
          ))}
        </div>

        {/* A size container, so the title scales with its column rather than the viewport. */}
        <div className="@container min-w-0 lgl:col-span-5">
          <motion.p
            variants={rise}
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase"
          >
            <span className="text-(--brand)">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-10 bg-(--brand)/50" />
            {index === 0 ? "Featured project" : "Selected project"}
          </motion.p>
          <motion.h3
            variants={rise}
            className="mt-4 font-titleFont text-[clamp(1.6rem,12.5cqi,3rem)] leading-none font-bold"
          >
            <span className="showcase-title group-hover/card:[background-position:0%_0]">
              {project.title}
            </span>
          </motion.h3>
          <motion.p
            variants={rise}
            className="mt-3 font-titleFont text-base font-medium text-(--brand) sm:text-lg"
          >
            {project.tagline}
          </motion.p>
          <motion.p
            variants={rise}
            className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base"
          >
            {project.description}
          </motion.p>
          <motion.ul variants={rise} className="mt-6 space-y-3">
            {project.highlights.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-start gap-3 text-sm leading-6 text-foreground/85"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-(--brand)/10 text-(--brand)">
                  <Icon className="size-3.5" />
                </span>
                <span className="pt-0.5">{text}</span>
              </li>
            ))}
          </motion.ul>
          <motion.ul variants={rise} className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="tech-chip transition-colors duration-300 hover:border-(--brand)/60 hover:text-foreground"
              >
                {tech}
              </li>
            ))}
          </motion.ul>
          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/live inline-flex min-h-11 items-center gap-2 rounded-md bg-(--brand) px-5 text-sm font-bold text-[oklch(0.17_0.01_270)] shadow-[0_12px_32px_-12px_var(--brand)] transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            >
              Live demo
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
              />
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background/40 px-5 text-sm font-semibold text-foreground transition-colors hover:border-(--brand) hover:text-(--brand) focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <Github size={16} /> Source code
            </a>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="Projects" className="section-shell">
      <SectionTitle title="Selected work" titleNo="03" />
      <div className="flex flex-col gap-8 sm:gap-12">
        {projects.map((project, index) => (
          <Showcase key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
