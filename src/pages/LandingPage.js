import React, { useState } from "react";
import history from "../components/History";
import "../css/LandingPage.css";

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

  return (
    <div className="landing-page">
      {/* <form> */}
      <div className="landing-title">
        <h1>Landing Page</h1>
      </div>

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
    </div>
  );
}

export default LandingPage;
