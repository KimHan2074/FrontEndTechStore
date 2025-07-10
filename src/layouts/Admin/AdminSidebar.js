import React from "react";
import "./AdminSidebar.css";

const Sidebar = ({ activeItem, setActiveItem, theme, setTheme }) => {
  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Product", icon: "📦" },
    { name: "User", icon: "👥" },
    { name: "Review", icon: "💬" },
    { name: "Order", icon: "🛒" },
  ];

  return (
    <div className="admin-sidebar">
      <div>
        <div className="admin-profile">
          <img src="https://placehold.co/40x40" alt="avatar" />
          <div className="admin-profile-info">
            <p className="admin-name">Jhon Doe</p>
            <p className="admin-email">jhondoe100@gmail.com</p>
          </div>
        </div>

        <ul className="admin-menu">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`admin-menu-item ${activeItem === item.name ? "active" : ""}`}
              onClick={() => setActiveItem(item.name)}
            >
              <span className="icon">{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul>

        <div className="admin-theme-toggle">
          <button
            className={`admin-theme-btn light ${theme === "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
          >
            ☀ Light
          </button>
          <button
            className={`admin-theme-btn dark ${theme === "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            🌙 Dark
          </button>
        </div>

        <div className="admin-logout">
          <span className="icon">🔓</span>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
