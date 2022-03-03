import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar flex justify-around items-center text-2xl bg-lightYellow h-1/4">
      <div className="logo mr-3 ">
        <img className="w-28 pl-2" src={logo} alt="logo" />
      </div>
      <div className="links flex ">
        <ul className="flex justify-center items-center">
          <li className="">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/content">Check Data</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
