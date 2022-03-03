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
    <div className="flex justify-center items-center bg-lightYellow h-screen">
      <div className="main-content flex border-2 p-6">
        {isLoading ? (
          <p> Loading...</p>
        ) : (
          <>
          <div>
            <select onChange={selectChangeHandler}>
              {countryList.map((country, index) => {
                return <option key={index}>{country}</option>;
              })}
            </select>
            </div>
            {isLoadingCountryDetails ? (
              <p> Loading... </p>
            ) : (
              <div>
                {console.log(selectedCountryDetails)}

                <p>Continent: {selectedCountryDetails.continent}</p>
                <p>Country: {selectedCountryDetails["country"]} </p>
                {/*Cases*/}
                <p>Cases</p>
                <p>
                  Cases/million: {selectedCountryDetails?.cases?.["1M_pop"]}
                </p>

                <p>Active:{selectedCountryDetails?.cases?.active??"Not Available"}</p>
                <p>Critical: {selectedCountryDetails?.cases?.critical??"Not Available"}</p>
                <p>New Cases: {selectedCountryDetails?.cases?.new??"Not Available"}</p>
                <p>Recovered: {selectedCountryDetails?.cases?.recovered??"Not Available"}</p>
                <p>Total: {selectedCountryDetails?.cases?.total??"Not Available"}</p>
                {/*Deaths*/}
                <p>Deaths</p>
                <p>
                  Death/million: {selectedCountryDetails?.deaths?.["1M_pop"]??"Not Available"}
                </p>
                <p>New: {selectedCountryDetails?.deaths?.new??"Not Available"}</p>
                <p>Total: {selectedCountryDetails?.deaths?.total??"Not Available"}</p>

                {/*Population*/}
                <p>Population</p>
                <p>{selectedCountryDetails?.population??"Not Available"}</p>

                {/*Tests*/}
                <p>Tests</p>
                <p>
                  Tests/million: {selectedCountryDetails?.tests?.["1M_pop"]??"Not Available"}
                </p>
                <p>Total: {selectedCountryDetails?.tests?.total??"Not Available"}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
