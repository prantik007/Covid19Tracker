import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import {
  
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import InvalidPage from "./components/InvalidPage";
import AboutUs from "./components/AboutUs";
export default function App() {
  return (
    
      <Router>
        <div className="App flex flex-col h-screen">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/content" element={<Content/>} />
            <Route exact path="/about-us" element={<AboutUs/>} />
            <Route exact path="/*" element={<InvalidPage/>} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    
  );
}
