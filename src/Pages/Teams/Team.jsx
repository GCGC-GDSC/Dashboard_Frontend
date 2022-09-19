import React from "react";
import ProfileCard from "../../Components/ProfileCards/ProfileCard";
import MentorProfileCard from "../../Components/ProfileCards/MentorProfileCard";
import "./TeamStyle.css";
import Grid from "@mui/material/Grid";
import {firestore} from "../../backend/firebase.config"
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
  return (
    <div className="main_wrapper">
        <h1>Project Mentors</h1>
        <Grid container spacing={2} padding={7}>
         
          <Grid item xs={6} className="cardStyling">
      <MentorProfileCard className="gcgc"
                    image="https://sicgcgc.gitam.edu/images/images/gurumoorthy.jpg"
                    name=" Cdr Gurumoorthy Gangadharan(Retd)"
                    role="Guide and Mentor"
                    linkdin="https://www.linkedin.com/in/gurumoorthy-gangadharan-6821a410a/"
                    email="assistantdean_gcgc@gitam.edu"
                    position="Assistant Dean, Career Services & Head, GCGC"/>
         </Grid>
         <Grid item xs={6} className="cardStyling">
      <MentorProfileCard className="gcgc"
                    image="https://sicgcgc.gitam.edu/images/images/Vikas.jpg"
                    name=" Vikas B"
                    role="Project Guide and Mentor"
                    linkdin="https://www.linkedin.com/in/vikas-b-6a4476171/"
                    email="ddtech_gcgc@gitam.edu"
                    position="Deputy Director, Technology/Tools/Platforms, GCGC & Assistant Professor, CSE"/>
         </Grid>
        </Grid>
        <h1>Developers Team</h1>
      {console.log("Dev Team")}
        <Grid container spacing={2} padding={7}>
          {members.map(member=>
          <Grid item xs={6} className="cardStyling">
      <ProfileCard member={member} key={member.rollnumber}/>
         </Grid>
      )}
        </Grid>
    </div>
  );
};

export default Team;
