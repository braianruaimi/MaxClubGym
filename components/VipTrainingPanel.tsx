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
  pattern:
    | "squat"
    | "hinge"
    | "lunge"
    | "verticalPull"
    | "horizontalPull"
    | "press"
    | "dip"
    | "fly"
    | "extension"
    | "curl";
  steps: ExerciseStep[];
};

type ExerciseStep = {
  title: string;
  detail: string;
};

type MuscleGuide = {
  id: string;
  title: string;
  summary: string;
  exercises: Exercise[];
};

const stepTitles = ["Base", "Recorrido", "Pico", "Control"] as const;

function makeSteps(details: [string, string, string, string]): ExerciseStep[] {
  return details.map((detail, index) => ({
    title: stepTitles[index],
    detail,
  }));
}

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
        pattern: "squat",
        steps: makeSteps([
          "Pies al ancho de hombros, abdomen firme y barra estable sobre la espalda.",
          "Rompe cadera y rodillas al mismo tiempo hasta llegar a una profundidad controlada.",
          "Empuja el suelo con el pie completo y conserva el pecho arriba durante la subida.",
          "Bloquea la cadera arriba, respira, reacomoda y repite sin perder tension.",
        ]),
      },
      {
        name: "Peso muerto rumano",
        target: "Isquios y gluteos",
        prescription: "4 series de 8 a 10 repeticiones",
        cue: "Lleva la cadera atrás, espalda neutra y siente tensión continua en la cadena posterior.",
        accent: "from-emerald-300/35 to-white/10",
        badge: "RDL",
        pattern: "hinge",
        steps: makeSteps([
          "Sujeta la barra pegada al cuerpo con rodillas suaves y espalda neutra.",
          "Empuja la cadera hacia atras sin redondear la columna ni despegar la barra.",
          "Deten el descenso cuando sientas estiramiento fuerte en isquios y gluteos.",
          "Vuelve cerrando la cadera y manteniendo la barra rozando los muslos.",
        ]),
      },
      {
        name: "Prensa inclinada",
        target: "Cuadriceps y gluteos",
        prescription: "4 series de 10 a 12 repeticiones",
        cue: "Baja con control sin despegar la espalda y empuja con todo el pie.",
        accent: "from-white/25 to-lime-300/10",
        badge: "PR",
        pattern: "squat",
        steps: makeSteps([
          "Apoya toda la espalda, coloca los pies firmes y destraba la plataforma.",
          "Desciende la carga llevando rodillas hacia el pecho sin despegar la cadera.",
          "Empuja con talon y antepie al mismo tiempo hasta recuperar extension potente.",
          "Deten la plataforma antes del bloqueo agresivo y vuelve a iniciar el ciclo.",
        ]),
      },
      {
        name: "Zancadas caminando",
        target: "Pierna completa y equilibrio",
        prescription: "3 series de 12 pasos por lado",
        cue: "Paso largo, rodilla estable y tronco firme durante todo el recorrido.",
        accent: "from-lime-200/30 to-zinc-50/10",
        badge: "LNG",
        pattern: "lunge",
        steps: makeSteps([
          "Da un paso largo, tronco alto y pelvis estable antes de bajar.",
          "Desciende verticalmente hasta que ambas rodillas queden flexionadas con control.",
          "Empuja el piso con la pierna delantera para salir del fondo sin perder balance.",
          "Junta el paso, reordena la postura y avanza a la siguiente repeticion.",
        ]),
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
        pattern: "verticalPull",
        steps: makeSteps([
          "Cuelga con agarre firme, abdomen activo y hombros lejos de las orejas.",
          "Inicia la traccion bajando escapulas antes de doblar fuerte los codos.",
          "Lleva el pecho hacia la barra sin patear ni usar impulso de cadera.",
          "Desciende completo con control y conserva la tension antes de repetir.",
        ]),
      },
      {
        name: "Remo con barra",
        target: "Dorsales y espalda media",
        prescription: "4 series de 8 a 10 repeticiones",
        cue: "Inclina el torso de forma estable y dirige la barra hacia el ombligo.",
        accent: "from-sky-300/35 to-white/10",
        badge: "ROW",
        pattern: "horizontalPull",
        steps: makeSteps([
          "Bisagra de cadera, columna neutra y barra colgando bajo tus hombros.",
          "Jala con codos atras hacia el ombligo sin perder el angulo del torso.",
          "Aprieta espalda media y dorsales en el punto mas alto del recorrido.",
          "Devuelve la barra despacio sin soltar la postura ni redondear la espalda.",
        ]),
      },
      {
        name: "Jalon al pecho",
        target: "Dorsales",
        prescription: "4 series de 10 a 12 repeticiones",
        cue: "Baja los codos hacia las costillas y evita tirar solo con los brazos.",
        accent: "from-cyan-200/30 to-zinc-50/10",
        badge: "LAT",
        pattern: "verticalPull",
        steps: makeSteps([
          "Toma la barra ancha, pecho alto y piernas fijas bajo los soportes.",
          "Inicia con escapulas abajo y lleva los codos hacia las costillas.",
          "Toca o acerca la barra al pecho alto manteniendo la espalda estable.",
          "Regresa lento hasta estirar dorsales sin perder el control del cable.",
        ]),
      },
      {
        name: "Pullover en polea",
        target: "Dorsal ancho",
        prescription: "3 series de 12 a 15 repeticiones",
        cue: "Mantén los brazos casi extendidos y usa la espalda para cerrar el recorrido.",
        accent: "from-sky-200/35 to-white/10",
        badge: "PO",
        pattern: "hinge",
        steps: makeSteps([
          "Inclina apenas el torso y toma la barra con codos semiextendidos.",
          "Lleva los brazos en arco hacia abajo usando dorsales, no la zona lumbar.",
          "Aprieta el dorsal cuando las manos lleguen cerca de los muslos.",
          "Retorna en arco lento hasta sentir estiramiento sin doblar de mas los codos.",
        ]),
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
        pattern: "press",
        steps: makeSteps([
          "Escapulas juntas, pies anclados y barra alineada sobre hombros.",
          "Desciende al centro del pecho con antebrazos verticales y sin rebotar.",
          "Empuja la barra hacia arriba y atras hasta extender fuerte sin perder el arco.",
          "Estabiliza arriba, vuelve a tomar aire y baja otra vez con control.",
        ]),
      },
      {
        name: "Press inclinado con mancuernas",
        target: "Pecho superior",
        prescription: "4 series de 8 a 10 repeticiones",
        cue: "Sube en diagonal sin chocar las mancuernas y controla el estiramiento abajo.",
        accent: "from-pink-300/35 to-white/10",
        badge: "INC",
        pattern: "press",
        steps: makeSteps([
          "Apoya espalda y gluteos, mancuernas arriba del pecho superior.",
          "Baja en diagonal con codos bajo control hasta un estiramiento comodo.",
          "Empuja ambas mancuernas hacia arriba sin cerrar de golpe los hombros.",
          "Frena arriba, mantente simetrico y repite sin perder tension pectoral.",
        ]),
      },
      {
        name: "Fondos en paralelas",
        target: "Pecho inferior y triceps",
        prescription: "3 series de 8 a 12 repeticiones",
        cue: "Inclina levemente el torso y mantén los codos en una trayectoria estable.",
        accent: "from-rose-200/35 to-zinc-50/10",
        badge: "DIP",
        pattern: "dip",
        steps: makeSteps([
          "Sujeta las paralelas, cruza piernas y fija hombros abajo y atras.",
          "Desciende flexionando codos con una leve inclinacion del torso.",
          "Empuja las barras hasta salir del fondo sin encoger los hombros.",
          "Bloquea con control, vuelve a estabilizar y baja otra vez sin balanceo.",
        ]),
      },
      {
        name: "Aperturas en polea",
        target: "Aislamiento de pectoral",
        prescription: "3 series de 12 a 15 repeticiones",
        cue: "Abraza el movimiento, sin perder tensión al cerrar ni abrir de más.",
        accent: "from-pink-200/35 to-white/10",
        badge: "FLY",
        pattern: "fly",
        steps: makeSteps([
          "Colocate al centro, pecho alto y codos suaves en todo momento.",
          "Abre controlando el estiramiento sin dejar que el hombro colapse.",
          "Cierra en gesto de abrazo hasta juntar manos frente al torso.",
          "Sostiene un instante y vuelve lento manteniendo tension continua.",
        ]),
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
        pattern: "press",
        steps: makeSteps([
          "Aprieta gluteos y abdomen con la carga frente al menton.",
          "Empuja verticalmente y despeja la cabeza sin arquear la espalda.",
          "Bloquea arriba con brazos alineados sobre hombros y cadera.",
          "Baja otra vez al frente con control y vuelve a compactar el tronco.",
        ]),
      },
      {
        name: "Elevaciones laterales",
        target: "Deltoide medio",
        prescription: "4 series de 12 a 15 repeticiones",
        cue: "Sube con codos suaves y controla el descenso para no perder el trabajo en hombros.",
        accent: "from-fuchsia-300/35 to-white/10",
        badge: "LAT",
        pattern: "fly",
        steps: makeSteps([
          "Inicia con mancuernas al costado, pecho alto y cuello relajado.",
          "Eleva los brazos lateralmente guiando con codos y no con muñecas.",
          "Llega a la linea de hombros y mantente estable sin encoger trapecios.",
          "Desciende lento conservando la misma trayectoria y la tension del deltoide.",
        ]),
      },
      {
        name: "Pajaro inclinado",
        target: "Deltoide posterior",
        prescription: "3 series de 12 a 15 repeticiones",
        cue: "Mantén el pecho abierto y separa con control para activar la parte posterior.",
        accent: "from-violet-200/30 to-zinc-50/10",
        badge: "REV",
        pattern: "horizontalPull",
        steps: makeSteps([
          "Inclina el torso, deja brazos colgando y abre el pecho.",
          "Separa los brazos hacia atras con codos suaves y sin girar el tronco.",
          "Aprieta deltoides posteriores cuando las manos lleguen a la linea del hombro.",
          "Vuelve lento al inicio sin perder la inclinacion ni el control escapular.",
        ]),
      },
      {
        name: "Face pull",
        target: "Hombro posterior y escápulas",
        prescription: "3 series de 12 a 15 repeticiones",
        cue: "Tira hacia la frente con codos altos y pausa un segundo al final.",
        accent: "from-fuchsia-200/35 to-white/10",
        badge: "FP",
        pattern: "horizontalPull",
        steps: makeSteps([
          "Ajusta la cuerda a la altura del rostro y fija el tronco.",
          "Tira separando manos y llevando codos altos hacia atras.",
          "Pausa con la cuerda cerca de la frente y escapulas bien activas.",
          "Extiende otra vez los brazos con control sin perder la postura.",
        ]),
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
        pattern: "press",
        steps: makeSteps([
          "Toma la barra con agarre cerrado y hombros bien apoyados en el banco.",
          "Desciende con codos pegados al torso hasta tocar la zona media del pecho.",
          "Empuja fuerte extendiendo codos sin abrir la barra hacia afuera.",
          "Controla arriba, vuelve a compactarte y baja otra repeticion limpia.",
        ]),
      },
      {
        name: "Extensión en polea",
        target: "Cabeza lateral",
        prescription: "4 series de 10 a 12 repeticiones",
        cue: "Bloquea los codos al costado y extiende sin balancearte.",
        accent: "from-amber-300/35 to-white/10",
        badge: "PD",
        pattern: "extension",
        steps: makeSteps([
          "Sujeta la barra o cuerda con codos pegados al cuerpo.",
          "Empuja el agarre hacia abajo sin adelantar hombros ni tronco.",
          "Aprieta el triceps con los brazos completamente extendidos abajo.",
          "Sube hasta 90 grados y vuelve a bajar sin perder el eje del codo.",
        ]),
      },
      {
        name: "Press frances",
        target: "Cabeza larga",
        prescription: "3 series de 10 repeticiones",
        cue: "Baja con control detrás de la frente y extiende sin separar los codos.",
        accent: "from-orange-200/35 to-zinc-50/10",
        badge: "SK",
        pattern: "extension",
        steps: makeSteps([
          "Ubica la barra sobre el pecho con codos apuntando al techo.",
          "Flexiona codos llevando la carga hacia detras de la frente.",
          "Extiende fuerte sin abrir codos y siente el trabajo en la cabeza larga.",
          "Frena arriba, reacomoda muñecas y repite con la misma linea.",
        ]),
      },
      {
        name: "Extensión sobre cabeza",
        target: "Cabeza larga",
        prescription: "3 series de 12 repeticiones",
        cue: "Mantén el core activo y siente el estiramiento máximo arriba de la nuca.",
        accent: "from-amber-200/35 to-white/10",
        badge: "OH",
        pattern: "extension",
        steps: makeSteps([
          "Lleva la mancuerna o cuerda detras de la cabeza con abdomen firme.",
          "Flexiona codos profundo manteniendo los brazos apuntando arriba.",
          "Extiende hasta alinear antebrazos con el torso sin arquear la espalda.",
          "Regresa despacio al estiramiento y conserva la direccion de los codos.",
        ]),
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
        pattern: "curl",
        steps: makeSteps([
          "Barra frente a muslos, pecho alto y codos pegados al costado.",
          "Flexiona codos elevando la barra sin mover hombros ni tronco.",
          "Aprieta el biceps cuando la barra llegue cerca del pecho.",
          "Desciende lento hasta casi extender por completo y repite sin balanceo.",
        ]),
      },
      {
        name: "Curl martillo",
        target: "Braquial y antebrazo",
        prescription: "4 series de 10 a 12 repeticiones",
        cue: "Agarre neutro, hombros quietos y recorrido limpio hasta arriba.",
        accent: "from-emerald-300/35 to-white/10",
        badge: "HM",
        pattern: "curl",
        steps: makeSteps([
          "Mancuernas neutras al costado y muñecas alineadas.",
          "Sube cada mancuerna manteniendo el agarre tipo martillo y codos quietos.",
          "Aprieta arriba sin girar hombros ni elevar trapecios.",
          "Baja en control total hasta recuperar el estiramiento del brazo.",
        ]),
      },
      {
        name: "Curl inclinado",
        target: "Cabeza larga del biceps",
        prescription: "3 series de 10 a 12 repeticiones",
        cue: "Deja caer bien el brazo hacia atrás y evita adelantar los hombros.",
        accent: "from-lime-200/35 to-zinc-50/10",
        badge: "INC",
        pattern: "curl",
        steps: makeSteps([
          "Apoya espalda en banco inclinado y deja brazos colgando hacia atras.",
          "Flexiona codos sin despegar hombros del respaldo ni cortar el rango.",
          "Contrae arriba sintiendo la cabeza larga trabajar a pleno.",
          "Baja lento hasta el estiramiento completo antes de iniciar otra subida.",
        ]),
      },
      {
        name: "Curl en polea baja",
        target: "Tensión continua",
        prescription: "3 series de 12 a 15 repeticiones",
        cue: "Controla la bajada y mantén tensión constante durante todo el recorrido.",
        accent: "from-emerald-200/35 to-white/10",
        badge: "CPL",
        pattern: "curl",
        steps: makeSteps([
          "Toma la barra baja con codos fijos y tension ya activa desde el inicio.",
          "Sube siguiendo la linea del cable sin tiron de cadera.",
          "Aprieta fuerte el biceps arriba aprovechando la resistencia constante.",
          "Regresa lento sin apoyar la carga para mantener tension continua.",
        ]),
      },
    ],
  },
];

