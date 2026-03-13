import { Navigate, useLocation } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,_#f3eee2_0%,_#f8f5ef_45%,_#fcfbf8_100%)]">
        <div className="h-16 w-16 animate-pulse rounded-3xl bg-slate-200" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
