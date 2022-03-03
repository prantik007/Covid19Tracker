import React from "react";
import mainLogo from "../images/main-logo.png";
import {Link} from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="flex bg-lightYellow h-screen justify-around items-center ">
      <div className="caption-and-button flex flex-col items-center ">
        <p className="text-darkGreen text-3xl p-8">
          Best site to check covid data
        </p>
        <Link to="/content">
          <button className="flex justify-center items-center bg-darkGreen hover:bg-yellow hover:text-darkGreen text-lightYellow shadow-md shadow-orange w-max mt-4 p-4">
            Click to Check data
          </button>
        </Link>
      </div>
      <div>
        <img className="w-80" src={mainLogo} alt="main logo" />
      </div>
    </div>
  );
};

export default Homepage;
