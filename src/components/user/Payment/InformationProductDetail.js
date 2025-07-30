// import { useEffect, useState } from "react";

// const InformationProductDetail = () => {
//   const [products, setProducts] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [shippingFee, setShippingFee] = useState(0);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const orderDataString = localStorage.getItem("checkoutData");
//     if (orderDataString) {
//       try {
//         const orderData = JSON.parse(orderDataString);
        
//         const items = orderData.items.map((item) => {
//   console.log("item raw:", item);
//   return {
//     id: item.cart_item_id,
//     name: item.name,
//     image: item.image || "/placeholder.svg",
//     quantity: item.quantity || 1,
//     unit_price: item.unit_price || 0, 
//   };
// });

//         setProducts(items);
//         setSubtotal(orderData.subtotal || 0);
//         setDiscount(orderData.discount || 0);
//         setShippingFee(orderData.shippingCost || 0);
//         setTotal(orderData.total || 0);
//       } catch (error) {
//         console.error("Lỗi parse dữ liệu đơn hàng từ localStorage:", error);
//       }
//     }
//   }, []);

//   return (
//     <div className="right-section-information-order">
//       <div className="product-section-information-order">
//         <h3>Products</h3>
//         <div className="product-list-information-order">
//           {products.length === 0 ? (
//             <p>Không có sản phẩm trong đơn hàng.</p>
//           ) : (
//             products.map((product, index) => (
//               <div
//                 key={`${product.id || index}`}
//                 className="product-item-information-order"
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="product-image-information-order"
//                 />
//                 <div className="product-details-information-order">
//                   <h4>{product.name}</h4>
//                   <p className="quantity-information-order">
//                     Quantity: {product.quantity}
//                   </p>
//                   <div className="price-container-information-order">
//                     <span className="current-price-information-order">
//                       ${
//                         !isNaN(Number(product.unit_price)) && !isNaN(Number(product.quantity))
//                           ? (Number(product.unit_price) * Number(product.quantity)).toFixed(2)
//                           : "0.00"
//                       }
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <div className="order-summary-information-order">
//         <h3>Order Summary</h3>
//         <div className="summary-row-information-order">
//           <span>Subtotal</span>
//           <span className="price-blue-information-order">${subtotal.toFixed(2)}</span>
//         </div>
//         {discount !== 0 && (
//           <div className="summary-row-information-order">
//             <span>Discount</span>
//             <span className="price-blue-information-order">-${Math.abs(discount).toFixed(2)}</span>
//           </div>
//         )}
//         <div className="summary-row-information-order">
//           <span>Shipping Fee</span>
//           <span className="price-blue-information-order">${shippingFee.toFixed(2)}</span>
//         </div>
//         <div className="summary-row-information-order total">
//           <span>Total</span>
//           <span className="price-blue-information-order">${total.toFixed(2)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InformationProductDetail;




///////////////////////////////////////////////////
// import { useEffect, useState } from "react";
// import axios from "axios";


// const InformationProductDetail = () => {
//   const [products, setProducts] = useState([]);
//   const [productColors, setProductColors] = useState({});
//   const [subtotal, setSubtotal] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [shippingFee, setShippingFee] = useState(0);
//   const [total, setTotal] = useState(0);
//   useEffect(() => {
//     const orderDataString = localStorage.getItem("checkoutData");
//     if (orderDataString) {
//       try {
//         const orderData = JSON.parse(orderDataString);
//         const items = orderData.items.map((item) => ({
//           id: item.cart_item_id,
//           product_id: item.product_id ?? item.id,
//           name: item.name,
//           image: item.image,
//           quantity: item.quantity || 1,
//           unit_price: item.unit_price || 0,
//           color: item.color || "",
//         }));


//         setProducts(items);
//         setSubtotal(orderData.subtotal || 0);
//         setDiscount(orderData.discount || 0);
//         setShippingFee(orderData.shippingCost || 0);
//         setTotal(orderData.total || 0);
//       } catch (error) {
//         console.error("Error parsing order data from localStorage:", error);
//       }
//     }
//   }, []);


