import React from "react";
import mainLogo from "../images/main-logo.png";

const Homepage = () => {
  return (
    <div className="flex bg-lightYellow h-screen justify-around items-center ">
      <div className="caption-and-button flex flex-col  items-center ">
        <p className="text-darkGreen text-3xl pl-8">Best site to check covid data</p>
        <button className="flex justify-center items-center bg-darkGreen text-lightYellow w-max mt-8 p-4">
          Click to Check data
        </button>
      </div>
      <div>
        <img className="w-80" src={mainLogo} alt="main logo" />
      </div>
    </div>
  );
};

export default Homepage;
