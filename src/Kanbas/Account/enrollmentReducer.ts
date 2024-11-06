import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState = {
  enrollments: enrollments,
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (
      state,
      { payload }: PayloadAction<{ courseId: string; userId: string }>
    ) => {
      const newEnrollment: Enrollment = {
        _id: `${payload.userId}-${payload.courseId}`,
        user: payload.userId,
        course: payload.courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
    unenrollCourse: (
      state,
      { payload }: PayloadAction<{ courseId: string; userId: string }>
    ) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(
            enrollment.user === payload.userId &&
            enrollment.course === payload.courseId
          )
      );
    },
    setEnrollments: (state, { payload }: PayloadAction<Enrollment[]>) => {
      state.enrollments = payload;
    },
  },
});

export const { enrollCourse, unenrollCourse, setEnrollments } =
  enrollmentSlice.actions;

export default enrollmentSlice.reducer;
