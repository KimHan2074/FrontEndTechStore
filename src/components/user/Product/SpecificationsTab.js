import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../pages/user/Product/Product.css";

const apiUrl = process.env.REACT_APP_BE_URL;

const SpecificationsTab = () => {
  const { id: productId } = useParams();
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    const fetchSpecifications = async () => {
      try {
        // const res = await axios.get(`${apiUrl}/api/specification/product/${productId}`, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // });

        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(`${apiUrl}/api/user/specification/product/${productId}`, {
          headers,
        });
        
        setSpec(res.data);
      } catch (err) {
        console.error("Error fetching specifications:", err);
        toast.error("Unable to load technical specifications.");
      }
    };

    if (productId) fetchSpecifications();
  }, [productId]);

  if (!spec) return <p style={{ padding: "1rem" }}>Loading technical specifications...</p>;

  const mappedSpecifications = [
    { label: "Brand", value: spec.brand },
    { label: "Model", value: spec.model },
    { label: "Connection", value: spec.connection },
    { label: "Layout", value: spec.layout },
    { label: "Display", value: spec.lighting },
    { label: "Compatibility", value: spec.compatibility },
    { label: "Dimensions", value: spec.dimensions },
    { label: "Weight", value: spec.weight },
    { label: "Switch", value: spec.switch },
    { label: "Warranty", value: spec.warranty },
  ];

  return (
    <div className="spec-grid">
      {mappedSpecifications.map((item, index) => (
        <div key={index} className="spec-item">
          <span className="spec-label">{item.label}:</span>
          <span className="spec-value">{item.value || "---"}</span>
        </div>
      ))}
    </div>
  );
};

export default SpecificationsTab;
