import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Button, Container } from "react-bootstrap";
import instance from "../../axiosinterceptor/Axiosinterceptor";
import { toast } from "react-toastify"

function AdminLogin() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post(
        
        "/api/admin/admin_login",
        login
      );
      const { data } = response.data;
      console.log("Login successful:", data);

      localStorage.setItem("adminToken", data);

      navigate("/adminhome");
      toast.success("login successsfull");
    } catch (error) {
      console.error("Login failed:", error.response.data);
      toast.error("An error occured in log in");
    }
  };

  return (
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
                name="email"
                value={login.email}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={login.password}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Button variant="success" block type="submit">
                Login
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </Container>
  );
}

export default AdminLogin;
