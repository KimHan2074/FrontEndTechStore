import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import Header from './components/user/Header/Header';
import Footer from './components/user/Footer/Footer';
import AppRoutes from './routes';
import TawkToChat from './pages/Chatbot/TawkToChat';
import NotFound from './pages/user/NotFound/NotFound';
import AboutUs from './pages/user/About_us/About_us';
import { MdNotificationsPaused } from 'react-icons/md';
import Blog from './pages/user/Blog/Blog';
// import Chatbox from './pages/Chatbot/Chatbox'; // nếu cần
// import Blog from './pages/user/Blog/Blog'; // nếu cần hiển thị độc lập

function App() {
  return (
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
