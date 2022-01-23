import React , { useState,useEffect, useMemo} from "react";
import "./App.css";
import "./App.css";
import { BrowserRouter as Router, Routes,Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import MediaCard from "./Pages/Team/Team";
import {auth, createUserProfileDocument} from './backend/firebase.config';
import Admin from "./Pages/Admin/Admin";
import NavBar from "./Components/Navbar/NavBar";

const App = () => {
  const [currentUser,setCurrentUser] = useState({})
  const providerValue = useMemo( () => (
    currentUser
  ),[currentUser])
var unsubscribeFromAuth = null;
try{

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>
      {
      if(userAuth)
      {
        console.log(userAuth)
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot (snapShot =>
          {
            setCurrentUser(
              {
                id:snapShot.id,
                ...snapShot.data()
              }
            )
          });
        }
        else 
        {
          console.log(userAuth)
          setCurrentUser(userAuth )
        }
      })
      return () => {
        unsubscribeFromAuth()
      }
      }, []) 
    }
    catch(e){
      console.error( e);
    }
  return (
    <div className="app">
      <Router>
        <NavBar />
        {/* <Home /> */}
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
