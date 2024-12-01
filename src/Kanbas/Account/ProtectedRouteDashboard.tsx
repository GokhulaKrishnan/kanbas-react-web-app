import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedRouteDashboard({
  children,
}: {
  children: any;
}) {
  const { cid } = useParams();
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Allow access if the user is faculty
  if (currentUser.role === "FACULTY") {
    return <>{children}</>;
  }

  // Check if the user is enrolled
  const isEnrolled = enrollments.some(
    (enrollment: any) => enrollment.course === cid
  );

  // Grant access if enrolled, otherwise redirect
  if (isEnrolled) {
    return <>{children}</>;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
  }
}
