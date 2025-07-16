import React from "react";
import {useRouter} from "next/navigation";
import {useLanguage} from "@/context/languageContext";
import MainLayout from "./layout/MainLayout";

export default function NotFoundScreen() {
    const router = useRouter();
    const {t} = useLanguage();

    const handleBack = () => {
        router.back();
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-white">
                <div className="max-w-md mx-auto p-6 pb-4">
                    {/* Main Content */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">{t("not.found")}</h2>

                        <p className="text-gray-600">{t("ssn.not.found")}</p>
                    </div>

                    {/* Back Button */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
                        <div className="max-w-md mx-auto flex gap-4">
                            <button
                                onClick={handleBack}
                                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                {t("back")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}