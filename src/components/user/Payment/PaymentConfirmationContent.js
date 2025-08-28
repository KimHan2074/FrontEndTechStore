

// import React from "react"

// const PaymentConfirmation = ({
//   orderId,
//   customerInfo,
//   paymentMethod,
//   paymentStatus,
//   orderItems,
//   subtotal,
//   shippingFee,
//   discount,
//   total,
//   onConfirmOrder,
// }) => {
//   const steps = [
//     { number: 1, title: "Information Order", completed: true, active: false, confirmed: false },
//     { number: 2, title: "Payment Method", completed: true, active: false, confirmed: false },
//     { number: 3, title: "Order Confirmation", completed: false, active: true, confirmed: false },
//   ];

//   const UserIcon = () => (
//     <svg className="section-icon" fill="currentColor" viewBox="0 0 20 20">
//       <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//     </svg>
//   );

//   const CreditCardIcon = () => (
//     <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
//       />
//     </svg>
//   );

//   const PackageIcon = () => (
//     <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//       />
//     </svg>
//   );

//   const MailIcon = () => (
//     <svg className="mail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//       />
//     </svg>
//   );

//   const formatter = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 2,
//   });

//   subtotal = parseFloat(subtotal?.toString().replace(/,/g, "") || 0);
//   shippingFee = parseFloat(shippingFee?.toString().replace(/,/g, "") || 0);
//   discount = parseFloat(discount?.toString().replace(/,/g, "") || 0);
//   total = parseFloat(total?.toString().replace(/,/g, "") || 0);

//   return (
//     <div className="payment-container">
//       <h1 className="payment-title">Payment</h1>

//         <div className="steps-container">
//           {steps.map((step) => (
//             <div key={step.number} className={`step-item ${step.active ? "active" : ""}`}>
//               <div
//                 className={`step-number ${
//                   step.confirmed ? "confirmed" : step.active ? "active" : step.completed ? "completed" : ""
//                 }`}
//               >
//                 {step.confirmed ? "✓" : step.number}
//               </div>
//               <span className="step-title">{step.title}</span>
//             </div>
//           ))}
//         </div>

//       <div className="main-card">
//         <div className="card-content">
//           <div className="order-header">
//             <div className="order-id-main">Order {orderId}</div>
//             <div className="order-id-sub">Order {orderId}</div>
//           </div>

//           <div className="section">
//             <div className="section-header">
//               <UserIcon />
//               <h3 className="section_title">Customer Information</h3>
//             </div>
//             <div className="customer-info">
//               <div className="info-item"><div className="info-label">FullName</div><div className="info-value">{customerInfo.fullname}</div></div>
//               <div className="info-item"><div className="info-label">Email</div><div className="info-value">{customerInfo.email}</div></div>
//               <div className="info-item"><div className="info-label">Phone</div><div className="info-value">{customerInfo.phone}</div></div>
//               <div className="info-item"><div className="info-label">Address</div><div className="info-value">{customerInfo.address}</div></div>
//             </div>
//           </div>

//           <div className="section">
//             <div className="section-header">
//               <CreditCardIcon />
//               <h3 className="section_title">Payment method</h3>
//             </div>
//             <div className="payment-method-row">
//               <span className="payment-name">{paymentMethod}</span>
//               <span className="processing-badge">{paymentStatus}</span>
//             </div>
//           </div>

//           <div className="section">
//             <div className="section-header">
//               <PackageIcon />
//               <h3 className="section_title">Order</h3>
//             </div>
//             <div className="order-items">
//               {orderItems.map((item) => {
//                 const unitPrice = parseFloat(item.price?.toString().replace(/,/g, "") || 0);
//                 const totalItemPrice = unitPrice * item.quantity;

//                 return (
//                   <div key={item.id} className="order-item">
//                     <div className="item-image">
//                       <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px' }} />
//                     </div>
//                     <div className="item-details">
//                       <div className="item-name">{item.name}</div>
//                       <div className="item-description">Color: {item.color}</div>
//                       <div className="item-quantity">Qty: {item.quantity}</div>
//                     </div>
//                     <div className="item-price" style={{ fontWeight: "bold" }}>
//                       {formatter.format(totalItemPrice)}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="price-summary">
//             <div className="price-row">
//               <span className="price-label">Subtotal</span>
//               <span className="price-value" style={{ fontWeight: "bold" }}>{formatter.format(subtotal)}</span>
//             </div>
//             <div className="price-row">
//               <span className="price-label">Shipping Fee</span>
//               <span className="price-value" style={{ fontWeight: "bold" }}>{formatter.format(shippingFee)}</span>
//             </div>
//             <div className="price-row">
//               <span className="price-label">Discount</span>
//               <span className="price-value" style={{ fontWeight: "bold" }}>-{formatter.format(discount)}</span>
//             </div>
//             <div className="price-row">
//               <span className="price-label total">Total</span>
//               <span className="price-value total" style={{ fontWeight: "bold", color: "#0070f3" }}>{formatter.format(total)}</span>
//             </div>
//           </div>

//           <div className="email-notice">
//             <MailIcon />
//             <div className="email-text">
//               Order confirmation email will be sent to {customerInfo.email.split("@")[0]}***@gmail.com after you confirm.
//             </div>
//           </div>

