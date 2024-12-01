import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuBan } from "react-icons/lu";
import QuizDetail from "./QuizDetail";
import QuizQuestions from "./QuizQuestions";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export default function QuizEditor() {
  const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
  const { quizId } = useParams();
  const existingQuiz = quizzes.find((q: any) => q._id === quizId);

  const [activeTab, setActiveTab] = useState("Details"); // To manage the active tab

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Quiz Editor</h3>

      {/* THE TOP RIGHT */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        {/* Points Section */}
        <div className="me-3">
          <strong>Points</strong>: <span>{existingQuiz?.points || 0}</span>
        </div>

        {/* Not Published Section */}
        <div className="me-3">
          <LuBan className="me-2 text-muted" />
          <span className="text-muted">
            {existingQuiz?.published ? "Published" : "Not Published"}
          </span>
        </div>

        {/* Vertical Dotted Button */}
        <button className="border p-1 pt-2 pb-2 pe-2 ps-2 rounded bg-light ">
          <BsThreeDotsVertical />
        </button>
      </div>

      <hr />

      {/* Tabs Navigation */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "Details" ? "active" : ""}`}
            onClick={() => setActiveTab("Details")}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "Questions" ? "active" : ""}`}
            onClick={() => setActiveTab("Questions")}
          >
            Questions
          </a>
        </li>
      </ul>

      {/* Conditional Rendering of Tabs Content */}
      <div className="mt-3">
        {activeTab === "Details" && <QuizDetail quizDetails={existingQuiz} />}
        {activeTab === "Questions" && <QuizQuestions />}
      </div>
    </div>
  );
}
