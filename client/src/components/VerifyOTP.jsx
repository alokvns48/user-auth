// src/components/VerifyOTP.js
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/verify-otp", { email, otp });
      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      alert("OTP verification failed: " + error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleVerifyOTP}
      className="flex flex-col p-8 space-y-4 bg-white shadow-lg rounded-lg max-w-md mx-auto mt-20"
    >
      <h2 className="text-2xl font-semibold text-center">Verify OTP</h2>
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="px-4 py-2 border rounded-lg"
      />
      <button
        type="submit"
        className="py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default VerifyOTP;