//           <div className="button-container">
//             <button onClick={onConfirmOrder} className="confirm-button">
//               Confirm Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PaymentConfirmation;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(state || null);
  const [loading, setLoading] = useState(!state);

  // Fetch order nếu không có state
  useEffect(() => {
    if (!state) {
      const query = new URLSearchParams(window.location.search);
      const orderId = query.get("orderId");
      if (!orderId) return;

      setLoading(true);
      axios
        .get(`https://backendtechstore1-production.up.railway.app/api/user/orders/${orderId}`)
        .then((res) => {
          const order = res.data.order;
          if (order) {
            setOrderData({
              orderId: order.id,
              customerInfo: order.customer || {},
              paymentMethod: order.method || "",
              paymentStatus: order.status || "fail",
              orderItems: order.items || [],
              subtotal: order.subtotal || 0,
              shippingFee: order.shippingFee || 0,
              discount: order.discount || 0,
              total: order.total || 0,
            });
          }
        })
        .catch((err) => {
          console.error("Fetch order failed:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [state]);

  if (loading) return <div>Loading order information...</div>;
  if (!orderData || !orderData.customerInfo) return <div>Payment data not found!</div>;

  const {
    orderId,
    customerInfo,
    paymentMethod,
    paymentStatus,
    orderItems,
    subtotal,
    shippingFee,
    discount,
    total,
  } = orderData;

  const onConfirmOrder = () => {
    alert("Order confirmed!");
    navigate("/user");
  };

  const steps = [
    { number: 1, title: "Information Order", completed: true },
    { number: 2, title: "Payment Method", completed: true },
    { number: 3, title: "Order Confirmation", completed: false, active: true },
  ];

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const parsePrice = (value) => parseFloat(value?.toString().replace(/,/g, "") || 0);

  // Icons
  const UserIcon = () => (
    <svg className="section-icon" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );

  const CreditCardIcon = () => (
    <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );

  const PackageIcon = () => (
    <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );

  const MailIcon = () => (
    <svg className="mail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  return (
    <div className="payment-container">
      <h1 className="payment-title">Payment</h1>

      <div className="steps-container">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`step-item ${step.active ? "active" : ""} ${step.completed ? "completed" : ""}`}
          >
            <div className={`step-number ${step.completed ? "completed" : ""}`}>
              {step.completed ? "✓" : step.number}
            </div>
            <span className="step-title">{step.title}</span>
          </div>
        ))}
      </div>

      <div className="main-card">
        <div className="card-content">
          <div className="order-header">
            <div className="order-id-main">Order {orderId}</div>
            <div className="order-id-sub">Order {orderId}</div>
          </div>

          {/* Customer Info */}
          <div className="section">
            <div className="section-header">
              <UserIcon />
              <h3 className="section_title">Customer Information</h3>
            </div>
            <div className="customer-info">
              <div className="info-item">
                <div className="info-label">FullName</div>
                <div className="info-value">{customerInfo.fullname || ""}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Email</div>
                <div className="info-value">{customerInfo.email || ""}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Phone</div>
                <div className="info-value">{customerInfo.phone || ""}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Address</div>
                <div className="info-value">{customerInfo.address || ""}</div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="section">
            <div className="section-header">
              <CreditCardIcon />
              <h3 className="section_title">Payment Method</h3>
            </div>
            <div className="payment-method-row">
              <span className="payment-name">{paymentMethod || ""}</span>
              <span className="processing-badge">{paymentStatus || ""}</span>
            </div>
          </div>

          {/* Order Items */}
          <div className="section">
            <div className="section-header">
              <PackageIcon />
              <h3 className="section_title">Order</h3>
            </div>
            <div className="order-items">
              {orderItems.map((item) => {
                const unitPrice = parsePrice(item.price);
                const totalItemPrice = unitPrice * (item.quantity || 0);
                return (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img
                        src={item.image || ""}
                        alt={item.name || ""}
                        style={{ width: "64px", height: "64px" }}
                      />
                    </div>
                    <div className="item-details">
                      <div className="item-name">{item.name || ""}</div>
                      <div className="item-description">Color: {item.color || ""}</div>
                      <div className="item-quantity">Qty: {item.quantity || 0}</div>
                    </div>
                    <div className="item-price" style={{ fontWeight: "bold" }}>
                      {formatter.format(totalItemPrice)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Summary */}
          <div className="price-summary">
            <div className="price-row">
              <span className="price-label">Subtotal</span>
              <span className="price-value" style={{ fontWeight: "bold" }}>
                {formatter.format(parsePrice(subtotal))}
              </span>
            </div>
            <div className="price-row">
              <span className="price-label">Shipping Fee</span>
              <span className="price-value" style={{ fontWeight: "bold" }}>
                {formatter.format(parsePrice(shippingFee))}
              </span>
            </div>
            <div className="price-row">
              <span className="price-label">Discount</span>
              <span className="price-value" style={{ fontWeight: "bold" }}>
                -{formatter.format(parsePrice(discount))}
              </span>
            </div>
            <div className="price-row">
              <span className="price-label total">Total</span>
              <span
                className="price-value total"
                style={{ fontWeight: "bold", color: "#0070f3" }}
              >
                {formatter.format(parsePrice(total))}
              </span>
            </div>
          </div>

          {/* Email Notice */}
          <div className="email-notice">
            <MailIcon />
            <div className="email-text">
              Order confirmation email will be sent to{" "}
              {customerInfo.email ? customerInfo.email.split("@")[0] + "***@gmail.com" : "N/A"} after
              you confirm.
            </div>
          </div>

          {/* Confirm Button */}
          <div className="button-container">
            <button onClick={onConfirmOrder} className="confirm-button">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