//   useEffect(() => {
//     const fetchColors = async () => {
//       const colorData = {};
//       const updatedProducts = [...products];


//       await Promise.all(
//         products.map(async (product, i) => {
//           console.log("product.product_id:", product.product_id, product);
//           try {
//             const res = await axios.get(
//               `https://backendtechstore1-production.up.railway.app/api/products/product/${product.product_id}/productcolors`
//             );
//             const colors = Array.isArray(res.data.colors) ? res.data.colors : [];
//             colorData[product.product_id] = colors;


//             if (!product.color && colors.length > 0) {
//               updatedProducts[i].color = colors[0];
//             }
//           } catch (err) {
//             console.error(`Error fetching product color ${product.name}:`, err);
//             colorData[product.product_id] = [];
//           }
//         })
//       );
//       setProductColors(colorData);
//       setProducts(updatedProducts);
//     };
//     if (products.length > 0) fetchColors();
//   }, [products]);


//   const handleColorChange = (index, newColor) => {
//     const updatedProducts = [...products];
//     updatedProducts[index].color = newColor;
//     setProducts(updatedProducts);
//     const checkoutData = JSON.parse(localStorage.getItem("checkoutData") || "{}");
//     checkoutData.items = updatedProducts;
//     localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
//   };


//   return (
//     <div className="right-section-information-order">
//       <div className="product-section-information-order">
//         <h3>Products</h3>
//         <div className="product-list-information-order">
//           {products.length === 0 ? (
//             <p>Không có sản phẩm trong đơn hàng.</p>
//           ) : (
//             products.map((product, index) => (
//               <div key={`${product.id || index}`} className="product-item-information-order">
//                 <img src={product.image} alt={product.name} className="product-image-information-order" />
//                 <div className="product-details-information-order">
//                   <h4>{product.name}</h4>
//                   <p>Quantity: {product.quantity}</p>
//                   <div
//                     className="color-information-order"
//                     style={{ display: "flex", alignItems: "center", gap: "8px" }}
//                   >
//                     <p style={{ margin: 0 }}>
//                       Color: <strong>{product.color || "Black"}</strong>
//                     </p>
//                     {(productColors[product.product_id] || []).length > 0 && (
//                       <select
//                         value={product.color}
//                         onChange={(e) => handleColorChange(index, e.target.value)}
//                         style={{
//                           margin: 0,
//                           padding: "4px 8px",
//                           borderRadius: "4px",
//                         }}
//                       >
//                         <option value="">Chọn màu</option>
//                         {(productColors[product.product_id] || []).map((colorName, i) => (
//                           <option key={i} value={colorName}>
//                             {colorName}
//                           </option>
//                         ))}
//                       </select>
//                     )}
//                   </div>
//                   <div className="price-container-information-order">
//                     <span className="current-price-information-order">
//                       ${Number(product.unit_price * product.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//       <div className="order-summary-information-order">
//         <h3>Order Summary</h3>
//         <div className="summary-row-information-order">
//           <span>Subtotal</span>
//           <span className="price-blue-information-order">${subtotal.toFixed(2)}</span>
//         </div>
//         {discount !== 0 && (
//           <div className="summary-row-information-order">
//             <span>Discount</span>
//             <span className="price-blue-information-order">
//               -${Math.abs(discount).toFixed(2)}
//             </span>
//           </div>
//         )}
//         <div className="summary-row-information-order">
//           <span>Shipping Fee</span>
//           <span className="price-blue-information-order">${shippingFee.toFixed(2)}</span>
//         </div>
//         <div className="summary-row-information-order total">
//           <span>Total</span>
//           <span className="price-blue-information-order">${total.toFixed(2)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default InformationProductDetail;


//////////////////////////////////////////
import { useEffect, useState } from "react";
import axios from "axios";


