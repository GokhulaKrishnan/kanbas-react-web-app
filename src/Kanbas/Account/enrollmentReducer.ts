import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { enrollments } from "../Database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentState = {
  enrollments: [],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enrollCourse: (state, { payload: enrollment }) => {
      // Add the enrollment object directly to the enrollments array
      const newEnroll: any = {
        _id: new Date().getTime().toString(),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnroll] as any;
    },
    unenrollCourse: (
      state,
      { payload }: PayloadAction<{ courseId: string; userId: string }>
    ) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(
            enrollment.user === payload.userId &&
            enrollment.course === payload.courseId
          )
      );
    },
    updateEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    // setEnrollments: (state, { payload }: PayloadAction<Enrollment[]>) => {
    //   state.enrollments = payload;
    // },
  },
});

export const {
  enrollCourse,
  unenrollCourse,
  setEnrollments,
  updateEnrollments,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
