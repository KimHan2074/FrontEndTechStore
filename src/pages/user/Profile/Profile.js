import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Eye, EyeOff } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";

const Profile = () => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [avatar, setAvatar] = useState(""); 
  const [activeMenu, setActiveMenu] = useState("profile"); 

  const userId = 1;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.statusText}`);
        }

        const json = await response.json();
        const user = json.data;

        setProfile({
          username: user.name ?? "",
          email: user.email ?? "",
          phone: user.phone ?? "",
          address: user.address ?? "",
        });
        setAvatar(user.avatar || "");
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/user/update-profile/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({
          name: profile.username,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update profile");
    }

    const updatedProfile = await response.json();
    console.log("Profile updated:", updatedProfile);
    alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New password and confirmation do not match!");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/change-password/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            current_password: passwords.current,
            new_password: passwords.new,
            new_password_confirmation: passwords.confirm,
          }),
        }
      );

      if (!response.ok) throw new Error(response.statusText);

      alert("Password changed successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      console.error("Error changing password:", err);
      alert("Failed to change password:\n" + err.message);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const handleImageUpload = async (e) => {
  console.log("File upload triggered");
  const file = e.target.files[0];
  if (!file) {
    console.log("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "techstore");
  formData.append("cloud_name", "dgjxz5ohr");

  try {
    console.log("Uploading image...");
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dgjxz5ohr/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    console.log("Upload response:", data);
    setAvatar(data.secure_url);
    alert("Image uploaded successfully!");

    await saveAvatarToDatabase(data.secure_url);
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image");
    }
  };


  const saveAvatarToDatabase = async (avatarUrl) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/user/update-avatar/${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ avatar: avatarUrl }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save avatar to database");
    }

    alert("Avatar saved to database successfully!");
    } catch (err) {
      console.error("Error saving avatar to database:", err);
      alert("Failed to save avatar to database");
    }
  };

  return (
    <div className="profile-container">
      <Sidebar
        username={profile.username}
        email={profile.email}
        avatar={avatar}
        activeMenu={activeMenu}
        onMenuClick={setActiveMenu}
      />

      <div className="profile-content">
        {activeMenu === "profile" && (
          <div className="profile-form">
            <h2>My Profile</h2>
            <form onSubmit={handleProfileUpdate}>
              <label>
                User name
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Phone Number
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Address
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit" className="save-changes-btn">
                Save Changes
              </button>
            </form>
          </div>
        )}
        <div className="profile-avatar">
          <img
            src={avatar || ""}
            alt="Profile"
            className="avatar-large"
          />
          <label className="choose-image-label">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <button
              className="choose-image-btn"
              onClick={() => document.querySelector("input[type='file']").click()}
            >
              Choose Image
            </button>
          </label>
        </div>
        <div className="change-password">
          <h2>Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="input-group">
              <label htmlFor="current-password">Current Password</label>
              <div className="password-input">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  id="current-password"
                  name="current"
                  placeholder="Enter current password"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="new-password">New Password</label>
                <div className="password-input">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    id="new-password"
                    name="new"
                    placeholder="Enter new password"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => togglePasswordVisibility("new")}
                  >
                    {showPasswords.new ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="password-input">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    id="confirm-password"
                    name="confirm"
                    placeholder="Confirm new password"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    {showPasswords.confirm ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="change-password-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
