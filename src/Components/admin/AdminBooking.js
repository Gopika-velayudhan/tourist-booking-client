import React, { useState, useEffect } from 'react';
import instance from '../../axiosinterceptor/Axiosinterceptor';
import './AdminBooking.css'; 
import SideBar from './Sidebar';

function AdminBooking() {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await instance.get('/bookings');
        setBooking(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooking();
  }, []);

  return (
    <div className="admin-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="content-container">
        <h1>Booking Details</h1>
        <table className="booking-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Payment Time</th>
              <th>Order ID</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((item, index) => (
              <tr key={index}>
                <td>{item.user.Username}</td>
                <td>{item.package?.Destination}</td>
                <td>{item.date}</td>
                <td>{item.total_amount}</td>
                <td>{item.time}</td>
                <td>{item.payment_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBooking;
