

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../../pages/user/Payment/Payment.css";
// import axios from "axios";
// import InformationProductDetail from "./InformationProductDetail";

// const paymentMap = {
//   cash: "COD",
//   momo: "Momo",
//   qr: "QR",
//   vnpay: "VNPay",
// };

// const PaymentIcon = ({ type }) => {
//   switch (type) {
//     case "card":
//       return <svg width="24" height="24"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>;
//     case "phone":
//       return <svg width="24" height="24"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>;
//     case "cash":
//       return <svg width="24" height="24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
//     case "qr":
//       return <svg width="24" height="24"><rect x="3" y="3" width="5" height="5" /><rect x="16" y="3" width="5" height="5" /><rect x="3" y="16" width="5" height="5" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" /></svg>;
//     default:
//       return null;
//   }
// };

// const PaymentMethod = () => {
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showQRCode, setShowQRCode] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [shippingFee, setShippingFee] = useState(0);
//   const [total, setTotal] = useState(0);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const orderId = localStorage.getItem("currentOrderId");

//   const handleAccept = async () => {
//     if (!selectedPayment) return alert("Please select a payment method.");
//     if (!orderId) return alert("Order ID not found.");

//     const exchangeRate = 24000;
//     const amountVND = Math.round(total * exchangeRate);
//     const checkoutDataString = localStorage.getItem("checkoutData");
//     let checkoutData = null;

//     if (checkoutDataString) {
//       try { checkoutData = JSON.parse(checkoutDataString); } 
//       catch (err) { console.error(err); }
//     }

//     setIsLoading(true);

//     try {
//       // Cash / QR
//       if (["cash", "qr"].includes(selectedPayment)) {
//         if (selectedPayment === "qr" && !showQRCode) return setShowQRCode(true);

//         await axios.post(
//           "https://backendtechstore1-production.up.railway.app/api/user/orders/confirm-payment",
//           {
//             order_id: orderId,
//             method: paymentMap[selectedPayment],
//             items: checkoutData?.items.map(i => ({
//               product_id: i.product_id,
//               quantity: i.quantity,
//               unit_price: i.unit_price,
//               color: i.color || "",
//             })) || [],
//           }
//         );

//         navigate("/user/payment_confirmation");
//         return;
//       }

//       // MoMo
//       if (selectedPayment === "momo") {
//         if (amountVND > 50000000) return alert("⚠️ MoMo supports payments up to 50 million VND.");
//         const res = await fetch(
//           "https://backendtechstore1-production.up.railway.app/api/user/momo/create-payment",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             credentials: "include",
//             body: JSON.stringify({ amount: amountVND, order_id: orderId }),
//           }
//         );
//         const data = await res.json();
//         if (data.payUrl) {
//           window.location.href = data.payUrl;
//         }
//         return;
//       }

//       // VNPay
//       if (selectedPayment === "vnpay") {
//         const res = await axios.post(
//           "https://backendtechstore1-production.up.railway.app/api/user/create-payment",
//           { amount: amountVND, order_id: orderId }
//         );
//         if (res.data?.url) window.location.href = res.data.url;
//         return;
//       }

