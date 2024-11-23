// import { Link, Navigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import {
//   enrollCourse,
//   unenrollCourse,
//   setEnrollments,
//   updateEnrollments,
// } from "./enrollmentReducer";
// import * as enrollmentsClient from "./enrollmentClient";

// interface Enrollment {
//   _id: string;
//   user: string;
//   course: string;
// }

// export default function Dashboard({
//   courses,
//   course,
//   setCourse,
//   addNewCourse,
//   deleteCourse,
//   updateCourse,
// }: {
//   courses: any[];
//   course: any;
//   setCourse: (course: any) => void;
//   addNewCourse: () => void;
//   deleteCourse: (course: any) => void;
//   updateCourse: () => void;
// }) {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   // const { enrolls } = useSelector((state: any) => state.enrollmentReducer);

//   const [enrollments, setEnrollmentsState] = useState<Enrollment[]>([]);
//   const [allCourses, setAllCourses] = useState<any[]>([]);
//   const [showEnrolledCourses, setShowEnrolledCourses] = useState(true);
//   const dispatch = useDispatch();

//   // We need to update the enrollment db when user clicks enroll becasue, the courses are displayed by checking whether the user is enrolled in a course or not.

//   // We'll get the enrollmets from the server which matches with the current user id
//   const userEnrollments = async (currentUser: any) => {
//     const uEnrolls = await enrollmentsClient.fetchEnrollments(currentUser);
//     console.log(uEnrolls);
//     setEnrollmentsState(uEnrolls);
//     dispatch(setEnrollments(uEnrolls));
//   };

//   // Now we git the user enrollments now we want to display the courses which are in the array.x

//   // Now we are going to get all the courses
//   const allUserCourses = async () => {
//     const courses = await enrollmentsClient.fetchCourses();
//     setAllCourses(courses);
//   };

//   // We are going to get the courses which are only enrolled by the user

//   useEffect(() => {
//     userEnrollments(currentUser._id);
//     allUserCourses();
//   }, []);

//   console.log(showEnrolledCourses);
//   console.log(enrollments); // Gives all the enrollments of all users.
//   console.log(currentUser._id); // Gives the current user.
//   console.log(allCourses); // We have the registered courses.
//   console.log(courses);
//   // console.log(enrolls);

//   console.log(course);
//   // Function to enroll the user in a course
//   const handleEnroll = async (courseId: string) => {
//     const newEnrolled = {
//       _id: new Date().getTime().toString(),
//       user: currentUser._id,
//       course: courseId,
//     };

//     const addEnroll = await enrollmentsClient.enrollInCourse(newEnrolled);
//     setEnrollmentsState(addEnroll.data);

//     dispatch(enrollCourse(addEnroll.data));
//     // dispatch(enrollCourse({ userId: currentUser._id, courseId: courseId }));
//     // await enrollmentsClient.enrollInCourse(courseId);
//   };

//   // if (!cid) return;

//   //     const assignment = await coursesClient.createAssignmentForCourse(
//   //       cid,
//   //       newAssignment
//   //     );
//   //     dispatch(addAssignment(assignment));
//   //   }
//   // Function to unenroll the user from a course
//   // const handleUnenroll = async (courseId: string) => {
//   //   // Call the server API to unenroll the user from the course
//   //   await enrollmentsClient.unenrollFromCourse({
//   //     user: currentUser._id,
//   //     course: courseId,
//   //   });

//   //   // Fetch updated enrollments from the server
//   //   const updatedEnrollments = await enrollmentsClient.fetchEnrollments();

//   //   // Update the local state and Redux store
//   //   setEnrollmentsState(updatedEnrollments);
//   //   dispatch(setEnrollments(updatedEnrollments));
//   // };

//   // Function to check if the user is enrolled in a course
//   // const isUserEnrolled = (courseId: string) => {
//   //   // return enrollments.some(
//   //   //   (enrollment) =>
//   //   //     enrollment.user === currentUser._id && enrollment.course === courseId
//   //   // );
//   // };

//   // New function to handle adding a course and automatically enrolling the user
//   const handleAddNewCourse = () => {
//     addNewCourse();
//     handleEnroll(course._id);
//   };

