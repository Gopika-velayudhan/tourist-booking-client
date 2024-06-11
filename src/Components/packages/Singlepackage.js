import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import instance from "../../axiosinterceptor/userinterrceptor";
import "./singlepackage.css";
import "./Review.css";

function Singlepackage() {
  const [packages, setPackages] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();
  const [formState, setFormState] = useState({
    Available_Date: "",
    Duration: 0,
    Price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const totalPrice = () => {
    if (packages) {
      const calculatedTotal = formState.Duration * packages.Price;
      setFormState((prevState) => ({
        ...prevState,
        Price: calculatedTotal,
      }));
    }
  };

  const fetchPackage = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login");
        navigate("/login");
        return;
      }
      const response = await instance.get(`/api/user/packages/${id}`);
      setPackages(response.data.data);
    } catch (err) {
      console.error("Error fetching package", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await instance.get(`/api/review/packages/${id}/reviews`);
      
      setReviews(response.data.data);
      setReviewCount(response.data.dataCount);
      setOverallRating(response.data.overallRating);
      console.log(response);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };
  

  useEffect(() => {
    if (id) {
      fetchPackage();
      fetchReviews();
    }
  }, [id]);

  useEffect(() => {
    if (formState.Duration) {
      totalPrice();
    }
  }, [formState.Duration, packages]);

  const handleConfirm = () => {
    if (packages && packages.images && packages.images[0]) {
      navigate(
        `/confirmation/${id}?destination=${packages.Destination}&duration=${formState.Duration}&available_date=${formState.Available_Date}&total_price=${formState.Price}&package_id=${id}&image=${packages.images[0]}`
      );
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <Container className="mt-4">
      {packages && (
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="text-center">
                  {packages.Destination}
                </Card.Title>
                <div className="photoarray">
                  {packages.images && (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-3">
                        <Card.Img
                          className="main-image"
                          src={packages.images[0]}
                          alt={`Image 1 of ${packages.Destination}`}
                        />
                      </div>
                      {packages.images.slice(1).map((image, index) => (
                        <div key={index} className="col-span-1">
                          <Card.Img
                            className="secondary-image"
                            src={image}
                            alt={`Image ${index + 2} of ${packages.Destination}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <h4>Plan Of The Trip</h4>
                  <p>{packages.Description}</p>
                  <h5>₹{packages.Price}-/Day</h5>
                  <h5>{packages.Category}</h5>
                  <h5>
                    Rating: {overallRating} ★
                  </h5>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">
                  ₹{packages.Price} per night
                </Card.Title>
                <p className="text-center text-danger">Non-refundable</p>
                <p className="text-center text-success">
                  Your dates are available
                </p>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Start date</Form.Label>
                    <Form.Control
                      type="date"
                      name="Available_Date"
                      min={getCurrentDate()}
                      value={formState.Available_Date}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      type="number"
                      name="Duration"
                      value={formState.Duration}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Total Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="Price"
                      value={formState.Price}
                      readOnly
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleConfirm}
                  >
                    Confirm Trips
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <div className="review-section">
        <p>Read on to find out why our customers love us!</p>
        <div className="reviews">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <div className="review-avatar">
                  {review.user && review.user.Profileimg ? (
                    <img src={review.user.Profileimg} alt="Profile" />
                  ) : (
                    <div>{review.user && review.user.Username && review.user.Username[0]}</div>
                  )}
                </div>
                <div className="review-details">
                  <h3>{review.user && review.user.Username}</h3>
                </div>
              </div>
              <div className="review-body">
                <p>{review.reviewText}</p>
                <div className="review-rating">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
            </div>
          ))}
          <Button onClick={() => navigate("/review")} className="review-button">
            Rate the Package
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Singlepackage;
