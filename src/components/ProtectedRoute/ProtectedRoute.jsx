// src/components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

export default function ProtectedRoute({ children }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}
