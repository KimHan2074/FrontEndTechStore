import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

class AdminLayout extends Component {
    render() {
        return (
            <div>
                <Outlet/>
            </div>
        );
    }
}

export default AdminLayout;