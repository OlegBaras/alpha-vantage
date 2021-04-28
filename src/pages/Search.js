import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Search.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import history from "../components/History";
import Nav from "../components/Nav";
import Loading from "../components/Loading";
import Note from "../components/Note";
import SymbolNotFoundNote from "../components/SymbolNotFoundNote";

function Search() {
  const API_KEY = localStorage.getItem("apiKey");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState("ibm");
  const [url, setUrl] = useState(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyWord}&apikey=${API_KEY}`
  );
  const [gridApi, setGridApi] = useState();
  const [gridColumnApi, setGridColumnApi] = useState();
  const [rowData, setRowData] = useState([]);
  const [note, setNote] = useState();

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

  const renameKey = (obj, oldKey, newKey) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  };
  useEffect(() => {
    //first thing to check if there is search keyword
    if (searchKeyWord) {
      const fetchItems = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
          const result = await axios(url);
          if (result.data["Note"]) {
            setNote(result.data["Note"]);
            setRowData([]);
          } else {
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
          }
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      };
      fetchItems();
    } else {
      return;
    }
  }, [url]);

  // search symbol value change handler
  function onSearchKeyChangeHandler(e) {
    setSearchKeyWord(e.target.value);
    localStorage.setItem("SearchKeyWord", e.target.value);
  }
  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();
    setUrl(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyWord}&apikey=${API_KEY}`
    );
  }
  // On "Enter" key press
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (searchKeyWord.length > 0) {
        e.preventDefault();
        setUrl(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyWord}&apikey=${API_KEY}`
        );
      } else {
        return;
      }
    }
  }

  function gridReadyHandler(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  return (
    <div className="search-page">
      <Nav />
      <div className="root">
        <div className="form">
          <input
            type="text"
            name="searchKeyword"
            value={searchKeyWord}
            onChange={onSearchKeyChangeHandler}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            required
          />
          <label htmlFor="API_KEY" className="label-name">
            <span className="content-name">Enter Search Symbol, i.e. ibm</span>
          </label>
          <button
            disabled={searchKeyWord.length < 1}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="table">
          {isError ? <div>Something went wrong...</div> : null}
          {isLoading ? <Loading /> : null}
          {note && !isLoading ? <Note /> : null}
          {rowData.length && !isError && !isLoading && !note ? (
            <div className="result-list">
              <div
                className="ag-theme-balham"
                style={{ width: "80%", height: 315 }}
              >
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  onCellClicked={() => history.push(`/search/${searchKeyWord}`)}
                  defaultColDef={defaultColdDef}
                  onGridReady={gridReadyHandler}
                />
              </div>
            </div>
          ) : null}
          {!rowData.length && !isLoading && !note && !isError ? (
            <SymbolNotFoundNote />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Search;
