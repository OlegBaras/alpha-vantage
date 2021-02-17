import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

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

  // function additionalTest() {
  //   let tempData = originalData.filter((item) => {
  //     return item["4. region"].toLowerCase() === "frankfurt";
  //   });
  //   setDataToDisplay(tempData);
  // }

  function filter(e) {
    e.preventDefault();
    let tempData = originalData.filter((item) => {
      console.log(item[e.target.name]);

      return item[e.target.name].toLowerCase() === e.target.value.toLowerCase();
    });
    setDataToDisplay(tempData);
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
                  <select name="3. type" onChange={(e) => filter(e)}>
                    <option value="" selected disabled hidden>
                      Select Type
                    </option>
                    {originalData.map((item) => (
                      <option key={item["1. symbol"]} value={item["3. type"]}>
                        {item["3. type"]}
                      </option>
                    ))}
                  </select>

                  <select name="4. region" onChange={(e) => filter(e)}>
                    <option value="" selected disabled hidden>
                      Select Region
                    </option>
                    {originalData.map((item) => (
                      <option key={item["1. symbol"]} value={item["4. region"]}>
                        {item["4. region"]}
                      </option>
                    ))}
                  </select>

                  <select name="7. timezone" onChange={(e) => filter(e)}>
                    <option value="" selected disabled hidden>
                      Select Time Zone
                    </option>
                    {originalData.map((item) => (
                      <option
                        key={item["1. symbol"]}
                        value={item["7. timezone"]}
                      >
                        {item["7. timezone"]}
                      </option>
                    ))}
                  </select>
                  <select name="8. currency" onChange={(e) => filter(e)}>
                    <option value="" selected disabled hidden>
                      Select Currency
                    </option>
                    {originalData.map((item) => (
                      <option
                        key={item["1. symbol"]}
                        value={item["8. currency"]}
                      >
                        {item["8. currency"]}
                      </option>
                    ))}
                  </select>
                  <select name="9. matchScore" onChange={(e) => filter(e)}>
                    <option value="" selected disabled hidden>
                      Select MatchScore
                    </option>
                    {originalData.map((item) => (
                      <option
                        key={item["1. symbol"]}
                        value={item["9. matchScore"]}
                      >
                        {item["9. matchScore"]}
                      </option>
                    ))}
                  </select>
                </form>
                <div className="dataTable">
                  {dataToDisplay &&
                    dataToDisplay.map((item) => (
                      <div key={item["1. symbol"]}>
                        <Link to={`search/${item["1. symbol"]}`}>
                          {item["1. symbol"]} : {item["2. name"]} :{" "}
                          {item["3. type"]}
                        </Link>
                      </div>
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
{
  /* <span> FILTER BY </span>
        <select>
          <option value="type">type</option>
          <option value="region">region</option>
          <option value="timezone">timezone</option>
          <option value="currency">currency</option>
          <option value="matchScore">matchScore</option>
        </select> */
}

{
  /* <select id="types" onChange={(e) => handleTypeChange(e)}>
          <option value="">Select Type</option>
          <option label="Equity" value="Equity">
            EQUITY
          </option>
          <option label="ETF" value="ETF">
            ETF
          </option>
        </select>

        <select id="regions">
          <option value="">Select Region</option>
          <option label="United States" value="United States">
            United States
          </option>
          <option label="United Kingdom" value="United Kingdom">
            United Kingdom
          </option>
          <option label="Frankfurt" value="Frankfurt">
            Frankfurt
          </option>
          <option label="XETRA" value="XETTRA">
            XETRA
          </option>
        </select>

        <select>
          <option value="">Select Timezone</option>
          <option label="utc-05" value="utc-05">
            utc-05
          </option>
          <option label="utc+00" value="utc+00">
            utc+00
          </option>
          <option label="utc+01" value="utc+01">
            utc+01
          </option>
        </select>
        <select>
          <option value="">Select Currency</option>
          <option label="USD" value="USD">
            USD
          </option>
          <option label="GBP" value="GBP">
            GBP
          </option>
          <option label="EUR" value="EUR">
            EUR
          </option>
        </select> */
}
