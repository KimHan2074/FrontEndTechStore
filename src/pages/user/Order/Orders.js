import React from "react";
import { Link } from "react-router-dom";
import { User, FileText } from "lucide-react";
import "./Orders.css";

const Sidebar = ({ username, email }) => {
  return (
    <div className="profile-sidebar">
      <div className="profile-info">
        <img
          src="https://qsoft.vn/wp-content/uploads/2022/06/nganh-IT-la-gi-3.jpg"
          alt="User Avatar"
          className="avatar"
        />
        <div>
          <h2>{username}</h2>
          <p>{email}</p>
        </div>
      </div>
      <ul className="menu">
        <li className="menu-item">
          <Link to="/profile" className="menu-link">
            <User className="menu-icon" />
            My Profile
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/orders" className="menu-link">
            <FileText className="menu-icon" />
            My Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
