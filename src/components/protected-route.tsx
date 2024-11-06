import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../hooks/useAuthState";
import { Loading } from "./loading";

export default function ProtectedRoute() {
  const { isLoggedIn, isPending } = useAuthState();
  if (isPending) return <Loading />;
  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} replace />;
}
