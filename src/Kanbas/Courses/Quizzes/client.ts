import axios from "axios";
// import { assignments } from "../../Database";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/Quizzes`;

// Updating
export const updateQuiz = async (quiz: any) => {
  console.log(quiz);
  const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
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
