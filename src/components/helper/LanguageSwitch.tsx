"use client";

import { useLanguage } from "@/context/languageContext";
import React, { useEffect, useRef, useState } from "react";
import { Languages, Check } from "lucide-react";

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleSelect = (lang: "en" | "al") => {
    setLanguage(lang);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={handleToggle}
        className="flex items-center gap-1 px-2 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Switch Language"
      >
        <Languages className="w-4 h-4" />
        <span className="font-medium">
          {language === "en" ? "EN" : "AL"}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg z-10">
          <button
            onClick={() => handleSelect("en")}
            className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${language === "en" ? "bg-gray-100 font-semibold" : ""}`}
          >
            English
            {language === "en" && <Check className="w-4 h-4" />}
          </button>
          <button
            onClick={() => handleSelect("al")}
            className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${language === "al" ? "bg-gray-100 font-semibold" : ""}`}
          >
            Shqip
            {language === "al" && <Check className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
}
