import ProfileCard from "./profileCard"
import MentorProfileCard from "./MentorProfileCard.jsx"

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
  <div className="team-header">
    <h3>
      Mentors
    </h3>
  </div>
  <div className="mentorCards">
  <MentorProfileCard
				name="Cdr Gurumoorthy Gangadharan(Retd)"
        picture="https://sicgcgc.gitam.edu/images/images/gurumoorthy.jpg"
        role="Guide and mentor"
        description="Assistant Dean, Career Services
        &
        Head, GCGC"
        linkedin="https://www.linkedin.com/in/gurumoorthy-gangadharan-6821a410a/"
			/>
  <MentorProfileCard
				name="Vikas B"
        picture="https://media-exp1.licdn.com/dms/image/C5603AQG5M1-Yvr2LXQ/profile-displayphoto-shrink_800_800/0/1647499890525?e=1665014400&v=beta&t=op8-Ba0hEvtDBACL7_KIFMIMNw1_zjGTXWEpzfby6Y0"
        role="Guide and mentor"
        description="Deputy Director, Technology/Tools/Platforms, GCGC
        &
        Assistant Professor, CSE"
        linkedin="https://www.linkedin.com/in/vikas-b-6a4476171/"
			/>

  </div>

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
