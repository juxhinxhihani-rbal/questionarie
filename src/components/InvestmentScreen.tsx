import React from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  Bold as GoldBar,
  Home,
  Battery,
  Wallet,
  Plus,
  Activity,
  Smartphone,
  ArrowRight,
  LineChart as ChartLineUp,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/context/languageContext";
import MainLayout from "./layout/MainLayout";

export default function InvestmentScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleInvestClick = () => {
    router.push("/investment/info");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="relative bg-yellow-400 h-[500px] flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80"
              alt="Investment Background"
              className="object-cover w-full h-full opacity-10"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold mb-6 text-gray-900">
                {t("welcome")}
              </h1>
              <p className="text-xl text-gray-800 mb-8 max-w-2xl">
                {t("welcome.subtitle")}
              </p>
              <button
                onClick={handleInvestClick}
                className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
              >
                {t("start.investing")}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-amber-100 p-4 rounded-xl inline-block mb-4">
                <Car className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("investment.vehicles")}
              </h3>
              <p className="text-gray-600">{t("investment.vehicles.desc")}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-amber-100 p-4 rounded-xl inline-block mb-4">
                <GoldBar className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("precious.metals")}
              </h3>
              <p className="text-gray-600">{t("precious.metals.desc")}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-amber-100 p-4 rounded-xl inline-block mb-4">
                <Home className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("real.estate")}</h3>
              <p className="text-gray-600">{t("real.estate.desc")}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-amber-100 p-4 rounded-xl inline-block mb-4">
                <Battery className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("energy.sector")}</h3>
              <p className="text-gray-600">{t("energy.sector.desc")}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8">{t("why.choose")}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Wallet className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      {t("flexible.options")}
                    </h3>
                    <p className="text-gray-600">{t("flexible.options.desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <ChartLineUp className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      {t("performance.tracking")}
                    </h3>
                    <p className="text-gray-600">
                      {t("performance.tracking.desc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      {t("secure.platform")}
                    </h3>
                    <p className="text-gray-600">{t("secure.platform.desc")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">{t("how.works")}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Plus className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      {t("easy.start")}
                    </h3>
                    <p className="text-gray-600">{t("easy.start.desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Activity className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      {t("regular.investments")}
                    </h3>
                    <p className="text-gray-600">
                      {t("regular.investments.desc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Smartphone className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      {t("digital.management")}
                    </h3>
                    <p className="text-gray-600">
                      {t("digital.management.desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <button
              onClick={handleInvestClick}
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
            >
              <span>{t("start.journey")}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}