import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import "./App.css";
import { UserContext } from './context/context';
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import MediaCard from "./Pages/Team/Team";
import Admin from "./Pages/Admin/Admin";
import NavBar from "./Components/Navbar/NavBar";
import { firebase } from "./backend/firebase.config";
const App = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const providerValue = useMemo( () => (
    userProfile
  ),[userProfile])
  firebase.auth().onAuthStateChanged((user) => {
    // console.log(user)
    if (user) {
      setUserProfile(user);
      return setIsUserSignedIn(true);
    } else {
      // setUserProfile({});
      setIsUserSignedIn(false);
    }
  });
  return (
    <div className="app">
      <Router>
        <NavBar user={userProfile} />
        {isUserSignedIn ? (
          <UserContext.Provider value={providerValue}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/team" element={<MediaCard />} />
          </Routes>
          </UserContext.Provider>
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
