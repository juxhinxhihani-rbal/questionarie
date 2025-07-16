import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, TrendingUp, Coins, LineChart, Clock } from "lucide-react";
import { useLanguage } from "../context/languageContext";
import MainLayout from "./layout/MainLayout";

export default function InvestmentInfo() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    router.push("/investment/period");
  };


  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto p-6 pb-4">
          {/* Illustration */}
          <div className="mb-8 flex justify-center">
            <div className="bg-yellow-100 p-8 rounded-full">
              <TrendingUp className="w-16 h-16 text-yellow-500" />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8 mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-4">{t("what.is.fund")}</h2>
              <p className="text-gray-600 leading-relaxed">
                {t("fund.description")}
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Coins className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t("professional.care")}
                  </h3>
                  <p className="text-gray-600">{t("professional.care.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <LineChart className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t("inflation.protection")}
                  </h3>
                  <p className="text-gray-600">
                    {t("inflation.protection.desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t("better.returns")}
                  </h3>
                  <p className="text-gray-600">{t("better.returns.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t("flexibility.liquidity")}
                  </h3>
                  <p className="text-gray-600">
                    {t("flexibility.liquidity.desc")}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Navigation Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
            <div className="max-w-2xl mx-auto flex gap-4">
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