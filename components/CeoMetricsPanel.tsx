"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MetricsState = {
  views: number;
  clicks: {
    whatsapp: number;
    bot: number;
    vip: number;
    ceo: number;
  };
  redirects: {
    whatsapp: number;
    botAccess: number;
  };
  plans: {
    Basic: number;
    Pro: number;
    Elite: number;
  };
  quickReplies: Record<string, number>;
  updatedAt: string;
};

const STORAGE_KEY = "maxclub-metrics";

const defaultMetrics: MetricsState = {
  views: 0,
  clicks: {
    whatsapp: 0,
    bot: 0,
    vip: 0,
    ceo: 0,
  },
  redirects: {
    whatsapp: 0,
    botAccess: 0,
  },
  plans: {
    Basic: 0,
    Pro: 0,
    Elite: 0,
  },
  quickReplies: {},
  updatedAt: "",
};

function mergeMetrics(raw: Partial<MetricsState>): MetricsState {
  return {
    ...defaultMetrics,
    ...raw,
    clicks: {
      ...defaultMetrics.clicks,
      ...raw.clicks,
    },
    redirects: {
      ...defaultMetrics.redirects,
      ...raw.redirects,
    },
    plans: {
      ...defaultMetrics.plans,
      ...raw.plans,
    },
    quickReplies: {
      ...defaultMetrics.quickReplies,
      ...raw.quickReplies,
    },
  };
}

function readMetrics(): MetricsState {
  if (typeof window === "undefined") {
    return defaultMetrics;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultMetrics;
  }

  try {
    return mergeMetrics(JSON.parse(raw) as Partial<MetricsState>);
  } catch {
    return defaultMetrics;
  }
}

function persistMetrics(metrics: MetricsState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
}

export function recordMetric(event: string, payload?: string) {
  if (typeof window === "undefined") {
    return;
  }

  const metrics = readMetrics();

  switch (event) {
    case "view":
      metrics.views += 1;
      break;
    case "open_whatsapp":
      metrics.clicks.whatsapp += 1;
      break;
    case "open_bot":
      metrics.clicks.bot += 1;
      break;
    case "open_vip":
      metrics.clicks.vip += 1;
      break;
    case "open_ceo":
      metrics.clicks.ceo += 1;
      break;
    case "redirect_whatsapp":
      metrics.redirects.whatsapp += 1;
      if (payload && payload in metrics.plans) {
        metrics.plans[payload as keyof MetricsState["plans"]] += 1;
      }
      break;
    case "redirect_bot_access":
      metrics.redirects.botAccess += 1;
      break;
    case "quick_reply":
      if (payload) {
        metrics.quickReplies[payload] = (metrics.quickReplies[payload] ?? 0) + 1;
      }
      break;
    default:
      break;
  }

  metrics.updatedAt = new Date().toISOString();
  persistMetrics(metrics);
}

type CeoMetricsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CeoMetricsPanel({ isOpen, onClose }: CeoMetricsPanelProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [metrics, setMetrics] = useState<MetricsState>(defaultMetrics);

  useEffect(() => {
    if (isOpen) {
      setMetrics(readMetrics());
      return;
    }

    setPassword("");
    setError("");
    setIsUnlocked(false);
  }, [isOpen]);

  const growth = useMemo(() => {
    const totalClicks = Object.values(metrics.clicks).reduce((sum, value) => sum + value, 0);
    const totalRedirects = Object.values(metrics.redirects).reduce((sum, value) => sum + value, 0);
    const score = metrics.views + totalClicks * 2 + totalRedirects * 3;

    if (score < 20) {
      return { label: "Inicio", percent: 22 };
    }
    if (score < 50) {
      return { label: "Crecimiento", percent: 48 };
    }
    if (score < 90) {
      return { label: "Escala alta", percent: 76 };
    }

    return { label: "Expansión", percent: 100 };
  }, [metrics]);

  const topReply = useMemo(() => {
    const entries = Object.entries(metrics.quickReplies);
    if (entries.length === 0) {
      return ["Sin datos", 0] as const;
    }

    return entries.sort((a, b) => b[1] - a[1])[0] as [string, number];
  }, [metrics.quickReplies]);

  const handleUnlock = () => {
    if (password === "123") {
      setError("");
      setIsUnlocked(true);
      setMetrics(readMetrics());
      return;
    }

    setError("Contraseña incorrecta. Usa 123 para entrar al panel CEO.");
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 px-4 py-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="mx-auto flex min-h-full max-w-6xl items-start sm:items-center"
          >
            <div className="brutalist-panel w-full overflow-hidden">
              {!isUnlocked ? (
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                  <div>
                    <p className="eyebrow">Acceso CEO</p>
                    <h2 className="mt-5 text-balance font-display text-4xl uppercase leading-none tracking-[-0.06em] text-white sm:text-5xl">
                      Panel de métricas de view, click y redirecciones.
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
                      Revisa el uso real de la app, las elecciones de planes y el pulso de crecimiento antes de tomar decisiones comerciales.
                    </p>
                  </div>

                  <div className="border border-white/10 bg-black/25 p-5 sm:p-6">
                    <label className="grid gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.24em] text-white/55">Contraseña CEO</span>
                      <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Ingresa la clave"
                        className="border border-white/10 bg-black/30 px-4 py-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-accent"
                      />
                    </label>

                    {error ? <p className="mt-3 text-sm leading-6 text-red-300">{error}</p> : null}

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleUnlock}
                        className="inline-flex min-h-14 flex-1 items-center justify-center border border-accent bg-accent px-6 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:-translate-y-1"
                      >
                        Entrar
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex min-h-14 items-center justify-center border border-white/15 bg-white/[0.03] px-6 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-white/40"
                      >
                        Ir hacia atrás
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-h-[88vh] overflow-y-auto p-4 sm:p-6 lg:p-8">
                  <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <p className="eyebrow">CEO panel</p>
                      <h2 className="mt-4 text-balance font-display text-4xl uppercase leading-none tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                        Métricas clave de la app.
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex min-h-12 items-center justify-center border border-white/15 bg-white/[0.03] px-5 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-white/40"
                    >
                      Ir hacia atrás
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {[
                      { label: "Views", value: String(metrics.views) },
                      { label: "Clicks totales", value: String(Object.values(metrics.clicks).reduce((sum, value) => sum + value, 0)) },
                      { label: "Redirecciones", value: String(Object.values(metrics.redirects).reduce((sum, value) => sum + value, 0)) },
                      { label: "Última actualización", value: metrics.updatedAt ? new Date(metrics.updatedAt).toLocaleString("es-AR") : "sin datos" },
                    ].map((item) => (
                      <article key={item.label} className="border border-white/10 bg-black/25 p-5">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item.label}</p>
                        <p className="mt-3 text-balance font-display text-3xl uppercase leading-none tracking-[-0.05em] text-accent">
                          {item.value}
                        </p>
                      </article>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-6 xl:grid-cols-[0.52fr_0.48fr]">
                    <article className="border border-white/10 bg-black/25 p-5 sm:p-6">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/45">Interacción por plan</p>
                      <div className="mt-5 grid gap-4">
                        {Object.entries(metrics.plans).map(([plan, value]) => {
                          const max = Math.max(...Object.values(metrics.plans), 1);
                          const width = `${Math.max(14, Math.round((value / max) * 100))}%`;

                          return (
                            <div key={plan}>
                              <div className="mb-2 flex items-center justify-between text-sm font-bold uppercase tracking-[0.16em] text-white/70">
                                <span>{plan}</span>
                                <span>{value}</span>
                              </div>
                              <div className="h-3 overflow-hidden border border-white/10 bg-white/[0.04]">
                                <motion.div
                                  initial={false}
                                  animate={{ width }}
                                  transition={{ duration: 0.45, ease: "easeOut" }}
                                  className="h-full bg-accent"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </article>

                    <article className="border border-white/10 bg-black/25 p-5 sm:p-6">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/45">Escala de crecimiento</p>
                      <p className="mt-4 font-display text-4xl uppercase tracking-[-0.05em] text-accent">{growth.label}</p>
                      <div className="mt-5 h-4 overflow-hidden border border-white/10 bg-white/[0.04]">
                        <motion.div
                          initial={false}
                          animate={{ width: `${growth.percent}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="h-full bg-accent"
                        />
                      </div>
                      <p className="mt-4 text-base leading-7 text-white/70">
                        La escala combina views, clicks y redirecciones para estimar el pulso general del crecimiento comercial dentro de la app.
                      </p>
                    </article>
                  </div>

                  <div className="mt-6 grid gap-6 xl:grid-cols-3">
                    <article className="border border-white/10 bg-black/25 p-5 sm:p-6">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/45">Clicks por acceso</p>
                      <div className="mt-4 grid gap-3">
                        {Object.entries(metrics.clicks).map(([label, value]) => (
                          <div key={label} className="flex items-center justify-between border border-white/10 bg-black/30 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white/80">
                            <span>{label}</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </article>

                    <article className="border border-white/10 bg-black/25 p-5 sm:p-6">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/45">Redirecciones</p>
                      <div className="mt-4 grid gap-3">
                        {Object.entries(metrics.redirects).map(([label, value]) => (
                          <div key={label} className="flex items-center justify-between border border-white/10 bg-black/30 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white/80">
                            <span>{label}</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </article>

                    <article className="border border-white/10 bg-black/25 p-5 sm:p-6">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/45">Elección más usada</p>
                      <p className="mt-4 text-balance font-display text-3xl uppercase tracking-[-0.05em] text-white">
                        {topReply[0]}
                      </p>
                      <p className="mt-3 text-base leading-7 text-white/70">
                        Seleccionada {topReply[1]} veces por usuarios dentro del asistente rápido.
                      </p>
                    </article>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
