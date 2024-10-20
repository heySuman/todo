import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  console.log(isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} replace />;
}
