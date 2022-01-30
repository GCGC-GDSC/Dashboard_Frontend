import ProfileCard from "./profileCard"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {firebase} from 'firebase';
import './Team.style.scss'
const Team = () => {
  
firebase.collections("users").set({
  name:"Krishna Chaitanya",
  role:"FrontEnd",
  rollnumber:"121910302022",
  description:"cement se nikla gulab ithihass ek kitab har halka jawab sach hua mera kvaab wafadar kabardar hoshiyaar gully gang sabse hard parivar",
})

  return <>
  <div style={{marginTop:"100px"}}></div>
  <div className="profile-cards-container">
      <ProfileCard/>
      <ProfileCard/>
      <ProfileCard/>
      <ProfileCard/>
  </div>
  </>
}
export default Team;
