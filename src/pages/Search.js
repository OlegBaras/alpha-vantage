import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "../css/Search.css";

function Search() {
  const API_KEY = localStorage.getItem("apiKey");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [url, setUrl] = useState(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyWord}&apikey=${API_KEY}`
  );
  const [originalData, setOriginalData] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [typeValue, setTypeValue] = useState("");
  const [regionValue, setRegionValue] = useState("");
  const [timeZoneValue, setTimeZoneValue] = useState("");
  const [currencyValue, setCurrencyValue] = useState("");
  const [matchScoreValue, setMatchScoreValue] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      setIsError(false);
      setIsLoading(true);

      if (localStorage.getItem("SearchKeyWord")) {
        setSearchKeyWord(localStorage.getItem("SearchKeyWord"));
        try {
          const result = await axios(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyWord}&apikey=${API_KEY}`
          );
          if (result.data.bestMatches) {
            setOriginalData(result.data.bestMatches);
            setDataToDisplay(result.data.bestMatches);
            setTypeValue("");
            setRegionValue("");
            setTimeZoneValue("");
            setCurrencyValue("");
            setMatchScoreValue("");
          } else {
            setOriginalData([]);
            setDataToDisplay([]);
            setTypeValue("");
            setRegionValue("");
            setTimeZoneValue("");
            setCurrencyValue("");
            setMatchScoreValue("");
          }
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      }
    };
    fetchItems();
    setUrl("");
  }, [url]);

  function setSearchV(e) {
    // if (localStorage.getItem("SearchKeyWord")) {
    //   setSearchKeyWord(localStorage.getItem("SearchKeyWord"));
    // } else {
    setSearchKeyWord(e.target.value);
    localStorage.setItem("SearchKeyWord", e.target.value);
    // }
  }

  function returnOriginal() {
    setDataToDisplay(originalData);
  }

  function filter(e) {
    switch (e.target.name) {
      case "3. type":
        if (e.target.value === "all") {
          returnOriginal();
          setTypeValue(e.target.value);
          setRegionValue("");
          setTimeZoneValue("");
          setCurrencyValue("");
          setMatchScoreValue("");
        } else {
          setTypeValue(e.target.value);
          setRegionValue("");
          setTimeZoneValue("");
          setCurrencyValue("");
          setMatchScoreValue("");
          let typeData = originalData.filter((item) => {
            return (
              item[e.target.name].toLowerCase() === e.target.value.toLowerCase()
            );
          });
          setDataToDisplay(typeData);
        }
        break;
      case "4. region":
        if (e.target.value === "all") {
          returnOriginal();
          setRegionValue(e.target.value);
          setTypeValue("");
          setTimeZoneValue("");
          setCurrencyValue("");
          setMatchScoreValue("");
        } else {
          setRegionValue(e.target.value);
          setTypeValue("");
          setTimeZoneValue("");
          setCurrencyValue("");
          setMatchScoreValue("");
          let regionData = originalData.filter((item) => {
            return (
              item[e.target.name].toLowerCase() === e.target.value.toLowerCase()
            );
          });
          setDataToDisplay(regionData);
        }
        break;
      case "7. timezone":
        if (e.target.value === "all") {
          returnOriginal();
          setTimeZoneValue(e.target.value);
          setTypeValue("");
          setRegionValue("");
          setCurrencyValue("");
          setMatchScoreValue("");
        } else {
          setTimeZoneValue(e.target.value);
          setTypeValue("");
          setRegionValue("");
          setCurrencyValue("");
          setMatchScoreValue("");
          let regionData = originalData.filter((item) => {
            return (
              item[e.target.name].toLowerCase() === e.target.value.toLowerCase()
            );
          });
          setDataToDisplay(regionData);
        }
        break;
      case "8. currency":
        if (e.target.value === "all") {
          returnOriginal();
          setCurrencyValue(e.target.value);
          setTypeValue("");
          setRegionValue("");
          setTimeZoneValue("");
          setMatchScoreValue("");
        } else {
          setCurrencyValue(e.target.value);
          setTypeValue("");
          setRegionValue("");
          setTimeZoneValue("");
          setMatchScoreValue("");
          let regionData = originalData.filter((item) => {
            return (
              item[e.target.name].toLowerCase() === e.target.value.toLowerCase()
            );
          });
          setDataToDisplay(regionData);
        }
        break;
      case "9. matchScore":
        if (e.target.value === "all") {
          returnOriginal();
          setMatchScoreValue(e.target.value);
          setTypeValue("");
          setRegionValue("");
          setTimeZoneValue("");
          setCurrencyValue("");
        } else {
          setMatchScoreValue(e.target.value);
          setTypeValue("");
          setRegionValue("");
          setTimeZoneValue("");
          setCurrencyValue("");
          let regionData = originalData.filter((item) => {
            return (
              item[e.target.name].toLowerCase() === e.target.value.toLowerCase()
            );
          });
          setDataToDisplay(regionData);
        }
        break;
    }
  }

  function getUniqueValues(array, key) {
    if (Array.isArray(array)) {
      let unique = [...new Set(array.map((item) => item[key]))];

      return unique;
    }
  }
  function setLocaleValue() {
    console.log("locale");
  }

  return (
    <div className="search-window">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setUrl(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyWord}&apikey=${API_KEY}`
          );
        }}
      >
        <label>Input search keyword : </label>
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
            {dataToDisplay ? (
              <div>
                {/* <form> */}
                <p>Filter menu</p>
                <select
                  value={typeValue}
                  id="type"
                  name="3. type"
                  onChange={(e) => filter(e)}
                >
                  <option key="default" value="" disabled hidden>
                    Select Type
                  </option>
                  <option key="all" value="all">
                    All
                  </option>
                  {getUniqueValues(originalData, "3. type").map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <select
                  value={regionValue}
                  name="4. region"
                  onChange={(e) => filter(e)}
                >
                  <option key="default" value="" disabled hidden>
                    Select Region
                  </option>
                  <option key="all" value="all">
                    All
                  </option>
                  {getUniqueValues(originalData, "4. region").map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <select
                  value={timeZoneValue}
                  name="7. timezone"
                  onChange={(e) => filter(e)}
                >
                  <option key="default" value="" disabled hidden>
                    Select Time Zone
                  </option>
                  <option key="all" value="all">
                    All
                  </option>
                  {getUniqueValues(originalData, "7. timezone").map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <select
                  value={currencyValue}
                  name="8. currency"
                  onChange={(e) => filter(e)}
                >
                  <option key="default" value="" disabled hidden>
                    Select Currency
                  </option>
                  <option key="all" value="all">
                    All
                  </option>
                  {getUniqueValues(originalData, "8. currency").map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <select
                  value={matchScoreValue}
                  name="9. matchScore"
                  onChange={(e) => filter(e)}
                >
                  <option key="default" value="" disabled hidden>
                    Select MatchScore
                  </option>
                  <option key="all" value="all">
                    All
                  </option>
                  {getUniqueValues(originalData, "9. matchScore").map(
                    (item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
                {/* </form> */}
                <div className="dataTable">
                  {dataToDisplay &&
                    dataToDisplay.map((item) => (
                      // <div key={item["1. symbol"]}>
                      <Link
                        key={item["1. symbol"]}
                        className="link"
                        to={`search/${item["1. symbol"]}`}
                        onClick={() => setLocaleValue()}
                      >
                        {item["1. symbol"]} : {item["2. name"]} :
                        {item["3. type"]} : {item["4. region"]}
                      </Link>
                      // </div>
                    ))}
                </div>
              </div>
            ) : (
              <div>no data yet </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
