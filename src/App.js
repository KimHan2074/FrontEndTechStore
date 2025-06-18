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
import SignIn from './pages/auth/login/SignIn';
import ResetPassword from './pages/auth/login/ResetPassword';
import HomePage from './pages/user/Homepage/Homepage';
import Dashboard from './pages/admin/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      {/* Nếu bạn muốn luôn luôn hiển thị Header ở mọi trang */}
      {/* <Header /> */}
      <ToastContainer />
      <Routes>
        {/* <Route path="/about" element={<AboutUs />} /> */}
        <Route path="signup" element={<SignUp />} />
        {/* Callback sau khi đăng nhập bằng Google */}
        <Route path="callback" element={<AuthCallback />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="resetpassword" element={<ResetPassword/>} />
        <Route path="homepage" element={<HomePage/>} />
        <Route path="dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
  )

import routes from './routes';
import React from 'react';
import Header from './components/user/Header/Header';
import AboutUs from './pages/user/About_us/About_us';
import NotFound from './pages/user/NotFound/NotFound';
import Footer from './components/user/Footer/Footer';
import TawkToChat from './pages/Chatbot/TawkToChat';
import Chatbox from './pages/Chatbot/Chatbox ';
import Blog from './pages/user/Blog/Blog';

function App() {
   // const showMain = (routes) => {
  //   let result = null;
  //   if (routes.length > 0) {
  //     result = routes.map((route, index) => {
  //       return (
  //         <Route key={index} path={route.path} exact={route.exact} element={<route.main />} />
  //       );
  //     });
  //   }
  //   return result;
  // };

  return (
    // <Router>
    //   <ToastContainer />
    //   <Routes>
    //     {showMain(routes)}
    //   </Routes>
    // </Router>
    <Router>
    <div>
      <Header></Header>
      <Routes>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      {/* <TawkToChat></TawkToChat> */}
      {/* <Chatbox></Chatbox> */}
      <Footer></Footer>
    </div>
  </Router>
    
  );
}

export default App;

