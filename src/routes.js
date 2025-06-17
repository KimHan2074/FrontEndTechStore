import React from "react";
import { Route, Routes } from "react-router-dom";
// import UserLayout from "./layouts/User/UserLayout.js";
// import AuthLayout from "./layouts/AuthLayout.jsx";
// import AdminLayout from "./layouts/AdminLayout.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* student layout */}
      {/* <Route element={<UserLayout />}>
        <Route path="/student/header" element={<Header />} /> */}
        {/* Minh họa */}
      {/* </Route> */}

      {/* User layout */}
      {/* <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} /> */}
        {/* <Route path="/auth/callback" element={<AuthCallback />} /> */}
        {/* register, reset password */}
      {/* </Route> */}

      {/* admin layout */}
      {/* <Route element={<AdminLayout/>}>
        <Route path="/admin/dashboard" element={<Dashboard/>}/> */}
       {/* user management, .... */}
      {/* </Route> */}

        {/* <Route path="/student/header" element={<Header />} /> */}
      
    </Routes>
  );
}

export default AppRoutes;