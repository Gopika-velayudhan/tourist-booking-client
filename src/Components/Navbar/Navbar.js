import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import Logo from '../Assests/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineHeart } from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg'
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar1() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  
  

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <img src={Logo} alt="Logo" style={{ width: '45px', height: '6vh' }} />
        <Navbar.Brand href="#home" style={{ display: 'flex', textAlign: 'left' }}>
          <div className="head">
            <span
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'goldenrod',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Explore
            </span>
            <span
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'black',
                fontFamily: 'cursive',
              }}
            >
              Epic
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link href="#pricing" onClick={() => navigate('/about')}>About</Nav.Link>
            <NavDropdown
              title="Packages"
              id="responsive-nav"
              show={showDropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <NavDropdown.Item onClick={()=>navigate('/honeymoon')}>Honeymoon packages</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate('/advanture')}>Adavnture Packages</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate('/family')}>Family packages</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#pricing">Contacts</Nav.Link>
            <Form className="d-flex" style={{ marginLeft: '50px', width: '500px' }}>
              <Form.Control
                type="search"
                placeholder="Search here...."
                className="me-2"
                aria-label="Search"
              />
              <FaSearch style={{ marginTop: '10px' }} />
            </Form>
          </Nav>
          <Nav>
            {login ? (
              <Nav.Link>
                 <CgProfile />
               
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => navigate('/Login')}>
                 <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
            )}
            <Nav.Link onClick={()=>navigate('/wishlist')}>
              <AiOutlineHeart style={{ fontSize: '24px' }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;
