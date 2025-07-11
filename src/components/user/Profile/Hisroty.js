import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Repeat, X } from "lucide-react";
import BuyNow from "../Button/BuyNow";
import { useNavigate } from "react-router-dom";

const HistoryContent = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const fetchOrderHistory = async (date) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/user/order-history`, {
        params: { date },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const orders = response.data.data || [];

      const items = orders.flatMap((order) =>
        (order.order_details || [])
          .filter((detail) => detail.product)
          .map((detail) => {
            const product = detail.product;
            return {
              order_detail_id: detail.id,
              product_id: detail.product_id,
              id: product.id,
              name: product.name || "Unknown name",
              unit_price: parseFloat(detail.unit_price),
              priceDisplay: `${parseFloat(detail.unit_price)}`,
              quantity: detail.quantity,
              image: product.images?.[0]?.image_url || "/placeholder.svg",
            };
          })
      );

      setHistoryData(items);
    } catch (error) {
      toast.error("Unable to load order history.");
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async (item) => {
    try {
      await axios.request({
        method: "DELETE",
        url: "/api/user/order-history/delete",
        data: {
          order_detail_id: item.order_detail_id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Removed from history");
      fetchOrderHistory(selectedDate);
    } catch (error) {
      toast.error("Failed to delete");
      console.error("Detailed error:", error.response?.data || error.message);
    }
  };

  const handleReorder = async (item) => {
    try {
      await axios.post(
        "/api/user/orders/create",
        {
          user_id: localStorage.getItem("userId"),
          products: [
            {
              product_id: item.product_id,
              quantity: item.quantity,
              unit_price: item.unit_price,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Reordered successfully!");
      navigate(`/user/payment/`);
    } catch (error) {
      toast.error("Failed to reorder!");
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchOrderHistory(selectedDate);
    }
  }, [selectedDate]);

  if (loading) {
    return (
      <div className="history-loading">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="history-content">
      <h1 className="history-title">Purchase History</h1>
      <div className="history-container">
        <div className="date-selector">
          <label className="date-text">Select date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="date-input"
          />
        </div>

        {historyData.length === 0 ? (
          <p className="no-data-message">No orders found on this date.</p>
        ) : (
          <ul className="history-list">
            {historyData.map((item) => (
              <li key={item.order_detail_id} className="history-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-image-history"
                />
                <div className="product-info">
                  <div className="product-name">{item.name}</div>
                  <div className="product-price">$ {item.priceDisplay}</div>
                  <div className="product-quantity">
                    Quantity: {item.quantity}
                  </div>
                </div>
                <button
                  className="edit-icon"
                  onClick={() => handleReorder(item)}
                >
                  <Repeat />
                </button>

                <button
                  className="edit-icon"
                  onClick={() => handleDeleteHistory(item)}
                >
                  <X />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryContent;
