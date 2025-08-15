
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const BuyNow = ({ product, selectedColor = "black", className = "", children }) => {
  const navigate = useNavigate();


  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");


    if (!token || !userId) {
      toast.warning("Please login to proceed with your order.");
      return;
    }
    const color = selectedColor || "black";


    const orderData = {
      user_id: parseInt(userId),
      total_amount: parseFloat(product.price),
      products: [
        {
          product_id: product.id,
          quantity: 1,
          unit_price: parseFloat(product.price),
          color: color,
        },
      ],
    };


    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BE_URL}/api/user/orders/create`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const checkoutData = {
        items: [
          {
            cart_item_id: product.id,
            name: product.name,
image: product.image_url || product.image || (product.images?.[0] ?? "/placeholder.svg"),
            quantity: 1,
            unit_price: parseFloat(product.price),
            color: color,
             product_id: product.id,
          },
        ],
        subtotal: parseFloat(product.price),
        discount: 0,
        shippingCost: 0,
        total: parseFloat(product.price),
      };


      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));


      const orderId = res.data.order_id;
      if (orderId) {
        localStorage.setItem("currentOrderId", orderId);
      }


      navigate(`/user/payment`);
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