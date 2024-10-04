import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Signup</h3>
      <input placeholder="username" className="form-control mb-2" />

      <input
        placeholder="password"
        type="password"
        className="form-control mb-2"
      />

      <input
        placeholder="verify password"
        type="password"
        className="form-control mb-2"
      />

      <Link to="/Kanbas/Account/Profile" className="col-12 btn btn-primary">
        {" "}
        Signup{" "}
      </Link>
      <br />
      <Link to="/Kanbas/Account/Signin">Signin</Link>
    </div>
  );
}
