import React from "react";
import "../home/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendar,
  faMoneyBillAlt,
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
          <div style={{ position: "relative" }}>
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "20px",
                color: "gray",
              }}
            />
            <input
              type="text"
              placeholder="Search for trips"
              className="search-input"
              style={{
                paddingLeft: "30px",
                marginBottom: "10px",
                width: "100%",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ position: "relative" }}>
              <input
                type="number"
                placeholder="Days in trips"
                className="search-input"
                style={{ marginRight: "10px", width: "30%" }}
              />
              <FontAwesomeIcon
                icon={faCalendar}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  color: "gray",
                }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="number"
                placeholder="Trip budget"
                className="search-input"
                style={{ width: "30%" }}
              />
              <FontAwesomeIcon
                icon={faMoneyBillAlt}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  color: "gray",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
