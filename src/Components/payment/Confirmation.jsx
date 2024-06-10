import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import instance from "../../axiosinterceptor/userinterrceptor";
import "./Confirmation.css";
import { FadeLoader } from "react-spinners";

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");
  const availableDate = searchParams.get("available_date");
  const totalPrice = searchParams.get("total_price");
  const packageId = searchParams.get("package_id");
  const image = searchParams.get("image");

  useEffect(() => {
    const handleGet = async () => {
      try {
        const userid = localStorage.getItem("_id");
        const response = await instance.get(`/api/user/users/${userid}`);
        setUser(response.data.data);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };
    handleGet();
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    const userToken = localStorage.getItem("token");
    const userid = localStorage.getItem("_id");
    const email = user.email;

    if (!userToken) {
      console.log("token not found...");
      return;
    }

    try {
      const bookingResponse = await instance.post("/api/user/bookings", {
        userId: userid,
        packageId,
        amount: totalPrice,
        currency: "INR",
      });

      const { payment_id, _id: bookingId } = bookingResponse.data.data;

      const paymentResponse = await instance.post("/api/user/payment", {
        email,
        amount: totalPrice * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_id,
      });

      const options = {
        key:process.env.React_App_Razropay_key_id,
        amount: paymentResponse.data.data.amount,
        currency: paymentResponse.data.data.currency,
        receipt: paymentResponse.data.data.receipt,
        name: "Explore_epic",
        description: "Test Transaction",
        order_id: paymentResponse.data.data.id,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container4">
      <div className="header4" style={{ backgroundImage: `url(${image})` }}>
        <h2>{destination}</h2>
      </div>
      <div className="content4">
        <table className="confirmation-table4">
          <thead>
            <tr>
              <th>Location</th>
              <th>Available Date & Time</th>
              <th>Duration</th>
              <th>Departure Date & Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{destination}</td>
              <td>{availableDate} 12:00 PM</td>
              <td>{duration}</td>
              <td>{availableDate} 11:00 AM</td>
            </tr>
          </tbody>
        </table>
        <div className="guest-details4">
          <h3>Guest Details</h3>
          {user && (
            <table className="confirmation-table4">
              <thead>
                <tr>
                  <th>Name of Guest</th>
                  <th>Mobile Number</th>
                  <th>Email Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.Username}</td>
                  <td>{user.Phonenumber}</td>
                  <td>{user.email}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className="total-price4">
          <h3>Total Price</h3>
          <p>Total fare: ₹{totalPrice}</p>
          <p>GST 18%: ₹{(totalPrice * 0.18).toFixed(2)}</p>
          <p>
            Net fare: ₹{(parseFloat(totalPrice) + totalPrice * 0.18).toFixed(2)}
          </p>
          {loading ? (
            <div className="d-flex justify-content-center">
              <FadeLoader color="blue" loading={loading} size={15} />
            </div>
          ) : (
            <Button onClick={handlePayment} style={{ backgroundColor: "blue" }}>
              Pay to Proceed
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
