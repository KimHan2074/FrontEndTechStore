import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../pages/user/Payment/Payment.css";
import axios from "axios";

const PaymentMethod = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const navigate = useNavigate();

  const paymentMethods = [
    { id: "vnpay", name: "VNPay", description: "Payment via VNPay", icon: "card" },
    { id: "momo", name: "MoMo", description: "Payment via MoMo", icon: "phone" },
    { id: "cash", name: "Cash", description: "Payment via Cash", icon: "cash" },
    { id: "qr", name: "QR", description: "Payment via QR", icon: "qr" },
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkoutData"));
    if (data) {
      setProducts(data.items || []);
      setSubtotal(data.subtotal || 0);
      setDiscount(data.discount || 0);
      setShippingFee(data.shippingCost || 0);
      const totalCalc = (data.subtotal || 0) - (data.discount || 0) + (data.shippingCost || 0);
      setTotal(totalCalc);
    }
  }, []);

  const handlePaymentSelect = (methodId) => {
    setSelectedPayment(methodId);
    setShowQRCode(methodId === "qr");
  };

  const handleAccept = async () => {
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }

    const orderId = localStorage.getItem("currentOrderId");
    if (!orderId) {
      alert("Order ID not found. Please go back to the information input step.");
      return;
    }

    const exchangeRate = 24000;
    const amountVND = Math.round(total * exchangeRate);

    try {
      if (selectedPayment === "qr") {
        if (!showQRCode) {
          setShowQRCode(true);
          return;
        }
        setIsLoading(true);
        await axios.post("http://localhost:8000/api/user/orders/confirm-payment", {
          order_id: orderId,
          method: "QR",
        });

        alert("✅Your QR payment has been successfully confirmed!");
        navigate("/user/payment_confirmation");
        return;
      }

      const res = await fetch("http://localhost:8000/api/user/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          order_id: orderId,
          payment_method: selectedPayment,
          amount: amountVND,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert("Error saving the payment method: Invalid payment ID. " + result.message);
        return;
      }

      if (selectedPayment === "momo") {
        if (amountVND > 50000000) {
          alert("⚠️ MoMo supports payments ranging from 10,000 VND to under 50 million VND only.");
          return;
        }

        setIsLoading(true);
        const momoRes = await fetch("http://localhost:8000/api/user/momo/create-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ amount: amountVND, order_id: orderId }),
        });

        const momoData = await momoRes.json();
        if (momoData.payUrl) {
          window.location.href = momoData.payUrl;
        } else {
          alert("Failed to create MoMo payment link.");
        }
      } else {
        alert(`Sorry, the "${selectedPayment}" payment method is not currently supported.`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing the payment.");

    } finally {
      setIsLoading(false);
    }
  };

  const renderPaymentIcon = (iconType) => {
    switch (iconType) {
      case "card":
        return <svg width="24" height="24"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>;
      case "phone":
        return <svg width="24" height="24"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>;
      case "cash":
        return <svg width="24" height="24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
      case "qr":
        return <svg width="24" height="24"><rect x="3" y="3" width="5" height="5" /><rect x="16" y="3" width="5" height="5" /><rect x="3" y="16" width="5" height="5" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" /></svg>;
      default:
        return null;
    }
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Payment</h1>
      <div className="payment-content">
        <div className="left-section">
          <div className="step-section completed">
            <div className="step-header">
              <div className="step-number completed">1</div>
              <h2>Information Order</h2>
            </div>
          </div>

          <div className="step-section active">
            <div className="step-header">
              <div className="step-number active">2</div>
              <h2>Payment Method</h2>
            </div>

            <div className="payment-methods">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`payment-option ${selectedPayment === method.id ? "selected" : ""}`}
                  onClick={() => handlePaymentSelect(method.id)}
                >
                  <div className="payment-icon">{renderPaymentIcon(method.icon)}</div>
                  <div className="payment-info">
                    <h3>{method.name}</h3>
                    <p>{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedPayment === "qr" && showQRCode && (
              <div className="qr-code-container" style={{ marginTop: "20px" }}>
                <h4>Vui lòng quét mã QR để thanh toán:</h4>
                <img className="QR-Code"
                  src="/assets/images/QR_Code.png"
                  alt="QR Code"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              </div>
            )}

            <div className="payment-footer">
              <div className="total-section">
                <span className="total-label">Total:</span>
                <span className="total-amount">${total.toFixed(2)}</span>
              </div>
              <button className="accept-btn" onClick={handleAccept} disabled={isLoading}>
                {isLoading ? "Processing..." : "Accept"}
              </button>
            </div>
          </div>

          <div className="step-section">
            <div className="step-header">
              <div className="step-number">3</div>
              <h2>Order Confirmation</h2>
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="product-section">
            <h3>Products</h3>
            <div className="product-list">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.cart_item_id} className="product-item-information-order">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="product-image-information-order"
                    />
                    <div className="product-details-information-order">
                      <h4>{product.name}</h4>
                      <p className="quantity-information-order">Quantity: {product.quantity}</p>
                      <div className="price-container-information-order">
                        <span className="current-price-information-order">
                          ${(product.unit_price * product.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><span className="price-blue">${subtotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>Discount</span><span className="price-blue">- ${discount.toFixed(2)}</span></div>
            <div className="summary-row"><span>Shipping Fee</span><span className="price-blue">${shippingFee.toFixed(2)}</span></div>
            <div className="summary-row total-row"><span>Total</span><span className="price-blue">${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
