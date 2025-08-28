// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../../../pages/user/Payment/Payment.css";
// // import axios from "axios";
// // import InformationProductDetail from "./InformationProductDetail";

// // const paymentMap = {
// //   cash: "COD",
// //   momo: "Momo",
// //   qr: "QR",
// //   vnpay: "VNPay",
// // };

// // const PaymentIcon = ({ type }) => {
// //   switch (type) {
// //     case "card":
// //       return <i className="fa-solid fa-credit-card"></i>;
// //     case "phone":
// //       return <i className="fa-solid fa-mobile-screen"></i>;
// //     case "cash":
// //       return <i className="fa-solid fa-money-bill-wave"></i>;
// //     case "qr":
// //       return <i className="fa-solid fa-qrcode"></i>;
// //     default:
// //       return null;
// //   }
// // };

// // const PaymentMethod = () => {
// //   const [selectedPayment, setSelectedPayment] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [products, setProducts] = useState([]);
// //   const [subtotal, setSubtotal] = useState(0);
// //   const [discount, setDiscount] = useState(0);
// //   const [shippingFee, setShippingFee] = useState(0);
// //   const [total, setTotal] = useState(0);

// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");
// //   const orderId = localStorage.getItem("currentOrderId");

// // const handleAccept = async () => {
// //   if (isLoading) return; // tránh click liên tục
// //   if (!selectedPayment) return alert("Please select a payment method.");
// //   if (!orderId) return alert("Order ID not found.");

// //   const checkoutDataString = localStorage.getItem("checkoutData");
// //   let checkoutData = null;
// //   try {
// //     checkoutData = checkoutDataString ? JSON.parse(checkoutDataString) : null;
// //   } catch (err) {
// //     return alert("Invalid checkout data!");
// //   }
// //   if (!checkoutData) return alert("Checkout data not found!");

// //   const exchangeRate = 24000;
// //   const amountVND = Math.round(total * exchangeRate);

// //   setIsLoading(true);

// //   try {
// //     // 🟢 COD & QR
// //     if (selectedPayment === "cash" || selectedPayment === "qr") {
// //       await axios.post(
// //         "https://backendtechstore1-production.up.railway.app/api/user/orders/confirm-payment",
// //         {
// //           order_id: orderId,
// //           method: paymentMap[selectedPayment],
// //           items: checkoutData.items.map((i) => ({
// //             product_id: i.product_id,
// //             quantity: i.quantity,
// //             unit_price: i.unit_price,
// //             color: i.color || "",
// //           })),
// //         }
// //       );

// //       navigate("/user/payment_confirmation", {
// //         state: {
// //           orderId,
// //           customerInfo: checkoutData.customer,
// //           paymentMethod: selectedPayment,
// //           orderItems: checkoutData.items,
// //           subtotal,
// //           shippingFee,
// //           discount,
// //           total,
// //         },
// //       });
// //       return;
// //     }


// //     if (selectedPayment === "momo") {
// //       if (amountVND <= 0) return alert("Invalid amount for MoMo payment.");
// //       if (amountVND > 50000000)
// //         return alert("⚠️ MoMo supports payments up to 50 million VND.");

// //       const res = await fetch(
// //         "https://backendtechstore1-production.up.railway.app/api/user/momo/create-payment",
// //         {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           credentials: "include",
// //           body: JSON.stringify({ amount: amountVND, order_id: orderId }),
// //         }
// //       );
// //       const data = await res.json();
// //       if (data.payUrl) {
// //         window.location.href = data.payUrl;
// //       } else {
// //         alert("MoMo payment failed!");
// //       }
// //       return;
// //     }

// //     // 🟡 VNPay
// //     if (selectedPayment === "vnpay") {
// //       const res = await axios.post(
// //         "https://backendtechstore1-production.up.railway.app/api/user/create-payment",
// //         { amount: amountVND, order_id: orderId },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       if (res.data?.url) window.location.href = res.data.url;
// //       return;
// //     }
// //   } catch (err) {
// //     console.error("Payment error:", err);
// //     alert("Payment error!");
// //   } finally {
// //     setIsLoading(false);
// //   }
// // };


// //   const paymentMethods = [
// //     { id: "momo", name: "MoMo", description: "Payment via MoMo", icon: "phone" },
// //     { id: "cash", name: "Cash", description: "Payment via Cash", icon: "cash" },
// //     { id: "qr", name: "QR", description: "Payment via QR code", icon: "qr" },
// //     { id: "vnpay", name: "VNPay", description: "Payment via VNPay", icon: "card" },
// //   ];

