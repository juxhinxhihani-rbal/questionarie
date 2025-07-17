"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to a default SSN route or show input
    router.push("/questionnaire/A12345678B");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Investment Questionnaire</h1>
        <p className="text-gray-600">Redirecting to questionnaire...</p>
      </div>
    </div>
  );
}