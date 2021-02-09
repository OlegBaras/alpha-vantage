import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Search from "./pages/Search";
import Nav from "./components/Nav";
import history from "./components/History";
import ItemDetail from "./components/ItemDetail";

import "./App.css";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/search" component={Search} />
          <Route path="/search/:id" component={ItemDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
