import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 500000000 },
  { month: "Feb", revenue: 700000000 },
  { month: "Mar", revenue: 650000000 },
  { month: "Apr", revenue: 700000000 },
  { month: "May", revenue: 750000000 },
  { month: "Jun", revenue: 800000000 },
  { month: "Jul", revenue: 950000000 },
];

const categorySales = [
  { name: "Phone", quantity: 800 },
  { name: "Mouse", quantity: 600 },
  { name: "Headphones", quantity: 400 },
  { name: "Webcam", quantity: 300 },
  { name: "Speakers", quantity: 200 },
  { name: "Printer", quantity: 180 },
];

const orderStatus = [
  { name: "Completed", value: 320 },
  { name: "Processing", value: 120 },
  { name: "Pending", value: 85 },
  { name: "Cancelled", value: 45 },
];

const topProducts = [
  { name: "iPhone 15", sales: 1000 },
  { name: "Gaming Mouse", sales: 850 },
  { name: "Sony Headphones", sales: 780 },
  { name: "JBL Speaker", sales: 650 },
  { name: "Logitech Webcam", sales: 550 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#FF4B4B"];

const DashboardAnalytics = () => {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard Analytics</h2>

      <div className="summary-cards">
        <div className="card">
          <p>Total Revenue</p>
          <h3>$2,847,500,000</h3>
        </div>
        <div className="card">
          <p>New Orders</p>
          <h3>1,234</h3>
        </div>
        <div className="card">
          <p>Customers</p>
          <h3>8,945</h3>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-box">
          <h4>Monthly Revenue</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Sales by Category</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categorySales}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-box">
          <h4>Order Status</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={orderStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {orderStatus.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Top Selling Products</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
