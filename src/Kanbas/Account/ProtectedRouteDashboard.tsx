import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedRouteDashboard({
  children,
}: {
  children: any;
}) {
  const { cid } = useParams();
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

  const isEnrolled = enrollments.some(
    (enrollment: any) => enrollment.course === cid
  );

  if (isEnrolled) {
    return <>{children}</>;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
  }
}
