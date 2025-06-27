import React, { useEffect, useState } from "react";
import { ArrowLeft, Archive } from "lucide-react";
import axios from "axios";

const NoResultsMessageBlog = ({ onBack }) => {
  return (
    <div className="no-products-container">
      <div className="result-message">

        <div className="package-icon">
          <Archive color="#000" size={100} />
        </div>
        <h2 className="empty-title">No products found</h2>
        <p className="empty-description">
          We couldn't find any products matching your search. Try adjusting your search or browse our categories.
        </p>
        <div className="action-buttons">
          <button className="btn-clear-search" onClick={onBack}>
            <ArrowLeft color="#FFFFFF" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoResultsMessageBlog;
