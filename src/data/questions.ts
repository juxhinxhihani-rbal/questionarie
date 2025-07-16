export interface Answer {
  id: number;
  text: string;
  weight: number;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export const initialQuestions: Question[] = [
  {
    id: 1,
    text: "What is your risk tolerance?",
    answers: [
      { id: 1, text: "Low", weight: 1 },
      { id: 2, text: "Medium", weight: 2 },
      { id: 3, text: "High", weight: 3 },
    ],
  },
  {
    id: 2,
    text: "Investment horizon?",
    answers: [
      { id: 1, text: "Short", weight: 1 },
      { id: 2, text: "Medium", weight: 2 },
      { id: 3, text: "Long", weight: 3 },
    ],
  },
];
