import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../components/common/LoadingSpinner.js";
import DashboardAnalytics from '../../../components/admin/Dashboard/DashboardAnalytics';
import "./Dashboard.css";

export default function Dashboard (){
    const [loading, setLoading] = useState(false);
    return (
    <>
        {loading && <LoadingSpinner />} 
        <DashboardAnalytics />
        <ToastContainer />
    </>
  )
}