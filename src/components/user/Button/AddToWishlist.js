// import React, { Component } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export default class AddToWishlist extends Component {
//   state = {
//     added: this.props.addedToWishlist || false,
//   };

//   async componentDidMount() {
//     const token = localStorage.getItem("token");
//     const productId = this.props.item?.id || this.props.item;

//     if (!token || !productId) return;

//     try {
//       const userId = localStorage.getItem("userId");
//       if (!userId) return;

//       const response = await axios.get(
//         `https://backendtechstore1-production.up.railway.app/api/user/wishlist/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );

//       const wishlistItems = response.data?.wishlist || [];

//       const alreadyInWishlist = wishlistItems.some(
//         (item) => item.product_id === productId
//       );

//       if (alreadyInWishlist) {
//         this.setState({ added: true });
//       }

//     } catch (error) {
//       console.error("Failed to fetch wishlist:", error.response?.data || error.message);
//     }
//   }

//   // handleAddToWishlist = async (productId) => {
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     const userIdRes = await axios.get("https://backendtechstore1-production.up.railway.app/api/user/getUserId", {
//   //       headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//   //       withCredentials: true,
//   //     });

//   //     const finalUserId = userIdRes.data.userId;

//   //     const response = await axios.post(
//   //       "https://backendtechstore1-production.up.railway.app/api/user/wishlist/add",
//   //       { user_id: finalUserId, product_id: productId },
//   //       { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
//   //     );

//   //     const msg = response.data?.message;

//   //     if (msg === "Đã có trong wishlist") {
//   //       toast.info("This product is already in your wishlist.");
//   //     } else {
//   //       toast.success("Successfully added to wishlist!");
//   //       window.dispatchEvent(new Event("wishlist-updated"));
//   //     }

//   //   } catch (error) {
//   //     toast.error("Failed to add to wishlist.");
//   //     console.error("Error:", error.response?.data || error.message);
//   //   }
//   // };

//   handleAddToWishlist = async (productId) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.warning("Please login to add to wishlist.");
//       return;
//     }

//     try {
//       const userIdRes = await axios.get(
//         "https://backendtechstore1-production.up.railway.app/api/user/getUserId",
//         {
//           headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
//           withCredentials: true,
//         }
//       );

//       const finalUserId = userIdRes.data.userId;

//       const response = await axios.post(
//         "https://backendtechstore1-production.up.railway.app/api/user/wishlist/add",
//         { user_id: finalUserId, product_id: productId },
//         { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
//       );

//       const msg = response.data?.message;

//       if (msg === "Đã có trong wishlist") {
//         toast.info("This product is already in your wishlist.");
//       } else {
//         toast.success("Successfully added to wishlist!");
//         this.setState({ added: true });
//         window.dispatchEvent(new Event("wishlist-updated"));
//       }

//     } catch (error) {
//       toast.error("Failed to add to wishlist.");
//       console.error("Error:", error.response?.data || error.message);
//     }
//   };

//   render() {
//     const { item, className, children } = this.props;
//     const { added } = this.state;

//     return (
//       <button
//         onClick={() => this.handleAddToWishlist(item.id || item)}
//         className={className}
//       >
//         {children}
//       </button>
//     );
//   }
// }


import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";

export default class AddToWishlist extends Component {
  state = {
    added: this.props.addedToWishlist || false,
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    const productId = this.props.item?.id || this.props.item;

    if (!token || !productId) return;

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const response = await axios.get(
        `https://backendtechstore1-production.up.railway.app/api/user/wishlist/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const wishlistItems = response.data?.wishlist || [];
      const alreadyInWishlist = wishlistItems.some(
        (item) => item.product_id === productId
      );

      if (alreadyInWishlist) {
        this.setState({ added: true });
      }
    } catch (error) {
      console.error(
        "Failed to fetch wishlist:",
        error.response?.data || error.message
      );
    }
  }

  handleAddToWishlist = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Please login to use wishlist.");
      return;
    }

    try {
      const userIdRes = await axios.get(
        "https://backendtechstore1-production.up.railway.app/api/user/getUserId",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      const finalUserId = userIdRes.data.userId;

      if (this.state.added) {
        // ✅ Remove khỏi wishlist
        await axios.delete(
          `https://backendtechstore1-production.up.railway.app/api/user/delete/wishlist/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        toast.info("Removed from wishlist");
        this.setState({ added: false });
        window.dispatchEvent(new Event("wishlist-updated"));
      } else {
        // ✅ Add vào wishlist
        const response = await axios.post(
          "https://backendtechstore1-production.up.railway.app/api/user/wishlist/add",
          { user_id: finalUserId, product_id: productId },
          {
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
          }
        );

        const msg = response.data?.message;
        if (msg === "Đã có trong wishlist") {
          toast.info("This product is already in your wishlist.");
        } else {
          toast.success("Added to wishlist!");
          this.setState({ added: true });
          window.dispatchEvent(new Event("wishlist-updated"));
        }
      }
    } catch (error) {
      toast.error("Wishlist update failed.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  render() {
    const { item, className } = this.props;
    const { added } = this.state;

    return (
      <button
        onClick={() => this.handleAddToWishlist(item.id || item)}
        className={className}
        style={{ display: "flex", alignItems: "center", gap: "6px" }}
      >
        <Heart
          size={18}
          color={added ? "red" : "#000000"}
          fill={added ? "red" : "none"}
        />
        <span style={{ color: added ? "red" : "#000000" }}>Wishlist</span>
      </button>
    );
  }
}

