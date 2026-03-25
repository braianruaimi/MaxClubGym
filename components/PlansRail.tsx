"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    price: "$20.000/mes",
    focus: "La puerta de entrada para empezar con estructura, tecnica y constancia desde la primera semana.",
    features: ["3 dias por semana", "seguimiento inicial", "adaptacion progresiva"],
  },
  {
    name: "Pro",
    price: "$28.000/mes",
    focus: "Ilimitado para quien quiere mas volumen, mas control de progreso y mejor recuperacion durante el mes.",
    features: ["ilimitado", "recuperacion activa", "evaluacion mensual"],
  },
  {
    name: "Elite",
    price: "$35.000/mes",
    focus: "Todo incluido para quienes buscan rendimiento total con nutricion personalizada y prioridad operativa.",
    features: ["todo incluido", "plan nutricional personalizado", "acceso prioritario"],
  },
];

export function PlansRail() {
  return (
    <section className="overflow-hidden border-y border-white/10 py-10 sm:py-14">
      <div className="mb-8 overflow-hidden border-y border-white/10 bg-white/[0.03] py-3">
        <div className="animate-marquee flex min-w-max gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-[0.32em] text-white/55">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex gap-8 px-4">
              <span>Desplazamiento horizontal</span>
              <span>Planes de entrenamiento</span>
              <span>Verde neon</span>
              <span>Brutalismo oscuro</span>
              <span>Pase de cortesia</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow">Planes con desplazamiento lateral</span>
            <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Elegi entre basic, pro y elite segun tu nivel de compromiso y el tipo de acompanamiento que buscas.
            </h2>
          </div>
          <p className="max-w-xl text-sm uppercase tracking-[0.18em] text-white/55 sm:text-base">
            Cada plan esta armado para una realidad distinta: empezar, acelerar o ir por rendimiento total.
          </p>
        </div>

        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, x: 28, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="brutalist-panel min-h-[24rem] min-w-[85vw] snap-start p-6 sm:min-w-[28rem] sm:p-7 lg:min-w-[31rem]"
            >
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/46">Plan 0{index + 1}</p>
                  <h3 className="mt-4 font-display text-4xl uppercase leading-none tracking-[-0.06em] text-white sm:text-5xl">
                    {plan.name}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-7 text-white/70">{plan.focus}</p>
                </div>

                <div className="grid gap-4">
                  <div className="border border-accent/35 bg-accent/10 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-accent/80">Valor mensual</p>
                    <p className="mt-2 font-display text-5xl uppercase tracking-[-0.05em] text-accent">{plan.price}</p>
                  </div>

                  <div className="grid gap-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center justify-between border border-white/10 bg-black/25 px-4 py-3">
                        <span className="text-sm font-bold uppercase tracking-[0.18em] text-white/80">{feature}</span>
                        <span className="h-2 w-2 bg-accent" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}