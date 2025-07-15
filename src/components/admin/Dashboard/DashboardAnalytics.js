import React from "react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  LineChart,
  Line,
  Pie,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { DollarSign, ShoppingCart, Users } from "lucide-react"
const wrapText = (text, maxLength = 12) => {
  if (!text || typeof text !== "string") return text

  if (text.length <= maxLength) return [text]

  const words = text.split(" ")

  if (words.length === 1) {
    const chunks = []
    for (let i = 0; i < text.length; i += maxLength) {
      chunks.push(text.slice(i, i + maxLength))
    }
    return chunks
  }

  const lines = []
  let currentLine = ""

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word

    if (testLine.length <= maxLength) {
      currentLine = testLine
    } else {
      if (currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        lines.push(word.slice(0, maxLength))
        currentLine = word.slice(maxLength)
      }
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines.length > 0 ? lines : [text]
}

const CustomTick = ({ x, y, payload, textAnchor = "middle", maxWidth = 100 }) => {
  const lines = wrapText(payload.value, 12);
  const lineHeight = 14;
  const offsetY = 20;
  const startY = y + offsetY;

  return (
    <g transform={`translate(${x},${startY})`}>
      {lines.map((line, index) => (
        <text
          key={index}
          x={0}
          y={index * lineHeight}
          dy={4}
          textAnchor={textAnchor}
          fill="#6b7280"
          fontSize="11"
          fontWeight="400"
        >
          {line}
        </text>
      ))}
    </g>
  );
};

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#FF4B4B"]

const DashboardAnalytics = ({ summary, monthlyRevenue, categorySales, orderStatus, topProducts }) => {
  const formatMoney = (value) => {
    return `$${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value)
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard Analytics</h1>

      <div className="summary-cards">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Total Revenue</span>
            <DollarSign className="icon dollar-icon" size={20} />
          </div>
          <div className="card-value">{formatCurrency(summary?.total_revenue || 0)}</div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">New Orders</span>
            <ShoppingCart className="icon cart-icon" size={20} />
          </div>
          <div className="card-value">{formatCurrency(summary?.new_orders_this_week || 0)}</div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Customers</span>
            <Users className="icon user-icon" size={20} />
          </div>
          <div className="card-value">{formatCurrency(summary?.customers || 0)}</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-box">
          <div className="chart-header">
            <h3 className="chart-title">Monthly Revenue</h3>
            <p className="chart-description">Monthly Revenue Overview for the Store (Annual)</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue} margin={{ top: 20, right: 30, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  height={40}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={formatMoney} 
                />
                <Tooltip
                  formatter={(value) => [formatMoney(value), "Revenue"]}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#14b8a6"
                  fill="#14b8a6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-box">
          <div className="chart-header">
            <h3 className="chart-title">Sales By Category</h3>
            <p className="chart-description">Number Of Items Sold By Category</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={categorySales}  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={<CustomTick />}
                  height={80}
                  interval={0}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip
                  formatter={(value) => [value, "Quantity"]}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="quantity" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-box">
          <div className="chart-header">
            <h3 className="chart-title">Order Status</h3>
            <p className="chart-description">Distribution Of Order Statuses</p>
          </div>
          <div className="chart-container">
            <div className="pie-chart-wrapper">
              <div className="pie-chart">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={orderStatus}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                    >
                      {orderStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [value, "Orders"]}
                      labelStyle={{ color: "#374151" }}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="pie-legend">
                {orderStatus.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="legend-label">{item.name}</span>
                    <span className="legend-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="chart-box">
          <div className="chart-header">
            <h3 className="chart-title">Top Best-Selling Products</h3>
            <p className="chart-description">Top 5 Best-Selling Products of the Month</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={topProducts} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={<CustomTick />}
                  height={80}
                  interval={0}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip
                  formatter={(value) => [`${value}`, "Sales"]}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAnalytics;

