import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('isAuthenticated');
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};