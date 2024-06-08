import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Form, Badge } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Logo from "../Assests/Logo.png";
import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { toast } from "react-toastify";
import instance from '../../axiosinterceptor/userinterrceptor'; 
import "./Navbar.css";

function Navbar1() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [login, setLogin] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const name = localStorage.getItem("Username");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token);

    if (token) {
      fetchWishlistCount(); 

      const intervalId = setInterval(fetchWishlistCount, 20000); 

      window.addEventListener('wishlistUpdated', fetchWishlistCount);

      return () => {
        clearInterval(intervalId);
        window.removeEventListener('wishlistUpdated', fetchWishlistCount);
      };
    }
  }, []);

  const fetchWishlistCount = async () => {
    try {
      const userId = localStorage.getItem("_id"); 
      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }
      const response = await instance.get(`/wishlists/${userId}`);
      if (response.data && response.data.datacount !== undefined) {
        setWishlistCount(response.data.datacount);
      } else {
        console.error("Invalid response format", response.data);
      }
    } catch (err) {
      console.error("Error fetching wishlist count:", err);
    }
  };

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Username");
    localStorage.removeItem("userId");
    setLogin(false);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary sticky-navbar">
      <Container>
        <Navbar.Brand href="#home" style={{ display: "flex", textAlign: "left" }}>
          <img src={Logo} alt="Logo" className="logo-img" />
          <div className="head">
            <span>Explore</span>
            <span>Epic</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <NavDropdown
              title="Packages"
              id="responsive-nav"
              show={showDropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <NavDropdown.Item onClick={() => navigate("/honeymoon")}>
                Honeymoon packages
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/advanture")}>
                Adventure Packages
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/family")}>
                Family packages
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
            <Nav.Link onClick={() => navigate("/contact")}>Contacts</Nav.Link>
            
          </Nav>
          <NavDropdown title={name ? <>{name}</> : <>Login</>} id="responsive-nav">
            {!name && (
              <NavDropdown.Item onClick={() => navigate("/login")}>
                Sign In
              </NavDropdown.Item>
            )}
            {name && (
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            )}
            <NavDropdown.Item onClick={() => navigate("/register")}>
              Sign up
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/profile")}>
              Profile
            </NavDropdown.Item>
          </NavDropdown>
          <Nav>
            <Nav.Link onClick={() => navigate("/adminlogin")}>
              <MdAdminPanelSettings style={{ fontSize: "24px" }} />
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/wishlist")}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <IoMdHeartEmpty style={{ fontSize: "24px" }} />
                {wishlistCount > 0 && (
                  <Badge pill bg="danger" style={{ position: "absolute", top: "-8px", right: "-8px" }}>
                    {wishlistCount}
                  </Badge>
                )}
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;
