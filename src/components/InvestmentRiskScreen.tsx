import React from "react";
import {useRouter} from "next/navigation";
import {ArrowRight, Hand, Info, Phone} from "lucide-react";
import {useLanguage} from "@/context/languageContext";
import {useAuth} from "@/context/authContext";
import MainLayout from "./layout/MainLayout";

export default function InvestmentRiskScreen() {
    const router = useRouter();
    const {t} = useLanguage();

    const handleBack = () => {
        router.back();
    };

    const handleContinue = () => {
        router.push("/investment/questionnaire");
    };
    const {loggedIn, hasRole} = useAuth();

    return (
        <MainLayout>
            <div className="min-h-screen bg-white">
                <div className="max-w-md mx-auto p-6 pb-4">
                    {/* Illustration */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=400&h=300"
                                alt="Investment Risk"
                                className="rounded-lg opacity-20"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Hand className="w-24 h-24 text-yellow-400"/>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">{t("investment.risk")}</h2>

                        <p className="text-gray-600">{t("risk.description")}</p>

                        <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1"/>
                            <div>
                                <h3 className="font-semibold mb-2">{t("check.risk")}</h3>
                                <p className="text-sm text-gray-600">{t("risk.scale")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="font-medium">{t("download.app")}</p>
                        <div className="flex items-center justify-center gap-4 -mt-4">
                            <a
                                href="https://apps.apple.com/al/app/raiffeisen-youth/id6468880976"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="/app-store.svg"
                                    alt="Apple App Store"
                                    className="h-36 w-auto"
                                />
                            </a>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.rbal.mobrix&pcampaignid=web_share"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="/play-store.svg"
                                    alt="Google Play Store"
                                    className="h-36 w-auto"
                                />
                            </a>
                            {/* Uncomment if you want to show QR too */}
                            {/*
                            <img
                              src="/qr.png"
                              alt="Raiffeisen Youth QR code"
                              className="h-16 w-16"
                            />
                            */}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-blue-600 -mt-4 mb-20">
                        <Phone className="w-5 h-5"/>
                        <a href="tel:+0422823587" className="hover:underline">
                            <span>{t("need.support")}</span>
                        </a>
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
                            {loggedIn && hasRole("investor") && (
                                <button
                                    onClick={handleContinue}
                                    className="flex-1 py-3 px-4 bg-yellow-400 text-black rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                                >
                                    {t("continue")}
                                    <ArrowRight className="w-5 h-5"/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}