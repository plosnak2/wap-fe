import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {Navigate, useNavigate } from 'react-router-dom'

function NavigationBar() {
    const [role, setRole] = useState(localStorage.getItem("role")?localStorage.getItem("role"):null);
    const navigate = useNavigate();

    function logout(){
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      setRole(null)
      navigate('/login',{ replace: true })
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand><Link to="/"> <a>Royal Palms Hotel</a> </Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            
              
              {
                role === "customer" ?
                <Nav className="me-auto">
                  <Nav.Link> <Link to="/"> <a>Prehľad Izieb</a> </Link> </Nav.Link>
                  <Nav.Link > <Link to="/myreservations"> Moje rezervácie </Link></Nav.Link>
                  <Nav.Link> <Link to="/editprofile">Upraviť údaje </Link></Nav.Link>
                </Nav> : role === "employee" ?
                <Nav className="me-auto">
                  <Nav.Link> <Link to="/reservationslist"> <a>Rezervácie</a> </Link> </Nav.Link>
                  <Nav.Link> <Link to="/guests"> <a>Hostia</a> </Link> </Nav.Link>
                  <Nav.Link> <Link to="/roomsinfo"> <a>Izby</a> </Link> </Nav.Link>
                </Nav> : role === null ?
                <Nav className="me-auto">
                <Nav.Link> <Link to="/"> <a>Prehľad Izieb</a> </Link> </Nav.Link>
                </Nav> : role === "admin" ?
                <Nav className="me-auto">
                  <Nav.Link> <Link to="/reservationslist"> <a>Rezervácie</a> </Link> </Nav.Link>
                  <Nav.Link> <Link to="/guests"> <a>Hostia</a> </Link> </Nav.Link>
                  <Nav.Link> <Link to="/roomsinfo"> <a>Izby</a> </Link> </Nav.Link>
                  <Nav.Link> <Link to="/manageroles"> <a>Zamestnanci</a> </Link> </Nav.Link>
                </Nav> :
                null
              }
      
            
            <Nav>
            {
                role == null ?
                <Button variant="light" onClick={() => navigate('/login')}>Prihlásiť sa</Button> :
                <Button variant="light" onClick={() => logout()}>Odhlásiť sa</Button>
            }
          </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
  }
  
  export default NavigationBar;