import { useState, useEffect } from "react"
import axios from "axios"
import "./PaymentConfirmation.css"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PaymentConfirmationContent from "../../../components/user/Payment/PaymentConfirmationContent"
import LoadingSpinner from "../../../components/common/LoadingSpinner.js"
import { useNavigate } from "react-router-dom"

const apiUrl = process.env.REACT_APP_BE_URL;

export default function Cart() {
  const [loading, setLoading] = useState(true)
  const [orderData, setOrderData] = useState(null)
  const [confirming, setConfirming] = useState(false) 
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/user/order/confirmation`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        const data = response.data
        console.log("Data: ", data)

        const items = data.items.map((item, index) => ({
          id: index,
          name: item.product_name,
          image: item.image,
          color: item.color,
          quantity: item.quantity,
          price: parseFloat(item.unit_price),
        }))

        setOrderData({
          orderId: data.order_code,
          customerInfo: {
            fullname: data.customer.fullname,
            email: data.customer.email,
            phone: data.customer.phone,
            address: data.customer.address,
          },
          paymentMethod: data.payment.method,
          paymentStatus: data.payment.status,
          orderItems: items,
          subtotal: data.summary.subtotal,
          shippingFee: data.summary.shipping_fee,
          discount: data.summary.discount,
          total: data.summary.total,
        })

        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        toast.error("Failed to load order confirmation.")
        setLoading(false)
      })
  }, [])

  const handleConfirmOrder = () => {
    setConfirming(true) 
    axios
      .post(
        `${apiUrl}/api/user/order/confirm-payment`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      )
      .then(() => {
        navigate("/", {
            state: { successMessage: "Order confirmed and email sent." },
        });
      })
      .catch((error) => {
        console.error(error)
        toast.error("Failed to confirm order.")
      })
      .finally(() => {
        setConfirming(false)
      })
  }

  if (loading || confirming) return <LoadingSpinner />

  return (
    <>
      {orderData ? (
        <PaymentConfirmationContent
          orderId={orderData.orderId}
          customerInfo={orderData.customerInfo}
          paymentMethod={orderData.paymentMethod}
          paymentStatus={orderData.paymentStatus}
          orderItems={orderData.orderItems}
          subtotal={orderData.subtotal}
          shippingFee={orderData.shippingFee}
          discount={orderData.discount}
          total={orderData.total}
          onConfirmOrder={handleConfirmOrder}
        />
      ) : (
        <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>
      )}
      <ToastContainer />
    </>
  )
}




// import { useState, useEffect } from "react"
// import axios from "axios"
// import "./PaymentConfirmation.css"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import PaymentConfirmationContent from "../../../components/user/Payment/PaymentConfirmationContent"
// import LoadingSpinner from "../../../components/common/LoadingSpinner.js"
// import { useNavigate } from "react-router-dom"


// const apiUrl = process.env.REACT_APP_BE_URL;


// export default function Cart() {
//   const [loading, setLoading] = useState(true)
//   const [orderData, setOrderData] = useState(null)
//   const [confirming, setConfirming] = useState(false)
//   const navigate = useNavigate()


//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/user/order/confirmation`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           Accept: "application/json",
//         },
//       })
//       .then((response) => {
//         const data = response.data
//         console.log("Data: ", data)


//         const items = data.items.map((item, index) => ({
//           id: index,
//           name: item.product_name,
//           image: item.image,
//           color: item.color,
//           quantity: item.quantity,
//           price: parseFloat(item.unit_price),
//         }))


//         setOrderData({
//           orderId: data.order_code,
//           customerInfo: {
//             fullname: data.customer.fullname,
//             email: data.customer.email,
//             phone: data.customer.phone,
//             address: data.customer.address,
//           },
//           paymentMethod: data.payment.method,
//           paymentStatus: data.payment.status,
//           orderItems: items,
//           subtotal: data.summary.subtotal,
//           shippingFee: data.summary.shipping_fee,
//           discount: data.summary.discount,
//           total: data.summary.total,
//         })


//         setLoading(false)
//       })
//       .catch((error) => {
//         console.error(error)
//         toast.error("Failed to load order confirmation.")
//         setLoading(false)
//       })
//   }, [])


// const handleConfirmOrder = () => {
//   setConfirming(true);
//   axios
//     .post(
//       `${apiUrl}/api/user/order/confirm-payment`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           Accept: "application/json",
//         },
//       }
//     )
//     .then(() => {
//       localStorage.removeItem("checkoutData");
//       localStorage.removeItem("currentOrderId");


//       navigate("/", {
//         state: { successMessage: "Order confirmed and email sent." },
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//       toast.error("Failed to confirm order.");
//     })
//     .finally(() => {
//       setConfirming(false);
//     });
// };


//   if (loading || confirming) return <LoadingSpinner />


//   return (
//     <>
//       {orderData ? (
//         <PaymentConfirmationContent
//           orderId={orderData.orderId}
//           customerInfo={orderData.customerInfo}
//           paymentMethod={orderData.paymentMethod}
//           paymentStatus={orderData.paymentStatus}
//           orderItems={orderData.orderItems}
//           subtotal={orderData.subtotal}
//           shippingFee={orderData.shippingFee}
//           discount={orderData.discount}
//           total={orderData.total}
//           onConfirmOrder={handleConfirmOrder}
//         />
//       ) : (
//         <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>
//       )}
//       <ToastContainer />
//     </>
//   )
// }
