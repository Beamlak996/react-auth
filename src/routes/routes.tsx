import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { LoginPage } from "@/modules/auth/pages/login-page";
import { PageNotFound } from "./page-not-found";
import { PrivateRoute } from "./private-route";
import { TestPage } from "@/modules/auth/pages/test-page";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <PrivateRoute />, 
    children: [
      {
        path: "/test", 
        element: <TestPage />, 
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);