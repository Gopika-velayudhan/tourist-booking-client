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
import Search from "./search/Search.js";
import AdminHome from "../Components/admin/Adminhome.js";
import AdminLogin from "./admin/AdminLogin.js";
import Adminusers from "./admin/AdminUsers.js";
import AdminProduct from "./admin/AdminProduct.js";
import SideBar from "./admin/Sidebar.js";
import Adminviewproduct from "./admin/Adminviewproduct.js";
import Adminedit from "./admin/Adminedit.js";
import Adminsingle from "./admin/Adminsingle.js";
import Singlepackage from "./packages/Singlepackage.js";
import Wishlist from "./packages/Wishlist.js";


import Confirmation from "./payment/Confirmation.jsx";
import Booking from "./payment/Booking.jsx";

const Mainroute = () => {
  const location = useLocation();

  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      <div>
        {isAdminPath ? null : <Navbar1 />}
        <Routes>
          
          {/* user route */}
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyotp" element={<OtpVerification />} />
          <Route path="/about" element={<About />} />
          <Route path="/honeymoon" element={<HoneyMoon />} />
          <Route path="/advanture" element={<Adavnture />} />
          <Route path="/family" element={<Family />} />
          <Route path="/search" element={<Search/>}/>
          <Route path="/singlepack/:id" element={<Singlepackage />} />
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="confirmation/:id" element={<Confirmation/>}/>
          <Route path="/booking/:id" element={<Booking/>}/>
          
      
          
         
          


          {/* admin route */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminusers" element={<Adminusers />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/adminproduct" element={<AdminProduct />} />
          <Route path="/sidebar" element={<SideBar />} />
          <Route path="/adminview" element={<Adminviewproduct />} />
          <Route path="/adminedit/:id" element={<Adminedit />} />
          <Route path="/adminsingle/:id" element={<Adminsingle />} />

          
        
         
        </Routes>
      </div>
    </>
  );
};

export default Mainroute;
