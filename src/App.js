import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import "./App.css";
import { UserContext } from "./context/context";
import RestrictedView from "./Views/RestrivctedView/RestrictedView";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Team from "./Pages/Teams/Team";
import Admin from "./Pages/Admin/Admin";
import NavBar from "./Components/Navbar/NavBar";
import { firebase } from "./backend/firebase.config";
import Highlights from "./Pages/Highlights/Highlights";
import Compare from "./Pages/Compare/Compare3.jsx";
import NotFound from "./Pages/404/NotFound";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const App = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [verifiedUser, setVerifiedUser] = useState({
    user: {},
    isVerified: false,
  });

  const detectMediaSize = useMediaQuery({
    query: "(max-width: 1020px)",
  });

  useEffect(() => {
    const verifyUser = (user) => {
      axios
        .post(`${REACT_APP_API_URL}account/verify/${user.email}`)
        .then((resp) => {
          if (resp.data.status !== "error")
            setVerifiedUser({ user: resp.data.result, isVerified: true });
          else {
            setVerifiedUser({ user: {}, isVerified: false });
          }
        });
    };
    if (isUserSignedIn && userProfile && userProfile.email)
      verifyUser(userProfile);
    else
      setVerifiedUser({
        user: {},
        isVerified: false,
        userRestrictedScreen: detectMediaSize,
      });
  }, [userProfile, isUserSignedIn, detectMediaSize]);

  const providerValue = useMemo(() => verifiedUser, [verifiedUser]);
  firebase.auth().onAuthStateChanged((user) => {
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
        {/*  user signed and using large screen */}
        {isUserSignedIn && verifiedUser.isVerified && !detectMediaSize ? (
          <UserContext.Provider value={providerValue}>
            <NavBar user={verifiedUser} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/adminpannel" element={<Admin />} />
              <Route exact path="/team" element={<Team />} />
              <Route exact path="/highlights" element={<Highlights />} />
              <Route exact path="/compare" element={<Compare />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserContext.Provider>
        ) : //  user signed in and useing small screen
        isUserSignedIn && verifiedUser.isVerified && detectMediaSize ? (
          <UserContext.Provider value={providerValue}>
            <NavBar user={verifiedUser} />
            <Routes>
              <Route exact path="/adminpannel" element={<Admin />} />
              <Route exact path="/team" element={<Team />} />
              <Route exact path="/" element={<RestrictedView />} />
              <Route exact path="/highlights" element={<Highlights />} />
              <Route exact path="/compare" element={<Compare />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserContext.Provider>
        ) : (
          // user not signed in ... !
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/team" element={<Team />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Router>
    </div>
  );
};
export default App;