// //   useEffect(() => {
// //     const fetchOrder = async () => {
// //       if (!orderId || !token) return;
// //       try {
// //         const res = await axios.get(
// //           `https://backendtechstore1-production.up.railway.app/api/user/orders/${orderId}`,
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
// //         const orderTotal = parseFloat(res.data.order?.total_amount || 0);
// //         setTotal(orderTotal);
// //       } catch (err) {
// //         console.error("Fetch order error:", err);
// //       }
// //     };
// //     fetchOrder();
// //   }, [orderId, token]);

// //   return (
// //     <div className="payment-container-paymentMethod">
// //       <h1 className="payment-title-paymentMethod">Payment</h1>
// //       <div className="payment-content-paymentMethod">
// //         <div className="left-section-paymentMethod">
// //           {/* Step 1 */}
// //           <div className="step-section-paymentMethod completed-paymentMethod">
// //             <div className="step-header-paymentMethod">
// //               <div className="step-number-paymentMethod completed-paymentMethod">1</div>
// //               <h2>Information Order</h2>
// //             </div>
// //           </div>

// //           {/* Step 2 */}
// //           <div className="step-section-paymentMethod active-paymentMethod">
// //             <div className="step-header-paymentMethod">
// //               <div className="step-number-paymentMethod active-paymentMethod">2</div>
// //               <h2>Payment Method</h2>
// //             </div>

// //             <div className="payment-methods-paymentMethod">
// //               {paymentMethods.map((method) => (
// //                 <div
// //                   key={method.id}
// //                   className={`payment-option-paymentMethod ${selectedPayment === method.id ? "selected-paymentMethod" : ""}`}
// //                   onClick={() => setSelectedPayment(method.id)}
// //                 >
// //                   <div className="payment-icon-paymentMethod">
// //                     <PaymentIcon type={method.icon} />
// //                   </div>
// //                   <div className="payment-info-paymentMethod">
// //                     <h3>{method.name}</h3>
// //                     <p>{method.description}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {selectedPayment === "qr" && (
// //               <div className="qr-code-container-paymentMethod" style={{ marginTop: "20px" }}>
// //                 <h4>Please scan the QR code to pay:</h4>
// //                 <img
// //                   className="qr-image-paymentMethod"
// //                   src="/assets/images/QR_Code.png"
// //                   alt="QR Code"
// //                   style={{ maxWidth: "200px", marginTop: "10px" }}
// //                 />
// //               </div>
// //             )}

// //             {selectedPayment === "vnpay" && (
// //               <div style={{ marginTop: "20px", fontStyle: "italic", color: "#555" }}>
// //                 You will be redirected to VNPay to complete the payment.
// //               </div>
// //             )}

// //             <div className="payment-footer-paymentMethod">
// //               <div className="total-section-paymentMethod">
// //                 <span className="total-label-paymentMethod">Total:</span>
// //                 <span className="total-amount-paymentMethod">${total.toFixed(2)}</span>
// //               </div>

// //              <button
// //   className="accept-btn-paymentMethod"
// //   onClick={handleAccept}
// //   disabled={isLoading}
// // >
// //   {isLoading ? "Processing..." : "Accept"}
// // </button>

// //             </div>
// //           </div>

// //           {/* Step 3 */}
// //           <div className="step-section-paymentMethod">
// //             <div className="step-header-paymentMethod">
// //               <div className="step-number-paymentMethod">3</div>
// //               <h2>Order Confirmation</h2>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="right-section-paymentMethod">
// //           <InformationProductDetail
// //             products={products}
// //             subtotal={subtotal}
// //             discount={discount}
// //             shippingFee={shippingFee}
// //             total={total}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentMethod;




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
//       return <i className="fa-solid fa-credit-card"></i>;
//     case "phone":
//       return <i className="fa-solid fa-mobile-screen"></i>;
//     case "cash":
//       return <i className="fa-solid fa-money-bill-wave"></i>;
//     case "qr":
//       return <i className="fa-solid fa-qrcode"></i>;
//     default:
//       return null;
//   }
// };

// const PaymentMethod = () => {
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [shippingFee, setShippingFee] = useState(0);
//   const [total, setTotal] = useState(0);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const orderId = localStorage.getItem("currentOrderId");

