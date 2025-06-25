import React, { Component } from 'react';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import { Outlet } from 'react-router-dom';
// import { CartContext } from "../../context/CartContext" // đường dẫn đúng nhé
// import { useState } from "react"

function AuthLayout() {

    // const [cartItems, setCartItems] = useState([]);

    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer />
        </div>

        // <CartContext.Provider value={{ cartItems, setCartItems }}>
        //     <Header />
        //     <Outlet /> 
        //     <Footer />
        // </CartContext.Provider>
    );
}

export default AuthLayout;