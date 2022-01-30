import ProfileCard from "./profileCard"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './Team.style.scss'
const Team = () => {
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
