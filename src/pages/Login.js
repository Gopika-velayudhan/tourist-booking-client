import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleLoginSuccess = (token, userDeatils) => {
    const {_id,Username,email,Phonenumber} = userDeatils
    localStorage.setItem("token", token);
    localStorage.setItem("_id", _id);
    localStorage.setItem("Username", Username);
    localStorage.setItem("email", email);
    localStorage.setItem("Phonenumber", Phonenumber);
    
    navigate("/");
    toast.success("Login successful");
  };
 

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:3005/api/user/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { token,user} = response.data;
   
        
   
    
    
    handleLoginSuccess(token,user);
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.status === 404) {
      toast.error("User  not found");
    } else if (error.response && error.response.status === 401) {
      toast.error("Incorrect password");
    } else if (error.response && error.response.status === 403) {
      toast.error("User is blocked");
    } else {
      toast.error("An error occurred during login");
    }
  }
};

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="shadow p-3 mb-5 bg-white rounded m-3"
          style={{ width: "25rem" }}
        >
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <h6 className="text-primary">Forgot password</h6>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Button variant="success" block type="submit">
                  Login
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>
                <h6 className="mt-3">
                  Don't have an account? <Link to="/register">Register</Link>
                </h6>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
