import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import { questions } from "../../Database";
import { useDispatch, useSelector } from "react-redux";
import * as questionClient from "./QuestionEditor/client";
import * as quizClient from "./client";
import { setQuestions } from "./QuestionEditor/reducerQuestion";
import { timeStamp } from "console";

interface Answer {
  questionId: string;
  answer: string[]; // The answer is always an array of strings
}

interface Attempt {
  _id: string;
  quizId: string;
  userId: string;
  answers: Answer[];
  timestamp: string;
  score: number;
}

// 1. If the user exists, display the retries left if retries exists
// 2. If the user exists, we need to display the already existing attempted answer and not allow them to modify it
// 3. If the user exists, disable to submit button.
// 4. If they click retest, enable the editing option and make the user attempt the quiz.

export default function QuizPreview() {
  const { quizId } = useParams();
  const { attemptId } = useParams();

  console.log(quizId);
  console.log(attemptId);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user

  // const ques = useSelector((state: any) => state.questionReducer.questions);
  // const quizQuestions = ques.filter((q: any) => q.quizId === quizId); // Filter questions by quizId
  const [userAttempts, setUserAttempts] = useState<Attempt[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<any>([{}]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [time, setTime] = useState("");
  const [score, setScore] = useState(0);
  const [existingAttempt, setExistingAttempt] = useState<Attempt[]>([]);
  const [disable, setDisable] = useState(false);

  // const hasExistingAttempt = userAttempts.length > 0;
  // const retriesLeft = 3 - userAttempts.length; // Assume max 3 attempts

  // If there exists a attemptId, we can fetch the existing user attempt

  // const fetchExistingUserAttempt = async () => {
  //   try {
  //     console.log("Aftercalling");
  //     const uA = await quizClient.fetchUserAttemptById(attemptId as string);
  //     console.log("Inside fetching existing user attempt");
  //     setExistingAttempt(uA);
  //     setDisable(true);
  //   } catch (error) {
  //     console.error("Error fetching user attempt:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchExistingUserAttempt();
  // }, []);

  // console.log(existingAttempt);

  const fetchQuestion = async () => {
    const quiz = await quizClient.findQuestionsForQuiz(quizId as string);
    console.log("Inside fetchQuestion");
    setQuizQuestions(quiz);
  };
  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchAttempts = async () => {
    try {
      const userId = currentUser._id; // Replace with actual user ID
      const attempts = await quizClient.fetchUserAttempts(
        quizId as string,
        userId
      );
      if (attemptId) {
        setDisable(true);
      }
      setUserAttempts(attempts);
    } catch (error) {
      console.error("Failed to fetch attempts:", error);
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  // Now we need to
  console.log(userAttempts);

  // Fetch questions from Redux store
  // const quizQuestions = useSelector(
  //   (state: any) => state.questionReducer.questions
  // );
  console.log(quizQuestions);

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question index

  const handleRetest = () => {
    // set;
  };

  // if (attemptId === undefined) {
  //   setAnswers([]);
  //   // setCurrentIndex(0);
  // }
  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next question
    }
  };

  const handleBefore = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Move to the next question
    }
  };

  const handleSubmit = () => {
    const currentTime = new Date().toLocaleString(); // Get current date and time in readable format
    setTime(currentTime); // Update state with the current time

    let calculatedScore = 0;

    // Iterate through the submitted answers
    answers.forEach((submittedAnswer) => {
      const question = quizQuestions.find(
        (q: any) => q._id === submittedAnswer.questionId
      );
      console.log(question);

      if (question) {
        // Check if the submitted answer matches the correct answer(s)
        const correctAnswers = question.answer
          .filter((opt: any) => opt.isAnswer)
          .map((opt: any) => opt.answer);

        console.log(correctAnswers);

        if (
          JSON.stringify(correctAnswers.sort()) ===
          JSON.stringify(submittedAnswer.answer.sort())
        ) {
          console.log("Iniside comparision");
          console.log(question.points);

          // Add points if the answer is correct
          calculatedScore += question.points;
        }
        // console.log(calculatedScore);
        setScore(calculatedScore);
      }
    });
    console.log(score);

    // Creating a new attempt
    const newAttempt: Attempt = {
      _id: userAttempts[0]?._id ?? "", // Use existing ID if available
      quizId: quizId as string,
      userId: currentUser._id,
      answers: [...answers],
      timestamp: new Date().toISOString(),
      score: calculatedScore,
    };

    if (userAttempts && userAttempts.length > 0) {
      quizClient.updateAttempt(newAttempt);
      console.log("Inside update attempt block");
    } else {
      // Create an attempt
      quizClient.createAttempt(newAttempt);
      console.log("An attempt created:", newAttempt);
    }

    // setScore(calculatedScore); // Update the score state
    // console.log("Quiz Submitted at:", currentTime);
    // console.log("Score:", score);
  };
  console.log(score);

  const handleEditQuiz = () => {
    console.log("Editing Quiz");
  };

  // Current question to render
  const currentQuestion = quizQuestions[currentIndex];
  console.log(currentQuestion);

  // Function to render different question types
  const renderQuestion = (question: any) => {
    const handleAnswerChange = (questionId: string, selectedAnswer: string) => {
      console.log(disable);
      if (disable) return;
      setAnswers((prevAnswers) => {
        // Find if the question already has an answer
        const questionIndex = prevAnswers.findIndex(
          (answer) => answer.questionId === questionId
        );

        if (questionIndex > -1) {
          // Update the existing answer
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[questionIndex] = {
            questionId,
            answer: [selectedAnswer], // Always store as an array
          };
          return updatedAnswers;
        } else {
          // Add a new answer
          return [
            ...prevAnswers,
            { questionId, answer: [selectedAnswer] }, // Add new answer
          ];
        }
      });
    };

    // console.log(answers);
    // const existingAnswer = answers.find(
    //   (ans) => ans.questionId === question._id
    // );
    // const isChecked = (option: string) =>
    //   existingAnswer?.answer.includes(option);

    const userAnswer = userAttempts[0]?.answers.find(
      (answer) => answer.questionId === question._id
    );
    const userSelectedAnswer = userAnswer ? userAnswer.answer : [];
    console.log(userSelectedAnswer);

    switch (question.qtype) {
      case "multipleChoice":
        return (
          <div>
            {question.answer.map((option: any, index: any) => (
              <div className="form-check" key={index}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name={`question-${question._id}`}
                  className="form-check-input"
                  // checked={isChecked(option.answer)} // Preload existing answers
                  disabled={disable} // Disable inputs
                  onChange={() =>
                    handleAnswerChange(question._id, option.answer)
                  }
                  // checked={
                  //   attemptId // Check only if `attemptId` exists
                  //     ? userSelectedAnswer.includes(option.answer)
                  //     : false
                  // }
                  // {...(attemptId && {
                  //   checked: userSelectedAnswer.includes(option.answer) || "",
                  // })}
                  checked={
                    attemptId
                      ? userSelectedAnswer.includes(option.answer)
                      : false
                  }
                  // checked={
                  //   answers.find((ans) => ans.questionId === question._id)
                  //     ?.answer?.[0] === option.answer
                  // } // Handle answer selection

                  // disabled
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
              // value={existingAttempt ? existingAttempt[0].}
              disabled={disable} // Disable inputs
              onChange={(e) =>
                handleAnswerChange(question._id, e.target.value.trim())
              }
              {...(attemptId && { value: userSelectedAnswer[0] || "" })}
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
                disabled={disable} // Disable inputs
                checked={
                  attemptId ? userSelectedAnswer.includes("True") : false
                }
                className="form-check-input"
                onChange={() => handleAnswerChange(question._id, "True")}
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
                onChange={() => handleAnswerChange(question._id, "False")}
                disabled={disable} // Disable inputs
                checked={
                  attemptId ? userSelectedAnswer.includes("False") : false
                }
                // checked={userSelectedAnswer.includes("False")}
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

      {/* Warning Banner */}
      {(currentUser.role === "ADMIN" || currentUser.role === "FACULTY") && (
        <>
          <h2>Quiz Preview</h2>

          <div className="alert alert-danger" role="alert">
            This is a preview of the published version of the quiz
          </div>
        </>
      )}

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
        <div className="d-flex justify-content-end">
          {currentIndex > 0 && (
            <div className="row-5 text-end me-4 mt-3">
              <button className="btn btn-danger" onClick={handleBefore}>
                &lt; Before
              </button>
            </div>
          )}
          {currentIndex < quizQuestions.length - 1 && (
            <div className="d-flex justify-content-end">
              <div className="row text-end me-2 mt-3">
                <button className="btn btn-primary" onClick={handleNext}>
                  Next &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Save Info */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <p>Quiz saved at 8:19am</p>
        {!attemptId && currentIndex === quizQuestions.length - 1 && (
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
      </div>

      {/* Edit Quiz Button */}
      <div className="d-flex justify-content-between mt-3">
        {/* <div>
          {hasExistingAttempt && retriesLeft > 0 && (
            <button className="btn btn-warning" onClick={handleRetest}>
              Retest ({retriesLeft} left)
            </button>
          )}
        </div> */}
        {currentUser.role === "ADMIN" && (
          <button
            className="btn btn-link text-decoration-none"
            onClick={handleEditQuiz}
          >
            📎 Edit This Quiz
          </button>
        )}
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
