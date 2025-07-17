"use client";

import InvestmentQuestionnaireScreen from "@/components/InvestmentQuestionnaireScreen";
import { useParams } from "next/navigation";

export default function QuestionnairePage() {
  const params = useParams();
  const ssnParam = Array.isArray(params?.ssn) ? params?.ssn[0] : (params?.ssn as string) || "";
  
  const isValidSsn = /^[A-Za-z]\d{8}[A-Za-z]$/.test(ssnParam);
  
  if (!isValidSsn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Invalid SSN Format</h1>
          <p className="text-gray-600">SSN must be in format: Letter + 8 digits + Letter</p>
          <p className="text-gray-600 mt-2">Example: A12345678B</p>
        </div>
      </div>
    );
  }
  
  return <InvestmentQuestionnaireScreen standalone initialSsn={ssnParam} />;
}