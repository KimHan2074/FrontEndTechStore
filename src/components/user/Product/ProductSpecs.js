import { useState } from "react";
import DescriptionTab from "./DescriptionTab";
import SpecificationsTab from "./SpecificationsTab";
import ReviewsTab from "./ReviewsTab";
import "../../../pages/user/Product/Product.css";

const ProductSpecs = () => {
  const [activeTab, setActiveTab] = useState("specifications");

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return <DescriptionTab />;
      case "specifications":
        return <SpecificationsTab />;
      case "reviews":
        return <ReviewsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="specs-container">
      <div className="specs-section">
        <div className="spec-tabs">
          <button
            className={`spec-tab ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Product Description
          </button>
          <button
            className={`spec-tab ${activeTab === "specifications" ? "active" : ""}`}
            onClick={() => setActiveTab("specifications")}
          >
            Specifications
          </button>
          <button
            className={`spec-tab ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (3)
          </button>
        </div>

        <div className="spec-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProductSpecs;
