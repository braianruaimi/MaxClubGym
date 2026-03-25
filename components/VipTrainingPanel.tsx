"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Exercise = {
  name: string;
  target: string;
  prescription: string;
  cue: string;
  accent: string;
  badge: string;
};

type MuscleGuide = {
  id: string;
  title: string;
  summary: string;
  exercises: Exercise[];
};

const muscleGuides: MuscleGuide[] = [
  {
    id: "piernas",
    title: "Piernas",
    summary: "Base total de fuerza y estabilidad para acelerar rendimiento, potencia y resistencia.",
    exercises: [
      {
        name: "Sentadilla trasera",
        target: "Cuadriceps, gluteos y core",
        prescription: "4 series de 6 a 8 repeticiones",
        cue: "Mantén el pecho alto, controla la bajada y empuja el piso con fuerza al subir.",
        accent: "from-lime-300/40 to-white/10",
        badge: "SQ",
      },
      {
        name: "Peso muerto rumano",
        target: "Isquios y gluteos",
        prescription: "4 series de 8 a 10 repeticiones",
        cue: "Lleva la cadera atrás, espalda neutra y siente tensión continua en la cadena posterior.",
        accent: "from-emerald-300/35 to-white/10",
        badge: "RDL",
      },
      {
        name: "Prensa inclinada",
        target: "Cuadriceps y gluteos",
        prescription: "4 series de 10 a 12 repeticiones",
        cue: "Baja con control sin despegar la espalda y empuja con todo el pie.",
        accent: "from-white/25 to-lime-300/10",
        badge: "PR",
      },
      {
        name: "Zancadas caminando",
        target: "Pierna completa y equilibrio",
        prescription: "3 series de 12 pasos por lado",
        cue: "Paso largo, rodilla estable y tronco firme durante todo el recorrido.",
        accent: "from-lime-200/30 to-zinc-50/10",
        badge: "LNG",
      },
    ],
  },
  {
    id: "espalda",
    title: "Espalda",
    summary: "Volumen, postura y traccion para construir una espalda amplia, fuerte y funcional.",
    exercises: [
      {
        name: "Dominadas pronas",
        target: "Dorsales y romboides",
        prescription: "4 series al fallo tecnico",
        cue: "Inicia desde las escápulas, no balancees el cuerpo y lleva el pecho hacia la barra.",
        accent: "from-cyan-300/35 to-white/10",
        badge: "PU",
      },
      {
        name: "Remo con barra",
        target: "Dorsales y espalda media",
        prescription: "4 series de 8 a 10 repeticiones",
        cue: "Inclina el torso de forma estable y dirige la barra hacia el ombligo.",
        accent: "from-sky-300/35 to-white/10",
        badge: "ROW",
      },
      {
        name: "Jalon al pecho",
        target: "Dorsales",
        prescription: "4 series de 10 a 12 repeticiones",
        cue: "Baja los codos hacia las costillas y evita tirar solo con los brazos.",
        accent: "from-cyan-200/30 to-zinc-50/10",
        badge: "LAT",
      },
      {
        name: "Pullover en polea",
        target: "Dorsal ancho",
        prescription: "3 series de 12 a 15 repeticiones",
        cue: "Mantén los brazos casi extendidos y usa la espalda para cerrar el recorrido.",
        accent: "from-sky-200/35 to-white/10",
        badge: "PO",
      },
    ],
  },
  {
    id: "pecho",
    title: "Pecho",
    summary: "Empuje y masa muscular para ganar presencia, fuerza horizontal y control del torso.",
    exercises: [
      {
        name: "Press banca plano",
        target: "Pectoral mayor y triceps",
        prescription: "4 series de 6 a 8 repeticiones",
        cue: "Escápulas firmes, pies anclados y barra descendiendo con control al centro del pecho.",
        accent: "from-rose-300/35 to-white/10",
        badge: "BP",
      },
      {
        name: "Press inclinado con mancuernas",
        target: "Pecho superior",
        prescription: "4 series de 8 a 10 repeticiones",
        cue: "Sube en diagonal sin chocar las mancuernas y controla el estiramiento abajo.",
        accent: "from-pink-300/35 to-white/10",
        badge: "INC",
      },
      {
        name: "Fondos en paralelas",
        target: "Pecho inferior y triceps",
        prescription: "3 series de 8 a 12 repeticiones",
        cue: "Inclina levemente el torso y mantén los codos en una trayectoria estable.",
        accent: "from-rose-200/35 to-zinc-50/10",
        badge: "DIP",
      },
      {
        name: "Aperturas en polea",
        target: "Aislamiento de pectoral",
        prescription: "3 series de 12 a 15 repeticiones",
        cue: "Abraza el movimiento, sin perder tensión al cerrar ni abrir de más.",
        accent: "from-pink-200/35 to-white/10",
        badge: "FLY",
      },
    ],
  },
  {
    id: "hombros",
    title: "Hombros",
    summary: "Redondez, estabilidad y potencia vertical para una silueta completa y segura.",
    exercises: [
      {
        name: "Press militar",
        target: "Deltoide anterior y medio",
        prescription: "4 series de 6 a 8 repeticiones",
        cue: "Gluteos apretados, abdomen firme y barra en linea recta sobre la cabeza.",
        accent: "from-violet-300/35 to-white/10",
        badge: "OHP",
      },
      {
        name: "Elevaciones laterales",
        target: "Deltoide medio",
        prescription: "4 series de 12 a 15 repeticiones",
        cue: "Sube con codos suaves y controla el descenso para no perder el trabajo en hombros.",
        accent: "from-fuchsia-300/35 to-white/10",
        badge: "LAT",
      },
      {
        name: "Pajaro inclinado",
        target: "Deltoide posterior",
        prescription: "3 series de 12 a 15 repeticiones",
        cue: "Mantén el pecho abierto y separa con control para activar la parte posterior.",
        accent: "from-violet-200/30 to-zinc-50/10",
        badge: "REV",
      },
      {
        name: "Face pull",
        target: "Hombro posterior y escápulas",
        prescription: "3 series de 12 a 15 repeticiones",
        cue: "Tira hacia la frente con codos altos y pausa un segundo al final.",
        accent: "from-fuchsia-200/35 to-white/10",
        badge: "FP",
      },
    ],
  },
  {
    id: "triceps",
    title: "Triceps",
    summary: "Brazo posterior fuerte para empuje, bloqueo y volumen del brazo completo.",
    exercises: [
      {
        name: "Press cerrado",
        target: "Triceps completo",
        prescription: "4 series de 8 repeticiones",
        cue: "Mantén las manos más cerradas que en banca y lleva los codos cerca del torso.",
        accent: "from-orange-300/35 to-white/10",
        badge: "CG",
      },
      {
        name: "Extensión en polea",
        target: "Cabeza lateral",
        prescription: "4 series de 10 a 12 repeticiones",
        cue: "Bloquea los codos al costado y extiende sin balancearte.",
        accent: "from-amber-300/35 to-white/10",
        badge: "PD",
      },
      {
        name: "Press frances",
        target: "Cabeza larga",
        prescription: "3 series de 10 repeticiones",
        cue: "Baja con control detrás de la frente y extiende sin separar los codos.",
        accent: "from-orange-200/35 to-zinc-50/10",
        badge: "SK",
      },
      {
        name: "Extensión sobre cabeza",
        target: "Cabeza larga",
        prescription: "3 series de 12 repeticiones",
        cue: "Mantén el core activo y siente el estiramiento máximo arriba de la nuca.",
        accent: "from-amber-200/35 to-white/10",
        badge: "OH",
      },
    ],
  },
  {
    id: "biceps",
    title: "Biceps",
    summary: "Contracción, volumen y detalle para un brazo más fuerte y estético.",
    exercises: [
      {
        name: "Curl con barra recta",
        target: "Biceps braquial",
        prescription: "4 series de 8 a 10 repeticiones",
        cue: "Codos fijos al costado y subida controlada sin impulso de cadera.",
        accent: "from-lime-300/35 to-white/10",
        badge: "CB",
      },
      {
        name: "Curl martillo",
        target: "Braquial y antebrazo",
        prescription: "4 series de 10 a 12 repeticiones",
        cue: "Agarre neutro, hombros quietos y recorrido limpio hasta arriba.",
        accent: "from-emerald-300/35 to-white/10",
        badge: "HM",
      },
      {
        name: "Curl inclinado",
        target: "Cabeza larga del biceps",
        prescription: "3 series de 10 a 12 repeticiones",
        cue: "Deja caer bien el brazo hacia atrás y evita adelantar los hombros.",
        accent: "from-lime-200/35 to-zinc-50/10",
        badge: "INC",
      },
      {
        name: "Curl en polea baja",
        target: "Tensión continua",
        prescription: "3 series de 12 a 15 repeticiones",
        cue: "Controla la bajada y mantén tensión constante durante todo el recorrido.",
        accent: "from-emerald-200/35 to-white/10",
        badge: "CPL",
      },
    ],
  },
];

