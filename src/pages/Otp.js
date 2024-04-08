import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Otp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state.formData;

  const handleOtpChange = (e) => {
    const input = e.target.value;

    const char = /^[0-9\b]+$/;
    if (input === "" || char.test(input)) {
      if (input.length <= 6) {
        setOtp(input);
      }
    }
  };
  console.log(formData);
  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      // const otpVerificationResponse = await axios.post(
      //   "http://localhost:3002/api/user/register",
      //   { Phonenumber: formData.Phonenumber, otp: otp }
      // );

      
        const response = await axios.post(
          "http://localhost:3005/api/user/userRegister",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response && response.status == 201) {
          setError(null);
          toast.success("registration successfully");
          navigate("/Login");
        } 
        
     
      
    } catch (error) {
      console.error("error", error.message);
      if(error.response.status === 403){
        setError("An error occurred . please try again later");

      }
      
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="shadow p-3 bg-white rounded m-3"
        style={{ width: "25rem" }}
      >
        <form className="mt-4" onSubmit={handleVerify}>
          <label htmlFor="otp" className="mb-2">
            Enter OTP sent to your phone:
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            className="form-control mb-3"
            style={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}
            placeholder="Enter OTP"
            required
          />
          <Button variant="success" type="submit" block>
            Verify OTP
          </Button>
          {error && <div className="error mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Otp;