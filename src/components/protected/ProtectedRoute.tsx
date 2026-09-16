import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { JSX } from "react";

// This component is used to protect routes that require authentication
// It checks if the user is authenticated and redirects to the login page if not
// It also shows a loading state while checking the authentication status.
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAuthLoading = useAuthStore((s) => s.isAuthLoading);

  if (isAuthLoading) return <div>Loading...</div>; // Show loader while checking

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;