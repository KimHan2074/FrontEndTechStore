import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes';
import React from 'react';
// import Header from './components/user/Header/Header';
// import Footer from './components/user/Footer/Footer';
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
    <Router>
      <ToastContainer />
      <Blog/>
      <AppRoutes />
    </Router>
  );
}

export default App;
