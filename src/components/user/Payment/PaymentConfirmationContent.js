

// import React from "react"
// import { useLocation } from "react-router-dom";

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


/////////////////////////////////////////////////////////////(code dưới work tốt)

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
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);


//   // Trạng thái MoMo / VNPay trả về (nếu có)
//   const resultCode = queryParams.get("resultCode"); // 0 = success
//   const message = queryParams.get("message");
//   const payType = queryParams.get("payType");
//   const orderIdFromGateway = queryParams.get("orderId");
//   const partnerCode = queryParams.get("partnerCode"); // 👈 lấy thêm partnerCode


//   // Debug log
//   console.log("👉 Query Params từ cổng thanh toán:", {
//     resultCode,
//     message,
//     payType,
//     orderIdFromGateway,
//     partnerCode,
//   });


//   const formatter = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 2,
//   });


//   subtotal = parseFloat(subtotal?.toString().replace(/,/g, "") || 0);
//   shippingFee = parseFloat(shippingFee?.toString().replace(/,/g, "") || 0);
//   discount = parseFloat(discount?.toString().replace(/,/g, "") || 0);
//   total = parseFloat(total?.toString().replace(/,/g, "") || 0);


//   const isOnlinePayment =
//     ["momo", "vnpay"].includes(paymentMethod?.toLowerCase()) ||
//     resultCode !== null;


//   const isPaymentSuccess = resultCode === "0";


//   // 👉 Hàm xác định tên hiển thị gateway
//   function getGatewayName({ payType, partnerCode, orderIdFromGateway }) {
//     if (partnerCode?.toLowerCase().includes("momo") || orderIdFromGateway?.startsWith("MOMO_")) {
//       return "MoMo";
//     }
//     if (partnerCode?.toLowerCase().includes("vnpay")) {
//       return "VNPay";
//     }
//     return payType || "Unknown";
//   }


//   // 👉 Tạo biến từ hàm trên
//   const paymentGateway = getGatewayName({ payType, partnerCode, orderIdFromGateway });


//   return (
//     <div className="payment-container">
//       <h1 className="payment-title">Payment</h1>


//       <div className="main-card">
//         <div className="card-content">
//           {/* Header */}
//           <div className="order-header">
//             <div className="order-id-main">Order {orderId}</div>
//             <div className="order-id-sub">
//               {orderIdFromGateway ? `Gateway Order: ${orderIdFromGateway}` : ""}
//             </div>
//           </div>


//           {/* Customer Info */}
//           <div className="section">
//             <h3 className="section_title">Customer Information</h3>
//             <div className="customer-info">
//               <div className="info-item"><div className="info-label">FullName</div><div className="info-value">{customerInfo.fullname}</div></div>
//               <div className="info-item"><div className="info-label">Email</div><div className="info-value">{customerInfo.email}</div></div>
//               <div className="info-item"><div className="info-label">Phone</div><div className="info-value">{customerInfo.phone}</div></div>
//               <div className="info-item"><div className="info-label">Address</div><div className="info-value">{customerInfo.address}</div></div>
//             </div>
//           </div>


//           {/* Payment Info */}
//           <div className="section">
//             <h3 className="section_title">Payment method</h3>
//             <div className="payment-method-row">
//               <span className="payment-name">{paymentGateway}</span>
//               <span className={paymentStatus?.toLowerCase() || "status-badge"}>
//                 {paymentStatus}
//               </span>
//             </div>
//           </div>


//           {/* Order Items */}
//           <div className="section">
//             <h3 className="section_title">Order</h3>
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


//           {/* Price Summary */}
//           <div className="price-summary">
//             <div className="price-row"><span className="price-label">Subtotal</span><span className="price-value">{formatter.format(subtotal)}</span></div>
//             <div className="price-row"><span className="price-label">Shipping Fee</span><span className="price-value">{formatter.format(shippingFee)}</span></div>
//             <div className="price-row"><span className="price-label">Discount</span><span className="price-value">-{formatter.format(discount)}</span></div>
//             <div className="price-row total"><span className="price-label">Total</span><span className="price-value">{formatter.format(total)}</span></div>
//           </div>


//           {/* Payment Status Notice */}
//           <div className="email-notice">
//             {isOnlinePayment ? (
//               isPaymentSuccess ? (
//                 <p>Payment with {paymentGateway} successful ✅</p>
//               ) : (
//                 <p>Payment failed ❌ — {message}</p>
//               )
//             ) : (
//               <>Order confirmation email will be sent to {customerInfo.email.split("@")[0]}***@gmail.com after you confirm.</>
//             )}
//           </div>


//           {/* Confirm Button */}
//           <div className="button-container">
//             <button onClick={onConfirmOrder} className="confirm-button">
//               {isOnlinePayment ? "Quay về trang chủ" : "Confirm Order"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default PaymentConfirmation;

///////////////////////////////////////////////////////////////////////


import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";


