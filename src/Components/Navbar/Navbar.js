import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Logo from "../Assests/Logo.png";

import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar1() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [login, setLogin] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const name = localStorage.getItem("Username");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token);
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      navigate(`/search?location=${inputValue}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Username");
    setLogin(false);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <img src={Logo} alt="Logo" style={{ width: "45px", height: "6vh" }} />
        <Navbar.Brand
          href="#home"
          style={{ display: "flex", textAlign: "left" }}
        >
          <div className="head">
            <span
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "goldenrod",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Explore
            </span>
            <span
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "black",
                fontFamily: "cursive",
              }}
            >
              Epic
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
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
            <Nav.Link onClick={() => navigate("/contacts")}>Contacts</Nav.Link>
            <Form
              className="d-flex"
              style={{ marginLeft: "50px", width: "500px" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <Form.Control
                type="search"
                placeholder="Search here...."
                className="me-2"
                aria-label="Search"
                value={inputValue}
                onChange={handleChange}
              />
              <FaSearch style={{ marginTop: "10px" }} />
            </Form>
          </Nav>

          <NavDropdown
            title={name ? <>{name}</> : <>Login</>}
            id="responsive-nav"
          >
            {!name && (
              <NavDropdown.Item onClick={() => navigate("/login")}>
                Sign In
              </NavDropdown.Item>
            )}
            {name && (
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            )}
            <NavDropdown.Item onClick={()=>navigate('/register')}>Sign up</NavDropdown.Item>
          </NavDropdown>
          <Nav>
            <Nav.Link onClick={() => navigate("/adminlogin")}>
              <MdAdminPanelSettings style={{ fontSize: "24px" }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;
