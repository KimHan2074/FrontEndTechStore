import { Outlet } from 'react-router-dom';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
// import { CartContext } from "../../context/CartContext" // đường dẫn đúng nhé
// import { useState } from "react"

function UserLayout() {
    // const [cartItems, setCartItems] = useState([])

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>

        //  <CartContext.Provider value={{ cartItems, setCartItems }}>
        //     <Header />
        //     <Outlet /> 
        //     <Footer />
        // </CartContext.Provider>
    );
}
export default UserLayout;