import ProfileCard from "./profileCard"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ParticlesComponent from "../../Components/Particles/ParticlesComponent"
import {firestore} from "../../backend/firebase.config"
import './Team.style.scss'
import { useEffect, useState } from "react";
const Team = () => {
  const [members,setMembers] = useState([])
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  useEffect(()=>{
    firestore.collection("members").get()
    .then(resp=>{
      const arr =[]
       resp.docs.map(item=>arr.push(item.data()))
       setMembers(shuffle(arr))
    })
  },[])
  return <>
  <ParticlesComponent/>
  <div style={{marginTop:"100px"}}></div>
  <div>
    <h3>
      Meet the team
    </h3>
  </div>
  <div className="profile-cards-container">
    {members.map(member=>
      <ProfileCard member={member} key={member.rollnumber}/>
      )}
  </div>
  </>
}
export default Team;
