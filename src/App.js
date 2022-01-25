import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import MediaCard from "./Pages/Team/Team";
import { auth, createUserProfileDocument } from "./backend/firebase.config";
import Admin from "./Pages/Admin/Admin";
import NavBar from "./Components/Navbar/NavBar";
import { firebase } from "./backend/firebase.config";
const App = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUserProfile(user);
      return setIsUserSignedIn(true);
    } else {
      setUserProfile({});
      return setIsUserSignedIn(false);
    }
  });
  return (
    <div className="app">
      <Router>
        <NavBar user={isUserSignedIn} />
        {true ? (
          <Routes>
            <Route exact path="/" element={<Home user={userProfile} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/team" element={<MediaCard />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/team" element={<MediaCard />} />
          </Routes>
        )}
      </Router>
    </div>
  );
};
export default App;
