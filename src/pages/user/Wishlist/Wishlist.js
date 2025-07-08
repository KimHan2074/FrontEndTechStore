import "../../../components/user/Wishlist/Wishlist.css";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function Wishlist() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "Loading...",
    email: "",
    avatar: "https://placehold.co/80",
  });
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBuyNow = async (product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/user/orders/create",
        {
          user_id: userId,
          products: [
            {
              product_id: product.id,
              quantity: 1,
              unit_price: product.price,
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const orderId = res.data.order_id; 

      navigate(`/payment/${orderId}`);
    } catch (error) {
      console.error("Order creation failed:", error.response?.data || error.message);
      alert("Failed to create order. Try again.");
    }
  };

  useEffect(() => {
  const fetchUserDataAndWishlist = async () => {
    setLoading(true); 
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found.");

      const idRes = await axios.get("http://127.0.0.1:8000/api/user/getUserId", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const fetchedUserId = idRes.data.userId;
      setUserId(fetchedUserId);

      const userRes = await axios.get(`http://127.0.0.1:8000/api/user/${fetchedUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const user = userRes.data.data;
      setProfile({
        username: user.name ?? "N/A",
        email: user.email ?? "N/A",
        avatar: user.avatar?.trim() || "https://placehold.co/80",
      });

      const wishlistRes = await axios.get(`http://127.0.0.1:8000/api/user/wishlist/${fetchedUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const wishlistData = wishlistRes.data;
      setWishlistItems(wishlistData);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUserDataAndWishlist();
}, []);
  if (loading) {
  return <LoadingSpinner />;
}
  return (
    <div className="wishlist-container">
      <div className="profile-card">
        <img src={profile.avatar} alt="profile" className="profile-image" />
        <div>
          <h2 className="profile-name">{profile.username}</h2>
          <p className="profile-role">{profile.email}</p>
        </div>
      </div>

      <h3 className="wishlist-title">Wishlist ({wishlistItems.length})</h3>

      <div className="wishlist-table">
        <div className="wishlist-header">
          <div className="col-product"></div>
          <div className="col-price">PRICES</div>
          <div className="col-action">ACTION</div>
        </div>

        {wishlistItems.map((item) => (
          <div className="wishlist-row" key={item.id}>
            <div className="col-product">
              <img
                src={item.product?.images?.[0]?.image_url || "https://placehold.co/100x70?text=No+Image"}
                alt={item.product?.name || "Product"}
                className="item-img"
              />
              <div>
                <p className="item-title">{item.product?.name}</p>
                <small className="item-description">{item.product?.description}</small>
              </div>
            </div>

            <div className="col-price">
              <span className="item-prices">${item.product?.price}</span>
            </div>

            <div className="col-action">
              <button className="buy-now-btn" onClick={() => handleBuyNow(item.product)}>
                Buy Now
              </button>              
              <button className="add-to-cart-btn">Add To Cart</button>
              <span className="heart-icon">❤️</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
