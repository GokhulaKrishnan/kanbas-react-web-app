import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import * as userClient from "../Account/client";

export default function ProtectedRouteDashboard({
  children,
}: {
  children: any;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user
  const { cid } = useParams(); // Get course ID from URL

  const [courses, setCourses] = useState<any[]>([]); // State to hold user's courses
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status

  // Fetch courses for the current user
  const findCoursesForUser = async () => {
    try {
      const userCourses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(userCourses);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's courses when the component mounts or the user changes
  useEffect(() => {
    if (currentUser?._id) {
      findCoursesForUser();
    }
  }, [currentUser?._id]);

  // Allow access if the user is a faculty member
  // if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
  //   return <>{children}</>;
  // }

  // Show a loading state until courses are fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if the user is enrolled in the course
  const isEnrolled = courses.some((course: any) => course._id === cid);

  // Grant access if enrolled, otherwise redirect to the dashboard
  if (isEnrolled) {
    return <>{children}</>;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
  }
}
