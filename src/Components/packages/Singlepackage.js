import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Rating from "react-rating-stars-component";
import "./singlepackage.css";
import './Review.css'

function Singlepackage() {
  const [packages, setPackages] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
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
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      if (!token) {
        toast.error("Please login");
        navigate("/login");
        return;
      }
      const response = await axios.get(
        `http://localhost:3005/api/user/packages/${id}`,
        { headers }
      );
      setPackages(response.data.data);
    } catch (err) {
      console.error("Error fetching package", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(
        `http://localhost:3005/api/review/packages/${id}/reviews`,
        { headers }
      );
      setReviews(response.data.data);
    } catch (err) {
      console.error("Error fetching reviews", err);
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
    navigate(
      `/confirmation/${id}?destination=${packages.Destination}&duration=${formState.Duration}&available_date=${formState.Available_Date}&total_price=${formState.Price}&package_id=${id}`
    );
  };

  const handleReviewSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("_id");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.post(
        `http://localhost:3005/api/review/reviews`,
        { user: userid, package: id, rating, reviewText },
        { headers }
      );
      if (response.status === 201) {
        toast.success("Review submitted successfully!");
        setReviewText("");
        setRating(0);
        fetchReviews();
      }
    } catch (err) {
      console.error("Error submitting review", err);
      toast.error("Error submitting review");
    }
  };

  return (
    <Container className="mt-4">
      {packages && (
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="text-center">{packages.Destination}</Card.Title>
                <div className="photoarray">
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
                </div>
                <div className="mt-3">
                  <h4>Plan Of The Trip</h4>
                  <p>{packages.Description}</p>
                  <h5>₹{packages.Price}-/Day</h5>
                  <h5>{packages.Category}</h5>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">₹{packages.Price} per night</Card.Title>
                <p className="text-center text-danger">Non-refundable</p>
                <p className="text-center text-success">Your dates are available</p>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Start date</Form.Label>
                    <Form.Control
                      type="date"
                      name="Available_Date"
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
                  <Button variant="primary" className="w-100" onClick={handleConfirm}>
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
                  {review.user.Profileimg ? (
                    <img src={review.user.Profileimg} alt="Profile" />
                  ) : (
                    <div>{review.user.Username[0]}</div>
                  )}
                </div>
                <div className="review-details">
                  <h3>{review.user.Username}</h3>
                  <p>{review.user.email}</p>
                </div>
              </div>
              <div className="review-body">
                <p>{review.reviewText}</p>
                <div className="review-rating">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
            </div>
          ))}
          <Form className="review-form mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Write a review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Rating
                count={5}
                size={24}
                value={rating}
                onChange={(newRating) => setRating(newRating)}
                activeColor="#ffd700"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleReviewSubmit}>
              Submit Review
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default Singlepackage;
