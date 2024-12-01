import React, { useState } from "react";
import { useParams } from "react-router";
import { questions } from "../../Database";
import { useSelector } from "react-redux";

export default function QuizPreview() {
  const { quizId } = useParams(); //
  const ques = useSelector((state: any) => state.questionReducer.questions);
  const quizQuestions = ques.filter((q: any) => q.quizId === quizId); // Filter questions by quizId

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question index

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next question
    }
  };

  const handleSubmit = () => {
    console.log("Quiz Submitted");
  };

  const handleEditQuiz = () => {
    console.log("Editing Quiz");
  };

  // Current question to render
  const currentQuestion = quizQuestions[currentIndex];

  // Function to render different question types
  const renderQuestion = (question: any) => {
    switch (question.qtype) {
      case "multipleChoice":
        return (
          <div>
            {question.answer.map((option: any, index: any) => (
              <div className="form-check" key={index}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name={`question-${question.questionId}`}
                  className="form-check-input"
                  disabled
                />
                <label htmlFor={`option-${index}`} className="form-check-label">
                  {option.answer}
                </label>
              </div>
            ))}
          </div>
        );

      case "fillIn":
        return (
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Type your answer here..."
              disabled
            />
          </div>
        );

      case "true / false":
        return (
          <div>
            <div className="form-check">
              <input
                type="radio"
                id="true"
                name={`question-${question.questionId}`}
                className="form-check-input"
                disabled
              />
              <label htmlFor="true" className="form-check-label">
                True
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="false"
                name={`question-${question.questionId}`}
                className="form-check-input"
                disabled
              />
              <label htmlFor="false" className="form-check-label">
                False
              </label>
            </div>
          </div>
        );

      default:
        return <p>Unsupported question type</p>;
    }
  };

  return (
    <div className="container mt-4">
      {/* Quiz Title */}
      <h2>Quiz Preview</h2>

      {/* Warning Banner */}
      <div className="alert alert-danger" role="alert">
        This is a preview of the published version of the quiz
      </div>

      {/* Quiz Details */}
      <p>
        <strong>Started:</strong> Nov 29 at 8:19am
      </p>

      <h5>
        <strong>Quiz Instructions</strong>
      </h5>

      {/* Render Current Question */}
      <div className="border rounded p-3 mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Question Header */}
          <div>
            <strong>Question {currentIndex + 1}</strong>
          </div>
          <span>{currentQuestion.points} pts</span>
        </div>
        <p>{currentQuestion.question}</p>

        {/* Render Question Based on Type */}
        {renderQuestion(currentQuestion)}

        {/* Next Button */}
        {currentIndex < quizQuestions.length - 1 && (
          <div className="text-end mt-3">
            <button className="btn btn-primary" onClick={handleNext}>
              Next &gt;
            </button>
          </div>
        )}
      </div>

      {/* Quiz Save Info */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <p>Quiz saved at 8:19am</p>
        {currentIndex === quizQuestions.length - 1 && (
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
      </div>

      {/* Edit Quiz Button */}
      <div className="mt-3">
        <button
          className="btn btn-link text-decoration-none"
          onClick={handleEditQuiz}
        >
          📎 Keep Editing This Quiz
        </button>
      </div>

      {/* Question Navigation */}
      <div className="mt-4">
        <h6>Questions</h6>
        <ul className="list-unstyled">
          {quizQuestions.map((question: any, index: any) => (
            <li
              key={question.questionId}
              className={`text-danger ${
                index === currentIndex ? "fw-bold" : ""
              }`}
            >
              <span>❓</span> Question {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
