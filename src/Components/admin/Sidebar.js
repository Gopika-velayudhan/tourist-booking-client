import React from "react";
import { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'



 const SideBar = () => {
  const [login,setLogin] = useState(false)
  const navigate = useNavigate()

   const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setLogin(false);
    toast.success("Logout")
    navigate('/');
    
  };

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#2C3539">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink
            to="/adminhome"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Admin
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/adminusers" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminbooking" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="store">Booking Packages</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminview" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Update Package</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminproduct" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus">Add Package</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admincategory" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus">Category</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink exact to="/" activeClassName="activeClicked" onClick={handleLogout}>
              <CDBSidebarMenuItem icon="home">Logout</CDBSidebarMenuItem>
            </NavLink>
           
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}></CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBar