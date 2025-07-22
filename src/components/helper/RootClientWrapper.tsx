"use client";

import { useEffect } from "react";
import { LanguageProvider } from "@/context/languageContext";
import { AuthProvider } from "@/context/authContext";
import { initializeApiBaseUrl } from "@/service/api";

export default function RootClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initializeApiBaseUrl();
  }, []);

  return (
    <AuthProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AuthProvider>
  );
}
