import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PaymentMethod.css";

function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [currentStep, setCurrentStep] = useState(2);

  const orderId = 123; // 🔁 Thay bằng order thực tế

  const handleUserConfirmed = async (method = selectedMethod) => {
    try {
      await axios.post("http://localhost:8000/api/orders/confirm-payment", {
        order_id: orderId,
        method: method === "qr" ? "Momo" : method,
      });

      alert("Xác nhận thành công! Chuyển sang bước 3...");
      setCurrentStep(3);
    } catch (error) {
      console.error("Lỗi xác nhận:", error);
      alert("Đã xảy ra lỗi khi gửi xác nhận.");
    }
  };

  useEffect(() => {
    if (selectedMethod === "cash") {
      handleUserConfirmed("COD");
    }
  }, [selectedMethod]);

  const paymentMethods = [
    { id: "vnpay", label: "VNPay", desc: "Payment via VNPay", icon: "💳", qr: "/assets/images/QR_Code.png" },
    { id: "momo", label: "MoMo", desc: "Payment via MoMo", icon: "📱", qr: "/assets/images/QR_Code.png" },
    { id: "qr", label: "QR", desc: "Payment via QR", icon: "📷", qr: "/assets/images/QR_Code.png" },
    { id: "cash", label: "Cash", desc: "Payment via Cash", icon: "💵" },
  ];

  return (
    <div className="payment-box">
      {currentStep === 2 && (
        <>
          <div className="step-title">
            <span className="step-number">2</span>
            <span className="step-label">Payment Method</span>
          </div>

          {paymentMethods.map((method) => (
            <div key={method.id}>
              <div
                className={`payment-option ${selectedMethod === method.id ? "selected" : ""}`}
                onClick={() =>
                  setSelectedMethod((prev) =>
                    prev === method.id ? null : method.id
                  )
                }
              >
                <div className="icon">{method.icon}</div>
                <div>
                  <div className="title">{method.label}</div>
                  <div className="desc">{method.desc}</div>
                </div>
              </div>

              {selectedMethod === method.id && method.qr && (
                <div className="qr-section" style={{ margin: "10px 0", textAlign: "center" }}>
                  <img src={method.qr} alt={`${method.label} QR`} className="qr-image" />
                  <p style={{ fontSize: "14px", marginTop: "10px" }}>
                    Vui lòng chuyển khoản và nhấn nút bên dưới để xác nhận:
                  </p>
                  <button className="confirm-btn" onClick={() => handleUserConfirmed()}>
                    Tôi đã thanh toán
                  </button>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {currentStep === 3 && (
        <div className="confirmation-step">
          <h3>Xác nhận đơn hàng</h3>
          <p>Chúng tôi đã ghi nhận thanh toán của bạn. Đơn hàng đang chờ xác minh.</p>
        </div>
      )}
    </div>
  );
}

export default PaymentMethod;
