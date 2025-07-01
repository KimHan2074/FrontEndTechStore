import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes';
import { CartContext } from '../src/context/CartContext';
import axios from 'axios';

function App() {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Fetch cart items ngay từ đầu
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/user/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json"
          }
        });

        const items = response.data.data.map(item => ({
          id: item.id,
          product_id: item.product.id,
          name: item.product.name,
          price: parseFloat(item.product.price),
          quantity: item.quantity,
          image: item.product.first_image?.image_url || "",
        }));

        setCartItems(items);
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <Router>
        <ToastContainer />
        <AppRoutes />
      </Router>
    </CartContext.Provider>
  );
}

export default App;
