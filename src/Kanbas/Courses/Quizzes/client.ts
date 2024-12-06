import axios from "axios";
// import { assignments } from "../../Database";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/Quizzes`;

// Updating
export const updateQuizz = async (quiz: any) => {
  console.log(quiz);
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  console.log("Inside deletere");
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const findQuizzById = async (quizId: string) => {
  console.log("inside client");
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

// Getting quizzes for the course
export const findQuestionsForQuiz = async (quizId: string) => {
  console.log("Inside question client", quizId);
  const response = await axios.get(`${QUIZZES_API}/${quizId}/Questions`);
  console.log(response.data);
  return response.data;
};

// Creating new quizzes for the course
export const createQuestionsForQuiz = async (question: any) => {
  const response = await axios.post(`${QUIZZES_API}/Questions`, question);
  return response.data;
};
