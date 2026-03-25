"use client";

import { Hero } from "@/components/Hero";
import { FlowState } from "@/components/FlowState";
import { PlansRail } from "@/components/PlansRail";
import { ServicesGrid } from "@/components/ServicesGrid";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden pb-20">
      <Hero />

      <section id="servicios" className="section-shell pt-8">
        <div className="mb-8 flex flex-col gap-5 border-t border-white/10 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow">Bento grid de servicios</span>
            <h2 className="mt-4 font-display text-3xl uppercase leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Tres bloques para entrenar mejor, recuperar mejor y rendir mejor.
            </h2>
          </div>
          <p className="max-w-xl text-xs uppercase tracking-[0.14em] text-white/55 sm:text-base sm:tracking-[0.18em]">
            Fuerza explosiva, recuperacion activa y bio-hacking alimenticio. Cada modulo explica una parte real del sistema de entrenamiento del gimnasio.
          </p>
        </div>

        <ServicesGrid />
      </section>

      <section id="planes" className="pt-20">
        <PlansRail />
      </section>

      <section id="flujo" className="section-shell pt-20">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <FlowState />

          <article className="glitch-frame brutalist-panel relative min-h-[28rem] p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,255,100,0.18),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.06),transparent_55%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <span className="eyebrow">Experiencia MaxClubGym</span>
                <h2 className="mt-5 max-w-xl font-display text-3xl uppercase leading-[0.92] tracking-[-0.05em] text-white sm:text-5xl">
                  Tecnologia para entrenar con proposito, no solo para verte entrenar.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-6 text-white/70 sm:text-lg sm:leading-7">
                  Desde la web puedes pedir tu pase de cortesia, consultar horarios, revisar planes y llegar al gimnasio con informacion clara antes del primer entrenamiento.
                </p>
              </div>

              <div className="grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                {[
                  { label: "Pase inicial", value: "1 dia" },
                  { label: "Ubicacion", value: "La Merced 313" },
                  { label: "Bicis", value: "zona segura" },
                ].map((item) => (
                  <div key={item.label} className="border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item.label}</p>
                    <p className="mt-3 text-xl font-bold uppercase text-accent sm:text-2xl">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="cta" className="section-shell pt-20">
        <div className="brutalist-panel grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="eyebrow">Reserva / prueba / consulta</span>
            <h2 className="mt-4 font-display text-3xl uppercase leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Activa tu pase de cortesia y ven a probar el sistema MaxClubGym.
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
              Si buscas un gimnasio con metodo, seguimiento y una propuesta distinta, este es el punto de entrada. La prueba empieza en la web y se valida en el box.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("maxclub:open-whatsapp"))}
                className="inline-flex min-h-12 items-center justify-center border border-accent bg-accent px-5 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:-translate-y-1 sm:min-h-14 sm:px-6 sm:text-sm sm:tracking-[0.22em]"
              >
                Quiero mi pase de cortesia
              </button>
              <a
                href="#flujo"
                className="inline-flex min-h-12 items-center justify-center border border-white/20 bg-white/[0.04] px-5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-white/50 hover:bg-white/[0.08] sm:min-h-14 sm:px-6 sm:text-sm sm:tracking-[0.22em]"
              >
                Ver horarios y cupos
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
