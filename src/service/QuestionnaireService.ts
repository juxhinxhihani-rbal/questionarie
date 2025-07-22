import {
  GetQuestionsRequest,
  QuestionResponse,
  RiskCalculationRequest,
} from "../types";
import { api, initializeApiBaseUrl } from "./api";

export const QuestionnaireService = {
  async GetQuestions(
    language: GetQuestionsRequest
  ): Promise<QuestionResponse[]> {
    // Initialize API base URL before making request
    await initializeApiBaseUrl();
    
    try {
      console.log("Fetching questions for language:", language.language);
      const languageRequest = language.language == "al" ? "sq-AL" : "en-US";
      const response = await api.get<QuestionResponse[]>(
        `calculator/api/risk-questions?language=${languageRequest}`
      );
      
      return response.data;
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      throw error;
    }
  },

  async CalculateRisk(request: RiskCalculationRequest): Promise<string> {
    // Initialize API base URL before making request
    await initializeApiBaseUrl();
    
    try {
      const response = await api.post(`calculator/api/calculate-risk`, request);
      return response.data;
    } catch (error) {
      console.error("Failed to calculate risk:", error);
      throw error;
    }
  },

  async SubmitRiskResult(ssn: string, riskResult: string): Promise<void> {
    // Initialize API base URL before making request
    await initializeApiBaseUrl();
    
    try {
      const riskRequestBody = {
        ssn,
        riskResult,
      };

      await api.post(`utility/api/risk`, riskRequestBody);
    } catch (error) {
      console.error("Failed to submit risk result:", error);
      throw error;
    }
  }
};