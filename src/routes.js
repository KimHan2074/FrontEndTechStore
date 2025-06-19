import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/User/UserLayout.js";
import Header from "./components/user/Header/Header.js";
import AuthLayout from "./layouts/Auth/AuthLayout.js";
import ContentBlog from "./components/user/Blog/ContentBlog.js";
// import AdminLayout from "./layouts/AdminLayout.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* student layout */}
       <Route element={<UserLayout />}>
        <Route path="/user/header" element={<Header />} />
        <Route path="/blog/content" element={<ContentBlog />} />
      </Route>
      {/* User layout */}
      <Route element={<AuthLayout />}>
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/user/header" element={<Header />} /> */}
      </Route>

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