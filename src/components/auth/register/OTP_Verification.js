// OtpVerification.jsx (đã hoàn thiện)
import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../common/LoadingSpinner";
import axios from "axios";

export default function OTP_Verification({ email, onSuccess }) {
  const [email_otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email_otp) {
      toast.error("Please enter the OTP.");
      return;
    }
    if (email_otp.length !== 6) {
      toast.error("Invalid OTP.");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://127.0.0.1:8000/api/auth/verify-otp", { email, email_otp});
      toast.success("Your account has been successfully verified!");
    //   onSuccess && onSuccess();
    } catch (error) {
      console.error("Verification Error:", error);
      toast.error(error?.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-form-wrapper">
      {loading && <LoadingSpinner />}
      <h2>Enter OTP</h2>
      <p>A 6-digits code has been sent to {email}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength="6"
          pattern="\d{6}"
          value={email_otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digits code"
          required
        />
        <br />
        <button disabled={loading} type="submit">
          VERIFY OTP
        </button>
      </form>
    </div>
  )
}
