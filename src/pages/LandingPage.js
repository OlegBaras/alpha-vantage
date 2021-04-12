import React, { useState } from "react";
import history from "../components/History";
import { randomStringGenerator } from "../components/randomStringGenerator";
import "../css/LandingPage.css";

function LandingPage() {
  const [apiKey, setApiKey] = useState("");

  function handleInput(e) {
    setApiKey(e.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (apiKey.length > 4) {
        e.preventDefault();
        localStorage.setItem("apiKey", apiKey);
        localStorage.setItem("SearchKeyWord", "");
        history.push("search");
      } else {
        return;
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("SearchKeyWord", "");
    history.push("search");
  }

  const generateRandom = () => {
    let randomSymbol = randomStringGenerator(10);
    localStorage.setItem("apiKey", randomSymbol);
    localStorage.setItem("SearchKeyWord", "");
    history.push("search");
  };

  return (
    <div className="landing-page">
      <h2 className="title">Welcome to Alpha Visible Project</h2>
      <div className="form">
        <input
          type="text"
          name="API_KEY"
          value={apiKey}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          required
        />
        <label for="API_KEY" className="label-name">
          <span className="content-name">
            Enter API KEY (minimum 5 characters)
          </span>
        </label>
        <button
          disabled={apiKey.length < 5}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="separator">
        <div className="or-spacer">
          <span>
            <i>or</i>
          </span>
        </div>
      </div>
      <div className="example">
        <button className="example-button" onClick={() => generateRandom()}>
          Click here to use example key
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
