import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home.js';
import About from './components/about.js';
import Contact from './components/contact.js';

function App() {
  return (
    <Router>
          <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route path='/contact' element={<Contact/>} />
              <Route path='/about' element={<About/>} />
          </Routes>
      </Router>
  );
}

export default App;
