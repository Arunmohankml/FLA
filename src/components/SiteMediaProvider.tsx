"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const SiteMediaContext = createContext<Record<string, string>>({});

export function useSiteMedia(key: string, fallback: string): string {
  const config = useContext(SiteMediaContext);
  return config[key] || fallback;
}

export function SiteMediaProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<Record<string, string>>({});

  const fetchConfig = useCallback(() => {
    fetch("/api/media")
      .then((r) => r.json())
      .then(setConfig)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchConfig();

    const onFocus = () => fetchConfig();
    document.addEventListener("visibilitychange", onFocus);
    window.addEventListener("focus", onFocus);
    return () => {
      document.removeEventListener("visibilitychange", onFocus);
      window.removeEventListener("focus", onFocus);
    };
  }, [fetchConfig]);

  return (
    <SiteMediaContext.Provider value={config}>
      {children}
    </SiteMediaContext.Provider>
  );
}
