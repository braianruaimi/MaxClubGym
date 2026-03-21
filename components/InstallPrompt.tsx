"use client";

import { useEffect, useState } from "react";

declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;
  }

  interface Navigator {
    standalone?: boolean;
  }
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

    setIsInstalled(isStandalone);
    setShowIosHint(isIos && !isStandalone);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowIosHint(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  if (isInstalled) {
    return null;
  }

  if (!deferredPrompt && !showIosHint) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-3xl border border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Instalar MaxClubGym</p>
          <p className="mt-1 text-sm text-white/65">
            {deferredPrompt
              ? "Accede mas rapido desde tu pantalla de inicio."
              : "En iPhone abre Compartir y toca Anadir a pantalla de inicio."}
          </p>
        </div>

        {deferredPrompt ? (
          <button
            type="button"
            onClick={handleInstall}
            className="shrink-0 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
          >
            Instalar
          </button>
        ) : null}
      </div>
    </div>
  );
}
