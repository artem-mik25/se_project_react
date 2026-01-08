// src/components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

export default function ProtectedRoute({ children }) {
  const { currentUser, isAuthLoading } = useContext(CurrentUserContext);

  // Wait for auth check to complete
  if (isAuthLoading) {
    return <div className="status">Loading...</div>;
  }

  // If not logged in after auth check completes, redirect
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}
