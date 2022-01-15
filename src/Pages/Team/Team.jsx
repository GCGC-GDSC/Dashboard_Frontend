import ProfileCard from "./profileCard"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Team = () => {
    return<>

 <Box sx={{ flexGrow: 1 }} p={10}>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <ProfileCard/>
        </Grid>
        <Grid item xs={2}>
        <ProfileCard/>
        </Grid>
        <Grid item xs={6}>
        <ProfileCard/>
        </Grid>
        <Grid item xs={5}>
        <ProfileCard/>
        </Grid>
      </Grid>
    </Box>*/

    </>
}
export default Team;
