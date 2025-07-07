import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from './layouts/User/UserLayout.js';
import AuthLayout from './layouts/Auth/AuthLayout.js';
import AdminLayout from './layouts/Admin/AdminLayout.js';
import SignUp from './pages/auth/register/SignUp';
import SignIn from './pages/auth/login/SignIn';
import ResetPassword from './pages/auth/login/ResetPassword';
import AuthCallback from './pages/auth/AuthCallback';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import AboutUs from './pages/user/About_us/About_us';
import NotFound from './pages/user/NotFound/NotFound';
import Blog from './pages/user/Blog/Blog';
import Profile from './pages/user/Profile/Profile';
import ShoppingCart from './pages/user/Cart/Cart.js';
import Wishlist from './pages/user/Wishlist/Wishlist.js';
import Product from './pages/user/Product/Product';
import Payment from "./pages/user/Payment/Payment.js";
import HomePage from "./pages/user/HomePage/HomePage.js";
import Sidebar from "./pages/user/Order/Orders.js";
import PaymentConfirmation from "./pages/user/Payment/PaymentConfirmation.js";
import PaymentMethod from "./components/user/Payment/PaymentMethod.js";
import ProductDetail from "./components/user/Product/ProductDetail.js";
import ProductSpecs from "./components/user/Product/ProductSpecs.js";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<SignUp />} />
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
          <Route path="Product" element={<Product />} />
          <Route path="product-detail" element={<ProductDetail />} />
          <Route path="product-specific" element={<ProductSpecs />} />
          <Route path="payment" element ={<Payment/>}/>
          <Route path="orders" element={<Sidebar />} />
          <Route path="payment_confirmation" element={<PaymentConfirmation />} />
          <Route path="payment_method" element={<PaymentMethod />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;