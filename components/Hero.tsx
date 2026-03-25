"use client";

import { motion, type Variants } from "framer-motion";

const metrics = [
  { value: "+500", label: "atletas activos" },
  { value: "07", label: "bloques por semana" },
  { value: "100", label: "modo foco" },
];

const easing = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      delay,
      ease: easing,
    },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-12 pt-6 sm:pb-16 lg:pb-20">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(215,255,100,0.18),transparent_18%),radial-gradient(circle_at_88%_18%,rgba(255,255,255,0.14),transparent_18%)]" />

      <div className="section-shell relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={reveal}
            custom={0.08}
            className="eyebrow"
          >
            Dark cyber-punk brutalist / alta performance
          </motion.div>

          <div className="mt-6 space-y-2 font-display uppercase leading-[0.82] tracking-[-0.08em] text-[clamp(4rem,16vw,11rem)]">
            <motion.span initial="hidden" animate="show" variants={reveal} custom={0.14} className="neon-fill block">
              Max
            </motion.span>
            <motion.span initial="hidden" animate="show" variants={reveal} custom={0.2} className="outline-hover block">
              Club
            </motion.span>
            <motion.span initial="hidden" animate="show" variants={reveal} custom={0.26} className="outline-hover block">
              Gym
            </motion.span>
          </div>

          <motion.p
            initial="hidden"
            animate="show"
            variants={reveal}
            custom={0.34}
            className="mt-6 max-w-2xl text-balance text-lg leading-8 text-white/75 sm:text-xl"
          >
            Una PWA con presencia de cartel urbano y precision de producto tecnico. Negro total, acido neon, bordes duros y una narrativa hecha para vender intensidad.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={reveal}
            custom={0.42}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#servicios"
              className="inline-flex min-h-14 items-center justify-center border border-accent bg-accent px-6 text-sm font-bold uppercase tracking-[0.25em] text-black transition hover:-translate-y-1 hover:shadow-halo"
            >
              Explorar bloques
            </a>
            <a
              href="#planes"
              className="inline-flex min-h-14 items-center justify-center border border-white/20 bg-white/[0.04] px-6 text-sm font-bold uppercase tracking-[0.25em] text-white transition hover:border-white/50 hover:bg-white/[0.08]"
            >
              Ver planes
            </a>
          </motion.div>

          <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
            {metrics.map((item, index) => (
              <motion.div
                key={item.label}
                initial="hidden"
                animate="show"
                variants={reveal}
                custom={0.5 + index * 0.08}
                className="border border-white/10 bg-black/25 p-4"
              >
                <p className="font-display text-4xl uppercase tracking-[-0.05em] text-white">{item.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/48">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.25, ease: easing }}
          className="glitch-frame brutalist-panel relative min-h-[28rem] overflow-hidden p-5 sm:min-h-[34rem] sm:p-6"
        >
          <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.07),transparent_45%),radial-gradient(circle_at_top,rgba(215,255,100,0.35),transparent_38%),linear-gradient(120deg,#050505_0%,#171a10_42%,#ffffff_100%)] opacity-90" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
          <div className="absolute inset-y-0 left-10 w-px bg-white/10" />

          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between gap-4 text-xs font-bold uppercase tracking-[0.28em] text-black sm:text-sm">
              <span className="bg-white px-3 py-2">Signal up</span>
              <span className="bg-accent px-3 py-2">PWA ready</span>
            </div>

            <div>
              <p className="max-w-sm text-sm font-bold uppercase tracking-[0.28em] text-black/70 sm:text-base">
                Gradiente vivo en lugar de hero generico.
              </p>
              <h1 className="mt-4 max-w-xl font-display text-[clamp(3.6rem,11vw,7.8rem)] uppercase leading-[0.8] tracking-[-0.08em] text-black">
                Power in motion.
              </h1>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border border-black/15 bg-black/80 p-4 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-white/48">Stack</p>
                <p className="mt-2 text-2xl font-bold uppercase">Next / Tailwind / TS / PWA</p>
              </div>
              <div className="border border-black/15 bg-white/80 p-4 text-black">
                <p className="text-xs uppercase tracking-[0.24em] text-black/55">Visual system</p>
                <p className="mt-2 text-xl font-bold uppercase">Outline hover, bordes duros y contraste extremo.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
