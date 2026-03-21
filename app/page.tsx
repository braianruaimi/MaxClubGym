import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section id="beneficios" className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Carga instantanea",
              description: "Export estatico, assets livianos y navegacion fluida en dispositivos moviles.",
            },
            {
              title: "SEO tecnico fuerte",
              description: "Metadatos bien definidos, estructura semantica y compatibilidad con indexacion.",
            },
            {
              title: "PWA instalable",
              description: "Manifest, service worker y experiencia lista para agregar a pantalla de inicio.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-white/65">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cta" className="px-6 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.24em] text-accent">Listo para publicar</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Una base profesional para escalar MaxClubGym sin depender de una app nativa.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
            Esta arquitectura esta pensada para GitHub Pages, con una huella minima y una experiencia movil clara.
          </p>
        </div>
      </section>
    </main>
  );
}
