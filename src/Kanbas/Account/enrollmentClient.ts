import axios from "axios";
// import { assignments } from "../../Database";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/Dashboard`;

// Fetch all courses
// export const fetchAllCourses = async () => {
//   const { data } = await axios.get(ENROLLMENTS_API);
//   return data;
// };
////////////////////////

// Fetch all enrollments
export const fetchEnrollments = async (currentUser: any) => {
  const { data } = await axios.get(
    `${ENROLLMENTS_API}/enrollments/${currentUser}`
  );
  return data;
};

export const fetchCourses = async () => {
  const { data } = await axios.get(`${ENROLLMENTS_API}/courses`);
  return data;
};

export const enrollInCourse = async (newEnroll: any) => {
  console.log("client", newEnroll);
  return await axios.post(
    `${ENROLLMENTS_API}/enrollments/newEnroll`,
    newEnroll
  );
};
// export async function enrollInCourse(payload: { newEnroll: any }) {
//   return await axios.post("/api/enrollments", payload);
// }

export const unenrollFromCourse = async (info: any) => {
  // console.log("client", newEnroll);
  return await axios.delete(`${ENROLLMENTS_API}/enrollments/unenroll`, info);
};

// export async function unenrollFromCourse(payload: {
//   user: string;
//   course: string;
// }) {
//
// }

/////////////////////////////
// Find enrolled course

// Enroll in a course
// export const enrollInCourse = async (enrollment: {
//   user: string;
//   course: string;
// }) => {
//   const { data } = await axios.post(ENROLLMENTS_API, enrollment);
//   return data;
// };

// // Unenroll from a course
// export const unenrollFromCourse = async (enrollment: {
//   user: string;
//   course: string;
// }) => {
//   await axios.delete(ENROLLMENTS_API, { data: enrollment });
// };
