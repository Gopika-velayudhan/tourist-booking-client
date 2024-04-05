import React from "react";
import "../home/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarAlt,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";

function Home() {
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
        <h2
          style={{
            fontSize: "bold",
            color: "black",
            marginTop: "30px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
          className="para"
        >
          Welcome To Explore
          <span
            style={{
              fontWeight: "bold",
              color: "goldenrod",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Epic
          </span>
        </h2>
        <h1
          style={{
            fontFamily: "cursive",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "20px",
            color: "white",
          }}
        >
          Turn Your{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "goldenrod",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Dream Holiday
          </span>{" "}
          into Reality
        </h1>

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
            <FontAwesomeIcon icon={ faDollarSign} className="icon" />
            <input
              type="number"
              placeholder="Trip budget"
              className="search-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
