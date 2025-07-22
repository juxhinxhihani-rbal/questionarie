import {
  GetQuestionsRequest,
  QuestionResponse,
  RiskCalculationRequest,
} from "../types";
import { api, initApi } from "./api";

// Mock data for when API is not available
const mockQuestions: QuestionResponse[] = [
  {
    id: 1,
    questionText: "What is your investment experience?",
    answers: [
      { id: 1, answerText: "Beginner", score: 1 },
      { id: 2, answerText: "Intermediate", score: 3 },
      { id: 3, answerText: "Advanced", score: 5 }
    ]
  },
  {
    id: 2,
    questionText: "What is your risk tolerance?",
    answers: [
      { id: 1, answerText: "Conservative", score: 1 },
      { id: 2, answerText: "Moderate", score: 3 },
      { id: 3, answerText: "Aggressive", score: 5 }
    ]
  }
];

export const QuestionnaireService = {
  async GetQuestions(
    language: GetQuestionsRequest
  ): Promise<QuestionResponse[]> {
    // Check if we should use mock API
    if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
      console.log("Using mock API for questions");
      return Promise.resolve(mockQuestions);
    }

    try {
      // Initialize API before making request
      await initApi();
      
      console.log("Fetching questions for language:", language.language);
      const languageRequest = language.language != "al" ? "en-US" : "sq-AL";
      const response = await api.get<QuestionResponse[]>(
        `calculator/api/risk-questions?language=${languageRequest}`
      );
      
      return response.data;
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      // Fallback to mock data if real API fails
      console.log("Falling back to mock data");
      return mockQuestions;
    }
  },

  async CalculateRisk(request: RiskCalculationRequest): Promise<string> {
    // Check if we should use mock API
    if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
      console.log("Using mock API for risk calculation");
      // Simple mock calculation based on total score
      const totalScore = request.answers.reduce((sum, answer) => sum + answer.score, 0);
      if (totalScore <= 5) return "Conservative";
      if (totalScore <= 10) return "Moderate";
      return "Aggressive";
    }

    try {
      // Initialize API before making request
      await initApi();
      
      const response = await api.post(`calculator/api/calculate-risk`, request);
      return response.data;
    } catch (error) {
      console.error("Failed to calculate risk:", error);
      // Fallback to mock calculation
      const totalScore = request.answers.reduce((sum, answer) => sum + answer.score, 0);
      if (totalScore <= 5) return "Conservative";
      if (totalScore <= 10) return "Moderate";
      return "Aggressive";
    }
  },

  async SubmitRiskResult(ssn: string, riskResult: string): Promise<void> {
    // Check if we should use mock API
    if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
      console.log("Using mock API for risk result submission");
      return Promise.resolve();
    }

    try {
      // Initialize API before making request
      await initApi();
      
      const riskRequestBody = {
        ssn,
        riskResult,
      };

      await api.post(`utility/api/risk`, riskRequestBody);
    } catch (error) {
      console.error("Failed to submit risk result:", error);
      // For mock fallback, just log the submission
      console.log("Mock: Risk result submitted", { ssn, riskResult });
    }
  }
};