//   const handleAccept = async () => {
//     if (isLoading) return; // tránh click liên tục
//     if (!selectedPayment) return alert("Please select a payment method.");
//     if (!orderId) return alert("Order ID not found.");

//     const checkoutDataString = localStorage.getItem("checkoutData");
//     let checkoutData = null;
//     try {
//       checkoutData = checkoutDataString ? JSON.parse(checkoutDataString) : null;
//     } catch (err) {
//       return alert("Invalid checkout data!");
//     }
//     if (!checkoutData) return alert("Checkout data not found!");

//     const exchangeRate = 24000;
//     const amountVND = Math.round(total * exchangeRate);

//     setIsLoading(true);

//     try {
//       // 🟢 COD & QR
//       if (selectedPayment === "cash" || selectedPayment === "qr") {
//         await axios.post(
//           "https://backendtechstore1-production.up.railway.app/api/user/orders/confirm-payment",
//           {
//             order_id: orderId,
//             method: paymentMap[selectedPayment],
//             items: checkoutData.items.map((i) => ({
//               product_id: i.product_id,
//               quantity: i.quantity,
//               unit_price: i.unit_price,
//               color: i.color || "",
//             })),
//           }
//         );

//         navigate("/user/payment_confirmation", {
//           state: {
//             orderId,
//             customerInfo: checkoutData.customer,
//             paymentMethod: selectedPayment,
//             orderItems: checkoutData.items,
//             subtotal,
//             shippingFee,
//             discount,
//             total,
//           },
//         });
//         return;
//       }


//       if (selectedPayment === "momo") {
//         if (amountVND <= 0) return alert("Invalid amount for MoMo payment.");
//         if (amountVND > 50000000)
//           return alert("⚠️ MoMo supports payments up to 50 million VND.");

//         try {
//           await axios.post(
//             "https://backendtechstore1-production.up.railway.app/api/user/orders/confirm-payment",
//             {
//               order_id: orderId,
//               method: paymentMap[selectedPayment], // "Momo"
//               items: checkoutData.items.map((i) => ({
//                 product_id: i.product_id,
//                 quantity: i.quantity,
//                 unit_price: i.unit_price,
//                 color: i.color || "",
//               })),
//             }
//           );

//           navigate("/user/payment_confirmation", {
//             state: {
//               orderId,
//               customerInfo: checkoutData.customer,
//               paymentMethod: selectedPayment, // ✅ sửa lại
//               orderItems: checkoutData.items,
//               subtotal,
//               shippingFee,
//               discount,
//               total,
//             },
//           });
//         } catch (err) {
//           console.error("MoMo confirm error:", err);
//           alert("MoMo payment failed!");
//         }
//         return;
//       }


//       // 🟡 VNPay
//       if (selectedPayment === "vnpay") {
//         const res = await axios.post(
//           "https://backendtechstore1-production.up.railway.app/api/user/create-payment",
//           { amount: amountVND, order_id: orderId },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (res.data?.url) window.location.href = res.data.url;
//         return;
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment error!");
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   const paymentMethods = [
//     { id: "momo", name: "MoMo", description: "Payment via MoMo", icon: "phone" },
//     { id: "cash", name: "Cash", description: "Payment via Cash", icon: "cash" },
//     { id: "qr", name: "QR", description: "Payment via QR code", icon: "qr" },
//     { id: "vnpay", name: "VNPay", description: "Payment via VNPay", icon: "card" },
//   ];

//   useEffect(() => {
//     const fetchOrder = async () => {
//       if (!orderId || !token) return;
//       try {
//         const res = await axios.get(
//           `https://backendtechstore1-production.up.railway.app/api/user/orders/${orderId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const orderTotal = parseFloat(res.data.order?.total_amount || 0);
//         setTotal(orderTotal);
//       } catch (err) {
//         console.error("Fetch order error:", err);
//       }
//     };
//     fetchOrder();
//   }, [orderId, token]);

//   return (
//     <div className="payment-container-paymentMethod">
//       <h1 className="payment-title-paymentMethod">Payment</h1>
//       <div className="payment-content-paymentMethod">
//         <div className="left-section-paymentMethod">
//           {/* Step 1 */}
//           <div className="step-section-paymentMethod completed-paymentMethod">
//             <div className="step-header-paymentMethod">
//               <div className="step-number-paymentMethod completed-paymentMethod">1</div>
//               <h2>Information Order</h2>
//             </div>
//           </div>

//           {/* Step 2 */}
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
//                   onClick={() => setSelectedPayment(method.id)}
//                 >
//                   <div className="payment-icon-paymentMethod">
//                     <PaymentIcon type={method.icon} />
//                   </div>
//                   <div className="payment-info-paymentMethod">
//                     <h3>{method.name}</h3>
//                     <p>{method.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {selectedPayment === "qr" && (
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
//                 disabled={isLoading || !selectedPayment} // 🔹 chỉ enable khi đã chọn
//               >
//                 {isLoading ? "Processing..." : "Accept"}
//               </button>


//             </div>
//           </div>

//           {/* Step 3 */}
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
    case "card": return <i className="fa-solid fa-credit-card"></i>;
    case "phone": return <i className="fa-solid fa-mobile-screen"></i>;
    case "cash": return <i className="fa-solid fa-money-bill-wave"></i>;
    case "qr": return <i className="fa-solid fa-qrcode"></i>;
    default: return null;
  }
};

