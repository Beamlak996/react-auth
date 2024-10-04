import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useStore } from "@/store/store";

export const PrivateRoute: React.FC = () => {
  const user = useStore((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};
