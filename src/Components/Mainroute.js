import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import Navbar1 from "./Navbar/Navbar.js";
import Homepage from "../pages/Homepage";
import OtpVerification from "../pages/Otp.js"
// import OTP from "../pages/Otp";
import About from "./home/About.js";
import HoneyMoon from "../Components/packages/Honeymoon.js";
import Adavnture from "./packages/Advanture.js";
import Family from "../Components/packages/Family.js";
import UserProfile from "../pages/userProfile.js";
import Adminhome from "./admin/Adminhome.js";
import AdminLogin from "./admin/AdminLogin.js";
import SideBar from "./admin/Sidebar.js";
import Adminusers from "./admin/Admin users.js";

const Mainroute = () => {
  const location = useLocation();

  
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar1 />}
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/verifyotp" element={<OtpVerification />} />
          <Route path="/about" element={<About />} />
          <Route path="/honeymoon" element={<HoneyMoon />} />
          <Route path="/advanture" element={<Adavnture />} />
          <Route path="/family" element={<Family />} />
          <Route path="/userprofile" element={<UserProfile />} />

          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminhome" element={<Adminhome />} />
          <Route path="/adminusers" element={<Adminusers/>}/>
        </Routes>
        {isAdminRoute && <SideBar />} 
      </div>
    </>
  );
};

export default Mainroute;
