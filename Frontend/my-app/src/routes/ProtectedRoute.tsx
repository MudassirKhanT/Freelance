// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // optional, for flexibility
}

// const ProtectedRoute = ({ children, allowedRoles = ["admin"] }: ProtectedRouteProps) => {
//   const { user, token } = useAuth();

//   if (!user || !token || !allowedRoles.includes(user.role)) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
