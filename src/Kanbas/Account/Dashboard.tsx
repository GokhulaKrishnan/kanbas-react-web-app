import { Link, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as db from "../Database";
import { useDispatch } from "react-redux";
import { enrollCourse, unenrollCourse } from "./enrollmentReducer";

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
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(
    useSelector((state: any) => state.enrollmentReducer.enrollments)
  );
  const [showEnrolledCourses, setShowEnrolledCourses] = useState(true);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // Update local storage whenever enrollments change
  //   localStorage.setItem("enrollments", JSON.stringify(enrollments));
  // }, [enrollments]);

  // Function to enroll the user in a course
  const handleEnroll = (courseId: string) => {
    const newEnrollment: Enrollment = {
      _id: new Date().getTime().toString(),
      user: currentUser._id,
      course: courseId,
    };

    const updatedEnrollments = [...enrollments, newEnrollment];

    setEnrollments(updatedEnrollments);
    dispatch(enrollCourse({ courseId, userId: currentUser._id }));
  };

  // Function to unenroll the user from a course
  const handleUnenroll = (courseId: string) => {
    // Filter out the enrollment for the courseId
    const updatedEnrollments = enrollments.filter(
      (enrollment) =>
        !(enrollment.user === currentUser._id && enrollment.course === courseId)
    );
    setEnrollments(updatedEnrollments);
    dispatch(unenrollCourse({ courseId, userId: currentUser._id }));
  };

  // Function to check if the user is enrolled in a course
  const isUserEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  // New function to handle adding a course and automatically enrolling the user
  const handleAddNewCourse = () => {
    addNewCourse();
    handleEnroll(course._id);
  };

  console.log(enrollments);
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {/* To display enrollments only to the Students */}
      {currentUser.role === "STUDENT" && (
        <button
          className="btn btn-primary float-end mb-3"
          id="wd-enrollments-click"
          onClick={() => {
            setShowEnrolledCourses(!showEnrolledCourses);
          }}
        >
          Enrollments
        </button>
      )}
      // To display Adding new course only to the Faculty
      {currentUser.role === "FACULTY" && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddNewCourse}
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
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
            .filter((course) => {
              if (currentUser.role === "STUDENT") {
                return showEnrolledCourses ? isUserEnrolled(course._id) : true;
              }
              return true;
            })
            .map((course: any) => (
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
                        src={`/pic/${course._id}.jpg`}
                        alt={course.name}
                        width="100%"
                        height={160}
                      />
                    ) : (
                      <img src="/pic/reactjs.png" alt="Default" />
                    )}
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      <button className="btn btn-primary">Go</button>
                      {currentUser.role === "STUDENT" &&
                        (isUserEnrolled(course._id) ? (
                          <button
                            className="btn btn-danger float-end me-2"
                            onClick={(event) => {
                              event.preventDefault();
                              handleUnenroll(course._id);
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success float-end me-2"
                            onClick={(event) => {
                              event.preventDefault();
                              handleEnroll(course._id);
                            }}
                          >
                            Enroll
                          </button>
                        ))}

                      {currentUser.role === "FACULTY" && (
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
