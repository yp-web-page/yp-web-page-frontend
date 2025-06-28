import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { JSX } from "react";

// This component is used to protect routes that require authentication
// It checks if the user is authenticated and redirects to the login page if not
// It also shows a loading state while checking the authentication status.
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) return <div>Loading...</div>; // Show loader while checking

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;