import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "../css/Search.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import history from "../components/History";
import Nav from "../components/Nav";

function Search() {
  const API_KEY = localStorage.getItem("apiKey");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [url, setUrl] = useState(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyWord}&apikey=${API_KEY}`
  );

  const columnDefs = [
    {
      headerName: "Symbol",
      field: "symbol",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      width: 300,
    },
    {
      headerName: "Type",
      field: "type",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "Region",
      field: "region",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "Market Open",
      field: "marketOpen",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Market Close",
      field: "marketClose",
      sortable: true,
      filter: true,
    },
    { headerName: "Timezona", field: "timezone", sortable: true, filter: true },
    { headerName: "Currency", field: "currency", sortable: true, filter: true },
    {
      headerName: "MatchScore",
      field: "matchScore",
      sortable: true,
      filter: true,
    },
  ];
  const [rowData, setRowData] = useState([]);
  const renameKey = (obj, oldKey, newKey) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  };
  useEffect(() => {
    const fetchItems = async () => {
      setIsError(false);
      setIsLoading(true);

      if (localStorage.getItem("SearchKeyWord")) {
        setSearchKeyWord(localStorage.getItem("SearchKeyWord"));
      }

      try {
        const result = await axios(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyWord}&apikey=${API_KEY}`
        );
        if (result.data.bestMatches) {
          const arr = result.data.bestMatches;
          arr.forEach((obj) => {
            renameKey(obj, "1. symbol", "symbol");
            renameKey(obj, "2. name", "name");
            renameKey(obj, "3. type", "type");
            renameKey(obj, "4. region", "region");
            renameKey(obj, "5. marketOpen", "marketOpen");
            renameKey(obj, "6. marketClose", "marketClose");
            renameKey(obj, "7. timezone", "timezone");
            renameKey(obj, "8. currency", "currency");
            renameKey(obj, "9. matchScore", "matchScore");
          });
          const updatedJson = arr;
          setRowData(updatedJson);
        } else {
          setRowData([]);
        }
        setRowData(result.data.bestMatches);
      } catch (error) {
        setIsError(true);
      }
      console.log(rowData);
      setIsLoading(false);
    };
    fetchItems();
    setUrl("");
  }, [url]);

  function setSearchV(e) {
    setSearchKeyWord(e.target.value);
    localStorage.setItem("SearchKeyWord", e.target.value);
  }

  return (
    <div className="search-window">
      <Nav />
      <form
        className="search-form"
        onSubmit={(event) => {
          event.preventDefault();
          setUrl(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyWord}&apikey=${API_KEY}`
          );
        }}
      >
        <label>Input search keyword, e.g. ibm : </label>
        <input
          type="text"
          name="searchKeyword"
          value={searchKeyWord}
          onChange={setSearchV}
          placeholder="Input search..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {isError && <div>Something went wrong...</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="result-list">
            <div
              className="ag-theme-balham"
              style={{ width: "95%", height: 400 }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                onCellClicked={() => history.push(`/search/${searchKeyWord}`)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
