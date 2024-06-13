import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../axiosinterceptor/userinterrceptor";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleOtpChange = (e) => {
    const input = e.target.value;
    const char = /^[0-9\b]+$/;
    if (input === "" || char.test(input)) {
      if (input.length <= 6) {
        setOtp(input);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post("/api/user/verify-otp", {
        email: location.state.email,
        otp,
      });

      if (response.status === 200) {
        toast.success("OTP verified successfully.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Invalid OTP. Please try again.");
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", padding: "1rem" }}>
      <div className="shadow p-3 bg-white rounded" style={{ width: "100%", maxWidth: "25rem" }}>
        <form className="mt-4" onSubmit={handleSubmit}>
          <label htmlFor="otp" className="mb-2">
            Enter OTP sent to your email:
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            className="form-control mb-3"
            placeholder="Enter OTP"
            required
          />
          <Button variant="success" type="submit" block>
            Verify OTP
          </Button>
          {error && <div className="text-danger mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
