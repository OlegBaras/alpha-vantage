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

      try {
        const result = await axios(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyWord}&apikey=${API_KEY}`
        );
        setOriginalData(result.data.bestMatches);
        setDataToDisplay(result.data.bestMatches);
        setTypeValue("");
        setRegionValue("");
        setTimeZoneValue("");
        setCurrencyValue("");
        setMatchScoreValue("");
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchItems();
    setUrl("");
  }, [url]);

  function setSearchV(e) {
    setSearchKeyWord(e.target.value);
  }

  function returnOriginal() {
    setDataToDisplay(originalData);
  }

  function filterType(e) {
    if (e.target.value === "all") {
      returnOriginal();
      setTypeValue(e.target.value);
    } else {
      e.preventDefault();
      setTypeValue(e.target.value);
      setRegionValue("");
      setTimeZoneValue("");
      setCurrencyValue("");
      setMatchScoreValue("");

      let tempData = originalData.filter((item) => {
        return (
          item[e.target.name].toLowerCase() === e.target.value.toLowerCase()
        );
      });
      setDataToDisplay(tempData);
    }
  }
  function filterRegion(e) {
    if (e.target.value === "all") {
      returnOriginal();
      setRegionValue(e.target.value);
    } else {
      e.preventDefault();
      setRegionValue(e.target.value);
      setTypeValue("");
      setTimeZoneValue("");
      setCurrencyValue("");
      setMatchScoreValue("");

      let tempData = originalData.filter((item) => {
        return (
          item[e.target.name].toLowerCase() === e.target.value.toLowerCase()
        );
      });
      setDataToDisplay(tempData);
    }
  }
  function filterTimeZone(e) {
    if (e.target.value === "all") {
      returnOriginal();
      setTimeZoneValue(e.target.value);
    } else {
      e.preventDefault();
      setTimeZoneValue(e.target.value);

      setRegionValue("");
      setTypeValue("");
      setCurrencyValue("");
      setMatchScoreValue("");
      let tempData = originalData.filter((item) => {
        return (
          item[e.target.name].toLowerCase() === e.target.value.toLowerCase()
        );
      });
      setDataToDisplay(tempData);
    }
  }
  function filterMatchScore(e) {
    if (e.target.value === "all") {
      returnOriginal();
      setMatchScoreValue(e.target.value);
    } else {
      e.preventDefault();
      setMatchScoreValue(e.target.value);
      setTypeValue("");
      setRegionValue("");
      setTimeZoneValue("");
      setCurrencyValue("");
      let tempData = originalData.filter((item) => {
        return (
          item[e.target.name].toLowerCase() === e.target.value.toLowerCase()
        );
      });
      setDataToDisplay(tempData);
    }
  }
  function filterCurrency(e) {
    if (e.target.value === "all") {
      returnOriginal();
      setCurrencyValue(e.target.value);
    } else {
      e.preventDefault();
      setCurrencyValue(e.target.value);
      setRegionValue("");
      setTimeZoneValue("");
      setTypeValue("");
      setMatchScoreValue("");
      let tempData = originalData.filter((item) => {
        return (
          item[e.target.name].toLowerCase() === e.target.value.toLowerCase()
        );
      });
      setDataToDisplay(tempData);
    }
  }

  function getUniqueValues(array, key) {
    let unique = [...new Set(array.map((item) => item[key]))];

    return unique;
  }

  return (
    <div className="search-window">
      <form
        onSubmit={(event) => {
          setUrl(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchKeyWord}&apikey=${API_KEY}`
          );
          event.preventDefault();
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
                <form>
                  <p>Filter menu</p>
                  <select
                    value={typeValue}
                    id="type"
                    name="3. type"
                    onChange={(e) => filterType(e)}
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
                    onChange={(e) => filterRegion(e)}
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
                    onChange={(e) => filterTimeZone(e)}
                  >
                    <option key="default" value="" disabled hidden>
                      Select Time Zone
                    </option>
                    <option key="all" value="all">
                      All
                    </option>
                    {getUniqueValues(originalData, "7. timezone").map(
                      (item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </select>
                  <select
                    value={currencyValue}
                    name="8. currency"
                    onChange={(e) => filterCurrency(e)}
                  >
                    <option key="default" value="" disabled hidden>
                      Select Currency
                    </option>
                    <option key="all" value="all">
                      All
                    </option>
                    {getUniqueValues(originalData, "8. currency").map(
                      (item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </select>
                  <select
                    value={matchScoreValue}
                    name="9. matchScore"
                    onChange={(e) => filterMatchScore(e)}
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
                </form>
                <div className="dataTable">
                  {dataToDisplay &&
                    dataToDisplay.map((item) => (
                      // <div key={item["1. symbol"]}>
                      <Link
                        key={item["1. symbol"]}
                        className="link"
                        to={`search/${item["1. symbol"]}`}
                      >
                        {item["1. symbol"]} : {item["2. name"]} :{" "}
                        {item["3. type"]}
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
