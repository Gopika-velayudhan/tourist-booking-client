import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faShoppingCart, faLock } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../admin/Sidebar";
import instance from "../../axiosinterceptor/Axiosinterceptor";
import "./Adminhome.css";

const AdminHome = () => {
  const [userCount, setUsercount] = useState(0);
  const [user, setUser] = useState([]);
  const [bookingCount, setBookingCount] = useState(0);
  const [packageCount, setPackageCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await instance.get("/users");
        setUsercount(response.data.dataCount);
        setUser(response.data.data);
      } catch (error) {
        console.log("Error fetching userCount: ", error);
      }
    };
    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchBookingCount = async () => {
      try {
        const response = await instance.get("/bookings");
        setBookingCount(response.data.datacount);
      } catch (error) {
        console.log("Error fetching bookingCount: ", error);
      }
    };
    fetchBookingCount();
  }, []);

  useEffect(() => {
    const fetchPackageCount = async () => {
      try {
        const response = await instance.get("/packages");
        setPackageCount(response.data.datacount);
      } catch (error) {
        console.log("Error fetching packageCount: ", error);
      }
    };
    fetchPackageCount();
  }, []);

  useEffect(() => {
    console.log("Users:", user);
  }, [user]);

  return (
    <div className="admin-home-container8">
      <Sidebar />
      <div className="main-content8">
        <div className="card-container8">
          <Card className="card8" onClick={() => navigate("/adminusers")}>
            <Card.Body>
              <div className="icon8">
                <div className="round-icon violet">
                  <FontAwesomeIcon icon={faUsers} className="icon-white" />
                </div>
                <div className="text-container">
                  <h3>{userCount}</h3>
                  <Card.Subtitle>New Users</Card.Subtitle>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card className="card8" onClick={() => navigate("/adminbooking")}>
            <Card.Body>
              <div className="icon8">
                <div className="round-icon orange">
                  <FontAwesomeIcon icon={faShoppingCart} className="icon-white" />
                </div>
                <div className="text-container">
                  <h3>{bookingCount}</h3>
                  <Card.Subtitle>Total Bookings</Card.Subtitle>
                </div>
              </div>
            </Card.Body>
          </Card>
          <Card className="card8" onClick={() => navigate("/adminview")}>
            <Card.Body>
              <div className="icon8">
                <div className="round-icon rose">
                  <FontAwesomeIcon icon={faLock} className="icon-white" />
                </div>
                <div className="text-container">
                  <h3>{packageCount}</h3>
                  <Card.Subtitle>Available Packages</Card.Subtitle>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="table-container">
          <h2 className="table-title">User List</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Username</th>
                <th>Email</th>
                <th>PhoneNumber</th>
              </tr>
            </thead>
            <tbody>
              {user.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item.Profileimg} alt="Profile" className="profile-img" />
                  </td>
                  <td>{item.Username}</td>
                  <td>{item.email}</td>
                  <td>{item.Phonenumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
