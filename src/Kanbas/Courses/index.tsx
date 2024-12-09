import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
// import { courses } from "../Database";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import PeopleTable from "./People/PeopleTable";
import Assignments from "./Assignments";

import { FaAlignJustify } from "react-icons/fa";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import ProtectedRouteDashboard from "../Account/ProtectedRouteDashboard";
import Quiz from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuestionEditor from "./Quizzes/QuestionEditor/QuestionEditor";
import QuizPreview from "./Quizzes/QuizPreview";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course: any) => course._id === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route
              path="Home"
              element={
                <ProtectedRouteDashboard>
                  <Home />
                </ProtectedRouteDashboard>
              }
            />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes/:quizId" element={<QuizDetails />} />
            <Route path="Quizzes/:quizId/Edit" element={<QuizEditor />} />
            <Route path="Quizzes/Edit" element={<QuizEditor />} />

            <Route
              path="Quizzes/:quizId/Edit/Questions/:quesId"
              element={<QuestionEditor />}
            />
            <Route
              path="Quizzes/:quizId/:attemptId"
              element={<QuizPreview />}
            />
            <Route path="Quizzes/:quizId/Preview" element={<QuizPreview />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="Quizzes" element={<Quiz />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
