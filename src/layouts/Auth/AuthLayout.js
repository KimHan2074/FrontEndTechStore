import React, { Component } from 'react';
import Header from '../../components/user/Header/Header';
import { Outlet } from 'react-router-dom';

class AuthLayout extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Outlet/>
            </div>
        );
    }
}

export default AuthLayout;