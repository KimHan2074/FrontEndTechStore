import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner">
          <div className="spinner-circle spinner-circle-outer"></div>
          <div className="spinner-circle-off spinner-circle-inner"></div>
          <div className="spinner-circle spinner-circle-single-1"></div>
          <div className="spinner-circle spinner-circle-single-2"></div>
          <div className="text">...Loading...</div>
        </div>
      </div>
    </div>
  );
}
