import React from "react";
import { Loader2 } from "lucide-react";
import "./LoadingSpinner.css";
export default function LoadingSpinner() {
  return (
    <div className="spinner">
      <Loader2 className="animate-spin mr-2" /> Loading...
    </div>
  )
}