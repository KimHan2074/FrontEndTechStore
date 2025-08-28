import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MomoReturnPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const orderId = query.get("orderId");
    const resultCode = query.get("resultCode");

    if (!orderId || resultCode === null) return;

    axios.post("https://backendtechstore1-production.up.railway.app/api/momo/verify", {
      orderId,
      resultCode
    }).then(res => {
      const status = res.data.status === "success" ? "success" : "fail";
      const order = res.data.order; 

navigate("/user/payment_confirmation", {
  state: {
    orderId,
    paymentStatus: status,
    customerInfo: order.customer || {},
    paymentMethod: order.method || "",
    orderItems: order.items || [],
    subtotal: order.subtotal || 0,
    shippingFee: order.shippingFee || 0,
    discount: order.discount || 0,
    total: order.total || 0,
  },
});

    }).catch(err => {
      console.error(err);
      navigate(`/user/payment_confirmation?status=fail&orderId=${orderId}`);
    });
  }, [navigate]);

  return <div>Processing payment...</div>;
};

export default MomoReturnPage;
