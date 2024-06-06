import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../axiosinterceptor/userinterrceptor';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaCloudDownloadAlt } from "react-icons/fa";
import './Booking.css';

function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
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

  const downloadPageAsImage = () => {
    const bookingElement = document.getElementById('booking-details');
    const downloadContainer = document.querySelector('.download-container');
    
    if (downloadContainer) {
      downloadContainer.style.display = 'none';
    }

    html2canvas(bookingElement).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `booking_${id}.png`;
      link.click();

      if (downloadContainer) {
        downloadContainer.style.display = 'flex';
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="booking-container">
      <div className="header"></div>
      <div id="booking-details" className="content">
        <h1 className="website-name">
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'goldenrod', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
            Explore
          </span>
          -Epic
        </h1>
        <span className="location mt-5px">Near Kinfra, Calicut</span>
        <span className='phone-number mt-5px'>7736730305</span>
        <div className="booking-header m-10">
          <h3>Booking Details</h3>
        </div>
        {booking && (
          <div className="details-container">
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
          </div>
        )}
        <div className="confirmation-text">
          <h2>Booking Confirmed</h2>
          <p>Your booking is confirmed. Thank you for choosing our service!</p>
          <div className="icon-container d-flex flex justify-between">
            <div className="download-container" onClick={downloadPageAsImage} title="Download Booking Details">
              <FaCloudDownloadAlt className="download-icon" />
              <span>Download</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
