export type QuestionAnswer = string | number | boolean | null;
export interface Choice {
  id: number;
  text: string;
}

export interface MultipleChoiceQuestionData {
  id: number;
  type: "multiple_choice";
  instruction: string;
  question: string;
  note?: string;
  choices: Choice[];
}

export interface TrueFalseQuestionData {
  id: number;
  type: "true_false";
  instruction: string;
  question: string;
  note?: string;
}

export interface TextInputQuestionData {
  id: number;
  type: "text_input";
  question: string;
  hint?: string;
  audio?: string | null;
  placeholder?: string;
}