import React, { useState, useEffect } from "react";
import axios from "axios";

function IndicatorBBANDS({ company, value }) {
  const API_KEY = localStorage.getItem("apiKey");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [metaData, setMetaData] = useState({});
  const [timeSeries, setTimeSeries] = useState({});
  const [note, setNote] = useState();
  useEffect(() => {
    const fetchItem = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(
          `https://www.alphavantage.co/query?function=${value}&symbol=${company}&interval=weekly&time_period=5&series_type=close&nbdevup=3&nbdevdn=3&apikey=${API_KEY}`,
          { timeout: 2000 }
        );
        setMetaData(result.data["Meta Data"]);
        setTimeSeries(result.data["Technical Analysis: BBANDS"]);
        setNote(result.data.Note);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchItem();
  }, []);

  return (
    <div>
      {note && <div>{note}</div>}
      <p>{company}</p> <p>{value}</p>
      {isError && <div>Something went wrong </div>}
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <div>
          <div>
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
              <>no time series data</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default IndicatorBBANDS;
