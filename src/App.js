import React from "react";
import "./App.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import MediaCard from "./Pages/Team/Team";

import Admin from "./Pages/Admin/Admin";
import NavBar from "./Components/Navbar/NavBar";

const App = () => {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/team" element={<MediaCard />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
