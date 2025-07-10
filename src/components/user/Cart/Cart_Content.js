import React from "react";
export default function ShoppingCart({
  cartItems,
  selectedItems,
  shippingOption,
  couponCode,
  handleItemSelect,
  handleQuantityChange,
  handleRemoveItem,
  handleShippingChange,
  handleCouponChange,
  handleApplyCoupon,
  handleEmptyCart,
  handleSelectAll,
  handleProceedToCheckout,
  subtotal,
  appliedCoupon,
  discount,
  shippingCost,
  total,
}) {
  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-table-container">
          <div className="cart-table-header">
            <div className="cart-header-product">Product</div>
            <div className="cart-header-price">Price</div>
            <div className="cart-header-quantity">Quantity</div>
            <div className="cart-header-subtotal">Subtotal</div>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => {
              console.log(`Rendering item ${item.id}, quantity: ${item.quantity}, stock: ${item.stock}`); // Debug chi tiết
              const currentQuantity = item.quantity || 0; // Bảo vệ quantity
              return (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-product">
                    <input
                      type="checkbox"
                      className="cart-item-checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleItemSelect(item.id)}
                      disabled={item.stock === 0 || item.stock === undefined}
                      title={
                        item.stock === 0 || item.stock === undefined
                          ? "Sản phẩm đã hết hàng"
                          : "Chọn sản phẩm để thanh toán"
                      }
                    />

                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="cart-item-image"
                    />

                    <span className="cart-item-name">
                      <div>{item.name}</div>
                      <div className="cart-item-color" style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Color: {item.color || 'Default'}
                      </div>
                      {(item.stock === 0 || item.stock === undefined) && (
                        <span className="out-of-stock-label">(Hết hàng)</span>
                      )}
                    </span>
                  </div>

                  <div className="cart-item-price">${item.price.toFixed(3)}</div>

                  <div className="cart-item-quantity">
                    <button
                      className="cart-quantity-btn cart-quantity-minus"
                      onClick={() => handleQuantityChange(item.id, currentQuantity - 1)}
                      disabled={item.stock === 0 || item.stock === undefined || currentQuantity <= 1}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    <span className="cart-quantity-number">{currentQuantity}</span>
                  <button
                    className="cart-quantity-btn cart-quantity-plus"
                    onClick={() => handleQuantityChange(item.id, currentQuantity + 1)}
                    disabled={item.stock === 0 || item.stock === undefined}
                  >

                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>

                  <div className="cart-item-subtotal">${(item.price * currentQuantity).toFixed(3)}</div>

                  <button className="cart-remove-btn" onClick={() => handleRemoveItem(item.id)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cart-actions-section">
          <div className="cart-coupon-section">
            <input
              type="text"
              placeholder="Coupon code"
              value={couponCode}
              onChange={handleCouponChange}
              className="cart-coupon-input"
            />
            <button className="cart-coupon-btn" onClick={handleApplyCoupon}>
              APPLY COUPON
            </button>
          </div>

          <div className="cart-update-section">
            <button className="cart-empty-btn" onClick={handleEmptyCart}>
              Empty Cart
            </button>
            <button className="cart-selectAll-btn" onClick={handleSelectAll}>
              Select All
            </button>
          </div>
        </div>
      </div>

      <div className="cart-totals-section">
        <div className="cart-totals-card">
          <h3 className="cart-totals-title">CART TOTALS</h3>

          <div className="cart-totals-row">
            <span className="cart-totals-label">Subtotal</span>
            <span className="cart-totals-value">${subtotal.toFixed(2)}</span>
          </div>

          {appliedCoupon && (
            <div className="cart-totals-row">
              <span className="cart-totals-label">
                Discount ({appliedCoupon.code})
              </span>
              <span className="cart-totals-value" style={{ color: "green" }}>
                -${discount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="cart-shipping-section">
            <div className="cart-totals-label">Shipping</div>
            <div className="cart-shipping-options">
              <label className="cart-shipping-option">
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  checked={shippingOption === "free"}
                  onChange={handleShippingChange}
                />
                <span>Free shipping</span>
              </label>
              <label className="cart-shipping-option">
                <input
                  type="radio"
                  name="shipping"
                  value="local"
                  checked={shippingOption === "local"}
                  onChange={handleShippingChange}
                />
                <span>Local pickup: $5.00</span>
              </label>
              <label className="cart-shipping-option">
                <input
                  type="radio"
                  name="shipping"
                  value="flat"
                  checked={shippingOption === "flat"}
                  onChange={handleShippingChange}
                />
                <span>Flat rate: $15.00</span>
              </label>
            </div>
            <p className="cart-shipping-note">
              Shipping options will be updated during checkout.
            </p>
          </div>

          <div className="cart-totals-row cart-totals-total">
            <span className="cart-totals-label">Total</span>
            <span className="cart-totals-value">${total.toFixed(2)}</span>
          </div>

          <button className="cart-checkout-btn" onClick={handleProceedToCheckout}>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}