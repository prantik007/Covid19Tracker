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
      .catch(function (error) {
        console.error(error);
      });
  }, [selectedCountry]);

  return (
    <div className="flex justify-center items-center bg-lightYellow h-screen">
    <div className="main-content">
      {isLoading ? (
        <p> Loading...</p>
      ) : (
        <>
          <select onChange={selectChangeHandler}>
            {countryList.map((country, index) => {
              return <option key={index}>{country}</option>;
            })}
          </select>
          {isLoadingCountryDetails ? (
            <p> Loading... </p>
          ) : (
            <div>
              <p>{selectedCountry}</p>
              <p>{selectedCountryDetails.continent}</p>
              <p>{selectedCountryDetails.population}</p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          )}

        </>
      )}
      </div>
    </div>
  );
};

export default Content;
