import React from "react";
import { Link } from "react-router-dom";
import "../css/Nav.css";

function Nav() {
  return (
    <nav>
      <h3>Alpha Vantage API</h3>
      <ul className="nav-links">
        <Link className="nav-link-item" to="/">
          <li>Home</li>
        </Link>
        <Link className="nav-link-item" to="/search">
          <li>Search</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
