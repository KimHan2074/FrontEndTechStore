import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartContext } from '../../../context/CartContext';

const AddToCart = ({ product, className = "", children }) => {
  const { syncCartItems } = useContext(CartContext);

  const handleAddToCart = async () => {
     console.log("Add to cart clicked");
    const stock = Number(product?.stock);

    if (!product || typeof product.stock === "undefined") {
      toast.error("Product information not found.");
      return;
    }

    if (isNaN(stock)) {
      toast.error("Unable to determine stock quantity.");
      return;
    }

    if (stock <= 0) {
      toast.warning("Product is out of stock!");
      return;
    }

    try {
      const response = await axios.post(
        "/api/user/cart/add",
        {
          product_id: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );

      toast.success("Product successfully added to cart!");
      syncCartItems();
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("You need to log in to make a purchase.");
      } else {
        toast.error("Failed to add product to cart!");
      }
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`flex items-center gap-2 transition ${className}`}
    >
      {children || "ADD TO CART"}
    </button>
  );
};

export default AddToCart;
