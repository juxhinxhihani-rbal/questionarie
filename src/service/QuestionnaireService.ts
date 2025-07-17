import {
  GetQuestionsRequest,
  QuestionResponse,
  RiskCalculationRequest,
} from "../types";
import { api } from "./api";
import { mockQuestions, calculateMockRisk, mockDelay } from "./mockApi";

// Flag to enable/disable mock mode
const USE_MOCK_API = true;

export const QuestionnaireService = {
  async GetQuestions(
    language: GetQuestionsRequest
  ): Promise<QuestionResponse[]> {
    if (USE_MOCK_API) {
      // Use mock data
      await mockDelay();
      return mockQuestions;
    }

    try {
      const languageRequest = language.language == "al" ? "sq-AL" : "en-US";
      const response = await api.get<QuestionResponse[]>(
        `calculator/api/risk-questions?language=${languageRequest}`
      );
      
      return response.data;
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      // Fallback to mock data if API fails
      console.log("Falling back to mock data...");
      await mockDelay();
      return mockQuestions;
    }
  },

  async CalculateRisk(request: RiskCalculationRequest): Promise<string> {
    if (USE_MOCK_API) {
      // Use mock calculation
      await mockDelay();
      return calculateMockRisk(request.selections);
    }

    try {
      const response = await api.post(`calculator/api/calculate-risk`, request);
      
      return response.data;
    } catch (error) {
      console.error("Failed to calculate risk:", error);
      // Fallback to mock calculation if API fails
      console.log("Falling back to mock calculation...");
      await mockDelay();
      return calculateMockRisk(request.selections);
    }
  },

  async SubmitRiskResult(ssn: string, riskResult: string): Promise<void> {
    if (USE_MOCK_API) {
      // Mock submission - just log it
      await mockDelay();
      console.log("Mock submission:", { ssn, riskResult });
      return;
    }

    try {
      const riskRequestBody = {
        ssn,
        riskResult,
      };

      await api.post(`utility/api/risk`, riskRequestBody);
    } catch (error) {
      console.error("Failed to submit risk result:", error);
      // Fallback to mock submission
      console.log("Falling back to mock submission...");
      await mockDelay();
      console.log("Mock submission:", { ssn, riskResult });
    }
  }
};