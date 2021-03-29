import React, { useState } from "react";
import history from "../components/History";
import "../css/LandingPage.css";
import { randomStringGenerator } from "../components/randomStringGenerator";

function LandingPage() {
  const [apiKey, setApiKey] = useState("");

  function handleInput(e) {
    setApiKey(e.target.value);
  }

  // Recording apiKey value to localStorage for future use
  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("SearchKeyWord", "");
    history.push("search");
  }
  const generateRandom = () => {
    console.log("random");
    let randomSymbol = randomStringGenerator(10);
    localStorage.setItem("apiKey", randomSymbol);
    localStorage.setItem("SearchKeyWord", "");
    history.push("search");
    console.log(randomSymbol);
  };

  return (
    <div className="landing-page">
      {/* <form> */}
      <div className="landing-content">
        <h2>Input API Key:</h2>
        <input
          type="text"
          name="API_KEY"
          value={apiKey}
          onChange={handleInput}
        />
        <button
          disabled={apiKey.length < 5}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {/* </form> */}
      </div>
      <div className="example-key">
        <button onClick={() => generateRandom()}>or use example key</button>
      </div>
    </div>
  );
}

export default LandingPage;
