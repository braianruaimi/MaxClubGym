"use client";

import { useEffect } from "react";

const repoName = "MaxClubGym";
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? `/${repoName}` : "";

export function PWARegistration() {
  useEffect(() => {
    if (!isProduction || !("serviceWorker" in navigator)) {
      return;
    }

    const registerWorker = async () => {
      try {
        await navigator.serviceWorker.register(`${basePath}/sw.js`, {
          scope: `${basePath}/`,
        });
      } catch {
        return;
      }
    };

    void registerWorker();
  }, []);

  return null;
}