import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Search() {
  const API_KEY = localStorage.getItem("apiKey");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [url, setUrl] = useState(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${filterValue}&apikey=${API_KEY}`
  );
  const [data, setData] = useState(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${filterValue}&apikey=${API_KEY}`
  );

  useEffect(() => {
    const fetchItems = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${filterValue}&apikey=${API_KEY}`
        );
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchItems();
  }, [url]);

  function setFilterV(e) {
    setFilterValue(e.target.value);
  }
  return (
    <div>
      <form
        onSubmit={(event) => {
          setUrl(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${filterValue}&apikey=${API_KEY}`
          );
          event.preventDefault();
        }}
      >
        <label>
          " Search company using Name/Symbol as well as filter based one of the
          following parameters: Type, Region, Timezone, Currency, MatchScore : "
        </label>
        <input
          type="text"
          name="filterValue"
          value={filterValue}
          onChange={setFilterV}
        ></input>
        <span> FILTER BY </span>
        <select>
          <option value="type">type</option>
          <option value="region">region</option>
          <option value="timezone">timezone</option>
          <option value="currency">currency</option>
          <option value="matchScore">matchScore</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div>
        {isError && <div>Something went wrong...</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {data.bestMatches &&
              data.bestMatches.map((item) => (
                <div key={item["1. symbol"]}>
                  <Link to={`search/${item["1. symbol"]}`}>
                    {item["1. symbol"]} : {item["2. name"]} : {item["3. type"]}
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
