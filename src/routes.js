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
import EditUser from "./pages/edit/EditUser";
import AddUser from "./pages/add/AddUser";
import TestStudent from "./pages/student/TestStudent";
import Beranda from "./pages/student/Beranda";
import KontakStudent from "./pages/student/KontakStudent";
import MateriStudent from "./pages/student/MateriStudent";
import Materi from "./pages/Materi";
import Kontak from "./pages/Kontak";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";

// ----------------------------------------------------------------------

const routes = (isLoggedIn, isTeacher) => [
  {
    path: "/app",
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: "/",
        element: (
          <Navigate
            to={isTeacher ? "/app/dashboard" : "/app/beranda"}
            replace
          />
        ),
      },
      { path: "dashboard", element: <DashboardApp /> },
      { path: "user", element: <User /> },
      { path: "user/edit", element: <EditUser /> },
      { path: "user/add", element: <AddUser /> },
      { path: "kontak", element: <Kontak /> },
      { path: "materi", element: <Materi /> },
      { path: "forum", element: <Forum /> },
      { path: "tes", element: <TesPotensi /> },

      // siswa
      { path: "beranda", element: <Blog /> },
      { path: "materi_siswa", element: <MateriStudent /> },
      { path: "kontak_siswa", element: <Products /> },
      { path: "tes_siswa", element: <TestStudent /> },

      //profile
      { path: "profile", element: <Profile /> },
      { path: "setting", element: <Setting /> },
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? (
      <LogoOnlyLayout />
    ) : (
      <Navigate to={isTeacher ? "/app/dashboard" : "/app/beranda"} />
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
