import React, { useEffect, useState } from "react"
import axios from "axios"
import DashboardAnalytics from '../../../components/admin/Dashboard/DashboardAnalytics';
import "./Dashboard.css";

const Dashboard = () => {
  const [summary, setSummary] = useState({})
  const [monthlyRevenue, setMonthlyRevenue] = useState([])
  const [categorySales, setCategorySales] = useState([])
  const [orderStatus, setOrderStatus] = useState([])
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      }

      const [
        summaryRes,
        monthlyRes,
        categoryRes,
        statusRes,
        topProductRes
      ] = await Promise.all([
        axios.get("/api/admin/dashboard/summary", { headers }),
        axios.get("/api/admin/dashboard/monthly-revenue", { headers }),
        axios.get("/api/admin/dashboard/revenue-by-category", { headers }),
        axios.get("/api/admin/dashboard/order-status-distribution", { headers }),
        axios.get("/api/admin/dashboard/top-selling-products", { headers }),
      ])

      // 👉 Console log tất cả dữ liệu trả về:
      console.log("📊 Summary:", summaryRes.data)
      console.log("📈 Monthly Revenue:", monthlyRes.data)
      console.log("📦 Category Sales:", categoryRes.data)
      console.log("📌 Order Status:", statusRes.data)
      console.log("⭐ Top Products:", topProductRes.data)

      setSummary(summaryRes.data)
      setMonthlyRevenue(
        monthlyRes.data.map((item) => ({
          month: `T${item.month}`,
          revenue: Number(item.revenue),
        }))
      )
      setCategorySales(
        categoryRes.data.map((item) => ({
          name: item.category,
          quantity: Number(item.total_sold),
        }))
      )
      setOrderStatus(
        statusRes.data.map((item) => ({
          name: item.status,
          value: Number(item.count),
        }))
      )
      setTopProducts(
        topProductRes.data.map((item) => ({
          name: item.name,
          sales: Number(item.revenue),
        }))
      )
    } catch (error) {
      console.error("❌ Error fetching dashboard data:", error)
    }
  }

  return (
    <div className="admin-dashboard-page">
      <DashboardAnalytics
        summary={summary}
        monthlyRevenue={monthlyRevenue}
        categorySales={categorySales}
        orderStatus={orderStatus}
        topProducts={topProducts}
      />
    </div>
  )
}

export default Dashboard