function ExerciseStepIllustration({
  exercise,
  group,
  step,
  stepIndex,
}: {
  exercise: Exercise;
  group: string;
  step: ExerciseStep;
  stepIndex: number;
}) {
  const gradientId = `${group}-${exercise.badge}-${stepIndex}`;

  return (
    <article className="border border-white/10 bg-black/35 p-3">
      <div className="rounded-2xl border border-white/10 bg-black/45 p-2">
        <svg viewBox="0 0 120 120" role="img" aria-label={`${exercise.name} paso ${stepIndex + 1}`} className="h-28 w-full">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(215,255,100,0.92)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.16)" />
            </linearGradient>
            <marker id={`${gradientId}-arrow`} markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="rgba(215,255,100,0.92)" />
            </marker>
          </defs>

          <rect x="0" y="0" width="120" height="120" rx="20" fill="rgba(5,5,5,0.92)" />
          <rect x="10" y="10" width="100" height="100" rx="16" fill={`url(#${gradientId})`} opacity="0.2" />
          <text x="18" y="24" fill="white" fontSize="11" fontFamily="sans-serif" letterSpacing="1.6">
            0{stepIndex + 1}
          </text>
          <text x="102" y="24" textAnchor="end" fill="rgba(255,255,255,0.65)" fontSize="9" fontFamily="sans-serif" letterSpacing="1.2">
            {exercise.badge}
          </text>
          <path d="M24 98 H96" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
          {renderExerciseFigure(exercise.pattern, stepIndex, `${gradientId}-arrow`)}
        </svg>
      </div>

      <div className="mt-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-accent">{step.title}</p>
        <p className="mt-2 text-sm leading-6 text-white/70">{step.detail}</p>
      </div>
    </article>
  );
}

