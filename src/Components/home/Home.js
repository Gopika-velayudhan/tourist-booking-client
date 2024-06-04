import React from "react";
import "./Homepage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from "../Assests/honeymoon_home.webp";
import img2 from "../Assests/family_home.webp";
import img3 from "../Assests/adventure_home.webp";
import img4 from "../Assests/friends_group.webp";
import img5 from "../Assests/nature_home.webp";
import img6 from "../Assests/wildlife_home.webp";
import { FaWhatsappSquare } from "react-icons/fa";

function Home() {
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
    <main className="main-content">
      <section className="hero">
        <h1>Turn Your Dream Holiday Into Reality</h1>
        <div className="search-box">
          <input
            type="text"
            name="Destination"
            placeholder="Search for trips"
            className="search-input"
            value={searchQuery.Destination}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="Duration"
            placeholder="Days in trips"
            className="search-input"
            value={searchQuery.Duration}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="Price"
            placeholder="Trip budget"
            className="search-input"
            value={searchQuery.Price}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch} className="search-btn">
            Explore
          </button>
        </div>
      </section>
      <section className="themes">
        <h2 className="themes_h1">Explore destinations by theme</h2>
        <div className="themes-container">
          {[img1, img2, img3, img4, img5, img6].map((img, index) => (
            <div className="theme-item" key={index}>
              <img src={img} alt={`theme-${index}`} />
            </div>
          ))}
        </div>
        <div className="whatsapp-container">
          <a
            href="https://api.whatsapp.com/send?phone=7736730305"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            <FaWhatsappSquare className="whatsapp-icon" />
          </a>
          <h4 className="whatsapp-text">Chat with us</h4>
        </div>
      </section>
    </main>
  );
}

export default Home;
