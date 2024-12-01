import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion, addQuestion } from "./reducerQuestion"; // Import Redux actions

export default function McqQuestion() {
  const { quesId } = useParams();
  const { quizId } = useParams();
  const dispatch = useDispatch();
  // console.log(quesId);
  // Fetch the question from the Redux store using quesId
  const questions = useSelector(
    (state: any) => state.questionReducer.questions
  );
  const quesDetails = questions.find((q: any) => q.questionId === quesId);

  // Use state to manage local updates before saving
  const [title, setTitle] = useState(quesDetails?.title || "");
  const [questionText, setQuestionText] = useState(quesDetails?.question || "");
  const [options, setOptions] = useState(
    quesDetails?.answer.map((opt: any, index: number) => ({
      ...opt,
      id: index + 1,
    })) || []
  );

  // Add a new answer option
  const addAnswer = () => {
    setOptions([
      ...options,
      { id: options.length + 1, answer: "", isAnswer: false },
    ]);
  };

  // Update an answer's text
  const updateAnswer = (id: number, text: string) => {
    setOptions(
      options.map((option: any) =>
        option.id === id ? { ...option, answer: text } : option
      )
    );
  };

  // Mark an answer as correct
  const markCorrect = (id: number) => {
    setOptions(
      options.map((option: any) =>
        option.id === id
          ? { ...option, isAnswer: true }
          : { ...option, isAnswer: false }
      )
    );
  };

  // Remove an answer
  const removeAnswer = (id: number) => {
    setOptions(options.filter((option: any) => option.id !== id));
  };

  // Handle Save or Update
  const handleSave = () => {
    const newQuestion = {
      questionId:
        quesId === "QuestionEditor"
          ? new Date().getTime().toString() // Generate a new ID if it's "QuestionEditor"
          : quesId, // Use the existing quesId otherwise // Generate a new ID if this is a new question
      title,
      quizId: quizId, // Replace with actual quizId context
      qtype: "multipleChoice",
      question: questionText,
      points: quesDetails?.points || 4,
      answer: options.map(({ ...rest }) => rest), // Remove internal ID before saving
    };

    if (quesId === "QuestionEditor") {
      // Add a new question
      dispatch(addQuestion(newQuestion));
      console.log("New Question Added:", newQuestion);
    } else {
      // Update existing question
      dispatch(updateQuestion(newQuestion));
      console.log("Question Updated:", newQuestion);
    }
  };

  // const handleSave = async () => {
  //   const newAssignment = {
  //     _id: new Date().getTime().toString(),
  //     title,
  //     description,
  //     points,
  //     dueDate,
  //     availableDate,
  //     untilDate,
  //     course: cid,
  //   };

  //   const duplicateAssignment = db.assignments.find(
  //     (a) => a.title === title && a._id !== existingAssignment?._id
  //   );

  //   if (duplicateAssignment) {
  //     alert("An assignment with this title already exists.");
  //     return;
  //   }

  //   if (existingAssignment) {
  //     saveAssignment({ markEditing: false });

  //     // dispatch(updateAssignment(newAssignment));
  //   } else {
  //     if (!cid) return;

  //     const assignment = await coursesClient.createAssignmentForCourse(
  //       cid,
  //       newAssignment
  //     );
  //     dispatch(addAssignment(assignment));
  //     // dispatch(addAssignment(assignmentData));
  //   }
  //   navigate(`/Kanbas/Courses/${newAssignment.course}/Assignments`);
  // };

  // const handleCancel = () => {
  //   navigate(
  //     `/Kanbas/Courses/${existingAssignment?.course || "RS101"}/Assignments`
  //   );
  // };

  const handleCancel = () => {
    console.log("Edit Cancelled");
  };

  return (
    <div className="container mt-4">
      {/* Title Input */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control me-2"
          style={{ width: "60%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
        />
      </div>

      {/* Question Instructions */}
      <p>
        Enter your question and multiple answers, then select the one correct
        answer.
      </p>

      {/* Question Section */}
      <div className="mb-4">
        <label className="form-label fw-bold">Question:</label>
        <textarea
          className="form-control"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter your question here..."
        />
      </div>

      {/* Answers Section */}
      <div className="mb-4">
        <label className="form-label fw-bold">Answers:</label>
        {options.map((option: any) => (
          <div
            key={option.id}
            className={`d-flex align-items-center mb-2 p-2 ${
              option.isAnswer ? "border border-success rounded" : ""
            }`}
          >
            {/* Correct Answer Icon */}
            <div
              className={`me-2 ${
                option.isAnswer ? "text-success" : "text-muted"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => markCorrect(option.id)}
            >
              {option.isAnswer ? "✓ Correct Answer" : "→"}
            </div>

            {/* Answer Input */}
            <input
              type="text"
              className="form-control me-2"
              value={option.answer}
              onChange={(e) => updateAnswer(option.id, e.target.value)}
              placeholder={`Possible Answer ${option.id}`}
            />

            {/* Remove Icon */}
            {options.length > 2 && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeAnswer(option.id)}
              >
                🗑️
              </button>
            )}
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
        <button className="btn btn-danger" onClick={handleSave}>
          Save Question
        </button>
      </div>
    </div>
  );
}
