// Mock API service to replace real API calls during development
export const mockQuestions = [
  {
    id: 1,
    question: "What is your investment experience?",
    answers: [
      { id: 1, answer: "Beginner (0-2 years)" },
      { id: 2, answer: "Intermediate (3-7 years)" },
      { id: 3, answer: "Advanced (8+ years)" }
    ]
  },
  {
    id: 2,
    question: "What is your risk tolerance?",
    answers: [
      { id: 4, answer: "Conservative" },
      { id: 5, answer: "Moderate" },
      { id: 6, answer: "Aggressive" }
    ]
  },
  {
    id: 3,
    question: "What is your investment timeline?",
    answers: [
      { id: 7, answer: "Short-term (1-3 years)" },
      { id: 8, answer: "Medium-term (4-7 years)" },
      { id: 9, answer: "Long-term (8+ years)" }
    ]
  },
  {
    id: 4,
    question: "What percentage of your income do you plan to invest?",
    answers: [
      { id: 10, answer: "Less than 10%" },
      { id: 11, answer: "10-25%" },
      { id: 12, answer: "More than 25%" }
    ]
  }
];

export const calculateMockRisk = (selections: Array<{ questionId: number; answerId: number }>): string => {
  // Simple risk calculation based on answer IDs
  let riskScore = 0;
  
  selections.forEach(selection => {
    // Higher answer IDs generally indicate higher risk tolerance
    if (selection.answerId <= 3) riskScore += 1; // First question
    else if (selection.answerId <= 6) riskScore += (selection.answerId - 3); // Second question
    else if (selection.answerId <= 9) riskScore += (selection.answerId - 6); // Third question
    else riskScore += (selection.answerId - 9); // Fourth question
  });
  
  // Determine risk level based on score
  if (riskScore <= 4) return "Conservative";
  else if (riskScore <= 8) return "Moderate";
  else return "Aggressive";
};

// Mock delay to simulate network request
export const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));