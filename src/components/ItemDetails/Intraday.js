import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default function Intraday({ company, value }) {
  const API_KEY = localStorage.getItem("apiKey");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [metaData, setMetaData] = useState({});
  const [timeSeries, setTimeSeries] = useState({});
  const [note, setNote] = useState();

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
  };

  const columnDefs = [
    {
      headerName: "Symbol",
      field: "symbol",
    },
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Type",
      field: "type",
    },
    {
      headerName: "Region",
      field: "region",
    },
    {
      headerName: "Market Open",
      field: "marketOpen",
    },
    {
      headerName: "Market Close",
      field: "marketClose",
    },
    {
      headerName: "Timezone",
      field: "timezone",
    },
    {
      headerName: "Currency",
      field: "currency",
    },
    {
      headerName: "MatchScore",
      field: "matchScore",
    },
  ];
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();

  const renameKey = (obj, oldKey, newKey) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  };

  useEffect(() => {
    const fetchItem = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(
          `https://www.alphavantage.co/query?function=${value}&symbol=${company}&interval=5min&apikey=${API_KEY}`
        );
        setMetaData(result.data["Meta Data"]);
        setTimeSeries(result.data["Time Series (5min)"]);
        setNote(result.data.Note);
        console.log(result.data);
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
