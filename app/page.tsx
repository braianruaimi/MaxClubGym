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
            <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Un collage funcional que vende energia, precision y metodo.
            </h2>
          </div>
          <p className="max-w-xl text-sm uppercase tracking-[0.18em] text-white/55 sm:text-base">
            Crossfit, yoga y nutricion aparecen como bloques con personalidad propia. No es una lista: es una interfaz de impacto.
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
                <span className="eyebrow">Static PWA stack</span>
                <h2 className="mt-5 max-w-xl font-display text-4xl uppercase leading-[0.92] tracking-[-0.05em] text-white sm:text-5xl">
                  Offline real. Export estatico. GitHub Pages sin friccion.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                  La app exporta HTML, CSS y JS listos para publicar, conserva basePath para repositorio y registra service worker para acceso sin conexion en dispositivos moviles.
                </p>
              </div>

              <div className="grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                {[
                  { label: "Lighthouse target", value: "100" },
                  { label: "Carga inicial", value: "Ligera" },
                  { label: "Modo de uso", value: "Instalable" },
                ].map((item) => (
                  <div key={item.label} className="border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item.label}</p>
                    <p className="mt-3 text-2xl font-bold uppercase text-accent">{item.value}</p>
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
            <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Alta performance para gente que no quiere una web tibia.
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-base leading-7 text-white/70">
              El lenguaje visual transmite intensidad antes de explicar nada. Esa diferencia de tono es la ventaja competitiva de la marca.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#planes"
                className="inline-flex min-h-14 items-center justify-center border border-accent bg-accent px-6 text-sm font-bold uppercase tracking-[0.22em] text-black transition hover:-translate-y-1"
              >
                Ver planes
              </a>
              <a
                href="#flujo"
                className="inline-flex min-h-14 items-center justify-center border border-white/20 bg-white/[0.04] px-6 text-sm font-bold uppercase tracking-[0.22em] text-white transition hover:border-white/50 hover:bg-white/[0.08]"
              >
                Revisar flujo
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
