import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/User/UserLayout.js";
import AuthLayout from "./layouts/Auth/AuthLayout.js";
import AdminLayout from "./layouts/Admin/AdminLayout.js";
import SignUp from './pages/auth/register/SignUp';
import SignIn from './pages/auth/login/SignIn';
import ResetPassword from './pages/auth/login/ResetPassword';
import AuthCallback from './pages/auth/AuthCallback';
import HomePage from './pages/user/HomePage/HomePage.js';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import AboutUs from './pages/user/About_us/About_us';
import NotFound from './pages/user/NotFound/NotFound';
import Blog from './pages/user/Blog/Blog';
import Profile from './pages/user/Profile/Profile';
import ShoppingCart from "./pages/user/Cart/Cart.js";
import Wishlist from "./pages/user/Wishlist/Wishlist.js";

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Auth layout */}
        <Route element={<AuthLayout />}>
          <Route index element={<SignUp />} /> {/* <- Đây là route khớp "/" */}
          <Route path="/callback" element={<AuthCallback />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Route>
        
        <Route path="/user" element={<UserLayout />}>
          <Route path="homepage" element={<HomePage />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="blog" element={<Blog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="shopping_cart" element={<ShoppingCart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </>
    
  );
}

export default AppRoutes;