import { useParams, useNavigate } from "react-router-dom";
// import { SlCalendar } from "react-icons/sl";
import * as db from "../../Database";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment, addAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);

  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [title, setTitle] = useState(existingAssignment?.title || "");
  const [description, setDescription] = useState(
    existingAssignment?.description || ""
  );
  const [points, setPoints] = useState(existingAssignment?.points || 100);
  const [dueDate, setDueDate] = useState(existingAssignment?.dueDate || "");
  const [availableDate, setAvailableDate] = useState(
    existingAssignment?.availableDate || ""
  );
  const [untilDate, setUntilDate] = useState(
    existingAssignment?.untilDate || ""
  );

  const handleSave = () => {
    const assignmentData = {
      _id: existingAssignment?._id || new Date().getTime().toString(),
      title,
      description,
      points,
      dueDate,
      availableDate,
      untilDate,
      course: existingAssignment?.course || "RS101",
    };

    const duplicateAssignment = db.assignments.find(
      (a) => a.title === title && a._id !== existingAssignment?._id
    );

    if (duplicateAssignment) {
      alert("An assignment with this title already exists.");
      return;
    }

    if (existingAssignment) {
      dispatch(updateAssignment(assignmentData));
    } else {
      dispatch(addAssignment(assignmentData));
    }
    navigate(`/Kanbas/Courses/${assignmentData.course}/Assignments`);
  };

  const handleCancel = () => {
    navigate(
      `/Kanbas/Courses/${existingAssignment?.course || "RS101"}/Assignments`
    );
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-4">
        <label htmlFor="wd-name">Assignment Name </label>
        <input
          type="text"
          className="form-control"
          id="wd-name"
          value={title}
          placeholder="Assignment Name"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <textarea
          id="wd-description"
          className="form-control"
          value={description}
          placeholder="Enter assignment description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="mb-3 row">
            <div className="col-3">
              <label htmlFor="wd-points">Points</label>
            </div>
            <div className="col-9">
              <input
                type="number"
                id="wd-points"
                className="form-control col-9"
                value={points}
                placeholder="100"
                onChange={(e) => setPoints(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-3">
              <label htmlFor="wd-group">Assignment Group</label>
            </div>
            <div className="col-9">
              <select id="wd-group" className="form-select">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-3">
              <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </div>
            <div className="col-9">
              <select id="wd-display-grade-as" className="form-select">
                <option>Percentage</option>
                <option>Points</option>
                <option>Letter Grade</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-3">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </div>
            <div className="col-9">
              <div className="border rounded p-3">
                <div>
                  <select id="wd-submission-type" className="form-select">
                    <option>Online</option>
                    <option>Paper</option>
                  </select>
                </div>
                <div className="mb-3 row mt-3">
                  <div className="col-9">
                    <label className="fs-5">
                      <b>Online Entry Options</b>
                    </label>
                    <div className="form-check mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-chkbox-text"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="wd-chkbox-text"
                      >
                        Text Entry
                      </label>
                    </div>
                    <div className="form-check mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-chkbox-website"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="wd-chkbox-website"
                      >
                        Website URL
                      </label>
                    </div>
                    <div className="form-check mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-chkbox-media"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="wd-chkbox-media"
                      >
                        Media Recordings
                      </label>
                    </div>
                    <div className="form-check mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-chkbox-student"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="wd-chkbox-student"
                      >
                        Student Annotation
                      </label>
                    </div>
                    <div className="form-check mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wd-chkbox-file"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="wd-chkbox-file"
                      >
                        File Uploads
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-3 ">
              <label htmlFor="wd-assign-to">Assign</label>
            </div>

            <div className="col-9">
              <div className="border rounded p-3">
                <label htmlFor="wd-assign-to" className="form-label fs-5">
                  <b>Assign to</b>
                </label>
                <input
                  id="wd-assign-to"
                  className="form-control"
                  type="text"
                  placeholder="Everyone"
                />
                <div className="form-group mt-4">
                  <label htmlFor="wd-due fs-6">
                    <b>Due</b>
                  </label>
                  <div className="input-group">
                    <input
                      type="date"
                      id="wd-due"
                      className="form-control col-9"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      style={{
                        border: "1px solid #ced4da",
                      }}
                    />
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="bi bi-calendar-date"></i>
                    </span>
                  </div>
                </div>

                <div className="form-group row mt-4">
                  <div className="col-6">
                    <label htmlFor="wd-available-from">
                      <b>Available from</b>
                    </label>
                    <div className="input-group">
                      <input
                        type="date"
                        id="wd-available-from"
                        className="form-control"
                        value={availableDate}
                        onChange={(e) => setAvailableDate(e.target.value)}
                      />
                      <span className="input-group-text" id="addon-wrapping">
                        <i className="bi bi-calendar-date"></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <label htmlFor="wd-until">
                      <b>Available until</b>
                    </label>
                    <div className="input-group">
                      <input
                        type="date"
                        id="wd-until"
                        className="form-control"
                        value={untilDate}
                        onChange={(e) => setUntilDate(e.target.value)}
                      />
                      <span className="input-group-text" id="addon-wrapping">
                        <i className="bi bi-calendar-date"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-secondary mt-3 me-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="btn btn-danger mt-3" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
