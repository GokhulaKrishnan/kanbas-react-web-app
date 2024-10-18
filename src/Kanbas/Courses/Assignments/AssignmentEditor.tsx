import { useParams, Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { aid } = useParams(); // Get both course ID and assignment ID

  // Find the assignment based on both course and assignment ID
  const assignment = db.assignments.find((a) => a._id === aid);

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-4">
        <label htmlFor="wd-name">Assignment Name </label>
        <input
          type="text"
          className="form-control"
          id="wd-name"
          // value={assignment?.title || ""}
          placeholder={assignment?.title || ""}
        />
      </div>

      <div className="mb-3">
        <textarea
          id="wd-description"
          className="form-control"
          placeholder={`The assignment is available online.\n\nSubmit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kanbas application\n• Links to all relevant source code repositories.\n\nThe Kanbas application should include a link to navigate back to the landing page.`}
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
                id="wd-points"
                type="number"
                className="form-control"
                placeholder="100"
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
                      className="form-control"
                      id="wd-due"
                      placeholder="2024-05-13"
                      style={{
                        border: "1px solid #ced4da",
                      }}
                    />
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="bi bi-calendar-date"></i> <SlCalender />
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
                        className="form-control"
                        id="wd-due"
                        placeholder="2024-05-13"
                        style={{
                          border: "1px solid #ced4da",
                        }}
                      />
                      <span className="input-group-text" id="addon-wrapping">
                        <i className="bi bi-calendar-date"></i> <SlCalender />
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <label htmlFor="wd-until">
                      <b>Until</b>
                    </label>
                    <div className="input-group">
                      <input
                        type="date"
                        className="form-control"
                        id="wd-due"
                        placeholder="2024-05-13"
                        style={{
                          border: "1px solid #ced4da",
                        }}
                      />
                      <span className="input-group-text" id="addon-wrapping">
                        <i className="bi bi-calendar-date"></i> <SlCalender />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <Link
              to={`/Kanbas/Courses/${assignment?.course}/Assignments`}
              className="btn btn-secondary me-2"
            >
              Cancel
            </Link>
            <Link
              to={`/Kanbas/Courses/${assignment?.course}/Assignments`}
              className="btn btn-danger"
            >
              Save
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useParams, Link } from "react-router-dom";
// import { SlCalender } from "react-icons/sl";
// import * as db from "../../Database";

// export default function AssignmentEditor() {
//   const { cid, assignmentId } = useParams();

//   // Find the selected assignment
//   const assignment = db.assignments.find((a) => a._id === assignmentId);

//   return (
//     <div id="wd-assignments-editor" className="container mt-4">
//       <div className="mb-4">
//         <label htmlFor="wd-name">Assignment Name</label>
//         <input
//           type="text"
//           className="form-control"
//           id="wd-name"
//           value={assignment?.title || ""}
//           placeholder="Assignment Name"
//         />
//       </div>

//       <div className="mb-3">
//         <textarea
//           id="wd-description"
//           className="form-control"
//           placeholder="Enter assignment description"
//           value={assignment?.description || ""}
//         ></textarea>
//       </div>

//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="mb-3 row">
//             <div className="col-3">
//               <label htmlFor="wd-points">Points</label>
//             </div>
//             <div className="col-9">
//               <input
//                 id="wd-points"
//                 type="number"
//                 className="form-control"
//                 value={assignment?.points || ""}
//                 placeholder="100"
//               />
//             </div>
//           </div>

//           <div className="mb-3 row">
//             <div className="col-3">
//               <label htmlFor="wd-due">Due Date</label>
//             </div>
//             <div className="col-9">
//               <input
//                 id="wd-due"
//                 type="date"
//                 className="form-control"
//                 value={assignment?.dueDate || ""}
//               />
//             </div>
//           </div>

//           <div className="mb-3 row">
//             <div className="col-3">
//               <label htmlFor="wd-available-from">Available From</label>
//             </div>
//             <div className="col-9">
//               <input
//                 id="wd-available-from"
//                 type="date"
//                 className="form-control"
//                 value={assignment?.availableDate || ""}
//               />
//             </div>
//           </div>

//           <hr />
//           <div className="d-flex justify-content-end">
//             <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
//               Cancel
//             </Link>
//             <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger">
//               Save
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
