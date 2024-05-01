import React, { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap"; 
import axios from "axios";

const AdminHome = () => {
  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0)

  useEffect(() => {
     const fetchUserCount = async () => {
        try{
          const token = localStorage.getItem("adminToken");
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const response = await axios.get(
          "http://localhost:3005/api/admin/users",
          { headers }
        );
          setUserCount(response.data.dataCount)
          console.log(response.data.dataCount);
        }
        catch(error){
          console.log("Error fetching userCount: ",error);
        }
     }
     fetchUserCount()
  },[])


  return (
    <div className="flex w-full" style={{ backgroundColor: "white" }}>
      <div>
        <SideBar />
      </div>
      <div className="flex-column w-full flex-wrap">
        <Card
          className="w-50 h-40 bg-green-500 mb-2 m-2 cursor-pointer"
          onClick={() => navigate("/adminusers")}
        >
          <Card.Header className="text-black">Users</Card.Header>
          <Card.Body>
            <Card.Title className="text-black">{userCount}</Card.Title>
          </Card.Body>
        </Card>

        <Card className="w-50 h-40 bg-yellow-500 mb-2 m-2">
          <Card.Header className="text-black">Booking</Card.Header>
          <Card.Body>
            <Card.Title className="text-black">Booking</Card.Title>
          </Card.Body>
        </Card>

        <Card className="w-50 h-40 bg-red-500 mb-2 m-2">
          <Card.Header className="text-black">Add Package</Card.Header>
          <Card.Body>
            <Card.Title className="text-black">Add package</Card.Title>
          </Card.Body>
        </Card>

        <Card className="w-50 h-40 bg-blue-500 mb-2 m-2">
          <Card.Header className="text-black">Completed</Card.Header>
          <Card.Body>
            <Card.Title className="text-black">Completed</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
