import React, { useState } from "react";
import Intraday from "./ItemDetails/Intraday";
import Daily from "./ItemDetails/Daily";
import Weekly from "./ItemDetails/Weekly";
import Monthly from "./ItemDetails/Monthly";
import Quote from "./ItemDetails/Quote";
import IndicatorEMA from "./ItemDetails/Indicators/IndicatorEMA";
import IndicatorSMA from "./ItemDetails/Indicators/IndicatorSMA";
import IndicatorVWAP from "./ItemDetails/Indicators/IndicatorVWAP";
import IndicatorBBANDS from "./ItemDetails/Indicators/IndicatorBBANDS";
import IndicatorSTOCH from "./ItemDetails/Indicators/IndicatorSTOCH";

function ItemDetail({ match }) {
  const [value, setValue] = useState([]);
  const [indicatorValue, setIndicatorValue] = useState("");
  const company = match.params.id;

  /* Button Handler*/
  function handleClick(e) {
    setValue(e.target.value);
    setIndicatorValue("");
  }
  /* Indicators Select Handler*/
  function handleIndicator(e) {
    setIndicatorValue(e.target.value);
    setValue("");
  }

  return (
    <div>
      <h1>{match.params.id}</h1>
      <div>
        <button value="TIME_SERIES_INTRADAY" onClick={(e) => handleClick(e)}>
          Intraday 5min
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
        <button value="GLOBAL_QUOTE" onClick={(e) => handleClick(e)}>
          Quote
        </button>
        <select
          value={indicatorValue}
          id="Indicators"
          name="Indicators"
          onChange={(e) => handleIndicator(e)}
        >
          <option key="default" value="" disabled hidden>
            Select Indicator
          </option>
          <option key="sma" value="SMA">
            SMA
          </option>
          <option key="ema" value="EMA">
            EMA
          </option>
          <option key="vwap" value="VWAP">
            VWAP
          </option>
          <option key="stoch" value="STOCH">
            STOCH
          </option>
          <option key="bbands" value="BBANDS">
            BBANDS
          </option>
        </select>
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
      {value === "GLOBAL_QUOTE" && <Quote company={company} value={value} />}
      {indicatorValue === "EMA" && (
        <IndicatorEMA company={company} value={indicatorValue} />
      )}
      {indicatorValue === "SMA" && (
        <IndicatorSMA company={company} value={indicatorValue} />
      )}
      {indicatorValue === "VWAP" && (
        <IndicatorVWAP company={company} value={indicatorValue} />
      )}
      {indicatorValue === "STOCH" && (
        <IndicatorSTOCH company={company} value={indicatorValue} />
      )}
      {indicatorValue === "BBANDS" && (
        <IndicatorBBANDS company={company} value={indicatorValue} />
      )}
    </div>
  );
}
export default ItemDetail;
