import React, { useEffect, useState } from "react";
import axios from "axios";

const Content = () => {
  const [countryList, setCountryList] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCountryDetails, setSelectedCountryDetails] = useState({});
  const [isLoadingCountryDetails, setIsLoadingCountryDetails] = useState(false);

  //Fill select value
  useEffect(() => {
    setIsLoading(true);
    const options = {
      method: "GET",
      url: "https://covid-193.p.rapidapi.com/countries",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "807988d397msh1c7c3a6d15a6f09p110b1cjsn1d3105faff45",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        return response.data.response;
      })
      .then((newData) => {
        setCountryList(newData);
      })
      .then(() => setIsLoading(false));
  }, []);

  const selectChangeHandler = (selected) => {
    setSelectedCountry(selected.target.value);
  };

  //Get Details By Country
  useEffect(() => {
    setIsLoadingCountryDetails(true);
    const options = {
      method: "GET",
      url: "https://covid-193.p.rapidapi.com/statistics",
      params: { country: selectedCountry },
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "807988d397msh1c7c3a6d15a6f09p110b1cjsn1d3105faff45",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setSelectedCountryDetails(response.data.response[0]);
      })
      .then(() => setIsLoadingCountryDetails(false))
      .then(() => console.log(selectedCountryDetails))
      .catch(function (error) {
        console.error(error);
      });
  }, [selectedCountry]);

  return (
    <div className="flex flex-col justify-center items-center bg-lightYellow h-screen">
      <div className="main-content flex-col justify-center items-center w-1/2">
        {isLoading ? (
           <p className="flex justify-center text-darkGreen text-2xl font-medium">Loading...</p>
        ) : (
          <>
          <div className="flex justify-center items-center pb-2">
          <p className="text-darkGreen text-2xl font-medium pr-2">Select Country:    </p>
            <select onChange={selectChangeHandler}>
              {countryList.map((country, index) => {
                return <option key={index}>{country}</option>;
              })}
            </select>
            </div>
            {isLoadingCountryDetails ? (
              <p className="flex justify-center text-darkGreen text-2xl font-medium">Loading...</p>  
            ) : (
              <div className="flex justify-center items-center">
              <table className="justify-center table-auto w-26 ">
              <thead>

              </thead>
                {console.log(selectedCountryDetails)}
              <tbody className="p-4">

              <tr><td>Continent: </td><td>{selectedCountryDetails.continent}</td></tr>
              <tr><td>Country: </td><td>{selectedCountryDetails["country"]} </td></tr>
                
                
                {/*Cases*/}
               <p className="text-darkGreen text-2xl font-medium">Cases</p> 
                
                <tr><td>Cases/million:</td><td>{selectedCountryDetails?.cases?.["1M_pop"]??"Not Available"}</td></tr>
                   
                
                  <tr><td>Active:</td><td>{selectedCountryDetails?.cases?.active??"Not Available"}</td></tr>
                  <tr><td>Critical:</td><td>{selectedCountryDetails?.cases?.critical??"Not Available"}</td></tr>
                  <tr><td>New Cases:</td><td>{selectedCountryDetails?.cases?.new??"Not Available"}</td></tr>
                  <tr><td>Recovered: </td><td>{selectedCountryDetails?.cases?.recovered??"Not Available"}</td></tr>
                  <tr><td>Total:</td><td>{selectedCountryDetails?.cases?.total??"Not Available"}</td></tr>
                
                 
                 
                
                 
                {/*Deaths*/}
                <p className="text-darkGreen text-2xl font-medium"> Deaths</p>
                
                <tr><td>Death/million:</td><td>{selectedCountryDetails?.deaths?.["1M_pop"]??"Not Available"}</td></tr>
                <tr><td>New: </td><td>{selectedCountryDetails?.deaths?.new??"Not Available"}</td></tr>
                <tr><td>Total: </td><td>{selectedCountryDetails?.deaths?.total??"Not Available"}</td></tr>
                   
                
                
                

                {/*Population*/}
                <p className="text-darkGreen text-2xl font-medium">Population</p>

                <tr><td></td><td>{selectedCountryDetails?.population??"Not Available"}</td></tr>
                

                {/*Tests*/}
                <p className="text-darkGreen text-2xl font-medium">Tests</p>
                
                <tr><td>Tests/million:</td><td>{selectedCountryDetails?.tests?.["1M_pop"]??"Not Available"}</td></tr>
                <tr><td>Total: </td><td>{selectedCountryDetails?.tests?.total??"Not Available"}</td></tr>
                   
                
                
                </tbody>
                <p className="text-darkGreen text-base pl-2 font-medium">Last Updated: {selectedCountryDetails.day} </p>
                </table>
                
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
