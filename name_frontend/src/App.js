import './App.css';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import DoctorPanel from './components/DoctorPanel';
import KorisnikHome from './components/korisnik/KorisnikHome';
import DoktorHome from './components/doktor/DoktorHome';
import LoginDoktor from './components/LoginDoktor';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {

    const [pacijent, setPacijent] = useState(false);
    const [doktor, setDoktor] = useState(false);
    const findHome = () => {
        if (doktor) return "/doktor"
        else if (pacijent) return "/korisnik"
        else return "/login"
    }

    useEffect(() => console.log("doktor", doktor), [])


    return (<>
        <Navbar  expand="lg" className="sticky-top poz-navbar">
            <Container>
                <Navbar.Brand href={findHome()}>Uputi me</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={findHome()}>Pocetna</Nav.Link>
                        {doktor && <Nav.Link href="/doktor">Doktor panel</Nav.Link>}
                        {pacijent && <Nav.Link href="/korisnik">Pacijent panel</Nav.Link>}
                    </Nav>
                    <Nav className="ml-auto">
                        {!(doktor || pacijent) && <><Nav.Link className="mr-auto" href="/login">Prijavi se</Nav.Link>
                            <Nav.Link className="mr-auto" href="/register">Registruj se</Nav.Link></>}
                        {(doktor || pacijent) && <Nav.Link className="mr-auto" href="#">Odjavi se</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <div className="pozadina">
        <Router>
            <Routes>
                <Route exact path='/' element={<Login setPacijent={(value) => setPacijent(value)} />} />
                <Route path='/login' element={<Login setPacijent={(value) => setPacijent(value)} />} />
                <Route path='/register' element={<Home />} />
                <Route path='/doktor' element={<DoctorPanel />} />
                <Route path='/korisnik' element={<KorisnikHome />} />
                <Route path='/loginDoktor' element={<LoginDoktor setDoktor={(value) => setDoktor(value)} />} />
            </Routes>
            </Router>
        </div>
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

