import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../pages/user/Product/Product.css";

const apiUrl = process.env.REACT_APP_BE_URL;

const DescriptionTab = () => {
  const { id: productId } = useParams();
  const [descriptionData, setDescriptionData] = useState(null);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        // const res = await axios.get(`${apiUrl}/api/description/product/${productId}`, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // });

        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(`${apiUrl}/api/user/description/product/${productId}`, {
          headers,
        });

        setDescriptionData(res.data);
      } catch (error) {
        console.error("Error fetching product description:", error);
        toast.error("Unable to load product description.");
      }
    };

    if (productId) fetchDescription();
  }, [productId]);

  if (!descriptionData) {
    return <div className="tab-content">Loading product description...</div>;
  }

  return (
    <div className="tab-content">
      <div className="description-content">
        <div className="description-content-title">
          <h3>{descriptionData.name || "Product Information"}</h3>
          <p>{descriptionData.description || "This product has no description."}</p>
        </div>
        <div className="description-content-description">
          <h3>Highlighted Features</h3>
          <p>{descriptionData.features || "No featured specifications available."}</p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionTab;

