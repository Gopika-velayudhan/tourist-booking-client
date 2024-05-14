import React, { useState } from "react";
import axios from "axios";
import "../home/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarAlt, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState({
    Destination: "",
    Duration:0 ,
    Price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  

  return (
    <div>
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div className="search">
          <div className="input-container">
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <input
              type="text"
              name="Destination"
              placeholder="Search for trips"
              className="search-input"
              value={searchQuery.Destination}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
            <input
              type="number"
              name="Duration"
              placeholder="Days in trips"
              className="search-input"
              value={searchQuery.Duration}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faDollarSign} className="icon" />
            <input
              type="number"
              name="Price"
              placeholder="Trip budget"
              className="search-input"
              value={searchQuery.Price}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" className="search-btn" onClick={()=>navigate('/search')}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
