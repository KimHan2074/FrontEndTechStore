import { Outlet } from 'react-router-dom';
import Header from '../../components/user/Header/Header';

function UserLayout() {
    return (
        <>
        <Header />
        <Outlet />
        </>
    );
}
export default UserLayout;