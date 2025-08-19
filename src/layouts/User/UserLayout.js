// import { Outlet } from 'react-router-dom';
// import Header from '../../components/user/Header/Header';
// import Footer from '../../components/user/Footer/Footer';

// function UserLayout() {

//     return (
//         <>
//             <Header />
//             <Outlet />
//             <Footer />
//         </>

//     );
// }
// export default UserLayout;

import { Outlet } from 'react-router-dom';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import './UserLayout.css';

function UserLayout() {
    return (
        <div className="layout">
            <Header />
            <main className="content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
export default UserLayout;
