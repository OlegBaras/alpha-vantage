import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "../../css/Intraday.css";

export default function Intraday({ company, value }) {
  const API_KEY = localStorage.getItem("apiKey");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [note, setNote] = useState();
  const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();

  const defaultColdDef = {
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
      headerName: "Open",
      field: "open",
    },
    {
      headerName: "High",
      field: "high",
    },
    {
      headerName: "Low",
      field: "low",
    },
    {
      headerName: "Price",
      field: "price",
    },
    {
      headerName: "Change",
      field: "change",
    },
  ];

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
          `https://www.alphavantage.co/query?function=${value}&symbol=${company}&apikey=${API_KEY}`
        );
        if (result.data["Note"]) {
          setNote(result.data["Note"]);

          setRowData([]);
        } else {
          const obj = result.data["Global Quote"];
          const myData = [];
          myData.push(obj);
          console.log(myData);

          myData.forEach((obj) => {
            renameKey(obj, "01. symbol", "symbol");
            renameKey(obj, "02. open", "open");
            renameKey(obj, "03. high", "high");
            renameKey(obj, "04. low", "low");
            renameKey(obj, "05. price", "price");
            renameKey(obj, "09. change", "change");
          });

          const updatedJson = myData;

          setRowData(updatedJson);
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchItem();
  }, []);

  function gridReadyHandler(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  if (note) {
    return (
      <div>
        You have used API calls limit, please wait a minute and refresh to
        continue.
      </div>
    );
  }

  if (isError) {
    return <div> Something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="table">
      {rowData && (
        <div className="result-list">
          <div
            className="ag-theme-balham"
            style={{ width: "80%", height: "10vh" }}
          >
            <AgGridReact
              // rowStyle={rowStyle}
              onGridReady={gridReadyHandler}
              columnDefs={columnDefs}
              rowData={rowData}
              defaultColDef={defaultColdDef}
            />
          </div>
        </div>
      )}
    </div>
  );
}
