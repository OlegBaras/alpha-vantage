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
import { useHistory } from "react-router-dom";
import Nav from "./Nav";
import "../css/ItemDetails.css";

function ItemDetail({ match }) {
  const [value, setValue] = useState([]);
  const [indicatorValue, setIndicatorValue] = useState("");
  const company = match.params.id;
  const history = useHistory();

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
      <Nav />
      <div className="item-details">
        <div className="control-panel">
          {/* <button onClick={() => history.goBack()}>Go Back</button> */}
        </div>
        <div className="content-header">
          <div>
            <div className="details-title">
              <h1>Selected Company : {match.params.id}</h1>
              <h3>Please select one of the options to display data</h3>
            </div>

            <button
              className="options-button"
              value="TIME_SERIES_INTRADAY"
              onClick={(e) => handleClick(e)}
            >
              Intraday 5min
            </button>
            <button
              className="options-button"
              value="TIME_SERIES_DAILY"
              onClick={(e) => handleClick(e)}
            >
              Daily
            </button>
            <button
              className="options-button"
              value="TIME_SERIES_WEEKLY"
              onClick={(e) => handleClick(e)}
            >
              Weekly
            </button>
            <button
              className="options-button"
              value="TIME_SERIES_MONTHLY"
              onClick={(e) => handleClick(e)}
            >
              Monthly
            </button>
            <button
              className="options-button"
              value="GLOBAL_QUOTE"
              onClick={(e) => handleClick(e)}
            >
              Quote
            </button>

            <select
              className={"options-select"}
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
        </div>
        <div className="content-table">
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
          {value === "GLOBAL_QUOTE" && (
            <Quote company={company} value={value} />
          )}
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
      </div>
    </div>
  );
}
export default ItemDetail;
