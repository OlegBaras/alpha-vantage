import React, { useState } from "react";
import axios from "axios";
import Intraday from "./ItemDetails/Intraday";
import Daily from "./ItemDetails/Daily";
import Weekly from "./ItemDetails/Weekly";
import Monthly from "./ItemDetails/Monthly";

function ItemDetail({ match }) {
  const [value, setValue] = useState([]);
  const company = match.params.id;

  function handleClick(e) {
    setValue(e.target.value);
  }
  return (
    <div>
      <h1>{match.params.id}</h1>
      <div>
        <button value="TIME_SERIES_INTRADAY" onClick={(e) => handleClick(e)}>
          Intraday
        </button>
        <button value="TIME_SERIES_DAILY" onClick={(e) => handleClick(e)}>
          Daily
        </button>
        <button value="TIME_SERIES_WEEKLY" onClick={(e) => handleClick(e)}>
          Weekly
        </button>
        <button value="TIME_SERIES_MONTHLY" onClick={(e) => handleClick(e)}>
          Monthly
        </button>
      </div>

      {value === "TIME_SERIES_INTRADAY" && (
        <Intraday company={company} value={value} />
      )}
      {value === "TIME_SERIES_DAILY" && (
        <Daily company={company} value={value} />
      )}
      {value === "TIME_SERIES_WEEKLY" && (
        <Weekly company={company} value={value} />
      )}
      {value === "TIME_SERIES_MONTHLY" && (
        <Monthly company={company} value={value} />
      )}
    </div>
  );
}
export default ItemDetail;
