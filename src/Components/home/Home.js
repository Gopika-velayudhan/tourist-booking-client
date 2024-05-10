import React, { useState } from "react";
import axios from "axios";
import "../home/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  

  // const handleSearch = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     console.log(token);
  //     const headers = token ? { Authorization: `Bearer ${token}` } : {};
  //     const response = await axios.post("http://localhost:3005/api/user/search", {
  //       query: searchQuery,
  //       days,
  //       budget,
  //     }, { headers });
  //     console.log(response.data); 
  //   } catch (error) {
  //     console.error("Error searching packages:", error);
  //     // Handle error
  //   }
  // };

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
        {/* Your existing JSX code */}
        <div className="search">
          <div className="input-container">
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <input
              type="text"
              placeholder="Search for trips"
              className="search-input"
              
              
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
            <input
              type="number"
              placeholder="Days in trips"
              className="search-input"
          
            
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faDollarSign} className="icon" />
            <input
              type="number"
              placeholder="Trip budget"
              className="search-input"
              
              
            />
          </div>
          <button type="button" className="search-btn" >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
