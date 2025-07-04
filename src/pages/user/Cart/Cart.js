import { useState, useEffect } from "react"
import axios from "axios"
import Shopping_Cart from "../../../components/user/Cart/Cart_Content"
import "./Cart.css"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../../context/CartContext"

export default function Cart() {
  const { cartItems, setCartItems } = useCart()
  const [selectedItems, setSelectedItems] = useState([])
  const [shippingOption, setShippingOption] = useState("free")
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/user/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json"
          }
        })

        const items = response.data.data.map(item => ({
          id: item.id,
          product_id: item.product.id,
          name: item.product.name,
          price: parseFloat(item.product.price),
          quantity: item.quantity,
          image: item.product.first_image?.image_url || "https://bizweb.dktcdn.net/100/450/808/products/anh-chup-man-hinh-2022-10-05-luc-10-26-02-1664940394276.png?v=1679732596117",
        }))

        setCartItems(items)
        setSelectedItems(items.map(item => item.id))
      } catch (error) {
        console.error("Error fetching cart items:", error)
      }
    }

    fetchCartItems()
  }, [])

  useEffect(() => {
    if (selectedItems.length === 0) {
      setDiscount(0)
      setAppliedCoupon(null)
    }
  }, [selectedItems])

  const handleItemSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return

    try {
      await axios.put(`/api/user/cart/${itemId}/quantity`, {
        quantity: newQuantity,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })

      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      )
    } catch (error) {
      toast.error("Không thể cập nhật vì vượt quá số lượng tồn kho!")
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`/api/user/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })

      setCartItems(prev => prev.filter(item => item.id !== itemId))
      setSelectedItems(prev => prev.filter(id => id !== itemId))
      toast.success("Remove item successfully.")
    } catch (error) {
      alert("Không thể xóa sản phẩm khỏi giỏ hàng.")
    }
  }

  const handleShippingChange = (e) => {
    setShippingOption(e.target.value)
  }

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value)
  }

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post(
        "/api/user/cart/apply-coupon",
        { code: couponCode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      const coupon = response.data.coupon
      setAppliedCoupon(coupon)

      const subtotal = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0)

      if (coupon.type === "percent") {
        setDiscount((subtotal * coupon.value) / 100)
      } else {
        setDiscount(Number(coupon.value))
      }

      toast.success(`Coupon applied: ${coupon.code}`)
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid coupon.")
      setDiscount(0)
      setAppliedCoupon(null)
    }
  }

  const handleEmptyCart = async () => {
    if (!window.confirm("Are you sure you want to empty your cart?")) return

    try {
      await axios.delete("/api/user/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      toast.success("Cart emptied successfully!")
      setCartItems([])
      setSelectedItems([])
    } catch (error) {
      toast.error("Failed to clear cart.")
    }
  }

  const handleSelectAll = () => {
    const allIds = cartItems.map((item) => item.id)
    setSelectedItems(allIds)
  }

  const handleProceedToCheckout = async () => {
    try {
      const selectedData = cartItems
        .filter(item => selectedItems.includes(item.id))
        .map(item => ({
          cart_item_id: item.id,
          product_id: item.product_id,
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          unit_price: item.price
        }));

      const payload = {
        selected_items: selectedData,
        shipping_option: shippingOption,
        coupon_code: appliedCoupon?.code || null,
        discount: discount,
        total_amount: subtotal - discount + shippingCost
      };

      const response = await axios.post("/api/user/cart/checkout", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const orderId = response.data?.order_id || response.data?.data?.id;
      if (orderId) {
        localStorage.setItem("currentOrderId", orderId);
      } else {
        console.warn("Không nhận được order_id từ server");
      }

      // Lưu dữ liệu cho trang payment
      localStorage.setItem("checkoutData", JSON.stringify({
        items: selectedData,
        subtotal,
        discount,
        shippingCost,
        total
      }));

      toast.success("Checkout successful! Redirecting to payment...");
      navigate("/user/payment");

    } catch (error) {
      toast.error("Checkout failed.");
      console.error(error);
    }
  };

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id))

  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingOption === "local" ? 5.0 : shippingOption === "flat" ? 15.0 : 0.0
  const total = subtotal - discount + shippingCost

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2 className="empty-cart-title">Your cart is empty <ShoppingCart size={28} style={{ marginBottom: "-6px" }} /></h2>
          <p className="empty-cart-description">Browse our products and find something you love!</p>
          <button
            className="btn-cart"
            onClick={() => window.location.href = "/user/product"}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <Shopping_Cart
          cartItems={cartItems}
          selectedItems={selectedItems}
          shippingOption={shippingOption}
          couponCode={couponCode}
          appliedCoupon={appliedCoupon}
          discount={discount}
          handleItemSelect={handleItemSelect}
          handleQuantityChange={handleQuantityChange}
          handleRemoveItem={handleRemoveItem}
          handleShippingChange={handleShippingChange}
          handleCouponChange={handleCouponChange}
          handleApplyCoupon={handleApplyCoupon}
          handleEmptyCart={handleEmptyCart}
          handleSelectAll={handleSelectAll}
          handleProceedToCheckout={handleProceedToCheckout}
          subtotal={subtotal}
          shippingCost={shippingCost}
          total={total}
        />
      )}
      <ToastContainer />
    </>
  )
}
