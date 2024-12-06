import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  enrollCourse,
  unenrollCourse,
  setEnrollments,
} from "./enrollmentReducer";
import * as enrollmentsClient from "./enrollmentClient";
import * as userClient from "./client";
import * as courseClient from "../Courses/client";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // const [enrollments, setEnrollmentsState] = useState<Enrollment[]>([]);
  // const [allCourses, setAllCourses] = useState<any[]>([]);
  // // const [showEnrolledCourses, setShowEnrolledCourses] = useState(true);

  // const dispatch = useDispatch();

  // Fetch user enrollments
  // const userEnrollments = async (userId: string) => {
  //   try {
  //     const response = await enrollmentsClient.fetchEnrollments(userId);
  //     setEnrollmentsState(response);
  //     dispatch(setEnrollments(response));
  //   } catch (error) {
  //     console.error("Error fetching user enrollments:", error);
  //   }
  // };

  // Fetch all available courses
  // const fetchAllCourses = async () => {
  //   try {
  //     const response = await enrollmentsClient.fetchCourses();
  //     setAllCourses(response);
  //   } catch (error) {
  //     console.error("Error fetching courses:", error);
  //   }
  // };

  // useEffect(() => {
  //   // userEnrollments(currentUser._id);
  //   fetchAllCourses();
  // }, [currentUser._id]);

  // const handleEnroll = async (courseId: string) => {
  //   try {
  //     const newEnrolled = {
  //       user: currentUser._id,
  //       course: courseId,
  //     };

  //     const response = await enrollmentsClient.enrollInCourse(newEnrolled);
  //     console.log(response.data);
  //     setEnrollmentsState((prev) => [...prev, response.data]);
  //     dispatch(enrollCourse(response.data));
  //   } catch (error) {
  //     console.error("Error enrolling in course:", error);
  //   }
  // };

  // const handleUnenroll = async (courseId: string) => {
  //   try {
  //     await enrollmentsClient.unenrollFromCourse({
  //       user: currentUser._id,
  //       course: courseId,
  //     });

  //     const updatedEnrollments = enrollments.filter(
  //       (enrollment) => enrollment.course !== courseId
  //     );
  //     setEnrollmentsState(updatedEnrollments);
  //     dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
  //   } catch (error) {
  //     console.error("Error unenrolling from course:", error);
  //   }
  // };

  // const isUserEnrolled = (courseId: string) => {
  //   return enrollments.some(
  //     (enrollment) =>
  //       enrollment.user === currentUser._id && enrollment.course === courseId
  //   );
  // // };

  // const addNewCourses = async () => {
  //   // console.log(course);
  //   const newCourse = await courseClient.createCourse(course);
  //   setAllCourses([...allCourses, newCourse]);
  //   // handleEnroll(course._id);
  //   console.log(newCourse);
  //   console.log(courses);
  // };

  // const displayedCourses =
  //   currentUser.role === "FACULTY"
  //     ? allCourses // Show all courses for faculty
  //     : showEnrolledCourses
  //     ? allCourses.filter((course) =>
  //         enrollments.some((enrollment) => enrollment.course === course._id)
  //       )
  //     : allCourses.filter(
  //         (course) =>
  //           !enrollments.some((enrollment) => enrollment.course === course._id)
  //       );
  // New function to handle adding a course and automatically enrolling the user
  // const handleAddNewCourse = () => {
  //   console.log("Inside hndlecourse");
  //   const newCourse = addNewCourses();
  //   console.log(newCourse);

  //   setCourse({ ...course, newCourse });
  // };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {/* {currentUser.role === "STUDENT" && ( */}
      <button
        onClick={() => setEnrolling(!enrolling)}
        className="float-end btn btn-primary me-3"
      >
        {enrolling ? "My Courses" : "All Courses"}
      </button>
      {/* // )} */}
      {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => addNewCourse()}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
            <input
              value={course.name}
              className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <textarea
              value={course.description}
              className="form-control"
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
            />
          </h5>
        </div>
      )}
      <h2 id="wd-dashboard-published">
        {enrolling ? "Enrolled Courses" : "All Courses"}
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course: any) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  {course.img ? (
                    <img
                      src={`/pic/RS101.jpg`}
                      alt={course.name}
                      width="100%"
                      height={160}
                    />
                  ) : (
                    <img src="/pic/reactjs.png" alt="Default" />
                  )}
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {(currentUser.role === "FACULTY" ||
                        currentUser.role === "ADMIN") &&
                        enrolling && (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              updateEnrollment(course._id, !course.enrolled);
                            }}
                            className={`btn ${
                              course.enrolled ? "btn-danger" : "btn-success"
                            } float-end`}
                          >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}

                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <button className="btn btn-primary">Go</button>
                    {currentUser.role === "STUDENT" && enrolling && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          updateEnrollment(course._id, !course.enrolled);
                        }}
                        className={`btn ${
                          course.enrolled ? "btn-danger" : "btn-success"
                        } float-end`}
                      >
                        {course.enrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}

                    {(currentUser.role === "FACULTY" ||
                      currentUser.role === "ADMIN") && (
                      <>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
