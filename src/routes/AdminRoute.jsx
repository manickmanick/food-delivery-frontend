import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function AdminRoute({
  children,
}) {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    user.role !== "ADMIN" &&
    user.role !==
      "RESTAURANT_OWNER"
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}