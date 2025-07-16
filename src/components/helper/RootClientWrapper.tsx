"use client";

import { LanguageProvider } from "@/context/languageContext";
import { AuthProvider } from "@/context/authContext";

export default function RootClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AuthProvider>
  );
}
