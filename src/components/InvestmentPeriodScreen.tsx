import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, TrendingUp, Info } from "lucide-react";
import { useLanguage } from "@/context/languageContext";
import MainLayout from "./layout/MainLayout";

export default function InvestmentPeriodScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    router.push("/investment/risk");
  };


  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto p-6 pb-4">
          {/* Illustration */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400&h=300"
                alt="Investment Growth"
                className="rounded-lg opacity-20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <TrendingUp className="w-24 h-24 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 mb-20">
            <h2 className="text-2xl font-bold">{t("investment.period")}</h2>

            <p className="text-gray-600">{t("period.description")}</p>

            <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">{t("give.time")}</h3>
                <p className="text-sm text-gray-600">{t("time.description")}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
            <div className="max-w-md mx-auto flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {t("back")}
              </button>
              <button
                onClick={handleContinue}
                className="flex-1 py-3 px-4 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
              >
                {t("continue")}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}