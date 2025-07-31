// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./AdminSidebar.css";

// // Import icons từ lucide-react
// import {
//   LayoutDashboard,
//   Package,
//   Users,
//   MessageSquare,
//   ShoppingCart,
//   LogOut,
//   Sun,
//   Moon,
// } from "lucide-react";

// const Sidebar = ({ activeItem, setActiveItem, theme, setTheme }) => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [showProductSubmenu, setShowProductSubmenu] = useState(false);

//   const menuItems = [
//     { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
//     { name: "Product", icon: <Package size={18} /> },
//     { name: "User", icon: <Users size={18} /> },
//     { name: "Review", icon: <MessageSquare size={18} /> },
//     { name: "Order", icon: <ShoppingCart size={18} /> },
//   ];

//   const handleLogout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/signin");
//   };

//   useEffect(() => {
//     axios
//       .get("https://backendtechstore1-production.up.railway.app/api/admin/categories")
//       .then((res) => setCategories(res.data.data))
//       .catch((err) => console.error("Failed to load categories", err));
//   }, []);

//   return (
//     <div className="admin-sidebar">
//       <div>
//         <div className="admin-profile">
//           <img src="https://placehold.co/40x40" alt="avatar" />
//           <div className="admin-profile-info">
//             <p className="admin-name">Jhon Doe</p>
//             <p className="admin-email">jhondoe100@gmail.com</p>
//           </div>
//         </div>

//         <ul className="admin-menu">
//           {menuItems.map((item) => (
//             <React.Fragment key={item.name}>
//               <li
//                 className={`admin-menu-item ${
//                   activeItem === item.name ? "active" : ""
//                 }`}
//                 onClick={() => {
//                   if (item.name === "Product") {
//                     setShowProductSubmenu(!showProductSubmenu);
//                     setActiveItem("Product");
//                   } else {
//                     setActiveItem(item.name);
//                     setShowProductSubmenu(false); // Ẩn submenu nếu click mục khác
//                   }
//                 }}
//               >
//                 <span className="icon">{item.icon}</span>
//                 {item.name}
//                 {item.name === "Product" && (
//                   <span style={{ marginLeft: "auto" }}>
//                     {showProductSubmenu ? "▲" : "▼"}
//                   </span>
//                 )}
//               </li>

//               {item.name === "Product" && showProductSubmenu && (
//                 <div className="product-submenu-scroll">
//                   {categories.map((cat) => (
//                     <li
//                       key={cat.id}
//                       className={`admin-menu-item-active sub-item ${
//                         activeItem === `ProductCategory:${cat.id}` ? "active" : ""
//                       }`}
//                       style={{ paddingLeft: 40 }}
//                       onClick={() => setActiveItem(`ProductCategory:${cat.id}`)}
//                     >
//                       {cat.name}
//                     </li>
//                   ))}
//                 </div>
//               )}
//             </React.Fragment>
//           ))}
//         </ul>

//         <div className="admin-theme-toggle">
//           <button
//             className={`admin-theme-btn light ${
//               theme === "light" ? "active" : ""
//             }`}
//             onClick={() => setTheme("light")}
//           >
//             <Sun size={16} /> Light
//           </button>
//           <button
//             className={`admin-theme-btn dark ${
//               theme === "dark" ? "active" : ""
//             }`}
//             onClick={() => setTheme("dark")}
//           >
//             <Moon size={16} /> Dark
//           </button>
//         </div>

//         <div className="admin-logout" onClick={handleLogout}>
//           <span className="icon">
//             <LogOut size={18} />
//           </span>
//           Logout
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


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
  Sun,
  Moon,
} from "lucide-react";

const Sidebar = ({ activeItem, setActiveItem, theme, setTheme }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showProductSubmenu, setShowProductSubmenu] = useState(false);

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    avatar: "https://placehold.co/40x40", // Avatar mặc định
  });

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Product", icon: <Package size={18} /> },
    { name: "User", icon: <Users size={18} /> },
    { name: "Review", icon: <MessageSquare size={18} /> },
    { name: "Order", icon: <ShoppingCart size={18} /> },
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

    // Step 1: Get user ID
    axios
      .get("https://backendtechstore1-production.up.railway.app/api/user/getUserId", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const userId = res.data.userId;

        // Step 2: Get full user info
        return axios.get(
          `https://backendtechstore1-production.up.railway.app/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      })
      .then((res) => {
        const { name, email, avatar } = res.data.data;
        setAdminInfo({
          name,
          email,
          avatar: avatar || "https://placehold.co/40x40",
        });
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
                className={`admin-menu-item ${activeItem === item.name ? "active" : ""}`}
                onClick={() => {
                  if (item.name === "Product") {
                    setShowProductSubmenu(!showProductSubmenu);
                    setActiveItem("Product");
                  } else {
                    setActiveItem(item.name);
                    setShowProductSubmenu(false);
                  }
                }}
              >
                <span className="icon">{item.icon}</span>
                {item.name}
                {item.name === "Product" && (
                  <span style={{ marginLeft: "auto" }}>
                    {showProductSubmenu ? "▲" : "▼"}
                  </span>
                )}
              </li>

              {item.name === "Product" && showProductSubmenu && (
                <div className="product-submenu-scroll">
                  {categories.map((cat) => (
                    <li
                      key={cat.id}
                      className={`admin-menu-item-active sub-item ${
                        activeItem === `ProductCategory:${cat.id}` ? "active" : ""
                      }`}
                      style={{ paddingLeft: 40 }}
                      onClick={() => setActiveItem(`ProductCategory:${cat.id}`)}
                    >
                      {cat.name}
                    </li>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </ul>

        <div className="admin-theme-toggle">
          <button
            className={`admin-theme-btn light ${theme === "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
          >
            <Sun size={16} /> Light
          </button>
          <button
            className={`admin-theme-btn dark ${theme === "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <Moon size={16} /> Dark
          </button>
        </div>

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



