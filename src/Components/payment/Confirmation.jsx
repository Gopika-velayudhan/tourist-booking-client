import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import instance from "../../axiosinterceptor/userinterrceptor";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBSpinner,
} from "mdb-react-ui-kit";
import "./Confirmation.css";

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const destination = searchParams.get("destination");
  const duration = searchParams.get("duration");
  const availableDate = searchParams.get("available_date");
  const totalPrice = parseFloat(searchParams.get("total_price"));
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
        key: process.env.React_App_Razropay_key_id,
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

  const handleCancel = () => {
    navigate(`/singlepackage`);
  };

  const gstAmount = totalPrice * 0.18;
  const netFare = totalPrice + gstAmount;

  return (
    <MDBContainer fluid className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6" xl="6">
          <MDBCard>
            <div
              className="bg-image hover-overlay ripple"
              style={{ backgroundImage: `url(${image})`, height: "300px", backgroundSize: "cover" }}
            >
              <a href="#!">
                <div className="mask"></div>
              </a>
            </div>
            <MDBCardBody>
              <MDBCardTitle>{destination}</MDBCardTitle>
              <MDBCardText>
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>Location</th>
                      <th>Available Date & Time</th>
                      <th>Duration</th>
                      <th>Departure Date & Time</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>{destination}</td>
                      <td>{availableDate} 12:00 PM</td>
                      <td>{duration}</td>
                      <td>{availableDate} 11:00 AM</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
                <h3>Guest Details</h3>
                {user && (
                  <MDBTable>
                    <MDBTableHead>
                      <tr>
                        <th>Name of Guest</th>
                        <th>Mobile Number</th>
                        <th>Email Address</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <td>{user.Username}</td>
                        <td>{user.Phonenumber}</td>
                        <td>{user.email}</td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                )}
                <h3>Total Price</h3>
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>Total fare</th>
                      <th>Gst 18%</th>
                      <th>Net fare</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>₹{totalPrice}</td>
                      <td>₹{gstAmount.toFixed(2)}</td>
                      <td>₹{netFare.toFixed(2)}</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <MDBSpinner color="primary" />
                  </div>
                ) : (
                  <div className="button-group">
                    <MDBBtn color="danger" onClick={handleCancel} className="button-left">
                      Cancel
                    </MDBBtn>
                    <MDBBtn color="primary" onClick={handlePayment} className="button-right">
                      Pay to Proceed
                    </MDBBtn>
                  </div>
                )}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Confirmation;
