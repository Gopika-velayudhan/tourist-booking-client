import React from "react";
import { Routes, Route } from "react-router-dom";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import Navbar1 from "./Navbar/Navbar.js";
import Homepage from "../pages/Homepage";
import OTP from "../pages/Otp";
import Packages from "../Components/packages/Packages";
import About from "./home/About.js";

const Mainroute = () => {
  return (
    <div>
      <Navbar1 />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/sendotp" element={<OTP />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<About/>}/>

       
      </Routes>
    </div>
  );
};

export default Mainroute;
