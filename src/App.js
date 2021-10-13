import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { render } from "@testing-library/react";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import NavBar from "./Components/NavBar";

const App = () => {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/admin" component={Admin}></Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
