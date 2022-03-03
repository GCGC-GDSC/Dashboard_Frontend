import ProfileCard from "./profileCard"
import ParticlesComponent from "../../Components/Particles/ParticlesComponent"
import {firestore} from "../../backend/firebase.config"
import './Team.style.scss'
import { useEffect, useState } from "react";
const Team = () => {
  const [members,setMembers] = useState([])
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
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
  return<> <div className="teamsPage">
  <ParticlesComponent className="teamsParticle"/>
  {/* <div style={{marginTop:"100px"}}></div> */}
  <div className="team-header">
    <h3>
      Meet the team
    </h3>
  </div>
  <div className="profile-cards-container">
    {members.map(member=>
      <ProfileCard member={member} key={member.rollnumber}/>
      )}
  </div>
  </div>
  <div className="teachUsed">
    
  </div>
  </>
}
export default Team;
