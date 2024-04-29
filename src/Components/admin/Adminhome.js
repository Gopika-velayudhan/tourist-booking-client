import React from "react";
import SideBar from "./Sidebar";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex w-100 flex-wrap-wrap" style={{ backgroundColor: "white" }}>
      <div>
        <SideBar />
      </div>
      <div className="d-flex w-100 flex-wrap-wrap">
        <Card
          style={{ width: "80%", height: "20%", backgroundColor: "green" }}
          className="mb-2 m-2"
          onClick={() => navigate("/adminusers")}
        >
          <Card.Header>Users</Card.Header>
          <Card.Body>
            <Card.Title>USERS</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>

        <Card
          style={{ width: "80%", height: "20%", backgroundColor: "yellow" }}
          className="mb-2 m-2"
        >
          <Card.Header>Booking</Card.Header>
          <Card.Body>
            <Card.Title>Booking</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>

        <Card
          style={{ width: "80%", height: "20%", backgroundColor: "red" }}
          className="mb-2 m-2"
        >
          <Card.Header>Add Package</Card.Header>
          <Card.Body>
            <Card.Title>Add package</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>

        <Card
          style={{ width: "80%", height: "20%", backgroundColor: "skyblue" }}
          className="mb-2 m-2"
        >
          <Card.Header>Completed</Card.Header>
          <Card.Body>
            <Card.Title>Completed</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
