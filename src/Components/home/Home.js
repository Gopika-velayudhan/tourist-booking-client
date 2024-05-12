import React, { useState } from "react";
import axios from "axios";
import "../home/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import {toast} from 'react-toastify'

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");

  
  const handleSearch = async () => {  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Admin token is not found");
        return;
      }
  
      const tokenWithBearer = `Bearer ${token}`;
  
      const response = await axios.get("http://localhost:3005/api/user/search", {
        params: {
          Destination: searchQuery,
          Duration: days,
          Price: budget,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenWithBearer,
        },
      });
  
      console.log(response.data.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
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
              placeholder="Search for trips"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
            <input
              type="number"
              placeholder="Days in trips"
              className="search-input"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faDollarSign} className="icon" />
            <input
              type="number"
              placeholder="Trip budget"
              className="search-input"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <button type="button" className="search-btn" onClick={handleSearch}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
