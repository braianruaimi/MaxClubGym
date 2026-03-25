"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Crossfit",
    tag: "Carga / velocidad / tecnica",
    body: "Bloques brutales de fuerza, engine y skill. El layout grande le da el peso visual que merece el servicio mas explosivo.",
    stats: ["12 estaciones", "Coach lead", "WOD diario"],
    className: "md:col-span-2 md:row-span-2 min-h-[28rem]",
    accent: "bg-[radial-gradient(circle_at_top_left,rgba(215,255,100,0.18),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.05),transparent_70%)]",
  },
  {
    title: "Yoga",
    tag: "Respiracion / control / reset",
    body: "Un bloque silencioso con tension visual minima para contrastar con el resto y reforzar la sensacion de sistema.",
    stats: ["Flow recovery", "Movilidad", "Baja luz"],
    className: "min-h-[18rem]",
    accent: "bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_66%)]",
  },
  {
    title: "Nutricion",
    tag: "Precision / control / data",
    body: "Planes medibles, ajustes claros y visualizacion directa del progreso para que el rendimiento no dependa de intuicion.",
    stats: ["Macros", "Seguimiento", "Objetivos"],
    className: "min-h-[18rem]",
    accent: "bg-[radial-gradient(circle_at_top,rgba(215,255,100,0.16),transparent_36%),linear-gradient(125deg,rgba(255,255,255,0.08),transparent_55%)]",
  },
];

export function ServicesGrid() {
  return (
    <div className="grid auto-rows-[minmax(16rem,auto)] gap-4 md:grid-cols-3 md:grid-rows-[1.1fr_0.9fr]">
      {cards.map((card, index) => (
        <motion.article
          key={card.title}
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`brutalist-panel group relative overflow-hidden p-6 sm:p-7 ${card.className}`}
        >
          <div className={`absolute inset-0 transition duration-300 group-hover:scale-[1.02] ${card.accent}`} />
          <div className="absolute inset-x-0 top-0 h-1 bg-accent/80 opacity-0 transition duration-300 group-hover:opacity-100" />

          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/46">{card.tag}</p>
              <h3 className="mt-4 font-display text-4xl uppercase leading-none tracking-[-0.06em] text-white sm:text-5xl">
                {card.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-7 text-white/70">{card.body}</p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {card.stats.map((stat) => (
                <div key={stat} className="border border-white/10 bg-black/25 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white/80">
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </motion.article>
      ))}

      <motion.article
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="brutalist-panel relative flex min-h-[18rem] flex-col justify-between overflow-hidden p-6 sm:p-7"
      >
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),transparent_42%),repeating-linear-gradient(90deg,rgba(255,255,255,0.02)_0,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_28px)]" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">Posicionamiento</p>
          <h3 className="mt-4 font-display text-3xl uppercase leading-none tracking-[-0.05em] text-white sm:text-4xl">
            Se siente como una consola de entrenamiento, no como un folleto digital.
          </h3>
        </div>

        <div className="relative grid gap-3 sm:grid-cols-2">
          <div className="border border-white/10 bg-black/25 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">Bordes</p>
            <p className="mt-2 text-xl font-bold uppercase text-white">Duros y visibles</p>
          </div>
          <div className="border border-white/10 bg-black/25 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">Ritmo</p>
            <p className="mt-2 text-xl font-bold uppercase text-white">Asimetrico</p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}