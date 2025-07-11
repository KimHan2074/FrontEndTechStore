import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import UserManagement from "../../pages/admin/User_managemet/User_management";
import Dashboard from "../../pages/admin/Dashboard/Dashboard";
import ReviewManagement from "../../pages/admin/Review_management/ReviewManagement";
import OrderManagement from "../../pages/admin/Order_Management/OrderManagement";

export default function AdminLayout() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [theme, setTheme] = useState("dark");

  const renderContent = () => {
    switch (activeItem) {
      case "User":
        return <UserManagement />;
      case "Product":
        return <div style={{ padding: 20 }}>Product Management</div>;
      case "Review":
        return <ReviewManagement />;
      case "Order":
        return <OrderManagement />;
      default:
        return <Dashboard/>
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
      <div style={{ flex: 1 }}>{renderContent()}</div>
    </div>
  );
}
