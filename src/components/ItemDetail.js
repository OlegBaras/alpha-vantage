import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

function ItemDetail({ match }) {
  const API_KEY = localStorage.getItem("apiKey");
  // const [item, setItem] = useState({});
  const [metaData, setMetaData] = useState({});
  const [timeSeries, setTimeSeries] = useState({});
  //testing
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${match.params.id}&apikey=${API_KEY}`
        );
        //setItem(result.data);
        setMetaData(result.data["Meta Data"]);
        setTimeSeries(result.data["Time Series (Daily)"]);
        const metaData = result.data["Meta Data"];
        //const timeSeries = result.data["Time Series (Daily)"];

        Object.keys(metaData).map(function (key, index) {
          //console.log(metaData);
          // console.log(metaData[key]);
        });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchItem();
  }, []);
  return (
    <div>
      {isError && <div>Something went wrong..</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {match.params.id}
          {metaData ? (
            Object.keys(metaData).map(function (key, index) {
              return (
                <div key={index}>
                  {key} : {metaData[key]}
                </div>
              );
            })
          ) : (
            <></>
          )}
          {timeSeries ? (
            Object.keys(timeSeries).map(function (key, index) {
              return (
                <div key={index}>
                  {key} : open : {timeSeries[key]["1. open"]}
                  {key} : close : {timeSeries[key]["4. close"]}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemDetail;