function ExerciseImage({ exercise, group }: { exercise: Exercise; group: string }) {
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label={`${exercise.name} ${group}`} className="h-40 w-full">
      <defs>
        <linearGradient id={`${group}-${exercise.badge}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(215,255,100,0.95)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.18)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="180" fill="rgba(10,10,10,0.86)" />
      <rect x="16" y="16" width="288" height="148" rx="16" fill={`url(#${group}-${exercise.badge})`} opacity="0.28" />
      <rect x="28" y="24" width="84" height="26" rx="13" fill="rgba(0,0,0,0.72)" />
      <text x="70" y="41" textAnchor="middle" fill="white" fontSize="11" fontFamily="sans-serif" letterSpacing="2">
        {exercise.badge}
      </text>
      <circle cx="160" cy="58" r="16" fill="rgba(255,255,255,0.88)" />
      <path d="M160 74 L160 116 M160 88 L132 106 M160 88 L188 106 M160 116 L140 150 M160 116 L180 150" stroke="rgba(255,255,255,0.9)" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M120 150 H200" stroke="rgba(215,255,100,0.95)" strokeWidth="6" strokeLinecap="round" />
      <text x="160" y="166" textAnchor="middle" fill="white" fontSize="11" fontFamily="sans-serif" letterSpacing="2">
        {exercise.target.toUpperCase()}
      </text>
    </svg>
  );
}

type VipTrainingPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function VipTrainingPanel({ isOpen, onClose }: VipTrainingPanelProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeGuideId, setActiveGuideId] = useState(muscleGuides[0].id);

  useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setError("");
      setIsUnlocked(false);
      setActiveGuideId(muscleGuides[0].id);
    }
  }, [isOpen]);

  const activeGuide = useMemo(() => {
    return muscleGuides.find((guide) => guide.id === activeGuideId) ?? muscleGuides[0];
  }, [activeGuideId]);

  const handleUnlock = () => {
    if (password === "1234") {
      setError("");
      setIsUnlocked(true);
      return;
    }

    setError("Contraseña incorrecta. Usa 1234 para ingresar.");
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/75 px-4 py-6 backdrop-blur-sm sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="mx-auto flex min-h-full max-w-7xl items-center"
          >
            <div className="brutalist-panel w-full overflow-hidden">
              {!isUnlocked ? (
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                  <div>
                    <p className="eyebrow">Acceso V.I.P.</p>
                    <h2 className="mt-5 text-balance font-display text-4xl uppercase leading-none tracking-[-0.06em] text-white sm:text-5xl">
                      Acceso exclusivo clientes.
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
                      Introduce la contraseña para ver la guía de musculación con rutinas ordenadas desde los grupos musculares grandes hacia los pequeños.
                    </p>
                  </div>

                  <div className="border border-white/10 bg-black/25 p-5 sm:p-6">
                    <label className="grid gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.24em] text-white/55">Contraseña</span>
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
                        Ingresar
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex min-h-14 items-center justify-center border border-white/15 bg-white/[0.03] px-6 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-white/40"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-h-[88vh] overflow-y-auto p-4 sm:p-6 lg:p-8">
                  <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <p className="eyebrow">Panel V.I.P.</p>
                      <h2 className="mt-4 text-balance font-display text-4xl uppercase leading-none tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                        Guia de entrenamientos y musculacion.
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex min-h-12 items-center justify-center border border-white/15 bg-white/[0.03] px-5 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-white/40"
                    >
                      Salir del panel
                    </button>
                  </div>

                  <div className="grid gap-6 xl:grid-cols-[0.28fr_0.72fr]">
                    <aside className="grid gap-3 self-start xl:sticky xl:top-0">
                      {muscleGuides.map((guide, index) => (
                        <button
                          key={guide.id}
                          type="button"
                          onClick={() => setActiveGuideId(guide.id)}
                          className={`border px-4 py-4 text-left transition ${
                            activeGuideId === guide.id
                              ? "border-accent bg-accent text-black"
                              : "border-white/10 bg-black/25 text-white hover:border-white/35"
                          }`}
                        >
                          <span className="text-xs font-bold uppercase tracking-[0.24em]">Bloque 0{index + 1}</span>
                          <p className="mt-2 text-xl font-bold uppercase">{guide.title}</p>
                        </button>
                      ))}
                    </aside>

                    <section>
                      <article className="mb-6 border border-white/10 bg-black/25 p-5 sm:p-6">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/45">Grupo activo</p>
                        <h3 className="mt-3 text-balance font-display text-4xl uppercase leading-none tracking-[-0.05em] text-white">
                          {activeGuide.title}
                        </h3>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">{activeGuide.summary}</p>
                      </article>

                      <div className="grid gap-4 md:grid-cols-2">
                        {activeGuide.exercises.map((exercise) => (
                          <article key={exercise.name} className="brutalist-panel overflow-hidden p-4 sm:p-5">
                            <div className={`mb-4 rounded-[1rem] bg-gradient-to-br ${exercise.accent}`}>
                              <ExerciseImage exercise={exercise} group={activeGuide.id} />
                            </div>

                            <p className="text-xs uppercase tracking-[0.24em] text-accent">{exercise.target}</p>
                            <h4 className="mt-3 text-balance font-display text-3xl uppercase leading-none tracking-[-0.05em] text-white">
                              {exercise.name}
                            </h4>
                            <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-white/55">
                              {exercise.prescription}
                            </p>
                            <p className="mt-4 text-base leading-7 text-white/70">{exercise.cue}</p>
                          </article>
                        ))}
                      </div>
                    </section>
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