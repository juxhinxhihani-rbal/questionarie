import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {AlertCircle, ArrowRight, FileText, TrendingUp} from "lucide-react";
import LoadingSpinner from "./helper/LoadingSpinner";
import { useLanguage } from "@/context/languageContext";
import MainLayout from "./layout/MainLayout";
import LanguageSwitch from "./helper/LanguageSwitch";
import Link from "next/link";
import { QuestionResponse, FormData } from "../types";
import { QuestionnaireService } from "../service/QuestionnaireService";


interface InvestmentQuestionnaireScreenProps {
  standalone?: boolean;
  initialSsn?: string;
}

export default function InvestmentQuestionnaireScreen({
  standalone = false,
  initialSsn = "",
}: InvestmentQuestionnaireScreenProps) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    ssn: initialSsn,
  });

  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const [questionsError, setQuestionsError] = useState<string | null>(null);
  const [isCalculatingRisk, setIsCalculatingRisk] = useState(false);
  const [riskResult, setRiskResult] = useState<string>("");
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

   useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoadingQuestions(true);
        setQuestionsError(null);
        const questionsData = await QuestionnaireService.GetQuestions({ language });
        setQuestions(questionsData);
        
        // Initialize form data with question fields
        const initialFormData: FormData = {
          clientName: "",
          ssn: initialSsn,
        };
        
        questionsData.forEach(question => {
          initialFormData[question.question] = "";
        });
        
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error loading questions:", error);
        setQuestionsError(t("error.loading.questions"));
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    loadQuestions();
  }, [language, initialSsn, t]);

  // Update SSN when initialSsn changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, ssn: initialSsn }));
  }, [initialSsn]);

  const isFormValid = useMemo(() => {
    const requiredFields = questions.map(q => q.question);
    const additionalFields = standalone ? [] : ["clientName"];
    const allRequiredFields = [...additionalFields, ...requiredFields];
    
    return allRequiredFields.every(field => formData[field] && formData[field].trim() !== "");
  }, [formData, questions, standalone]);


  useEffect(() => {
  // Only calculate if standalone and form is valid (all questions answered)
  if (isFormValid) {
    const calculateRisk = async () => {
      try {
        setIsCalculatingRisk(true);

        const selections: Array<{ questionId: number; answerId: number }> = [];

        questions.forEach(question => {
          const selectedAnswer = formData[question.question];
          if (selectedAnswer) {
            const answerOption = question.answers.find(answer => answer.answer === selectedAnswer);
            if (answerOption) {
              selections.push({
                questionId: question.id,
                answerId: answerOption.id
              });
            }
          }
        });

        const result = await QuestionnaireService.CalculateRisk({
          ssn: formData.ssn,
          selections
        });

        setRiskResult(result);
        setShowSummary(false);  // reset summary if previously shown
      } catch (error) {
        console.error("Error calculating risk:", error);
      } finally {
        setIsCalculatingRisk(false);
      }
    };

    calculateRisk();
  } else {
    // Clear result if form is invalid or not standalone
    setRiskResult("");
  }
}, [formData, questions, standalone, isFormValid]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleContinue = async () => {
    if (!isFormValid) return;
    if (standalone) {
      setShowSummary(true);
      try {
        await QuestionnaireService.SubmitRiskResult(formData.ssn, riskResult);
      } catch (error) {
        console.error("Error submitting risk result:", error);
      }
    } else {
      setIsLoadingQuestions(true);
      setTimeout(() => {
        router.push("/investment/calculator");
      }, 2000);
    }
  };

  const getQuestionLabel = (question: QuestionResponse): string => {
    return question.question;
  };

  const getOptionLabel = (question: QuestionResponse, optionValue: string): string => {
    const option = question.answers.find(opt => opt.answer === optionValue);
    return option ? option.answer : optionValue;
  };

  useEffect(() => {
    if (standalone && showSummary) {
      setTimeout(() => window.print(), 100);
    }
  }, [showSummary, standalone]);

  if (questionsError) {
    return (
      <MainLayout showNavbar={!standalone}>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{questionsError}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#FFD700] text-black px-4 py-2 rounded-lg hover:bg-[#FFD700]/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showNavbar={!standalone}>
      <div className="min-h-screen bg-white flex flex-col">
        {isLoadingQuestions && <LoadingSpinner />}

        {standalone && (
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <div className="flex-shrink-0">
              <Link href={`/questionnaire/${formData.ssn}`} className="flex items-center">
                <div className="bg-[#FFD700] p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">
                InvestPlatform
              </span>
              </Link>
            </div>
            <LanguageSwitch />
          </div>
        )}

        <div className={`flex-1 max-w-2xl mx-auto p-6 ${showSummary ? "pb-4 mb-2" : "pb-20 mb-8"}`}>
          {/* Header */}
          <div className="mb-8 flex justify-center">
            <div className="bg-yellow-100 p-8 rounded-full">
              <FileText className="w-16 h-16 text-yellow-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-6">
            {t("risk.questionnaire")}
          </h2>

          <form className="space-y-6 bg-gray-50 p-6 rounded-xl shadow" onSubmit={(e) => e.preventDefault()}>
            {/* Client Info Row */}
            <div className="flex gap-6">
              {!standalone && (
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("client.name")}
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange("clientName", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-colors"
                    required
                  />
                </div>
              )}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("ssn")}
                </label>
                <input
                  type="text"
                  value={formData.ssn}
                  onChange={(e) => handleInputChange("ssn", e.target.value)}
                  readOnly={standalone}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Dynamic Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {questions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {getQuestionLabel(question)}
                  </label>
                  <select
                    value={formData[question.question] || ""}
                    onChange={(e) => handleInputChange(question.question, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-colors"
                    required
                  >
                    <option value="">{t("select")}</option>
                    {question.answers.map((option) => (
                      <option key={option.id} value={option.answer}>
                        {option.answer}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Result Field (only show if we have a result) */}
            {
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("result")}:
                </label>
                <input
                  type="text"
                  value={riskResult}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 font-medium"
                />
              </div>
            }

            {!showSummary && <div className="pb-4"></div>}

            {/* Submit Button */}
            {!showSummary && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
                <div className="max-w-2xl mx-auto">
                  <div className="relative group">
                    <button
                      type="button"
                      disabled={!isFormValid || isCalculatingRisk}
                      onClick={handleContinue}
                      className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors
                      ${
                        isFormValid && !isCalculatingRisk
                          ? "bg-[#FFD700] text-black hover:bg-[#FFD700]/90 shadow-md hover:shadow-lg"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {standalone ? t("submit.data") : t("continue")}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    {!isFormValid && (
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity z-50">
                        <div className="bg-gray-900 text-white text-xs py-2 px-3 rounded-lg shadow-lg whitespace-nowrap">
                          {t("please.complete.form")}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>

          {/* Summary Table */}
          {showSummary && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">{t("investment.summary")}</h3>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {!standalone && (
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{t("client.name")}</td>
                        <td className="px-6 py-4 text-gray-700">{formData.clientName}</td>
                      </tr>
                    )}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{t("ssn")}</td>
                      <td className="px-6 py-4 text-gray-700">{formData.ssn}</td>
                    </tr>
                    {questions.map((question) => (
                      <tr key={question.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {getQuestionLabel(question)}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {getOptionLabel(question, formData[question.id])}
                        </td>
                      </tr>
                    ))}
                    <tr className="hover:bg-gray-50 bg-yellow-50">
                      <td className="px-6 py-4 font-bold text-gray-900">{t("result")}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{riskResult}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .container,
            .container * {
              visibility: visible;
            }
            .container {
              position: absolute;
              left: 0;
              top: 0;
            }
            button {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </MainLayout>
  );
}