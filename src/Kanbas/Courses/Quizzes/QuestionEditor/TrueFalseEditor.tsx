import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateQuestion, addQuestion } from "./reducerQuestion"; // Import Redux actions

export default function TrueFalseEditor() {
  const { quesId } = useParams();
  const { quizId } = useParams();

  const dispatch = useDispatch();

  // Fetch the question from the Redux store
  const questions = useSelector(
    (state: any) => state.questionReducer.questions
  );
  const quesDetails = questions.find((q: any) => q.questionId === quesId);

  // Set initial states based on the question data
  const [question, setQuestion] = useState(quesDetails?.question || "");
  const [title, setTitle] = useState(quesDetails?.title || "");
  const [points, setPoints] = useState(quesDetails?.points || 3);
  const [selectedAnswer, setSelectedAnswer] = useState(
    quesDetails?.answer[0]?.isAnswer ? "True" : "False"
  );

  // Handle answer selection
  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  // Update or Add Question in Redux
  const handleUpdateQuestion = () => {
    const updatedQuestion = {
      questionId:
        quesId === "QuestionEditor"
          ? new Date().getTime().toString() // Generate a new ID if it's "QuestionEditor"
          : quesId, // Use the existing quesId otherwise
      title,
      question,
      points,
      quizId: quizId, // Ensure quizId context
      qtype: "true / false",
      answer: [
        { answer: "True", isAnswer: selectedAnswer === "True" },
        { answer: "False", isAnswer: selectedAnswer === "False" },
      ],
    };
    console.log(updatedQuestion);
    if (quesId === "QuestionEditor") {
      // Add a new question
      dispatch(addQuestion(updatedQuestion));
      console.log("New Question Added:", updatedQuestion);
    } else {
      // Add new question
      dispatch(updateQuestion(updatedQuestion));
      console.log("Updated Question:", updatedQuestion);
    }
  };

  // Save or Update the question in Redux
  // const handleUpdateQuestion = () => {
  //   const updatedQuestion = {
  //     questionId:
  //       quesId === "QuestionEditor"
  //         ? new Date().getTime().toString() // Generate a new ID if it's "QuestionEditor"
  //         : quesId, // Use the existing quesId otherwise // Generate a new ID if this is a new question
  //     title,
  //     question,
  //     points,
  //     quizId: quizId, // Ensure quizId context
  //     qtype: "fillIn",
  //     answer: answers.map(({ text }) => ({ answer: text, isAnswer: true })), // Save all answers as valid
  //   };

  //   if (quesId === "QuestionEditor") {
  //     // Add a new question
  //     dispatch(addQuestion(updatedQuestion));
  //     console.log("New Question Added:", updatedQuestion);
  //   } else {
  //     // Update existing question
  //     dispatch(updateQuestion(updatedQuestion));
  //     console.log("Question Updated:", updatedQuestion);
  //   }
  // };
  const handleCancel = () => {
    console.log("Edit Cancelled");
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control me-2"
          style={{ width: "60%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        />
        <div>
          <label className="me-2 fw-bold">pts:</label>
          <input
            type="number"
            className="form-control d-inline-block"
            style={{ width: "80px" }}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Question Instructions */}
      <p>
        Enter your question text, then select if True or False is the correct
        answer.
      </p>

      {/* Question Section */}
      <div className="mb-4">
        <label className="form-label fw-bold">Question:</label>
        <textarea
          className="form-control"
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question here..."
        ></textarea>
      </div>

      {/* Answers Section */}
      <div className="mb-4">
        <label className="form-label fw-bold">Answers:</label>
        <div className="d-flex flex-column">
          {/* True Option */}
          <div
            className={`d-flex align-items-center p-2 mb-2 ${
              selectedAnswer === "True" ? "border border-success rounded" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleAnswerSelection("True")}
          >
            <div
              className={`me-2 ${
                selectedAnswer === "True" ? "text-success" : "text-muted"
              }`}
            >
              {selectedAnswer === "True" ? "✓" : "→"}
            </div>
            <span
              className={`fw-bold ${
                selectedAnswer === "True" ? "text-success" : ""
              }`}
            >
              True
            </span>
          </div>

          {/* False Option */}
          <div
            className={`d-flex align-items-center p-2 ${
              selectedAnswer === "False" ? "border border-success rounded" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleAnswerSelection("False")}
          >
            <div
              className={`me-2 ${
                selectedAnswer === "False" ? "text-success" : "text-muted"
              }`}
            >
              {selectedAnswer === "False" ? "✓" : "→"}
            </div>
            <span
              className={`fw-bold ${
                selectedAnswer === "False" ? "text-success" : ""
              }`}
            >
              False
            </span>
          </div>
        </div>
      </div>

      {/* Cancel and Update Buttons */}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-secondary me-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleUpdateQuestion}>
          Save Question
        </button>
      </div>
    </div>
  );
}
