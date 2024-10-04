import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input
        id="wd-username"
        value="alice"
        placeholder="username"
        className="form-control mb-2 p-2"
      />

      <input
        id="wd-password"
        value="123"
        placeholder="password"
        type="password"
        className="form-control mb-2  p-2"
      />

      <input
        id="wd-firstname"
        value="Alice"
        placeholder="First Name"
        className="form-control mb-2"
      />

      <input
        id="wd-lastname"
        value="Wonderland"
        placeholder="Last Name"
        className="form-control mb-2"
      />
      <div className="input-group">
        <input
          type="date"
          id="wd-dob"
          placeholder="2000-01-01"
          className="form-control mb-2  p-2"
        />
        <span className="input-group-text mb-2" id="addon-wrapping">
          <i className="bi bi-calendar-date"></i> <SlCalender />
        </span>
      </div>

      <input
        id="wd-email"
        value="alice@wonderland"
        type="email"
        className="form-control mb-2"
      />

      <select id="wd-role" className="form-select mb-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <Link to="/Kanbas/Account/Signin" className="col-12 btn btn-danger">
        Signout
      </Link>
    </div>
  );
}