function renderExerciseFigure(pattern: Exercise["pattern"], stepIndex: number, arrowId: string) {
  const arrow = (x1: number, y1: number, x2: number, y2: number) => (
    <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke="rgba(215,255,100,0.92)" strokeWidth="3" strokeLinecap="round" markerEnd={`url(#${arrowId})`} />
  );

  const baseStroke = "rgba(255,255,255,0.9)";
  const accentStroke = "rgba(215,255,100,0.92)";

  switch (pattern) {
    case "squat":
      return (
        <>
          {stepIndex === 0 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L40 44 M60 48 L80 44 M60 66 L48 90 M60 66 L72 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M36 42 H84" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
              {arrow(92, 34, 92, 58)}
            </>
          ) : null}
          {stepIndex === 1 ? (
            <>
              <circle cx="64" cy="42" r="8" fill={baseStroke} />
              <path d="M64 50 L56 68 M56 68 L42 78 M56 68 L74 74 M56 58 L38 64 M56 58 L78 58 M42 78 L34 92 M74 74 L80 92" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M36 54 H82" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
              {arrow(26, 46, 26, 68)}
            </>
          ) : null}
          {stepIndex === 2 ? (
            <>
              <circle cx="58" cy="36" r="8" fill={baseStroke} />
              <path d="M58 44 L58 68 M58 50 L40 46 M58 50 L78 44 M58 68 L48 90 M58 68 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M36 44 H84" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
              {arrow(90, 68, 90, 42)}
            </>
          ) : null}
          {stepIndex === 3 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L42 44 M60 48 L78 44 M60 66 L48 90 M60 66 L72 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M40 42 H80" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
              <path d="M84 62 L92 70 L102 54" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : null}
        </>
      );
    case "hinge":
      return (
        <>
          {stepIndex === 0 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L42 54 M60 48 L78 54 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M42 76 H78" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
              {arrow(92, 34, 80, 46)}
            </>
          ) : null}
          {stepIndex === 1 ? (
            <>
              <circle cx="72" cy="38" r="8" fill={baseStroke} />
              <path d="M66 44 L48 58 M48 58 L30 62 M48 58 L64 74 M56 50 L76 56 M64 74 L54 92 M64 74 L74 92" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M30 70 H76" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
              {arrow(88, 40, 68, 58)}
            </>
          ) : null}
          {stepIndex === 2 ? (
            <>
              <circle cx="68" cy="36" r="8" fill={baseStroke} />
              <path d="M64 44 L50 58 M50 58 L34 62 M50 58 L68 72 M58 48 L76 54 M68 72 L58 92 M68 72 L78 92" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M34 70 H80" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
              {arrow(30, 58, 48, 42)}
            </>
          ) : null}
          {stepIndex === 3 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L42 54 M60 48 L78 54 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M42 76 H78" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
              <path d="M84 62 L92 70 L102 54" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : null}
        </>
      );
    case "lunge":
      return (
        <>
          {stepIndex === 0 ? (
            <>
              <circle cx="56" cy="34" r="8" fill={baseStroke} />
              <path d="M56 42 L56 64 M56 48 L40 54 M56 48 L72 54 M56 64 L42 84 M56 64 L76 72" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              {arrow(90, 66, 102, 66)}
            </>
          ) : null}
          {stepIndex === 1 ? (
            <>
              <circle cx="58" cy="40" r="8" fill={baseStroke} />
              <path d="M58 48 L58 70 M58 54 L42 60 M58 54 L74 60 M58 70 L42 92 M58 70 L82 74 M82 74 L92 92" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              {arrow(22, 38, 22, 62)}
            </>
          ) : null}
          {stepIndex === 2 ? (
            <>
              <circle cx="56" cy="36" r="8" fill={baseStroke} />
              <path d="M56 44 L56 66 M56 50 L40 56 M56 50 L72 56 M56 66 L42 86 M56 66 L76 72" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              {arrow(22, 74, 22, 52)}
            </>
          ) : null}
          {stepIndex === 3 ? (
            <>
              <circle cx="56" cy="34" r="8" fill={baseStroke} />
              <path d="M56 42 L56 64 M56 48 L40 54 M56 48 L72 54 M56 64 L42 84 M56 64 L76 72" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M82 62 L90 70 L100 56" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : null}
        </>
      );
    case "verticalPull":
      return (
        <>
          <path d="M28 24 H92" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
          {stepIndex === 0 ? (
            <>
              <circle cx="60" cy="40" r="8" fill={baseStroke} />
              <path d="M60 48 L60 72 M60 54 L46 34 M60 54 L74 34 M60 72 L50 92 M60 72 L70 92" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              {arrow(102, 40, 102, 62)}
            </>
          ) : null}
          {stepIndex === 1 ? (
            <>
              <circle cx="60" cy="38" r="8" fill={baseStroke} />
              <path d="M60 46 L60 68 M60 50 L48 34 M60 50 L72 34 M60 68 L50 90 M60 68 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              {arrow(18, 64, 18, 42)}
            </>
          ) : null}
          {stepIndex === 2 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 64 M60 46 L46 32 M60 46 L74 32 M60 64 L50 88 M60 64 L70 88" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M44 30 H76" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" />
            </>
          ) : null}
          {stepIndex === 3 ? (
            <>
              <circle cx="60" cy="40" r="8" fill={baseStroke} />
              <path d="M60 48 L60 72 M60 54 L46 34 M60 54 L74 34 M60 72 L50 92 M60 72 L70 92" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M86 62 L94 70 L104 56" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : null}
        </>
      );
    case "horizontalPull":
      return (
        <>
          {stepIndex === 0 ? (
            <>
              <circle cx="70" cy="34" r="8" fill={baseStroke} />
              <path d="M64 40 L50 54 M50 54 L34 58 M50 54 L66 70 M56 46 L78 54 M66 70 L58 90 M66 70 L76 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              {arrow(98, 54, 80, 54)}
            </>
          ) : null}
          {stepIndex === 1 ? (
            <>
              <circle cx="68" cy="34" r="8" fill={baseStroke} />
              <path d="M62 40 L48 54 M48 54 L34 58 M48 54 L64 70 M54 46 L78 48 M64 70 L56 90 M64 70 L74 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M76 48 H96" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
            </>
          ) : null}
          {stepIndex === 2 ? (
            <>
              <circle cx="66" cy="34" r="8" fill={baseStroke} />
              <path d="M60 40 L48 54 M48 54 L34 58 M48 54 L64 70 M54 46 L70 46 M64 70 L56 90 M64 70 L74 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M68 46 H84" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
            </>
          ) : null}
          {stepIndex === 3 ? (
            <>
              <circle cx="70" cy="34" r="8" fill={baseStroke} />
              <path d="M64 40 L50 54 M50 54 L34 58 M50 54 L66 70 M56 46 L78 54 M66 70 L58 90 M66 70 L76 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M86 62 L94 70 L104 56" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : null}
        </>
      );
    case "press":
      return (
        <>
          {stepIndex === 0 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L42 52 M60 48 L78 52 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M36 52 H84" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
              {arrow(90, 64, 90, 40)}
            </>
          ) : null}
          {stepIndex === 1 ? (
            <>
              <circle cx="60" cy="36" r="8" fill={baseStroke} />
              <path d="M60 44 L60 68 M60 50 L42 56 M60 50 L78 56 M60 68 L50 92 M60 68 L70 92" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M36 56 H84" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
            </>
          ) : null}
          {stepIndex === 2 ? (
            <>
              <circle cx="60" cy="28" r="8" fill={baseStroke} />
              <path d="M60 36 L60 62 M60 42 L44 20 M60 42 L76 20 M60 62 L50 90 M60 62 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M40 20 H80" stroke={accentStroke} strokeWidth="5" strokeLinecap="round" />
            </>
          ) : null}
          {stepIndex === 3 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L42 52 M60 48 L78 52 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M84 62 L92 70 L102 56" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : null}
        </>
      );
    case "dip":
      return (
        <>
          <path d="M34 36 V84 M86 36 V84" stroke="rgba(255,255,255,0.2)" strokeWidth="5" strokeLinecap="round" />
          {stepIndex === 0 ? (
            <>
              <circle cx="60" cy="30" r="8" fill={baseStroke} />
              <path d="M60 38 L60 62 M60 44 L40 50 M60 44 L80 50 M60 62 L50 90 M60 62 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
            </>
          ) : null}
          {stepIndex === 1 ? (
            <>
              <circle cx="60" cy="42" r="8" fill={baseStroke} />
              <path d="M60 50 L60 72 M60 54 L42 60 M60 54 L78 60 M60 72 L50 92 M60 72 L70 92" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              {arrow(20, 34, 20, 60)}
            </>
          ) : null}
          {stepIndex === 2 ? (
            <>
              <circle cx="60" cy="32" r="8" fill={baseStroke} />
              <path d="M60 40 L60 62 M60 46 L42 52 M60 46 L78 52 M60 62 L50 90 M60 62 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              {arrow(20, 68, 20, 44)}
            </>
          ) : null}
          {stepIndex === 3 ? (
            <>
              <circle cx="60" cy="30" r="8" fill={baseStroke} />
              <path d="M60 38 L60 62 M60 44 L40 50 M60 44 L80 50 M60 62 L50 90 M60 62 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M90 62 L98 70 L108 56" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : null}
        </>
      );
    case "fly":
      return (
        <>
          {stepIndex === 0 ? (
            <>
              <circle cx="60" cy="32" r="8" fill={baseStroke} />
              <path d="M60 40 L60 66 M60 46 L36 58 M60 46 L84 58 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
            </>
          ) : null}
          {stepIndex === 1 ? (
            <>
              <circle cx="60" cy="32" r="8" fill={baseStroke} />
              <path d="M60 40 L60 66 M60 46 L28 46 M60 46 L92 46 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              {arrow(24, 34, 40, 34)}
              {arrow(96, 34, 80, 34)}
            </>
          ) : null}
          {stepIndex === 2 ? (
            <>
              <circle cx="60" cy="32" r="8" fill={baseStroke} />
              <path d="M60 40 L60 66 M60 46 L44 40 M60 46 L76 40 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M42 40 H78" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" />
            </>
          ) : null}
          {stepIndex === 3 ? (
            <>
              <circle cx="60" cy="32" r="8" fill={baseStroke} />
              <path d="M60 40 L60 66 M60 46 L36 58 M60 46 L84 58 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M86 62 L94 70 L104 56" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : null}
        </>
      );
    case "extension":
      return (
        <>
          {stepIndex === 0 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L48 56 M60 48 L72 56 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
            </>
          ) : null}
          {stepIndex === 1 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L50 62 M60 48 L70 62 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              {arrow(88, 42, 88, 66)}
            </>
          ) : null}
          {stepIndex === 2 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L44 80 M60 48 L76 80 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M40 82 H80" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" />
            </>
          ) : null}
          {stepIndex === 3 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L48 56 M60 48 L72 56 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M86 62 L94 70 L104 56" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : null}
        </>
      );
    case "curl":
      return (
        <>
          {stepIndex === 0 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L44 66 M60 48 L76 66 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M40 70 H80" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" />
            </>
          ) : null}
          {stepIndex === 1 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L48 58 M60 48 L72 58 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              {arrow(90, 72, 90, 48)}
            </>
          ) : null}
          {stepIndex === 2 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L50 46 M60 48 L70 46 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M46 46 H74" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" />
            </>
          ) : null}
          {stepIndex === 3 ? (
            <>
              <circle cx="60" cy="34" r="8" fill={baseStroke} />
              <path d="M60 42 L60 66 M60 48 L44 66 M60 48 L76 66 M60 66 L50 90 M60 66 L70 90" stroke={baseStroke} strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M86 62 L94 70 L104 56" stroke={accentStroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ) : null}
        </>
      );
  }
}

function ExerciseSequence({ exercise, group }: { exercise: Exercise; group: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {exercise.steps.map((step, stepIndex) => (
        <ExerciseStepIllustration
          key={`${exercise.name}-${step.title}`}
          exercise={exercise}
          group={group}
          step={step}
          stepIndex={stepIndex}
        />
      ))}
    </div>
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
                        <p className="mt-4 max-w-3xl text-sm font-bold uppercase tracking-[0.18em] text-accent/85">
                          Cada ejercicio incluye 4 imagenes paso a paso para ejecutar la tecnica correcta.
                        </p>
                      </article>

                      <div className="grid gap-4 md:grid-cols-2">
                        {activeGuide.exercises.map((exercise) => (
                          <article key={exercise.name} className="brutalist-panel overflow-hidden p-4 sm:p-5">
                            <div className={`mb-4 rounded-[1rem] bg-gradient-to-br ${exercise.accent}`}>
                              <ExerciseSequence exercise={exercise} group={activeGuide.id} />
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