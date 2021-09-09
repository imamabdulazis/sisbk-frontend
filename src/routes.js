import React from "react";
import { Navigate } from "react-router";
//layout
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import User from "./pages/User";
import NotFound from "./pages/Page404";
import Forum from "./pages/Forum";
import TesPotensi from "./pages/TesPotensi";

// ----------------------------------------------------------------------

const routes = (isLoggedIn) => [
  {
    path: "/app",
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: "/", element: <Navigate to="/app/dashboard" replace /> },
      { path: "dashboard", element: <DashboardApp /> },
      { path: "siswa", element: <User /> },
      { path: "kontak", element: <Products /> },
      { path: "materi", element: <Blog /> },
      { path: "forum", element: <Forum /> },
      { path: "tes", element: <TesPotensi /> },
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? (
      <LogoOnlyLayout />
    ) : (
      <Navigate to="/app/dashboard" />
    ),
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },

  { path: "*", element: <Navigate to="/404" replace /> },
];

export default routes;
