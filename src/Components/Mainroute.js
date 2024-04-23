import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import Navbar1 from "./Navbar/Navbar.js";
import Homepage from "../pages/Homepage";
import OtpVerification from "../pages/Otp.js";
import About from "./home/About.js";
import HoneyMoon from "../Components/packages/Honeymoon.js";
import Adavnture from "./packages/Advanture.js";
import Family from "../Components/packages/Family.js";
import UserProfile from "../pages/userProfile.js";
import AdminHome from "../Components/admin/Adminhome.js"
import AdminLogin from "./admin/AdminLogin.js";
import Adminusers from "./admin/AdminUsers.js";
import AdminProduct from "./admin/AdminProduct.js";

const Mainroute = () => {

  
  return (
    <>
    
      

      
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyotp" element={<OtpVerification />} />
          <Route path="/about" element={<About />} />
          <Route path="/honeymoon" element={<HoneyMoon />} />
          <Route path="/advanture" element={<Adavnture />} />
          <Route path="/family" element={<Family />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminusers" element={<Adminusers />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/adminproduct" element={<AdminProduct/>}/>
          
        </Routes>
      </div>
    </>
  );
};

export default Mainroute;
