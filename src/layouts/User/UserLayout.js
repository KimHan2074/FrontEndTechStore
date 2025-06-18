import { Outlet } from 'react-router-dom';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';

function UserLayout() {
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    );
}
export default UserLayout;