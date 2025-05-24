import { useAuthStore } from "@/hooks/useAuthStore";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuth, loading, user } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return <div>Loading</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
