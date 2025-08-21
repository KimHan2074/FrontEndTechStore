
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminSidebar.css";

import {
  LayoutDashboard,
  Package,
  Users,
  MessageSquare,
  ShoppingCart,
  LogOut,
  FileText,
} from "lucide-react";

const Sidebar = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showProductSubmenu, setShowProductSubmenu] = useState(false);

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    avatar: "https://placehold.co/40x40",
  });

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Product", icon: <Package size={18} /> },
    { name: "User", icon: <Users size={18} /> },
    { name: "Review", icon: <MessageSquare size={18} /> },
    { name: "Order", icon: <ShoppingCart size={18} /> },
    { name: "Blog", icon: <FileText size={18} /> }
  ];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/signin");
  };

  useEffect(() => {
    // Load categories
    axios
      .get("https://backendtechstore1-production.up.railway.app/api/admin/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("Failed to load categories", err));

    // Load admin info
    axios
      .get("https://backendtechstore1-production.up.railway.app/api/user/getUserId", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const userId = res.data.userId;
        return axios.get(
          `https://backendtechstore1-production.up.railway.app/api/user/${userId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      })
      .then((res) => {
        const { name, email, avatar } = res.data.data;
        setAdminInfo({ name, email, avatar: avatar || "https://placehold.co/40x40" });
      })
      .catch((err) => console.error("Failed to load admin info", err));
  }, []);

  return (
    <div className="admin-sidebar">
      <div className="admin-top">
        <div className="admin-profile">
          <img src={adminInfo.avatar} alt="avatar" />
          <div className="admin-profile-info">
            <p className="admin-name">{adminInfo.name}</p>
            <p className="admin-email">{adminInfo.email}</p>
          </div>
        </div>

        <ul className="admin-menu">
          {menuItems.map((item) => (
            <React.Fragment key={item.name}>
              <li
                className={`admin-menu-item ${
                  activeItem?.type === "Menu" && activeItem.name === item.name ? "active" : ""
                }`}
                onClick={() => {
                  if (item.name === "Product") {
                    setShowProductSubmenu(!showProductSubmenu);
                    setActiveItem({ type: "Menu", name: "Product" });
                  } else {
                    setActiveItem({ type: "Menu", name: item.name });
                    setShowProductSubmenu(false);
                  }
                }}
              >
                <span className="icon">{item.icon}</span>
                {item.name}
                {item.name === "Product" && (
                  <span style={{ marginLeft: "auto" }}>{showProductSubmenu ? "▲" : "▼"}</span>
                )}
              </li>

              {item.name === "Product" && showProductSubmenu && (
                <div className="product-submenu-scroll">
                  {categories.map((cat) => (
                    <li
                      key={cat.id}
                      className={`admin-menu-item-active sub-item ${
                        activeItem?.type === "ProductCategory" && activeItem?.id === cat.id
                          ? "active"
                          : ""
                      }`}
                      style={{ paddingLeft: 40 }}
                      onClick={() =>
                        setActiveItem({ type: "ProductCategory", id: cat.id, name: cat.name })
                      }
                    >
                      {cat.name}
                    </li>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </ul>

        <div className="admin-logout" onClick={handleLogout}>
          <span className="icon">
            <LogOut size={18} />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
