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
    <div className="d-flex w-100">
      <div>
        <Sidebar />
      </div>
      <div className="flex-grow-1 p-3 container2">
        <div className="card-container3 d-flex justify-content-between mb-3">
          <Card
            className="mb-2 m-2"
            onClick={() => navigate("/adminusers")}
          >
            <Card.Body>
              <div className="icon2">
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
          <Card
            className="mb-2 m-2"
            onClick={() => navigate("/adminbooking")}
          >
            <Card.Body>
              <div className="icon2">
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
          <Card
            className="mb-2 m-2"
            onClick={() => navigate("/adminview")}
          >
            <Card.Body>
              <div className="icon2">
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
        <div className="max-w-full mx-auto p-6 bg-white rounded-md shadow-md overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4 text-center text-orange-900 uppercase">
            User List
          </h2>
          <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  PhoneNumber
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {user.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.Profileimg}
                      alt="Profile"
                      className="w-7 h-7 rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.Username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.Phonenumber}
                  </td>
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
