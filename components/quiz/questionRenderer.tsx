"use client";

import MultipleChoiceQuestion from "./qcm";
import TextInputQuestion from "./textinput";
import TrueFalseQuestion from "./trueFalse";

import {
  MultipleChoiceQuestionData,
  TextInputQuestionData,
  TrueFalseQuestionData,
  QuestionAnswer,
} from "./types";

type Question =
  | MultipleChoiceQuestionData
  | TextInputQuestionData
  | TrueFalseQuestionData;

interface Props {
  question: Question;
  answer: QuestionAnswer;
  onAnswer: (value: QuestionAnswer) => void;
}

export default function QuestionRenderer({
  question,
  answer,
  onAnswer,
}: Props) {
  switch (question.type) {
    case "multiple_choice":
      return (
        <MultipleChoiceQuestion
          question={question}
          answer={answer as number | null}
          onAnswer={onAnswer}
        />
      );

    case "text_input":
      return (
        <TextInputQuestion
          question={question}
          answer={(answer as string | null) ?? ""}
          onAnswer={onAnswer}
        />
      );

    case "true_false":
      return (
        <TrueFalseQuestion
          question={question}
          answer={answer as boolean | null}
          onAnswer={onAnswer}
        />
      );

    default:
      return (
        <div className="rounded-xl border border-red-300 bg-red-50 p-6">
          Type de question inconnu.
        </div>
      );
  }
}
