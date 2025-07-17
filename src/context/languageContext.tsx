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
    
    // Summary screen
    "back.to.form": "Back to Form",
    "download.pdf": "Download PDF",
    "print": "Print",
    "client.information": "Client Information",
    "risk.assessment": "Risk Assessment",
    "detailed.responses": "Detailed Responses",
    "results": "Results",
    "investment.summary.print": "Investment Summary",
    "question": "Question",
    "response": "Response",
    "generated.on": "Generated on",
    "time": "Time",
    "firma": "Firma",
    "signature": "Signature",
    "summary.generated": "This summary was generated on",
    "at": "at",
    "platform.subtitle": "Investment Risk Assessment",
    
    // Form placeholders
    "invest.summary": "Invest Summary",
    "ssn.placeholder": "Enter SSN (e.g., A12345678B)",
    "ssn.min.length": "SSN must be at least 8 characters",
    
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
    
    // Summary screen
    "back.to.form": "Kthehu te Formulari",
    "download.pdf": "Shkarko PDF",
    "print": "Printo",
    "client.information": "Informacioni i Klientit",
    "risk.assessment": "Vlerësimi i Rrezikut",
    "detailed.responses": "Përgjigjet e Detajuara",
    "results": "Rezultatet",
    "investment.summary.print": "Përmbledhja e Investimit",
    "question": "Pyetja",
    "response": "Përgjigja",
    "generated.on": "Gjeneruar më",
    "time": "Ora",
    "firma": "Firma",
    "signature": "Firma",
    "summary.generated": "Kjo përmbledhje u gjenerua më",
    "at": "në",
    "platform.subtitle": "Vlerësimi i Rrezikut të Investimit",
    
    // Form placeholders
    "invest.summary": "Përmbledhja e Investimit",
    "ssn.placeholder": "Shkruani SSN (p.sh., A12345678B)",
    "ssn.min.length": "SSN duhet të jetë të paktën 8 karaktere",
    
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