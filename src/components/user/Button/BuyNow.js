import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const BuyNow =({ product, selectedColor = "Black", className = "", children }) => {
  const navigate = useNavigate();

  // const handleBuyNow = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const userId = localStorage.getItem("userId");
  //     if (!token || !userId) throw new Error("Missing token or user ID");

  //     const res = await axios.post(
  //       "https://backendtechstore1-production.up.railway.app/api/user/orders/create",
  //       {
  //         user_id: userId,
  //         products: [
  //           {
  //             product_id: product?.id,
  //             quantity: 1,
  //             unit_price: product.price,
  //             color: selectedColor || "Black",
  //           },
  //         ],
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         withCredentials: true,
  //       }
  //     );

  //     const orderId = res.data.order_id;
  //     localStorage.setItem("currentOrderId", orderId);
  //     navigate(`/user/payment/`);
  //   } catch (error) {
  //     console.error("Order creation failed:", error.response?.data || error.message);
  //     alert("Order failed. Please try again.");
  //   }
  // };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.warning("Please login to proceed with your order.");
      return;
    }

    try {
      const res = await axios.post(
        "https://backendtechstore1-production.up.railway.app/api/user/orders/create",
        {
          user_id: userId,
          products: [
            {
              product_id: product?.id,
              quantity: 1,
              unit_price: product.price,
              color: selectedColor || "Black",
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const orderId = res.data.order_id;
      localStorage.setItem("currentOrderId", orderId);
      navigate(`/user/payment/`);
    } catch (error) {
      console.error("Order creation failed:", error.response?.data || error.message);
      toast.error("Order failed. Please try again.");
    }
  };

  return (
    <button onClick={handleBuyNow} className={`transition ${className}`}>
      {children || "Buy Now"}
    </button>
  );
};

export default BuyNow;