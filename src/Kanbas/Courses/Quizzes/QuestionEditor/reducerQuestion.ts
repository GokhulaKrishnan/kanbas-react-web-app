import { createSlice } from "@reduxjs/toolkit";
import { questions as questionDB } from "../../../Database";

interface Answer {
  answer: string;
  isAnswer: boolean;
}

interface Question {
  questionId: string;
  title: string;
  quizId: string;
  qtype: string;
  question: string;
  points: number;
  answer: Answer[];
}

const initialState: { questions: Question[] } = {
  questions: questionDB,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState: initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload: question }) => {
      const newQuestion: Question = {
        questionId: new Date().getTime().toString(),
        ...question,
      };
      state.questions = [...state.questions, newQuestion];
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q: Question) => q.questionId !== questionId
      );
    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: Question) =>
        q.questionId === question.questionId ? question : q
      );
    },
  },
});

export const { setQuestions, addQuestion, deleteQuestion, updateQuestion } =
  questionsSlice.actions;
export default questionsSlice.reducer;
