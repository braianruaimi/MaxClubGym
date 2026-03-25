"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CeoMetricsPanel, recordMetric } from "@/components/CeoMetricsPanel";
import { VipTrainingPanel } from "@/components/VipTrainingPanel";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const quickReplies = [
  {
    label: "¿Precios?",
    answer: "Nuestros planes van desde $20k a $35k. ¿Quieres ver el detalle?",
  },
  {
    label: "¿Horarios?",
    answer: "Lunes a Viernes 06:00 am a 00:00 pm Sábados 09:00 a 14:00.",
  },
  {
    label: "¿Tienen clase de prueba?",
    answer: "¡Sí! Toca el botón de WhatsApp y pide tu pase de 1 día GRATIS.",
  },
  {
    label: "¿Dónde están?",
    answer: "Estamos en La Merced 313 casi Esq Peru. Te esperamos para entrenar.",
  },
  {
    label: "¿Hay estacionamiento?",
    answer: "Contamos con zona segura para bicis.",
  },
];

function LightningIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M13.5 2 5 13h5l-1.5 9L17 11h-5.125L13.5 2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M19.05 4.94A9.94 9.94 0 0 0 12 2C6.48 2 2 6.47 2 12c0 1.76.46 3.48 1.33 5L2 22l5.13-1.3A9.97 9.97 0 0 0 12 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.95-7.06ZM12 20.19c-1.5 0-2.98-.4-4.27-1.16l-.31-.18-3.04.77.81-2.96-.2-.31A8.12 8.12 0 0 1 3.8 12c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.24.85 5.79 2.4A8.13 8.13 0 0 1 20.2 12c0 4.52-3.68 8.19-8.2 8.19Zm4.5-6.14c-.25-.13-1.47-.73-1.7-.82-.23-.08-.4-.12-.57.13-.17.25-.65.82-.8.98-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.52.12-.12.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.38-.78-1.88-.21-.5-.42-.43-.57-.44h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09 0 1.24.9 2.43 1.02 2.6.12.17 1.76 2.68 4.26 3.76.6.26 1.07.41 1.43.52.6.19 1.14.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function FloatingGymActions() {
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isVipOpen, setIsVipOpen] = useState(false);
  const [isCeoOpen, setIsCeoOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Basic");
  const [name, setName] = useState("");
  const [botAnswer, setBotAnswer] = useState(quickReplies[0].answer);

  useEffect(() => {
    recordMetric("view");
  }, []);

  useEffect(() => {
    const openWhatsApp = (event: Event) => {
      const detail = (event as CustomEvent<{ plan?: string }>).detail;

      if (detail?.plan) {
        setSelectedPlan(detail.plan);
      }

      setIsWhatsAppOpen(true);
    };

    window.addEventListener("maxclub:open-whatsapp", openWhatsApp);

    return () => {
      window.removeEventListener("maxclub:open-whatsapp", openWhatsApp);
    };
  }, []);

  const whatsappMessage = useMemo(() => {
    const clientName = name.trim() || "[Nombre]";

    return `¡Hola MaxClubGym! 🔥 Acabo de ver la web y quiero activar mi Pase de Cortesía de 1 día. Mi nombre es ${clientName} y me interesa el plan ${selectedPlan}. ¿Cuándo puedo ir?`;
  }, [name, selectedPlan]);

  const whatsappUrl = useMemo(() => {
    return buildWhatsAppUrl(whatsappMessage);
  }, [whatsappMessage]);

  const botAccessUrl = useMemo(() => {
    return buildWhatsAppUrl("Hola quiero mi cupo");
  }, []);

  const openWhatsAppLink = () => {
    recordMetric("redirect_whatsapp", selectedPlan);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsWhatsAppOpen(false);
  };

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ scale: 1.08, opacity: 0.28 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          recordMetric("open_ceo");
          setIsCeoOpen(true);
        }}
        className="fixed left-3 top-3 z-[60] h-4 w-4 rounded-full border border-white/10 bg-white/[0.04] text-transparent opacity-12 backdrop-blur transition hover:border-white/20 sm:left-4 sm:top-4"
        aria-label="Abrir panel CEO"
      >
        .
      </motion.button>

      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-50 mx-auto flex max-w-7xl items-end justify-between px-4 sm:bottom-6 sm:px-8 lg:px-12">
        <motion.button
          type="button"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            recordMetric("open_bot");
            setIsBotOpen(true);
          }}
          className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center border border-cyan-400/80 bg-cyan-400/10 text-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.22)] backdrop-blur md:h-14 md:w-14"
          aria-label="Abrir MaxBot"
        >
          <LightningIcon />
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            recordMetric("open_vip");
            setIsVipOpen(true);
          }}
          className="pointer-events-auto inline-flex min-h-12 items-center justify-center border border-accent/70 bg-black/80 px-4 text-xs font-bold uppercase tracking-[0.22em] text-accent shadow-[0_0_30px_rgba(215,255,100,0.18)] backdrop-blur md:min-h-14 md:px-5 md:text-sm"
          aria-label="Abrir acceso VIP"
        >
          V.I.P.
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            recordMetric("open_whatsapp");
            setIsWhatsAppOpen(true);
          }}
          className="pointer-events-auto inline-flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-[#25D366] text-black shadow-[0_0_32px_rgba(37,211,102,0.38)] [animation-duration:2.2s] md:h-14 md:w-14"
          aria-label="Abrir WhatsApp"
        >
          <WhatsAppIcon />
        </motion.button>
      </div>

      <AnimatePresence>
        {isBotOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 px-4 py-8 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="mx-auto flex min-h-full max-w-xl items-center"
            >
              <div className="brutalist-panel w-full p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">Asistente rapido</p>
                    <h2 className="mt-4 text-balance font-display text-2xl uppercase leading-none tracking-[-0.05em] text-white sm:text-4xl">
                      Hola, soy MaxBot. ¿En qué puedo ayudarte hoy?
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBotOpen(false)}
                    className="border border-white/15 px-3 py-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/70"
                  >
                    Cerrar
                  </button>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.label}
                      type="button"
                      onClick={() => {
                        recordMetric("quick_reply", reply.label);
                        setBotAnswer(reply.answer);
                      }}
                      className="border border-white/10 bg-black/25 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-cyan-300/50 hover:bg-cyan-400/10 sm:text-sm"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 border border-white/10 bg-black/25 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Respuesta</p>
                  <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base sm:leading-7">{botAnswer}</p>
                  <button
                    type="button"
                    onClick={() => {
                      recordMetric("redirect_bot_access");
                      window.open(botAccessUrl, "_blank", "noopener,noreferrer");
                    }}
                    className="mt-5 inline-flex min-h-11 items-center justify-center border border-cyan-300/70 bg-cyan-400/10 px-4 text-xs font-bold uppercase tracking-[0.14em] text-cyan-200 transition hover:-translate-y-1 hover:bg-cyan-400/20 sm:min-h-12 sm:px-5 sm:text-sm"
                  >
                    Acceso
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CeoMetricsPanel isOpen={isCeoOpen} onClose={() => setIsCeoOpen(false)} />

      <VipTrainingPanel isOpen={isVipOpen} onClose={() => setIsVipOpen(false)} />

      <AnimatePresence>
        {isWhatsAppOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 px-4 py-8 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="mx-auto flex min-h-full max-w-lg items-center"
            >
              <div className="brutalist-panel w-full p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">Pase de cortesia</p>
                    <h2 className="mt-4 text-balance font-display text-2xl uppercase leading-none tracking-[-0.05em] text-white sm:text-4xl">
                      Activa tu mensaje de WhatsApp en un toque.
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsWhatsAppOpen(false)}
                    className="border border-white/15 px-3 py-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/70"
                  >
                    Cerrar
                  </button>
                </div>

                <div className="mt-6 grid gap-4">
                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">Tu nombre</span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Escribe tu nombre"
                      className="border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent sm:text-base"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">Plan que te interesa</span>
                    <select
                      value={selectedPlan}
                      onChange={(event) => setSelectedPlan(event.target.value)}
                      className="border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-accent sm:text-base"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Pro">Pro</option>
                      <option value="Elite">Elite</option>
                    </select>
                  </label>
                </div>

                <div className="mt-6 border border-white/10 bg-black/25 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">Mensaje automatico</p>
                  <p className="mt-3 text-sm leading-6 text-white/75">{whatsappMessage}</p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={openWhatsAppLink}
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#25D366] px-5 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:-translate-y-1 sm:min-h-14 sm:px-6 sm:text-sm"
                  >
                    Ir a WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsWhatsAppOpen(false)}
                    className="inline-flex min-h-12 items-center justify-center border border-white/15 bg-white/[0.03] px-5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-white/40 sm:min-h-14 sm:px-6 sm:text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}