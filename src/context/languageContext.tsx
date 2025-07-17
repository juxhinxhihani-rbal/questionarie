"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "al";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Questionnaire
    "risk.questionnaire": "Risk Questionnaire",
    ssn: "SSN",
    select: "Select",
    result: "Result",
    "submit.data": "Submit Data",
    "please.complete.form": "Please complete all fields",
    "error.loading.questions": "Error loading questions",
    "investment.summary": "Investment Summary",
    
    // Language switch
    "switch.language": "AL",
  },
  al: {
    // Questionnaire
    "risk.questionnaire": "Pyetësor Rreziku",
    ssn: "SSN",
    select: "Zgjidhni",
    result: "Rezultati",
    "submit.data": "Dërgo të Dhënat",
    "please.complete.form": "Ju lutemi plotësoni të gjitha fushat",
    "error.loading.questions": "Problem me marrjen e pyetjeve",
    "investment.summary": "Përmbledhja e Investimit",
    
    // Language switch
    "switch.language": "EN",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("al");

  // Add persistence
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}