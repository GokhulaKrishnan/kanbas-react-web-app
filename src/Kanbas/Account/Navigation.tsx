import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser
    ? [{ name: "Profile", path: "Profile" }]
    : [
        { name: "Signin", path: "Signin" },
        { name: "Signup", path: "Signup" },
      ];
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  const { pathname } = useLocation();

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.name}
          id={`wd-account-${link.name.toLowerCase()}-link`}
          to={`/Kanbas/Account/${link.path}`}
          className={`list-group-item ${
            pathname.includes(link.path) ? "active" : ""
          } border border-0`}
        >
          {link.name}
        </Link>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          to={`/Kanbas/Account/Users`}
          className={`list-group-item ${active("Users")}`}
        >
          {" "}
          Users{" "}
        </Link>
      )}
    </div>
  );
}
