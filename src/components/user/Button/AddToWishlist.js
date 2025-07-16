import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default class AddToWishlist extends Component {
  state = {
    added: this.props.addedToWishlist || false,
  };

  handleAddToWishlist = async (productId) => {
    if (this.state.added) {
      toast.info("You have already added this to your wishlist!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const finalUserId = localStorage.getItem("userId");

      if (!finalUserId || !token) {
        toast.error("Unable to retrieve user information.");
        return;
      }

      const response = await axios.post(
        "https://backendlaraveltechstore-production.up.railway.app/api/user/wishlist/add",
        {
          user_id: finalUserId,
          product_id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const msg = response.data?.message;

      if (msg === "Already in wishlist") {
        toast.info("This product is already in your wishlist.");
      } else {
        toast.success("Successfully added to wishlist!");
      }

      this.setState({ added: true });
    } catch (error) {
      console.error("Error adding to wishlist:", error.response?.data || error.message);
      toast.error("Failed to add to wishlist.");
    }
  };

  render() {
    const { item, className, children } = this.props;
    const { added } = this.state;

    return (
      <button
        onClick={() => this.handleAddToWishlist(item.id || item)}
        className={className}
      >
        {children}
      </button>
    );
  }
}
