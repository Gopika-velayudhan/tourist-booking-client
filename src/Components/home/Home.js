// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faCalendarAlt, faDollarSign } from "@fortawesome/free-solid-svg-icons";
// import "../home/Homepage.css";

// function Home() {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState({
//     Destination: "",
//     Duration: 0,
//     Price: 0,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSearchQuery((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSearch = () => {
//     const { Destination, Duration, Price } = searchQuery;
//     const query = new URLSearchParams({ location: Destination, duration: Duration, price: Price }).toString();
//     navigate(`/search?${query}`);
//   };

//   return (
//     <div>
//       <div
//         className="main"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//         }}
//       >
//         <div className="search">
//           <div className="input-container">
//             <FontAwesomeIcon icon={faSearch} className="icon" />
//             <input
//               type="text"
//               name="Destination"
//               placeholder="Search for trips"
//               className="search-input"
//               value={searchQuery.Destination}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="input-container">
//             <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
//             <input
//               type="number"
//               name="Duration"
//               placeholder="Days in trips"
//               className="search-input"
//               value={searchQuery.Duration}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="input-container">
//             <FontAwesomeIcon icon={faDollarSign} className="icon" />
//             <input
//               type="number"
//               name="Price"
//               placeholder="Trip budget"
//               className="search-input"
//               value={searchQuery.Price}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button type="button" className="search-btn" onClick={handleSearch}>
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
// src/components/MainContent.js
import React from "react";
import "./Homepage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faSearch,
  faCalendarAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
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
        <h1>Customize & Book Amazing Holiday Packages</h1>

        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="icon" />
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
          <button onClick={handleSearch}>Explore</button>
        </div>
      </section>
      <section className="themes">
        <h2 className="themes_h1">Explore destinations by theme</h2>
        <div className="themes-container">
          <div className="theme-item">
            <img src={img1} />
          </div>
          <div className="theme-item">
            <img src={img2} />
          </div>
          <div className="theme-item">
            <img src={img3} />
          </div>
          <div className="theme-item">
            <img src={img4} />
          </div>
          <div className="theme-item">
            <img src={img5} />
          </div>
          <div className="theme-item">
            <img src={img6} />
          </div>
        </div>
        <div className=" flex items-center justify-end p-5">
          <a
            href="https://api.whatsapp.com/send?phone=7736730305"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800"
          >
            <FaWhatsappSquare className="text-6xl" />
          </a>
          <h4 className="text-white text-xl ml-2">Chat with us</h4>
        </div>
      </section>
    </main>
  );
}

export default Home;
