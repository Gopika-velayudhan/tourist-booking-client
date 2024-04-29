import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  
  const handleLoginSuccess = (token) => {
    localStorage.setItem("token",token)

  
    navigate("/");
    toast.success("login successsfull");
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

      const { token } = response.data;

      handleLoginSuccess(token);
      
    } catch (error) {
      
      console.log(error)
      toast.error("An error occured in log in")
      
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
                  id="Email"
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
                  id="Password"
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
                  Don't have an account?{" "}
                  <Link to="/register">Registration</Link>
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
