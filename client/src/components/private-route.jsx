/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import { useAuth } from "../components/auth-context";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
