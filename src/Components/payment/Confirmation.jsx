import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import instance from "../../axiosinterceptor/userinterrceptor";
import "./Confirmation.css";

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const destination = searchParams.get("destination");0.
  const duration = searchParams.get("duration");
  const availableDate = searchParams.get("available_date");
  const totalPrice = searchParams.get("total_price");
  const packageId = searchParams.get("package_id");
  

  useEffect(() => {
    const handleGet = async () => {
      try {
        // const token = localStorage.getItem("token");
        // const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const userid = localStorage.getItem("_id");

        const response = await instance.get(
          `/users/${userid}`,
          
        );
        setUser(response.data.data);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };
    handleGet();
  }, []);

  const handlePayment = async () => {
    const userToken = localStorage.getItem("token");
    const userid = localStorage.getItem("_id");

    if (!userToken) {
      console.log("token not found...");
      return;
    }

    const bearerToken = `Bearer ${userToken}`;

    try {
      const bookingResponse = await instance.post(
        "/bookings",
        { userId: userid, packageId, amount: totalPrice, currency: "INR" },
        
      );

      const { payment_id, _id: bookingId } = bookingResponse.data.data;

      const paymentResponse = await instance.post(
        "/payment",
        {
          amount: totalPrice * 100,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          payment_id,
        },
        { headers: { Authorization: bearerToken } }
      );

      const options = {
        key: "rzp_test_eyXHobfs6uqaFU",
        amount: paymentResponse.data.amount,
        currency: paymentResponse.data.currency,
        receipt: paymentResponse.data.receipt,
        name: "Explore_epic",
        description: "Test Transaction",
        order_id: paymentResponse.data.id,
        handler: (res) => {
          alert(`Payment successful: ${res.razorpay_payment_id}`);
          navigate(`/booking/${bookingId}`);
        },
        prefill: {
          name: user.Username,
          email: user.email,
          contact: user.Phonenumber,
        },
        notes: {
          address: "Near Kinfra, Calicut",
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzpay = new window.Razorpay(options);
        rzpay.open();
      } else {
        console.error("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="container1">
      <div className="header1">
        <h2>{destination}</h2>
        <table className="confirmation-table1">
          <tbody>
            <tr>
              <td>Location:</td>
              <td>Available Date & Time:</td>
              <td>Duration:</td>
              <td>Departure Date & Time:</td>
            </tr>
            <tr>
              <td>{destination}</td>
              <td>{availableDate} 12:00 PM</td>
              <td>{duration}</td>
              <td>{availableDate} 11:00 AM</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="guest-details1">
        <h3>Guest Details</h3>
        {user && (
          <table className="confirmation-table1">
            <tbody>
              <tr>
                <td>Name of Guest:</td>
                <td>Mobile Number:</td>
                <td>Email Address:</td>
              </tr>
              <tr>
                <td>{user.Username}</td>
                <td>{user.Phonenumber}</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="total-price1">
        <h3>Total Price</h3>
        <p>Total fare: ₹{totalPrice}</p>
        <p>GST 18%: ₹{(totalPrice * 0.18).toFixed(2)}</p>
        <p>
          Net fare: ₹{(parseFloat(totalPrice) + totalPrice * 0.18).toFixed(2)}
        </p>
        <Button onClick={handlePayment}>Pay to Proceed</Button>
      </div>
    </div>
  );
};

export default Confirmation;
