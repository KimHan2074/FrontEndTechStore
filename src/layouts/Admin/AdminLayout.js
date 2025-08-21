import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import UserManagement from "../../pages/admin/User_managemet/User_management";
import OrderManagement from "../../pages/admin/Order_Management/OrderManagement";
import ReviewManagement from "../../pages/admin/Review_management/ReviewManagement";
import ProductManagement from "../../pages/admin/Product_Management/ProductManagement";
import BlogManagement from "../../pages/admin/Blog_Management/BlogManagement";
import Dashboard from "../../pages/admin/Dashboard/Dashboard";

export default function AdminLayout() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [theme, setTheme] = useState("dark");

  const renderContent = () => {
  if (activeItem.type === "ProductCategory") {
    return <ProductManagement categoryId={activeItem.id} categoryName={activeItem.name} />;
  }

  switch (activeItem.name) {
    case "Product":
      return <ProductManagement categoryId={null} />;
    case "User":
      return <UserManagement />;
    case "Review":
      return <ReviewManagement />;
    case "Order":
      return <OrderManagement />;
    case "Blog":
      return <BlogManagement />;
    default:
      return <Dashboard />;
  }
};


  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        theme={theme}
        setTheme={setTheme}
      />
      <div style={{ flex: 1, marginLeft: "285px"}} className="outlet">{renderContent()}</div>
    </div>
  );
}
