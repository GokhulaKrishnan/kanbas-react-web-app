import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src=".\pic\reactjs.png" alt="" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src=".\pic\PDP.png" alt="" width={200} />
            <div>
              <h5>CS7777 PDP JS</h5>
              <p className="wd-dashboard-course-title">
                Program Design Paradigm
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src="\pic\Algorithms.jpeg" alt="" width={200} />
            <div>
              <h5>CS5555 Algorithms</h5>
              <p className="wd-dashboard-course-title">Data Structure</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src="\pic\Computernetwork.jpeg" alt="" width={200} />
            <div>
              <h5>CS9328 Computer Networks</h5>
              <p className="wd-dashboard-course-title">Structure of Networks</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src=".\pic\Compilerdesign.jpeg" alt="" width={200} />
            <div>
              <h5>CS2398 Compiler Design</h5>
              <p className="wd-dashboard-course-title">Desgning of compilers</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src=".\pic\fla.png" alt="" width={200} />
            <div>
              <h5>CS7293 FLA</h5>
              <p className="wd-dashboard-course-title">
                Finite Language Automata
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src=".\pic\c.png" alt="" width={200} />
            <div>
              <h5>CS6798 Introduction to C</h5>
              <p className="wd-dashboard-course-title">C Programming</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
