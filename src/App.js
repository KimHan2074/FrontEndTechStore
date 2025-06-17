// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import routes from './routes';
// import React from 'react';
// import Header from './components/user/Header/Header';
// import AboutUs from './pages/user/About_us/About_us';
// import SignUp from './pages/auth/register/SignUp';

// function App() {
//   // const showMain = (routes) => {
//   //   let result = null;
//   //   if (routes.length > 0) {
//   //     result = routes.map((route, index) => {
//   //       return (
//   //         <Route key={index} path={route.path} exact={route.exact} element={<route.main />} />
//   //       );
//   //     });
//   //   }
//   //   return result;
//   // };

//   return (
//     // <Router>
//     //   <ToastContainer />
//     //   <Routes>
//     //     {showMain(routes)}
//     //   </Routes>
//     // </Router>

//     <div>
//         {/* <Header></Header>
//         <AboutUs></AboutUs> */}
//         <SignUp></SignUp>
//     </div>
//   );
// }

// export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Header from './components/user/Header/Header';
// import AboutUs from './pages/user/About_us/About_us';
import SignUp from './pages/auth/register/SignUp';
import AuthCallback from './pages/auth/AuthCallback';

function App() {
  return (
    <Router>
      {/* Nếu bạn muốn luôn luôn hiển thị Header ở mọi trang */}
      {/* <Header /> */}
      <ToastContainer />
      <Routes>
        {/* <Route path="/about" element={<AboutUs />} /> */}
        <Route path="/signup" element={<SignUp />} />
        {/* Callback sau khi đăng nhập bằng Google */}
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  )
}

export default App;

