const metrics = [
  { value: "+500", label: "alumnos activos" },
  { value: "24/7", label: "presencia digital" },
  { value: "3x", label: "más conversión directa" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-10 lg:px-16">
      <div className="absolute inset-0 -z-10 bg-grid bg-[size:40px_40px] opacity-20" />
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium text-white/80 backdrop-blur">
            PWA ligera, indexable y lista para instalar
          </span>
          <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            La presencia digital premium para un gym que quiere crecer sin friccion.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
            MaxClubGym combina una experiencia movil instantanea, SEO tecnico y una interfaz limpia para convertir visitas en reservas reales.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 text-base font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-halo"
            >
              Reservar una demo
            </a>
            <a
              href="#beneficios"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Ver beneficios
            </a>
          </div>
          <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {metrics.map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/45">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -right-10 bottom-8 h-24 w-24 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[1.75rem] border border-white/10 bg-surface p-6">
              <div className="flex items-center justify-between text-sm text-white/50">
                <span>MAX CLUB GYM</span>
                <span>Instalable</span>
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/45">Landing principal</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Reserva clases, conoce planes y entra en un toque.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm text-white/50">Velocidad</p>
                    <p className="mt-2 text-3xl font-semibold text-accent">95+</p>
                    <p className="mt-2 text-sm text-white/60">Pensado para Core Web Vitals.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <p className="text-sm text-white/50">SEO</p>
                    <p className="mt-2 text-3xl font-semibold text-white">First-class</p>
                    <p className="mt-2 text-sm text-white/60">Metadatos y export estatico optimizados.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
