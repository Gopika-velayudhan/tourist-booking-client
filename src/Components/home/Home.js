// src/components/Home.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState({
    Destination: "",
    Duration: "",
    Price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const { Destination, Duration, Price } = searchQuery;
    const query = new URLSearchParams({
      location: Destination,
      duration: Duration,
      price: Price,
    }).toString();
    navigate(`/search?${query}`);
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <Container>
          <Row className="align-items-center">
            <Col>
              <h1
                className="header-title"
                data-aos="fade-down"
                data-aos-delay="350"
              >
                LET'S TRAVEL BEAUTIFUL KERALA WITH US
              </h1>
              <h2
                className="header-subtitle"
                data-aos="fade-down"
                data-aos-delay="700"
              >
                UNCOVER THE MAGIC OF <span className="highlight">INDIA</span>{" "}
                WITH Explore_EPIC
              </h2>
            </Col>
          </Row>
        </Container>
      </header>
      <div className="quote-form">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={3}>
              <input
                type="text"
                className="form-control"
                name="Destination"
                value={searchQuery.Destination}
                placeholder="Destination"
                onChange={handleInputChange}
              />
            </Col>
            <Col xs={12} md={3}>
              <input
                type="number"
                className="form-control"
                name="Duration"
                value={searchQuery.Duration}
                placeholder="Days in trips"
                onChange={handleInputChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <input
                type="number"
                className="form-control"
                name="Price"
                value={searchQuery.Price}
                placeholder="Trips in Budget"
                onChange={handleInputChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <Button
                variant="primary"
                className="get-quotes-button"
                onClick={handleSearch}
              >
                Explore
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
