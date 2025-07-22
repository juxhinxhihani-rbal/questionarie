import {
  GetQuestionsRequest,
  QuestionResponse,
  RiskCalculationRequest,
} from "../types";
import { api, initializeApiBaseUrl } from "./api";
import { mockApi } from "./mockApi";

// Toggle between mock and real API
const USE_MOCK_API = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false';

export const QuestionnaireService = {
  async GetQuestions(
    language: GetQuestionsRequest
  ): Promise<QuestionResponse[]> {
    // Initialize API base URL before making request
    await initializeApiBaseUrl();
    
    if (USE_MOCK_API) {
      console.log("Using mock API for questions");
      return await mockApi.getQuestions(language);
    }

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
    
    if (USE_MOCK_API) {
      console.log("Using mock API for risk calculation");
      return await mockApi.calculateRisk(request);
    }

    try {
      const response = await api.post(`calculator/api/calculate-risk`, request);
      return response.data;
    } catch (error) {
      console.error("Failed to calculate risk from real API:", error);
      console.log("Falling back to mock API");
      return await mockApi.calculateRisk(request);
    }
  },

  async SubmitRiskResult(ssn: string, riskResult: string): Promise<void> {
    // Initialize API base URL before making request
    await initializeApiBaseUrl();
    
    if (USE_MOCK_API) {
      console.log("Using mock API for risk result submission");
      return await mockApi.submitRiskResult(ssn, riskResult);
    }

    try {
      const riskRequestBody = {
        ssn,
        riskResult,
      };

      await api.post(`utility/api/risk`, riskRequestBody);
    } catch (error) {
      console.error("Failed to submit risk result to real API:", error);
      console.log("Falling back to mock API");
      return await mockApi.submitRiskResult(ssn, riskResult);
    }
  }
};