import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartContext } from '../../../context/CartContext';

const AddToCart = ({ product, quantity = 1, className = "", children }) => {
  const { syncCartItems } = useContext(CartContext);

  const checkStockBeforeAdd = async (productId, quantityToAdd) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/user/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cartItems = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      const existingItem = cartItems.find(item => item.product_id === productId);
      const inCart = existingItem ? existingItem.quantity : 0;
      const totalAfterAdd = inCart + quantityToAdd;

      if (totalAfterAdd > product.stock) {
        toast.warning(`⚠️ Quantity in basket (${inCart}) + new number(${quantityToAdd}) excess inventory (${product.stock})`);
        return false;
      }

      return true;
    } catch (err) {
      console.error("Error checking cart:", err);
      toast.error("Unable to check cart.");
      return false;
    }
  };

  const handleAddToCart = async () => {
    if (!product || typeof product.stock === "undefined") {
      toast.error("Product information not found.");
      return;
    }

    console.log("🛒 Add to cart clicked", { productId: product.id, quantity });

    const isValid = await checkStockBeforeAdd(product.id, quantity);
    if (!isValid) return;

    try {
      const payload = {
        product_id: product.id,
        quantity, 
      };

      console.log("📤 Sending to backend:", payload);

      await axios.post("/api/user/cart/add", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      toast.success("Product successfully added to cart!");
      syncCartItems();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add to cart.";
      const stock = error.response?.data?.stock;
      const in_cart = error.response?.data?.in_cart;

      console.error("❌ Add to cart error:", error);

      if (error.response?.status === 401) {
        toast.error("You need to log in to make a purchase.");
      } else if (
        error.response?.status === 400 &&
        message.toLowerCase().includes("exceeds available stock")
      ) {
        toast.warning(`Only ${stock} left, you already have ${in_cart} in cart.`);
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <button onClick={handleAddToCart} className={`flex items-center gap-2 transition ${className}`}>
      {children || "ADD TO CART"}
    </button>
  );
};

export default AddToCart;
