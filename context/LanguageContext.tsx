import React, { createContext, useContext, useEffect, useState } from "react";
import i18n, { initI18n, setAppLanguage } from "../config/i18n";

type Lang = "pt" | "en";
type Ctx = {
  language: Lang;
  changeLanguage: (lang: Lang) => Promise<void>;
  toggleLanguage: () => Promise<void>;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Lang>("pt");

  useEffect(() => {
    (async () => {
      await initI18n();
      setLanguage((i18n.language as Lang) || "pt");
    })();
  }, []);

  const changeLanguage = async (lang: Lang) => {
    await setAppLanguage(lang);
    setLanguage(lang);
  };

  const toggleLanguage = async () => {
    const next = language === "pt" ? "en" : "pt";
    await changeLanguage(next);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}