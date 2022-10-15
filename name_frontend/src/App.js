import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import DoctorPanel from './components/DoctorPanel';
import KorisnikHome from './components/korisnik/KorisnikHome';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
    return (<>
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <Nav.Link href="/doctor_panel">Doctor Panel</Nav.Link>
                    <Nav.Link href="/korisnik">Korisnik Home</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                    {/*<Nav.Link className="mr-auto">Login</Nav.Link>*/}
                </Nav>
                <Nav className="ml-auto">
                        <Nav.Link className="mr-auto" href="/login">Login</Nav.Link>
                        <Nav.Link className="mr-auto" href="/register">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/doctor_panel' element={<DoctorPanel />} />
                <Route path='/korisnik' element={<KorisnikHome />} />
            </Routes>
        </Router>
    </>
    );
}

export default App;


    //async populateWeatherData() {
    //    const response = await fetch('weatherforecast');
    //    const response1 = await fetch("https://localhost:7162/UserModel", {
    //        method: "GET",
    //        headers: {
    //            Authorization: "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtYXRrb0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTWF0a28gTWF0a28iLCJleHAiOjE2NjU3NzIzNTN9.hiuTcoOmXsaIJvCEMXLsCE8vt8k9iQYfarT2HdSsubzF4n2zoCajgreB3jtRxBWqmvNMJ6fKRoIK_KMHHevjOQ"
    //        }
    //    })
    //    const rez = await response1.json();
    //    console.log(rez);
    //    const data = await response.json();
    //    this.setState({ forecasts: data, loading: false });
    //}

