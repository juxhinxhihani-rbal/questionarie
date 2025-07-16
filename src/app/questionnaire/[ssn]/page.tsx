"use client";

import InvestmentQuestionnaireScreen from "@/components/InvestmentQuestionnaireScreen";
import NotFoundScreen from "@/components/NotFoundScreen";
import { useParams } from "next/navigation";

export default function StandaloneQuestionnairePage() {
  const params = useParams();
  const ssnParam = Array.isArray(params?.ssn) ? params?.ssn[0] : (params?.ssn as string) || "";
  
  const isValidSsn = /^[A-Za-z]\d{8}[A-Za-z]$/.test(ssnParam);
  if(!isValidSsn){
    return <NotFoundScreen/>;
  }
  return <InvestmentQuestionnaireScreen standalone initialSsn={ssnParam} />;
}
