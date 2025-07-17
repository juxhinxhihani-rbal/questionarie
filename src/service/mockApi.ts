import { QuestionResponse, RiskCalculationRequest, GetQuestionsRequest } from "../types";

// Mock questions data
const mockQuestionsEN: QuestionResponse[] = [
  {
    id: 1,
    question: "What is your investment experience?",
    order: 1,
    answers: [
      { id: 1, answer: "Beginner (0-2 years)" },
      { id: 2, answer: "Intermediate (3-5 years)" },
      { id: 3, answer: "Advanced (5+ years)" }
    ]
  },
  {
    id: 2,
    question: "What is your risk tolerance?",
    order: 2,
    answers: [
      { id: 4, answer: "Conservative" },
      { id: 5, answer: "Moderate" },
      { id: 6, answer: "Aggressive" }
    ]
  },
  {
    id: 3,
    question: "What is your investment timeline?",
    order: 3,
    answers: [
      { id: 7, answer: "Short-term (1-3 years)" },
      { id: 8, answer: "Medium-term (3-7 years)" },
      { id: 9, answer: "Long-term (7+ years)" }
    ]
  },
  {
    id: 4,
    question: "What percentage of your income do you plan to invest?",
    order: 4,
    answers: [
      { id: 10, answer: "Less than 10%" },
      { id: 11, answer: "10-20%" },
      { id: 12, answer: "More than 20%" }
    ]
  }
];

const mockQuestionsAL: QuestionResponse[] = [
  {
    id: 1,
    question: "Cila është përvoja juaj në investime?",
    order: 1,
    answers: [
      { id: 1, answer: "Fillestar (0-2 vjet)" },
      { id: 2, answer: "Mesatar (3-5 vjet)" },
      { id: 3, answer: "I avancuar (5+ vjet)" }
    ]
  },
  {
    id: 2,
    question: "Cila është toleranca juaj ndaj rrezikut?",
    order: 2,
    answers: [
      { id: 4, answer: "Konservator" },
      { id: 5, answer: "Mesatar" },
      { id: 6, answer: "Agresiv" }
    ]
  },
  {
    id: 3,
    question: "Cili është afati kohor i investimit tuaj?",
    order: 3,
    answers: [
      { id: 7, answer: "Afatshkurtër (1-3 vjet)" },
      { id: 8, answer: "Afatmesëm (3-7 vjet)" },
      { id: 9, answer: "Afatgjatë (7+ vjet)" }
    ]
  },
  {
    id: 4,
    question: "Çfarë përqindje të të ardhurave tuaja planifikoni të investoni?",
    order: 4,
    answers: [
      { id: 10, answer: "Më pak se 10%" },
      { id: 11, answer: "10-20%" },
      { id: 12, answer: "Më shumë se 20%" }
    ]
  }
];

// Mock API implementation
export const mockApi = {
  async getQuestions(request: GetQuestionsRequest): Promise<QuestionResponse[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const isAlbanian = request.language === "sq-AL";
    return isAlbanian ? mockQuestionsAL : mockQuestionsEN;
  },

  async calculateRisk(request: RiskCalculationRequest): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple risk calculation based on answers
    let riskScore = 0;
    
    request.selections.forEach(selection => {
      // Conservative answers (ids 1, 4, 7, 10) = low risk
      // Moderate answers (ids 2, 5, 8, 11) = medium risk  
      // Aggressive answers (ids 3, 6, 9, 12) = high risk
      if ([1, 4, 7, 10].includes(selection.answerId)) {
        riskScore += 1;
      } else if ([2, 5, 8, 11].includes(selection.answerId)) {
        riskScore += 2;
      } else if ([3, 6, 9, 12].includes(selection.answerId)) {
        riskScore += 3;
      }
    });
    
    // Calculate risk level based on total score
    if (riskScore <= 6) {
      return "Conservative";
    } else if (riskScore <= 9) {
      return "Moderate";
    } else {
      return "Aggressive";
    }
  },

  async submitRiskResult(ssn: string, riskResult: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log(`Mock API: Submitted risk result for SSN ${ssn}: ${riskResult}`);
    
    // Simulate occasional API failure for testing
    if (Math.random() < 0.1) {
      throw new Error("Mock API: Simulated submission failure");
    }
  }
};