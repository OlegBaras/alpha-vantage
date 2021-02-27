import React, { useState, useEffect } from "react";
import axios from "axios";

function Daily({ company, value }) {
  const API_KEY = localStorage.getItem("apiKey");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [timeSeries, setTimeSeries] = useState({});
  useEffect(() => {
    const fetchItem = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(
          `https://www.alphavantage.co/query?function=${value}&symbol=${company}&apikey=${API_KEY}`
        );
        setTimeSeries(result.data["Global Quote"]);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchItem();
  }, []);

  return (
    <div>
      <p>{company}</p> <p>{value}</p>
      {isError && <div>Something went wrong </div>}
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <div>
          <div className="time-series">
            {timeSeries ? (
              Object.keys(timeSeries).map(function (key, index) {
                return (
                  <div key={index}>
                    {key} : {timeSeries[key]}
                  </div>
                );
              })
            ) : (
              <>no time series data</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Daily;
