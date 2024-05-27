import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import instance from '../../axiosinterceptor/userinterrceptor';
import './Booking.css';

function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // const token = localStorage.getItem("token");
        // const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await instance.get(`/bookings/${id}`);
        setBooking(response.data.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Booking Details</h1>
      </div>
      {booking && (
        <>
          <div className="booking-details">
            <p><strong>User:</strong> {booking.user.Username}</p>
            <p><strong>Package:</strong> {booking.package.Destination}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Total Amount:</strong> ₹{booking.total_amount}</p>
          </div>
          <div className="billing-model">
            <h2>Billing Information</h2>
            <p><strong>Total fare:</strong> ₹{booking.total_amount}</p>
            <p><strong>GST 18%:</strong> ₹{(booking.total_amount * 0.18).toFixed(2)}</p>
            <p><strong>Net fare:</strong> ₹{(parseFloat(booking.total_amount) + booking.total_amount * 0.18).toFixed(2)}</p>
          </div>
          <div className="confirmation-text">
            <h2>Booking Confirmed</h2>
            <p>Your booking is confirmed. Thank you for choosing our service!</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Booking;
