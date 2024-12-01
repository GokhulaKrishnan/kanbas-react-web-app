import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateQuestion, addQuestion } from "./reducerQuestion"; // Import Redux actions

interface Answer {
  id: number;
  text: string;
}

export default function FillInTheBlankEditor() {
  const { quesId } = useParams();
  const { quizId } = useParams();

  const dispatch = useDispatch();

  // Fetch the question from the Redux store using quesId
  const questions = useSelector(
    (state: any) => state.questionReducer.questions
  );
  const quesDetails = questions.find((q: any) => q.questionId === quesId);

  // Use local state to manage updates before saving
  const [question, setQuestion] = useState(quesDetails?.question || "");
  const [points, setPoints] = useState(quesDetails?.points || 4);
  const [answers, setAnswers] = useState<Answer[]>(
    quesDetails?.answer.map((a: any, index: number) => ({
      id: index + 1,
      text: a.answer || "",
    })) || []
  );
  const [title, setTitle] = useState(quesDetails?.title || "");

  // Add a new answer
  const addAnswer = () => {
    setAnswers([...answers, { id: answers.length + 1, text: "" }]);
  };

  // Update an answer's text
  const updateAnswer = (id: number, value: string) => {
    setAnswers(
      answers.map((answer) =>
        answer.id === id ? { ...answer, text: value } : answer
      )
    );
  };

  // Remove an answer
  const removeAnswer = (id: number) => {
    setAnswers(answers.filter((answer) => answer.id !== id));
  };

  // Save or Update the question in Redux
  const handleUpdateQuestion = () => {
    const updatedQuestion = {
      questionId:
        quesId === "QuestionEditor"
          ? new Date().getTime().toString() // Generate a new ID if it's "QuestionEditor"
          : quesId, // Use the existing quesId otherwise // Generate a new ID if this is a new question
      title,
      question,
      points,
      quizId: quizId, // Ensure quizId context
      qtype: "fillIn",
      answer: answers.map(({ text }) => ({ answer: text, isAnswer: true })), // Save all answers as valid
    };

    if (quesId === "QuestionEditor") {
      // Add a new question
      dispatch(addQuestion(updatedQuestion));
      console.log("New Question Added:", updatedQuestion);
    } else {
      // Update existing question
      dispatch(updateQuestion(updatedQuestion));
      console.log("Question Updated:", updatedQuestion);
    }
  };

  // // Handle Save or Update
  // const handleSave = () => {
  //   const newQuestion = {
  //     questionId:
  //       quesId === "QuestionEditor"
  //         ? new Date().getTime().toString() // Generate a new ID if it's "QuestionEditor"
  //         : quesId, // Use the existing quesId otherwise // Generate a new ID if this is a new question
  //     title,
  //     quizId: quizId, // Replace with actual quizId context
  //     qtype: "multipleChoice",
  //     question: questionText,
  //     points: quesDetails?.points || 4,
  //     answer: options.map(({ ...rest }) => rest), // Remove internal ID before saving
  //   };

  //   if (quesId === "QuestionEditor") {
  //     // Add a new question
  //     dispatch(addQuestion(newQuestion));
  //     console.log("New Question Added:", newQuestion);
  //   } else {
  //     // Update existing question
  //     dispatch(updateQuestion(newQuestion));
  //     console.log("Question Updated:", newQuestion);
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
          placeholder="Enter the title..."
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
        Enter your question text, then define all possible correct answers for
        the blank. Students will see the question followed by a small text box
        to type their answer.
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
        {answers.map((answer) => (
          <div key={answer.id} className="d-flex align-items-center mb-2 p-2">
            <span className="fw-bold me-2">Possible Answer:</span>
            <input
              type="text"
              className="form-control me-2"
              value={answer.text}
              onChange={(e) => updateAnswer(answer.id, e.target.value)}
              placeholder={`Answer ${answer.id}`}
            />
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeAnswer(answer.id)}
            >
              🗑️
            </button>
          </div>
        ))}

        {/* Add Another Answer */}
        <button className="btn btn-link text-danger" onClick={addAnswer}>
          + Add Another Answer
        </button>
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