const InformationProductDetail = () => {
  const [products, setProducts] = useState([]);
  const [productColors, setProductColors] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const orderDataString = localStorage.getItem("checkoutData");
    if (orderDataString) {
      try {
        const orderData = JSON.parse(orderDataString);
        const items = orderData.items.map((item) => ({
          id: item.cart_item_id,
          product_id: item.product_id ?? item.id,
          name: item.name,
          image: item.image,
          quantity: item.quantity || 1,
          unit_price: item.unit_price || 0,
          color: item.color || "",
        }));


        setProducts(items);
        setSubtotal(orderData.subtotal || 0);
        setDiscount(orderData.discount || 0);
        setShippingFee(orderData.shippingCost || 0);
        setTotal(orderData.total || 0);
      } catch (error) {
        console.error("Error parsing order data from localStorage:", error);
      }
    }
  }, []);


  useEffect(() => {
    const fetchColors = async () => {
      const colorData = {};
      const updatedProducts = [...products];


      await Promise.all(
        products.map(async (product, i) => {
          console.log("product.product_id:", product.product_id, product);
          try {
            const res = await axios.get(
              `http://localhost:8000/api/products/product/${product.product_id}/productcolors`
            );
            const colors = Array.isArray(res.data.colors) ? res.data.colors : [];
            colorData[product.product_id] = colors;


            if (!product.color && colors.length > 0) {
              updatedProducts[i].color = colors[0];
            }
          } catch (err) {
            console.error(`Error fetching product color ${product.name}:`, err);
            colorData[product.product_id] = [];
          }
        })
      );
      setProductColors(colorData);
      setProducts(updatedProducts);
    };
    if (products.length > 0) fetchColors();
  }, [products]);


  const handleColorChange = (index, newColor) => {
    const updatedProducts = [...products];
    updatedProducts[index].color = newColor;
    setProducts(updatedProducts);
    const checkoutData = JSON.parse(localStorage.getItem("checkoutData") || "{}");
    checkoutData.items = updatedProducts;
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  };


  return (
    <div className="right-section-information-order">
      <div className="product-section-information-order">
        <h3>Products</h3>
        <div className="product-list-information-order">
          {products.length === 0 ? (
            <p>Không có sản phẩm trong đơn hàng.</p>
          ) : (
            products.map((product, index) => (
              <div key={`${product.id || index}`} className="product-item-information-order">
                <img src={product.image} alt={product.name} className="product-image-information-order" />
                <div className="product-details-information-order">
                  <h4>{product.name}</h4>
                  <p>Quantity: {product.quantity}</p>
                  <div
                    className="color-information-order"
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <p style={{ margin: 0 }}>
                      Color: <strong>{product.color || "Black"}</strong>
                    </p>
                    {(productColors[product.product_id] || []).length > 0 && (
                      <select
                        value={product.color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        style={{
                          margin: 0,
                          padding: "4px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        <option value="">Chọn màu</option>
                        {(productColors[product.product_id] || []).map((colorName, i) => (
                          <option key={i} value={colorName}>
                            {colorName}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="price-container-information-order">
                    <span className="current-price-information-order">
                      ${Number(product.unit_price * product.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="order-summary-information-order">
        <h3>Order Summary</h3>
        <div className="summary-row-information-order">
          <span>Subtotal</span>
          <span className="price-blue-information-order">${subtotal.toFixed(2)}</span>
        </div>
        {discount !== 0 && (
          <div className="summary-row-information-order">
            <span>Discount</span>
            <span className="price-blue-information-order">
              -${Math.abs(discount).toFixed(2)}
            </span>
          </div>
        )}
        <div className="summary-row-information-order">
          <span>Shipping Fee</span>
          <span className="price-blue-information-order">${shippingFee.toFixed(2)}</span>
        </div>
        <div className="summary-row-information-order total">
          <span>Total</span>
          <span className="price-blue-information-order">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};


export default InformationProductDetail;
