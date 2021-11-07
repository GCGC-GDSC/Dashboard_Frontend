import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";

import Admin from "./Pages/Admin";
import NavBar from "./Components/Navbar/NavBar";

const App = () => {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home}   />
          <Route path="/admin" component={Admin}   />
          <Route path = "/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