//     } catch (err) {
//       alert("Payment error!");
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const paymentMethods = [
//     { id: "momo", name: "MoMo", description: "Payment via MoMo", icon: "phone" },
//     { id: "cash", name: "Cash", description: "Payment via Cash", icon: "cash" },
//     { id: "qr", name: "QR", description: "Payment via QR", icon: "qr" },
//     { id: "vnpay", name: "VNPay", description: "Payment via VNPay", icon: "card" },
//   ];

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await fetch(`https://backendtechstore1-production.up.railway.app/api/user/orders/${orderId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) throw new Error("Failed to fetch order");
//         const data = await res.json();
//         if (data.order) setTotal(parseFloat(data.order.total_amount || 0));
//       } catch (err) {
//         console.error("Error fetching order in PaymentMethod:", err.message);
//       }
//     };

//     if (orderId && token) fetchOrder();
//   }, [orderId, token]);

//   return (
//     <div className="payment-container-paymentMethod">
//       <h1 className="payment-title-paymentMethod">Payment</h1>
//       <div className="payment-content-paymentMethod">
//         <div className="left-section-paymentMethod">
//           <div className="step-section-paymentMethod completed-paymentMethod">
//             <div className="step-header-paymentMethod">
//               <div className="step-number-paymentMethod completed-paymentMethod">1</div>
//               <h2>Information Order</h2>
//             </div>
//           </div>

//           <div className="step-section-paymentMethod active-paymentMethod">
//             <div className="step-header-paymentMethod">
//               <div className="step-number-paymentMethod active-paymentMethod">2</div>
//               <h2>Payment Method</h2>
//             </div>

//             <div className="payment-methods-paymentMethod">
//               {paymentMethods.map((method) => (
//                 <div
//                   key={method.id}
//                   className={`payment-option-paymentMethod ${selectedPayment === method.id ? "selected-paymentMethod" : ""}`}
//                   onClick={() => {
//                     setSelectedPayment(method.id);
//                     setShowQRCode(method.id === "qr");
//                   }}
//                 >
//                   <div className="payment-icon-paymentMethod"><PaymentIcon type={method.icon} /></div>
//                   <div className="payment-info-paymentMethod">
//                     <h3>{method.name}</h3>
//                     <p>{method.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {selectedPayment === "qr" && showQRCode && (
//               <div className="qr-code-container-paymentMethod" style={{ marginTop: "20px" }}>
//                 <h4>Please scan the QR code to pay:</h4>
//                 <img
//                   className="qr-image-paymentMethod"
//                   src="/assets/images/QR_Code.png"
//                   alt="QR Code"
//                   style={{ maxWidth: "200px", marginTop: "10px" }}
//                 />
//               </div>
//             )}

//             {selectedPayment === "vnpay" && (
//               <div style={{ marginTop: "20px", fontStyle: "italic", color: "#555" }}>
//                 You will be redirected to VNPay to complete the payment.
//               </div>
//             )}

//             <div className="payment-footer-paymentMethod">
//               <div className="total-section-paymentMethod">
//                 <span className="total-label-paymentMethod">Total:</span>
//                 <span className="total-amount-paymentMethod">${total.toFixed(2)}</span>
//               </div>

//               <button
//                 className="accept-btn-paymentMethod"
//                 onClick={handleAccept}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Processing..." : "Accept"}
//               </button>
//             </div>
//           </div>

//           <div className="step-section-paymentMethod">
//             <div className="step-header-paymentMethod">
//               <div className="step-number-paymentMethod">3</div>
//               <h2>Order Confirmation</h2>
//             </div>
//           </div>
//         </div>

//         <div className="right-section-paymentMethod">
//           <InformationProductDetail
//             products={products}
//             subtotal={subtotal}
//             discount={discount}
//             shippingFee={shippingFee}
//             total={total}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentMethod;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../pages/user/Payment/Payment.css";
import axios from "axios";
import InformationProductDetail from "./InformationProductDetail";

const paymentMap = {
  cash: "COD",
  momo: "Momo",
  qr: "QR",
  vnpay: "VNPay",
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

const PaymentMethod = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const orderId = localStorage.getItem("currentOrderId");

  const handleAccept = async () => {
    if (!selectedPayment) return alert("Please select a payment method.");
    if (!orderId) return alert("Order ID not found.");

    const checkoutDataString = localStorage.getItem("checkoutData");
    let checkoutData = null;
    if (checkoutDataString) {
      try {
        checkoutData = JSON.parse(checkoutDataString);
      } catch (err) {
        console.error("Invalid checkout data:", err);
        return alert("Invalid checkout data!");
      }
    }
    if (!checkoutData) return alert("Checkout data not found!");

    const exchangeRate = 24000;
    const amountVND = Math.round(total * exchangeRate);

    if (selectedPayment === "momo" && amountVND <= 0) {
      return alert("Invalid amount for MoMo payment.");
    }

    console.log("Payment info:", {
      orderId,
      selectedPayment,
      amountVND,
      checkoutItems: checkoutData.items,
    });

    setIsLoading(true);

    try {
      // Cash / QR
      if (["cash", "qr"].includes(selectedPayment)) {
        if (selectedPayment === "qr" && !showQRCode) {
          setShowQRCode(true);
          return;
        }

        await axios.post(
          "https://backendtechstore1-production.up.railway.app/api/user/orders/confirm-payment",
          {
            order_id: orderId,
            method: paymentMap[selectedPayment],
            items:
              checkoutData.items.map((i) => ({
                product_id: i.product_id,
                quantity: i.quantity,
                unit_price: i.unit_price,
                color: i.color || "",
              })) || [],
          }
        );

        navigate("/user/payment_confirmation", {
          state: {
            orderId,
            customerInfo: checkoutData.customer,
            paymentMethod: selectedPayment,
            orderItems: checkoutData.items,
            subtotal,
            shippingFee,
            discount,
            total,
          },
        });
        return;
      }
console.log("Sending VNPay request:", {
  amount: amountVND,
  order_id: orderId,
  token
});

try {
  const res = await axios.post(
    "https://backendtechstore1-production.up.railway.app/api/user/create-payment",
    { amount: amountVND, order_id: orderId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log("VNPay response:", res.data);
  if (res.data?.url) window.location.href = res.data.url;
} catch (err) {
  console.error("VNPay Payment error:", err.response?.data || err.message);
}

      // MoMo
      if (selectedPayment === "momo") {
        if (amountVND > 50000000)
          return alert("⚠️ MoMo supports payments up to 50 million VND.");

        const res = await fetch(
          "https://backendtechstore1-production.up.railway.app/api/user/momo/create-payment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ amount: amountVND, order_id: orderId }),
          }
        );
        const data = await res.json();
        console.log("MoMo response:", data);
        if (data.payUrl) window.location.href = data.payUrl;
        else alert("MoMo payment failed!");
        return;
      }

      // VNPay
      if (selectedPayment === "vnpay") {
        const res = await axios.post(
          "https://backendtechstore1-production.up.railway.app/api/user/create-payment",
          { amount: amountVND, order_id: orderId }
        );
        if (res.data?.url) window.location.href = res.data.url;
        return;
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment error!");
    } finally {
      setIsLoading(false);
    }
  };

  const paymentMethods = [
    { id: "momo", name: "MoMo", description: "Payment via MoMo", icon: "phone" },
    { id: "cash", name: "Cash", description: "Payment via Cash", icon: "cash" },
    { id: "qr", name: "QR", description: "Payment via QR", icon: "qr" },
    { id: "vnpay", name: "VNPay", description: "Payment via VNPay", icon: "card" },
  ];
useEffect(() => {
  const fetchOrder = async () => {
    if (!orderId || !token) return;
    try {
      const res = await axios.get(
        `https://backendtechstore1-production.up.railway.app/api/user/orders/${orderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const orderTotal = parseFloat(res.data.order?.total_amount || 0);
      setTotal(orderTotal);
    } catch (err) {
      console.error("Fetch order error:", err);
    }
  };
  fetchOrder();
}, [orderId, token]);
  return (
    <div className="payment-container-paymentMethod">
      <h1 className="payment-title-paymentMethod">Payment</h1>
      <div className="payment-content-paymentMethod">
        <div className="left-section-paymentMethod">
          {/* Step 1 */}
          <div className="step-section-paymentMethod completed-paymentMethod">
            <div className="step-header-paymentMethod">
              <div className="step-number-paymentMethod completed-paymentMethod">1</div>
              <h2>Information Order</h2>
            </div>
          </div>

          {/* Step 2 */}
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

            {selectedPayment === "vnpay" && (
              <div style={{ marginTop: "20px", fontStyle: "italic", color: "#555" }}>
                You will be redirected to VNPay to complete the payment.
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

          {/* Step 3 */}
          <div className="step-section-paymentMethod">
            <div className="step-header-paymentMethod">
              <div className="step-number-paymentMethod">3</div>
              <h2>Order Confirmation</h2>
            </div>
          </div>
        </div>

        <div className="right-section-paymentMethod">
          <InformationProductDetail
            products={products}
            subtotal={subtotal}
            discount={discount}
            shippingFee={shippingFee}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
