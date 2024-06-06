import React, { useState, useEffect } from 'react';
import instance from '../../axiosinterceptor/Axiosinterceptor';
import './AdminBooking.css'; 
import SideBar from './Sidebar';

function AdminBooking() {
  const [booking, setBooking] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await instance.get('/bookings');
        if (response && response.data && response.data.data && response.data.data.length > 0) {
          setBooking(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooking();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBookings = booking.filter((item) => {
    const username = item.user?.Username?.toLowerCase() || '';
    const orderId = item.payment_id?.toLowerCase() || '';
    const query = searchQuery.toLowerCase().trim();
    console.log(`username: ${username}, orderId: ${orderId}, query: ${query}`);
    return username.includes(query) || orderId.includes(query);
  });

  return (
    <div className="admin-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="content-container">
        <h1>Booking Details</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        <table className="booking-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Order ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((item, index) => (
              <tr key={index}>
                <td>{item.user?.Username}<br />{item.user?.email}</td>
                <td>{item.package?.Destination}</td>
                <td>{item.date}</td>
                <td>{item.total_amount}</td>
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
