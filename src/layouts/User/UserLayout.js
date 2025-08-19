import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import "./UserLayout.css";

function UserLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const noLayoutRoutes = ["/user/shopping_cart", "/user/wishlist"];
  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      <Header />

      {isNoLayout ? (
        <Outlet />
      ) : (
        <div className="layout">
          <div className="content">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}

      {isNoLayout && <Footer />}
    </>
  );
}

export default UserLayout;
