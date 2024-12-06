import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import * as db from "../../Database";
import * as client from "../../Account/client";
import PeopleDetails from "./Details";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import * as userClient from "../Account/client";
import * as userClient from "../../Account/client";
import * as courseClient from "../client";

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  const { cid } = useParams();
  // const { users, enrollments } = db;
  // console.log(users);

  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user
  // console.log(cid);
  // const { cid } = useParams(); // Get course ID from URL

  const [user, setUsers] = useState<any[]>([]); // State to hold user's courses
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  // console.log(user);
  // Fetch courses for the current user
  const findUsersCourse = async () => {
    try {
      const userCourses = await courseClient.findUsersForCourse(cid);
      setUsers(userCourses);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's courses when the component mounts or the user changes
  useEffect(() => {
    if (cid) {
      findUsersCourse();
    }
  }, [cid]);
  return (
    <div id="wd-people-table">
      {/* <PeopleDetails /> */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {user
            // .filter((usr) =>
            //   enrollments.some(
            //     (enrollment) =>
            //       enrollment.user === usr._id && enrollment.course === cid
            //   )
            // )
            .map((user: any) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <Link
                    to={`/Kanbas/Account/Users/${user._id}`}
                    className="text-decoration-none"
                  >
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>
                    <span className="wd-last-name">{user.lastName}</span>
                  </Link>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
