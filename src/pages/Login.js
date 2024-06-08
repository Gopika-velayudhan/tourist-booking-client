import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleLoginSuccess = (token, userDetails) => {
    const { _id, Username, email, Phonenumber } = userDetails;
    localStorage.setItem("token", token);
    localStorage.setItem("_id", _id);
    localStorage.setItem("Username", Username);
    localStorage.setItem("email", email);
    localStorage.setItem("Phonenumber", Phonenumber);

    navigate("/");
    toast.success("Login successful");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/user/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token, user } = response.data;
      handleLoginSuccess(token, user);
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        toast.error("User not found");
      } else if (error.response && error.response.status === 401) {
        toast.error("Incorrect password");
      } else if (error.response && error.response.status === 403) {
        toast.error("User is blocked");
      } else {
        toast.error("An error occurred during login");
      }
    }
    setSubmitting(false);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", padding: "1rem" }}
    >
      <div
        className="shadow p-3 mb-5 bg-white rounded"
        style={{ width: "100%", maxWidth: "25rem" }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Field
                    type="email"
                    name="email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Field
                    type="password"
                    name="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
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
                  <h6 className="mt-3 text-center">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                  </h6>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Login;
