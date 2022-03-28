import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import "./App.css";
import { UserContext } from "./context/context";
import RestrictedView from "./Views/RestrivctedView/RestrictedView";
import axios from "axios";
import { useMediaQuery } from 'react-responsive'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import MediaCard from "./Pages/Team/Team";
import Admin from "./Pages/Admin/Admin";
import NavBar from "./Components/Navbar/NavBar";
import { firebase } from "./backend/firebase.config";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const App = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [verifiedUser, setVerifiedUser] = useState({
    user: {},
    isVerified: false,
  });

  const detectMediaSize = useMediaQuery({
    query: '(max-width: 1020px)'
  })

  useEffect(() => {
    const verifyUser = (user) => {
      axios
        .get(`${REACT_APP_API_URL}account/verify/${user.email}`)
        .then((resp) => {
          if (resp.data.status !== "error")
            setVerifiedUser({ user: resp.data.result, isVerified: true });
          else setVerifiedUser({ user: {}, isVerified: false });
        });
    };
    if (isUserSignedIn && userProfile && userProfile.email)
      verifyUser(userProfile);
    else setVerifiedUser({ user: {}, isVerified: false,userRestrictedScreen:detectMediaSize });

  }, [userProfile, isUserSignedIn,detectMediaSize]);


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
        {isUserSignedIn && verifiedUser.isVerified  &&! detectMediaSize ? (
          <UserContext.Provider value={providerValue}>
            <NavBar user={verifiedUser} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/team" element={<MediaCard />} />
            </Routes>
          </UserContext.Provider>
          //  user signed in and useing small screen
        ) : isUserSignedIn && verifiedUser.isVerified  && detectMediaSize ?
        <UserContext.Provider value={providerValue}>
        <NavBar user={verifiedUser} />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/team" element={<MediaCard />} />        
          <Route exact path="/" element={<RestrictedView/>  }  />
          </Routes>
          </UserContext.Provider>
          // user not signed in ... !
          :(
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/team" element={<MediaCard />} />
          </Routes>)}
      </Router> 
    </div>
  );
};
export default App;
