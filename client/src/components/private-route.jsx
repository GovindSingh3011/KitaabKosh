/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import { useAuth } from "../components/auth-context";
import Loader from "../components/ui/Loader";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
