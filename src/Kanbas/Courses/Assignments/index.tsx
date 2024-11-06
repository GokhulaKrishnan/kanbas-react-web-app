import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { PiNotePencilFill } from "react-icons/pi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const { assignments } = useSelector((state: any) => state.assignmentReducer);

  const filteredAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );

  const openAssignmentEditor = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/AssignmentEditor`);
  };

  const handleDeleteAssignment = (assignmentId: any) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );
    if (confirmDelete) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="mb-2 mb-lg-0 w-40 mt-1">
          <form className="d-flex" role="search">
            <CiSearch className="position-absolute mt-2 ms-2" />
            <input
              className="form-control h-48 w-95"
              id="wd-search-assignment"
              type="search"
              placeholder="   Search..."
            />
          </form>
        </div>
        <div className="d-flex">
          <button
            id="wd-add-assignment-group"
            className="btn btn-m me-1 btn-secondary"
          >
            + Group
          </button>
          {currentUser.role === "FACULTY" && (
            <button
              id="wd-add-assignment"
              className="btn btn-m btn-danger me-1"
              onClick={openAssignmentEditor}
            >
              + Assignment
            </button>
          )}
        </div>
      </div>

      <ul id="wd-modules" className="list-group rounded-0 mt-5">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div
            id="wd-assignments-title"
            className="d-flex justify-content-between align-items-center wd-title p-3 ps-2 bg-secondary"
          >
            <span>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </span>
            <div className="ms-auto me-2">
              <span className="border border-grey rounded-5 p-2">
                40% of Total
              </span>{" "}
              <button className="btn btn-lg ">+</button>
            </div>
            <IoEllipsisVertical className="fs-4" />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {filteredAssignments.map((assignment: any) => (
              <li
                key={assignment._id}
                className="wd-lesson wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-start"
              >
                <BsGripVertical className="me-3 mt-5 fs-3" />
                <PiNotePencilFill className="me-3 mt-5 fs-3 text-success" />
                <div className="mt-2">
                  <Link
                    className="wd-assignment-link text-black text-decoration-none"
                    to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                  >
                    <b className="fs-4">{assignment.title}</b>
                  </Link>
                  <p>
                    <b>Course ID:</b> {assignment.course}
                  </p>
                </div>
                <div className="ms-auto d-flex align-items-center">
                  <LessonControlButtons />
                  {currentUser.role === "FACULTY" && (
                    <button
                      className="btn btn-link text-danger ms-2"
                      onClick={() => handleDeleteAssignment(assignment._id)}
                    >
                      <AiFillDelete className="fs-4" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
