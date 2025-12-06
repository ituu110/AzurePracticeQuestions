export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswers: number[]; // Indices of the correct options
  explanation?: string;
}

export interface QuizData {
  title: string;
  timeLimitMinutes?: number; // Optional, can default if missing
  questions: Question[];
}
