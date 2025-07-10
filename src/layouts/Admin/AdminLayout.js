import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import UserManagement from "../../pages/admin/User_managemet/User_management";

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
        return <div style={{ padding: 20 }}>Review Management</div>;
      case "Order":
        return <div style={{ padding: 20 }}>Order Management</div>;
      default:
        return (
          <div style={{ padding: 20 }}>
            <h2>Dashboard</h2>
            <p>Welcome to the Admin Dashboard!</p>
          </div>
        );
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
