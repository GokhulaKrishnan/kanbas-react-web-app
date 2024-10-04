import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div
            className="wd-dashboard-course col mt-3"
            style={{ width: "300px" }}
          >
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1234/Home"
            >
              <img src=".\pic\reactjs.png" alt="" width="100%" height={160} />
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS1234 React JS
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Full Stack software developer
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>

          <br />

          <div
            className="wd-dashboard-course col mt-3"
            style={{ width: "300px" }}
          >
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1234/Home"
            >
              <img src=".\pic\PDP.png" alt="" width="100%" height={160} />
              <div>
                <h5>CS7777 PDP JS</h5>
                <p className="wd-dashboard-course-title card-text">
                  Program Design Paradigm
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          <br />

          <div
            className="wd-dashboard-course col mt-3"
            style={{ width: "300px" }}
          >
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1234/Home"
            >
              <img
                src="\pic\Algorithms.jpeg"
                alt=""
                width="100%"
                height={160}
              />
              <div>
                <h5>CS5555 Algorithms</h5>
                <p className="wd-dashboard-course-title card-text">
                  Data Structure
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          <br />

          <div
            className="wd-dashboard-course col mt-3"
            style={{ width: "300px" }}
          >
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1234/Home"
            >
              <img
                src="\pic\Computernetwork.jpeg"
                alt=""
                width="100%"
                height={160}
              />
              <div>
                <h5>CS9328 Computer Networks</h5>
                <p className="wd-dashboard-course-title card-text">
                  Structure of Networks
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          <br />

          <div
            className="wd-dashboard-course col mt-3"
            style={{ width: "300px" }}
          >
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1234/Home"
            >
              <img
                src=".\pic\Compilerdesign.jpeg"
                alt=""
                width="100%"
                height={160}
              />
              <div>
                <h5>CS2398 Compiler Design</h5>
                <p className="wd-dashboard-course-title card-text">
                  Desgning of compilers
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          <br />

          <div
            className="wd-dashboard-course col mt-4"
            style={{ width: "300px" }}
          >
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1234/Home"
            >
              <img src=".\pic\fla.png" alt="" width="100%" height={160} />
              <div>
                <h5>CS7293 FLA</h5>
                <p className="wd-dashboard-course-title card-text">
                  Finite Language Automata
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          <br />

          <div
            className="wd-dashboard-course col mt-4"
            style={{ width: "300px" }}
          >
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1234/Home"
            >
              <img src=".\pic\c.png" alt="" width="100%" height={160} />
              <div>
                <h5>CS6798 Introduction to C</h5>
                <p className="wd-dashboard-course-title card-text">
                  C Programming
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
