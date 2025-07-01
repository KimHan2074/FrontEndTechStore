import React, { Component } from 'react';
import Header from '../../components/user/Header/Header';
import Footer from '../../components/user/Footer/Footer';
import { Outlet } from 'react-router-dom';

function AuthLayout() {

    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer />
        </div>
    );
}

export default AuthLayout;