import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

function ItemDetail({ match }) {
  const API_KEY = localStorage.getItem("apiKey");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchItems = (async) => {
      setIsError(false);
      setIsLoading(true);
      try {
        const intraday = axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${API_KEY}`
        );
        const daily = axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${API_KEY}`
        );
        const weekly = axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=${API_KEY}`
        );
        const monthly = axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=${API_KEY}`
        );
        const quote = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${API_KEY}`;

        axios
          .all([intraday, daily, weekly, monthly, quote])
          .then(
            axios.spread((...responses) => {
              const intradayData = responses[0].data;
              const dailyData = responses[1].data;
              const weeklyData = responses[2].data;
              const monthlyData = responses[3].data;
              const qouteData = responses[4].data;
              console.log(intradayData["Time Series (5min)"]);
              console.log(dailyData["Time Series (Daily)"]);
              console.log(weeklyData["Weekly Time Series"]);
              console.log(monthlyData["Monthly Time Series"]);
              console.log(qouteData["Global Quote"]);
            })
          )
          .catch((errors) =>
            alert("You have reached calls limit, please wait 1 minute")
          );
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchItems();
  }, []);

  // .catch((errors) => alert("You have used the limitt of calls"));

  // requestOne
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.err(error);
  //   });

  function selectHandler(e) {
    console.log(e.target.value);
  }

  return (
    <div>
      <select onChange={(e) => selectHandler(e)}>
        <option value="intradayData">Intraday</option>
        <option value="dailyData">Daily</option>
        <option value="weeklyData">Weekly</option>
        <option value="monthlyData">Monthly</option>
        <option value="quoteData">Quotey</option>
      </select>
    </div>
  );
}

export default ItemDetail;
