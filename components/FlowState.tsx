"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type BlockKey = "ignite" | "prime" | "late";

const baseSlots = {
  ignite: [
    { label: "05:30 Motor", capacity: 24, reserved: 17 },
    { label: "07:00 Fuerza", capacity: 18, reserved: 11 },
  ],
  prime: [
    { label: "13:00 CrossFit", capacity: 28, reserved: 22 },
    { label: "15:00 Flujo de yoga", capacity: 16, reserved: 9 },
  ],
  late: [
    { label: "19:30 Pico", capacity: 26, reserved: 24 },
    { label: "21:00 Recuperacion", capacity: 14, reserved: 8 },
  ],
} as const;

const labels: Record<BlockKey, string> = {
  ignite: "Ignite / manana",
  prime: "Prime / tarde",
  late: "Late / noche",
};

export function FlowState() {
  const [activeBlock, setActiveBlock] = useState<BlockKey>("prime");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlots = useMemo(() => {
    const secondPulse = now.getSeconds();

    return baseSlots[activeBlock].map((slot, index) => {
      const delta = (secondPulse + index * 5) % 4;
      const reserved = Math.min(slot.capacity, slot.reserved + delta);
      const percentage = Math.round((reserved / slot.capacity) * 100);

      return {
        ...slot,
        reserved,
        percentage,
      };
    });
  }, [activeBlock, now]);

  const countdown = useMemo(() => {
    const nextTarget = new Date(now);
    const targetMap: Record<BlockKey, [number, number]> = {
      ignite: [5, 30],
      prime: [13, 0],
      late: [19, 30],
    };

    const [hours, minutes] = targetMap[activeBlock];
    nextTarget.setHours(hours, minutes, 0, 0);

    if (nextTarget <= now) {
      nextTarget.setDate(nextTarget.getDate() + 1);
    }

    const diff = nextTarget.getTime() - now.getTime();
    const totalSeconds = Math.floor(diff / 1000);
    const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const ss = String(totalSeconds % 60).padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  }, [activeBlock, now]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="brutalist-panel min-h-[28rem] p-6 sm:p-8"
    >
      <div className="flex h-full flex-col justify-between gap-8">
        <div>
          <span className="eyebrow">Estado de flujo</span>
          <h2 className="mt-5 font-display text-4xl uppercase leading-[0.92] tracking-[-0.05em] text-white sm:text-5xl">
            Cupos en tiempo real y cronometro de la siguiente ventana.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
            El usuario lee demanda, disponibilidad y ritmo operativo en un vistazo. El dato se vuelve parte de la identidad visual, no un extra escondido.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {(Object.keys(labels) as BlockKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveBlock(key)}
              className={`border px-4 py-4 text-left transition ${
                activeBlock === key
                  ? "border-accent bg-accent text-black"
                  : "border-white/10 bg-black/25 text-white hover:border-white/35"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-[0.24em]">{labels[key]}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border border-white/10 bg-black/25 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Siguiente apertura</p>
            <p className="mt-4 font-display text-5xl uppercase leading-none tracking-[-0.06em] text-accent sm:text-6xl">
              {countdown}
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/55">Estado activo: {labels[activeBlock]}</p>
          </div>

          <div className="grid gap-4">
            {currentSlots.map((slot) => (
              <div key={slot.label} className="border border-white/10 bg-black/25 p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">Sesion</p>
                    <p className="mt-2 text-2xl font-bold uppercase text-white">{slot.label}</p>
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/60">
                    {slot.reserved}/{slot.capacity} ocupados
                  </p>
                </div>

                <div className="mt-4 h-3 w-full overflow-hidden border border-white/10 bg-white/[0.04]">
                  <motion.div
                    initial={false}
                    animate={{ width: `${slot.percentage}%` }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="h-full bg-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}