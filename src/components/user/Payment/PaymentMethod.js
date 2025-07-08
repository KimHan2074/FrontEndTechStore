import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../pages/user/Payment/Payment.css";
import axios from "axios";

const paymentMap = {
  cash: "COD",
  momo: "Momo",
  vnpay: "VNPay",
  qr: "QR",
};

const PaymentIcon = ({ type }) => {
  switch (type) {
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

const useCheckoutData = () => {
  const [data, setData] = useState({
    products: [],
    subtotal: 0,
    discount: 0,
    shippingFee: 0,
    total: 0,
  });

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("checkoutData"));
    if (localData) {
      const total = (localData.subtotal || 0) - (localData.discount || 0) + (localData.shippingCost || 0);
      setData({
        products: localData.items || [],
        subtotal: localData.subtotal || 0,
        discount: localData.discount || 0,
        shippingFee: localData.shippingCost || 0,
        total,
      });
    }
  }, []);

  return data;
};

const PaymentMethod = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const navigate = useNavigate();
  const { products, subtotal, discount, shippingFee, total } = useCheckoutData();

  const handleAccept = async () => {
    if (!selectedPayment) return alert("Please select a payment method.");
    const orderId = localStorage.getItem("currentOrderId");
    if (!orderId) return alert("Order ID not found.");
    const amountVND = Math.round(total * 24000);

    try {
      setIsLoading(true);
      if (selectedPayment === "qr") {
        if (!showQRCode) return setShowQRCode(true);
        await axios.post("http://localhost:8000/api/user/orders/confirm-payment", {
          order_id: orderId,
          method: paymentMap[selectedPayment],
        });
        alert("✅ Your QR payment has been successfully confirmed!");
        return navigate("/user/payment_confirmation");
      }

      await fetch("http://localhost:8000/api/user/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          order_id: orderId,
          payment_method: selectedPayment,
          amount: amountVND,
        }),
      });

      if (selectedPayment === "cash") {
        await axios.post("http://localhost:8000/api/user/orders/confirm-payment", {
          order_id: orderId,
          method: paymentMap[selectedPayment],
        });
        alert("✅ You have successfully paid with cash!");
        return navigate("/user/payment_confirmation");
      }

      if (selectedPayment === "momo") {
        if (amountVND > 50000000) return alert("⚠️ MoMo supports payments up to 50 million VND.");
        const res = await fetch("http://localhost:8000/api/user/momo/create-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ amount: amountVND, order_id: orderId }),
        });
        const data = await res.json();
        if (data.payUrl) window.location.href = data.payUrl;
        else alert("Failed to create MoMo payment link.");
      }
    } catch (err) {
      alert("An error occurred while processing the payment.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const paymentMethods = [
    { id: "vnpay", name: "VNPay", description: "Payment via VNPay", icon: "card" },
    { id: "momo", name: "MoMo", description: "Payment via MoMo", icon: "phone" },
    { id: "cash", name: "Cash", description: "Payment via Cash", icon: "cash" },
    { id: "qr", name: "QR", description: "Payment via QR", icon: "qr" },
  ];

  return (
    <div className="payment-container-paymentMethod">
      <h1 className="payment-title-paymentMethod">Payment</h1>
      <div className="payment-content-paymentMethod">
        <div className="left-section-paymentMethod">
          <div className="step-section-paymentMethod completed-paymentMethod">
            <div className="step-header-paymentMethod">
              <div className="step-number-paymentMethod completed-paymentMethod">1</div>
              <h2>Information Order</h2>
            </div>
          </div>

          <div className="step-section-paymentMethod active-paymentMethod">
            <div className="step-header-paymentMethod">
              <div className="step-number-paymentMethod active-paymentMethod">2</div>
              <h2>Payment Method</h2>
            </div>

            <div className="payment-methods-paymentMethod">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`payment-option-paymentMethod ${selectedPayment === method.id ? "selected-paymentMethod" : ""}`}
                  onClick={() => {
                    setSelectedPayment(method.id);
                    setShowQRCode(method.id === "qr");
                  }}
                >
                  <div className="payment-icon-paymentMethod"><PaymentIcon type={method.icon} /></div>
                  <div className="payment-info-paymentMethod">
                    <h3>{method.name}</h3>
                    <p>{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedPayment === "qr" && showQRCode && (
              <div className="qr-code-container-paymentMethod" style={{ marginTop: "20px" }}>
                <h4>Please scan the QR code to pay:</h4>
                <img
                  className="qr-image-paymentMethod"
                  src="/assets/images/QR_Code.png"
                  alt="QR Code"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              </div>
            )}

            <div className="payment-footer-paymentMethod">
              <div className="total-section-paymentMethod">
                <span className="total-label-paymentMethod">Total:</span>
                <span className="total-amount-paymentMethod">${total.toFixed(2)}</span>
              </div>
              <button
                className="accept-btn-paymentMethod"
                onClick={handleAccept}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Accept"}
              </button>
            </div>
          </div>

          <div className="step-section-paymentMethod">
            <div className="step-header-paymentMethod">
              <div className="step-number-paymentMethod">3</div>
              <h2>Order Confirmation</h2>
            </div>
          </div>
        </div>

        <div className="right-section-paymentMethod">
          <div className="product-section-paymentMethod">
            <h3>Products</h3>
            <div className="product-list-paymentMethod">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.cart_item_id} className="product-item-paymentMethod">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image-paymentMethod" />
                    <div className="product-details-paymentMethod">
                      <h4>{product.name}</h4>
                      <p className="quantity-paymentMethod">Quantity: {product.quantity}</p>
                      <div className="price-container-paymentMethod">
                        <span className="current-price-paymentMethod">
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

          <div className="order-summary-paymentMethod">
            <h3>Order Summary</h3>
            <div className="summary-row-paymentMethod"><span>Subtotal</span><span className="price-blue-paymentMethod">${subtotal.toFixed(2)}</span></div>
            <div className="summary-row-paymentMethod"><span>Discount</span><span className="price-blue-paymentMethod">- ${discount.toFixed(2)}</span></div>
            <div className="summary-row-paymentMethod"><span>Shipping Fee</span><span className="price-blue-paymentMethod">${shippingFee.toFixed(2)}</span></div>
            <div className="summary-row-paymentMethod total-row-paymentMethod"><span>Total</span><span className="price-blue-paymentMethod">${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