//   // console.log(enrollments);
//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1>
//       <hr />
//       {currentUser.role === "STUDENT" && (
//         <button
//           className="btn btn-primary float-end mb-3"
//           id="wd-enrollments-click"
//           onClick={() => {
//             setShowEnrolledCourses(!showEnrolledCourses);
//           }}
//         >
//           Enrollments
//         </button>
//       )}
//       {currentUser.role === "FACULTY" && (
//         <div>
//           <h5>
//             New Course
//             <button
//               className="btn btn-primary float-end"
//               id="wd-add-new-course-click"
//               onClick={handleAddNewCourse}
//             >
//               Add
//             </button>
//             <button
//               className="btn btn-warning float-end me-2"
//               onClick={updateCourse}
//               id="wd-update-course-click"
//             >
//               Update
//             </button>
//             <input
//               value={course.name}
//               className="form-control mb-2"
//               onChange={(e) => setCourse({ ...course, name: e.target.value })}
//             />
//             <textarea
//               value={course.description}
//               className="form-control"
//               onChange={(e) =>
//                 setCourse({ ...course, description: e.target.value })
//               }
//             />
//           </h5>
//         </div>
//       )}
//       <h2 id="wd-dashboard-published">
//         {/* Have to change accordingly */}
//         Published Courses ({allCourses.length})
//       </h2>
//       <hr />
//       <div id="wd-dashboard-courses" className="row">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {/* {allCourses
//             .filter((course) => {
//               if (currentUser.role === "STUDENT") {
//                 return showEnrolledCourses ? isUserEnrolled(course._id) : true;
//               }
//               return true;
//             }) */}
//           {allCourses
//             // showEnrolledCourses
//             // ? allCourses.filter((course) =>
//             //     // enrollments.some(
//             //     //   (enrollment) => enrollment.course === course._id
//             //     // )
//             //   )
//             // :
//             .map((course: any) => (
//               <div
//                 key={course._id}
//                 className="wd-dashboard-course col"
//                 style={{ width: "300px" }}
//               >
//                 <div className="card rounded-3 overflow-hidden">
//                   <Link
//                     to={`/Kanbas/Courses/${course._id}/Home`}
//                     className="wd-dashboard-course-link text-decoration-none text-dark"
//                   >
//                     {course.img ? (
//                       <img
//                         src={`/pic/${course._id}.jpg`}
//                         alt={course.name}
//                         width="100%"
//                         height={160}
//                       />
//                     ) : (
//                       <img src="/pic/reactjs.png" alt="Default" />
//                     )}
//                     <div className="card-body">
//                       <h5 className="wd-dashboard-course-title card-title">
//                         {course.name}
//                       </h5>
//                       <p
//                         className="wd-dashboard-course-title card-text overflow-y-hidden"
//                         style={{ maxHeight: 100 }}
//                       >
//                         {course.description}
//                       </p>
//                       <button className="btn btn-primary">Go</button>
//                       {currentUser.role === "STUDENT" &&
//                         // isUserEnrolled(course._id)
//                         (true ? (
//                           <button
//                             className="btn btn-danger float-end me-2"
//                             onClick={(event) => {
//                               event.preventDefault();
//                               // handleUnenroll(course._id);
//                             }}
//                           >
//                             Unenroll
//                           </button>
//                         ) : (
//                           <button
//                             className="btn btn-success float-end me-2"
//                             onClick={(event) => {
//                               event.preventDefault();
//                               handleEnroll(course._id);
//                             }}
//                           >
//                             Enroll
//                           </button>
//                         ))}

//                       {currentUser.role === "FACULTY" && (
//                         <>
//                           <button
//                             id="wd-edit-course-click"
//                             onClick={(event) => {
//                               event.preventDefault();
//                               setCourse(course);
//                             }}
//                             className="btn btn-warning me-2 float-end"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={(event) => {
//                               event.preventDefault();
//                               deleteCourse(course._id);
//                             }}
//                             className="btn btn-danger float-end"
//                             id="wd-delete-course-click"
//                           >
//                             Delete
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

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

  const [enrollments, setEnrollmentsState] = useState<Enrollment[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [showEnrolledCourses, setShowEnrolledCourses] = useState(true);

  const dispatch = useDispatch();

  // Fetch user enrollments
  const userEnrollments = async (userId: string) => {
    try {
      const response = await enrollmentsClient.fetchEnrollments(userId);
      setEnrollmentsState(response);
      dispatch(setEnrollments(response));
    } catch (error) {
      console.error("Error fetching user enrollments:", error);
    }
  };

  // Fetch all available courses
  const fetchAllCourses = async () => {
    try {
      const response = await enrollmentsClient.fetchCourses();
      setAllCourses(response);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    userEnrollments(currentUser._id);
    fetchAllCourses();
  }, [currentUser._id]);

  const handleEnroll = async (courseId: string) => {
    try {
      const newEnrolled = {
        user: currentUser._id,
        course: courseId,
      };

      const response = await enrollmentsClient.enrollInCourse(newEnrolled);
      console.log(response.data);
      setEnrollmentsState((prev) => [...prev, response.data]);
      dispatch(enrollCourse(response.data));
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await enrollmentsClient.unenrollFromCourse({
        user: currentUser._id,
        course: courseId,
      });

      const updatedEnrollments = enrollments.filter(
        (enrollment) => enrollment.course !== courseId
      );
      setEnrollmentsState(updatedEnrollments);
      dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  const isUserEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  const displayedCourses = showEnrolledCourses
    ? allCourses.filter((course) =>
        enrollments.some((enrollment) => enrollment.course === course._id)
      )
    : allCourses.filter(
        (course) =>
          !enrollments.some((enrollment) => enrollment.course === course._id)
      );

  // New function to handle adding a course and automatically enrolling the user
  const handleAddNewCourse = () => {
    console.log("Inside hndlecourse");
    const newCourse = addNewCourse();
    console.log(newCourse);
    handleEnroll(course._id);
    setCourse({ ...course, newCourse });
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {currentUser.role === "STUDENT" && (
        <button
          className="btn btn-primary float-end mb-3"
          id="wd-enrollments-click"
          onClick={() => setShowEnrolledCourses(!showEnrolledCourses)}
        >
          Enrollments
        </button>
      )}
      {currentUser.role === "FACULTY" && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => handleAddNewCourse()}
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
        {showEnrolledCourses ? "Enrolled Courses" : "All Courses"} (
        {displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {(currentUser.role === "FACULTY" ? courses : displayedCourses).map(
            (course: any) => (
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
            )
          )}
        </div>
      </div>
    </div>
  );
}
