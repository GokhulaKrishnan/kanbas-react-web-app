import axios from "axios";
// import { assignments } from "../../Database";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/Questions`;

// Updating
export const updateQuestions = async (question: any) => {
  console.log(question);
  const response = await axios.put(
    `${QUESTIONS_API}/${question.questionId}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  console.log("Inside deletere");
  const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

export const findQuestionById = async (questionId: string) => {
  console.log("inside client");
  const response = await axios.get(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};
