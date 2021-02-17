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
  const [regions, setRegions] = useState([
    { id: "1", region: "Frankfurt" },
    { id: "2", region: "United States" },
    { id: "3", region: "United Kingdom" },
  ]);

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

  function filter(e) {
    e.preventDefault();
    let tempData = originalData.filter((item) => {
      return item[e.target.name].toLowerCase() === e.target.value.toLowerCase();
    });
    setDataToDisplay(tempData);
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
                    defaultValue=""
                    id="type"
                    name="3. type"
                    onChange={(e) => filter(e)}
                  >
                    <option key="default" value="" disabled hidden>
                      Select Type
                    </option>
                    {getUniqueValues(originalData, "3. type").map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <select
                    defaultValue=""
                    name="4. region"
                    onChange={(e) => filter(e)}
                  >
                    <option key="default" value="" disabled hidden>
                      Select Region
                    </option>
                    {getUniqueValues(originalData, "4. region").map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <select
                    defaultValue=""
                    name="7. timezone"
                    onChange={(e) => filter(e)}
                  >
                    <option key="default" value="" disabled hidden>
                      Select Time Zone
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
                    defaultValue=""
                    name="8. currency"
                    onChange={(e) => filter(e)}
                  >
                    <option key="default" value="" disabled hidden>
                      Select Currency
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
                    defaultValue=""
                    name="9. matchScore"
                    onChange={(e) => filter(e)}
                  >
                    <option key="default" value="" disabled hidden>
                      Select MatchScore
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