const PaymentMethod = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const orderId = localStorage.getItem("currentOrderId");

  const handleAccept = async () => {
    if (isLoading) return;
    if (!selectedPayment) return alert("Please select a payment method.");
    if (!orderId) return alert("Order ID not found.");

    const checkoutDataString = localStorage.getItem("checkoutData");
    let checkoutData = null;
    try {
      checkoutData = checkoutDataString ? JSON.parse(checkoutDataString) : null;
    } catch (err) {
      return alert("Invalid checkout data!");
    }
    if (!checkoutData) return alert("Checkout data not found!");

    const exchangeRate = 24000;
    const amountVND = Math.round(total * exchangeRate);

    setIsLoading(true);

    try {
      // COD & QR
      if (selectedPayment === "cash" || selectedPayment === "qr") {
        await axios.post(
          "https://backendtechstore1-production.up.railway.app/api/user/orders/confirm-payment",
          {
            order_id: orderId,
            method: paymentMap[selectedPayment],
            items: checkoutData.items.map((i) => ({
              product_id: i.product_id,
              quantity: i.quantity,
              unit_price: i.unit_price,
              color: i.color || "",
            })),
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
            paymentStatus: "success",
          },
        });
        return;
      }

      // MoMo
      if (selectedPayment === "momo") {
        if (amountVND <= 0) return alert("Invalid amount for MoMo payment.");
        if (amountVND > 50000000) return alert("⚠️ MoMo supports payments up to 50 million VND.");

        // Confirm order first
        await axios.post(
          "https://backendtechstore1-production.up.railway.app/api/user/orders/confirm-payment",
          {
            order_id: orderId,
            method: paymentMap[selectedPayment],
            items: checkoutData.items.map((i) => ({
              product_id: i.product_id,
              quantity: i.quantity,
              unit_price: i.unit_price,
              color: i.color || "",
            })),
          }
        );

        // Redirect to MoMo payment page (backend trả link MoMo)
        const res = await axios.post(
          "https://backendtechstore1-production.up.railway.app/api/user/momo/create-payment",
          { order_id: orderId, amount: amountVND }
        );

        if (res.data?.payUrl) {
          window.location.href = res.data.payUrl;
        } else {
          alert("MoMo payment failed!");
        }
        return;
      }

      // VNPay
      if (selectedPayment === "vnpay") {
        const res = await axios.post(
          "https://backendtechstore1-production.up.railway.app/api/user/create-payment",
          { amount: amountVND, order_id: orderId },
          { headers: { Authorization: `Bearer ${token}` } }
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
    { id: "qr", name: "QR", description: "Payment via QR code", icon: "qr" },
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
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <div className="payment-icon-paymentMethod">
                    <PaymentIcon type={method.icon} />
                  </div>
                  <div className="payment-info-paymentMethod">
                    <h3>{method.name}</h3>
                    <p>{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedPayment === "qr" && (
              <div className="qr-code-container-paymentMethod" style={{ marginTop: "20px" }}>
                <h4>Please scan the QR code to pay:</h4>
                <img className="qr-image-paymentMethod" src="/assets/images/QR_Code.png" alt="QR Code" style={{ maxWidth: "200px", marginTop: "10px" }} />
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
                disabled={isLoading || !selectedPayment}
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
