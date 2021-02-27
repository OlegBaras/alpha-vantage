import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

function ItemDetail({ match }) {
  const API_KEY = localStorage.getItem("apiKey");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [param, setParam] = useState("Time Series (Daily)");
  const [metaData, setMetaData] = useState({});
  const [timeSeriesWeekly, setTimeSeriesWeekly] = useState({});
  const [timeSeriesDaily, settimeSeriesDaily] = useState("");
  const [timeSeriesMonthly, settimeSeriesMonthly] = useState("");
  useEffect(() => {
    const fetchItem = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(
          `https://www.alphavantage.co/query?function=${param}&symbol=${match.params.id}&apikey=${API_KEY}`
        );
        const keyNames = Object.keys(result.data);
        console.log(param);
        console.log(keyNames);

        console.log(result.data);
        setMetaData(result.data["Meta Data"]);
        setTimeSeriesWeekly(result.data["Weekly Time Series"]);
        settimeSeriesDaily(result.data["Time Series (Daily)"]);
        settimeSeriesMonthly(result.data["Monthly Time Series"]);
        // Object.keys(metaData).map(function (key, index) {
        //console.log(metaData);
        // console.log(metaData[key]);
        // });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchItem();
  }, [param]);

  function filterHistoricPrice(e) {
    // if (e.target.value === "TIME_SERIES_INTRADAY") {
    //   console.log("intraday");
    // }
    setParam(e.target.value);
    console.log(`param here :${param}`);
  }
  function displayQuote() {
    setParam("GLOBAL_QUOTE");
  }
  return (
    <div>
      {isError && <div>Something went wrong..</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="item-details">
          Company name: {match.params.id}
          <div className="item-navbar">
            <select
              value={param}
              id="Historical Prices"
              onChange={(e) => setParam(e.target.value)}
            >
              {/* <option value="" disabled hidden>
                Select Historical Prices
              </option> */}
              <option value="TIME_SERIES_INTRADAY">Intraday</option>
              <option value="TIME_SERIES_DAILY">Daily</option>
              <option value="TIME_SERIES_WEEKLY">Weekly</option>
              <option value="TIME_SERIES_MONTHLY">Monthly</option>
            </select>
            <button type="" onClick={() => displayQuote()}>
              Display Quote
            </button>
          </div>
          <div className="meta-data">
            {metaData ? (
              Object.keys(metaData).map(function (key, index) {
                return (
                  <div key={index}>
                    {key} : {metaData[key]}
                  </div>
                );
              })
            ) : (
              <>no meta data</>
            )}
          </div>
          <div className="time-series">
            {timeSeriesWeekly ? (
              Object.keys(timeSeriesWeekly).map(function (key, index) {
                return (
                  <div key={index}>
                    {key} : open : {timeSeriesWeekly[key]["1. open"]}
                    {key} : close : {timeSeriesWeekly[key]["4. close"]}
                  </div>
                );
              })
            ) : (
              <>no weekly time series data</>
            )}
          </div>
          <div className="time-series">
            {timeSeriesDaily ? (
              Object.keys(timeSeriesDaily).map(function (key, index) {
                return (
                  <div key={index}>
                    {key} : open : {timeSeriesDaily[key]["1. open"]}
                    {key} : close : {timeSeriesDaily[key]["4. close"]}
                  </div>
                );
              })
            ) : (
              <>no daily time series data</>
            )}
          </div>
          <div className="time-series">
            {timeSeriesMonthly ? (
              Object.keys(timeSeriesMonthly).map(function (key, index) {
                return (
                  <div key={index}>
                    {key} : open : {timeSeriesMonthly[key]["1. open"]}
                    {key} : close : {timeSeriesMonthly[key]["4. close"]}
                  </div>
                );
              })
            ) : (
              <>no monthly time series data</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetail;
