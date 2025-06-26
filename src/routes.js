import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/User/UserLayout.js";
import AuthLayout from "./layouts/Auth/AuthLayout.js";
import AdminLayout from "./layouts/Admin/AdminLayout.js";
import SignUp from './pages/auth/register/SignUp';
import SignIn from './pages/auth/login/SignIn';
import ResetPassword from './pages/auth/login/ResetPassword';
import AuthCallback from './pages/auth/AuthCallback';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import AboutUs from './pages/user/About_us/About_us';
import NotFound from './pages/user/NotFound/NotFound';
import Blog from './pages/user/Blog/Blog';
import Profile from './pages/user/Profile/Profile';
import Header from "./components/user/Header/Header.js";
import ContentBlog from "./components/user/Blog/ContentBlog.js";
import HomePage from "./pages/user/HomePage/HomePage.js";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth layout */}
      <Route element={<AuthLayout />}>
        <Route index element={<SignUp />} /> 
        <Route path="/callback" element={<AuthCallback />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Route>

      {/* User layout */}
      <Route element={<UserLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/user/homepage" element={<HomePage/>} />
        <Route path="/user/about-us" element={<AboutUs />} />
        <Route path="/user/blog" element={<Blog />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/header" element={<Header />} />
        <Route path="/blog/content" element={<ContentBlog />} />
      </Route>

      {/* Admin layout */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;