const PaymentConfirmation = ({
  orderId,
  customerInfo,
  paymentMethod,
  paymentStatus,
  orderItems,
  subtotal,
  shippingFee,
  discount,
  total,
  onConfirmOrder,
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);


  // Lấy dữ liệu từ cổng thanh toán
  const resultCode = queryParams.get("resultCode"); // 0 = success
  const orderIdFromGateway = queryParams.get("orderId");
  const partnerCode = queryParams.get("partnerCode");
  const payType = queryParams.get("payType");


  // Xác định thanh toán online
  const isOnlinePayment =
    ["momo", "vnpay"].includes(paymentMethod?.toLowerCase()) || resultCode !== null;
  const isPaymentSuccess = resultCode === "0";


  // Nếu online payment và success -> tự confirm order
  useEffect(() => {
    if (isOnlinePayment && isPaymentSuccess) {
      onConfirmOrder();
    }
  }, [isOnlinePayment, isPaymentSuccess, onConfirmOrder]);


  // Các bước thanh toán
  const steps = [
    { number: 1, title: "Information Order", completed: true },
    { number: 2, title: "Payment Method", completed: true },
    { number: 3, title: "Order Confirmation", completed: isPaymentSuccess || !isOnlinePayment },
  ];


  // Icon
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


  // Format tiền
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });


  subtotal = parseFloat(subtotal?.toString().replace(/,/g, "") || 0);
  shippingFee = parseFloat(shippingFee?.toString().replace(/,/g, "") || 0);
  discount = parseFloat(discount?.toString().replace(/,/g, "") || 0);
  total = parseFloat(total?.toString().replace(/,/g, "") || 0);


  // Lấy tên cổng thanh toán
  function getGatewayName({ payType, partnerCode, orderIdFromGateway }) {
    if (partnerCode?.toLowerCase().includes("momo") || orderIdFromGateway?.startsWith("MOMO_")) {
      return "MoMo";
    }
    if (partnerCode?.toLowerCase().includes("vnpay")) {
      return "VNPay";
    }
    return payType || paymentMethod || "Unknown";
  }


  const paymentGateway = getGatewayName({ payType, partnerCode, orderIdFromGateway });


  // Mask email đúng
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return `${name.slice(0, 3)}***@${domain}`;
  };


  return (
    <div className="payment-container">
      <h1 className="payment-title">Payment</h1>


      {/* Steps */}
<div className="steps-container">
  {steps.map((step) => (
    <div key={step.number} className={`step-item ${step.active ? "active" : ""}`}>
      <div
        className={`step-number ${
          step.confirmed
            ? "confirmed"
            : step.active
            ? "active"
            : step.completed
            ? "completed"
            : ""
        }`}
        style={{
          backgroundColor: step.number === 3 && step.completed ? "#22c55e" : undefined,
          color: step.number === 3 && step.completed ? "#fff" : undefined,
        }}
      >
        {step.confirmed ? "✓" : step.number}
      </div>
      <span className="step-title">{step.title}</span>
    </div>
  ))}
</div>


       
      {/* Card */}
      <div className="main-card">
        <div className="card-content">
          {/* Header */}
          <div className="order-header">
            <div className="order-id-main">Order {orderId}</div>
            {orderIdFromGateway && (
              <div className="order-id-sub">Gateway Order: {orderIdFromGateway}</div>
            )}
          </div>


          {/* Customer Info */}
          <div className="section">
            <div className="section-header">
              <UserIcon />
              <h3 className="section_title">Customer Information</h3>
            </div>
            <div className="customer-info">
              <div className="info-item">
                <div className="info-label">Full Name</div>
                <div className="info-value">{customerInfo.fullname}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Email</div>
                <div className="info-value">{customerInfo.email}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Phone</div>
                <div className="info-value">{customerInfo.phone}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Address</div>
                <div className="info-value">{customerInfo.address}</div>
              </div>
            </div>
          </div>


          {/* Payment Info */}
          <div className="section">
            <div className="section-header">
              <CreditCardIcon />
              <h3 className="section_title">Payment method</h3>
            </div>
            <div className="payment-method-row">
              <span className="payment-name">{paymentGateway}</span>
              <span
                className={`processing-badge ${
                  isPaymentSuccess ? "success" : "pending"
                }`}
              >
                {isPaymentSuccess ? "Success" : "Pending"}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className="section">
            <h3 className="section_title">Order</h3>
            <div className="order-items">
              {orderItems.map((item) => {
                const unitPrice = parseFloat(item.price?.toString().replace(/,/g, "") || 0);
                const totalItemPrice = unitPrice * item.quantity;
                return (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px' }} />
                    </div>
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-description">Color: {item.color}</div>
                      <div className="item-quantity">Qty: {item.quantity}</div>
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
            <div className="price-row"><span>Subtotal</span><span>{formatter.format(subtotal)}</span></div>
            <div className="price-row"><span>Shipping Fee</span><span>{formatter.format(shippingFee)}</span></div>
            <div className="price-row"><span>Discount</span><span>-{formatter.format(discount)}</span></div>
            <div className="price-row total"><span>Total</span><span>{formatter.format(total)}</span></div>
          </div>


          {/* Email Notice */}
          <div className="email-notice">
            <MailIcon />
            <div className="email-text">
              {isOnlinePayment && isPaymentSuccess
                ? <>✅ Order confirmation email has been sent to <b>{maskEmail(customerInfo.email)}</b>.</>
                : <>Order confirmation email will be sent to <b>{maskEmail(customerInfo.email)}</b> after you confirm.</>}
            </div>
          </div>


          {/* Button (chỉ hiển thị nếu COD) */}
          <div className="button-container">
            {!isOnlinePayment && (
              <button onClick={onConfirmOrder} className="confirm-button">
                Confirm Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default PaymentConfirmation;