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
import AddContact from "./pages/add/AddContact";
import EditContact from "./pages/edit/EditContact";
import AddMateri from "./pages/add/AddMateri";
import EditMateri from "./pages/edit/EditMateri";
import AllMateri from "./pages/student/AllMateri";
import DetailMateri from "./pages/detail/DetailMateri";

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
      { path: "kontak", element: <Kontak /> },
      { path: "materi", element: <Materi /> },
      { path: "forum", element: <Forum /> },
      { path: "tes", element: <TesPotensi /> },

      //CRUD
      { path: "user/add", element: <AddUser /> },
      { path: "user/edit", element: <EditUser /> },

      { path: "materi/add", element: <AddMateri /> },
      { path: "materi/edit", element: <EditMateri /> },

      { path: "contact/add", element: <AddContact /> },
      { path: "contact/edit", element: <EditContact /> },

      // siswa
      { path: "beranda", element: <AllMateri /> },
      { path: "materi_siswa", element: <MateriStudent /> },
      { path: "kontak_siswa", element: <KontakStudent /> },
      { path: "tes_siswa", element: <TestStudent /> },

      //profile
      { path: "profile", element: <Profile /> },
      { path: "setting", element: <Setting /> },

      //detail
      { path: "detail_materi", element: <DetailMateri /> },
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
