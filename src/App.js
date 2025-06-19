import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import React from 'react';
import Header from './components/user/Header/Header';
import AboutUs from './pages/user/About_us/About_us';
import NotFound from './pages/user/NotFound/NotFound';
import Footer from './components/user/Footer/Footer';
import Profile from './pages/user/Profile/Profile';
import TawkToChat from './pages/Chatbot/TawkToChat';
import Chatbox from './pages/Chatbot/Chatbox ';
import Orders from './pages/user/Order/Orders';

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
        <Route path="/profile" element={<Profile/>} />
        <Route path="/orders" element={<Orders/>} />
      </Routes>
      {/* <TawkToChat></TawkToChat> */}
      {/* <Chatbox></Chatbox> */}
      <Footer></Footer>
    </div>
  </Router>

  );
}

export default App;
