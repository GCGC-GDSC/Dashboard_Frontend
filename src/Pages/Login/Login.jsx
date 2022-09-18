import { Grid } from '@mui/material'
import React from 'react'
import Signin from '../../Components/Signin/Signin'
import './Login.style.scss'
import {ReactComponent as Login} from "../../assets/Loading.svg"

import {NavLink} from 'react-router-dom'
import GroupsIcon from '@mui/icons-material/Groups';
// import gcgcLogo from "../../Components/images/gcgclogo.png"
// import dsc from "../../assets/DSC.png"
import './Login.style.scss'
function login() {
    return (
       <Grid className="loginPageMain">
        {/* <div className='logo'>
        <div>
            <img src="https://www.gitam.edu/assets/images/GITAM-logo.png" alt="This is gitam logo" />
            <img src={gcgcLogo} alt="GCGC logo should be here" />
            </div>
                <div className='dsc'>
                <img src={dsc} alt="" />
            </div>
        </div> */}
        {/* <Grid container className='grid'>
            <Grid  className="grid_left">
                This will contain the icon
            </Grid>
            <Grid className="grid_right">
            <div className='login-header'>
               <h2>
                   Welcome to Sarthaka
               </h2>
               <p className="login_content">
               This website is  created to make the Career Fulfillment Statistics accessible
                and easy to analyze.
                It includes tabular data and a visual representation of the
                data in interactive charts and drawings. Data may be seen on
                the website in three ways: campus-wide, overall, and governing
                body statistics. The apex team has access to the admin panel, which allows
                them to edit data and download it in the form of an excel file
                for further use..
               </p>
               <div className='login_buttons buttons_container'>
                <div className='login-header-buttons'>
                            <div className='meetTeam-btns'>
                                <NavLink className='navbar-link'  exact to = '/team'>
                                <span style={{color:"black"}}>
                                            Meet the team
                                </span>
                                </NavLink>
                                <span style={{color:"black", marginLeft:"2px"}}>
                                    <GroupsIcon fontSize="large"/>
                                </span>
                            </div>
                </div>
                    <div className='login_buttons login-container' >
                    <Signin />
                    </div>
                </div>
            </div>
           
            </Grid>

        </Grid> */}
        <Login className='loginPage'></Login>
        <div className='buttons_container'>
            <div className='login-header-buttons'>
                <div className='meetTeam-btns'>
                    <NavLink className='navbar-link'  exact to = '/team'>
                        <span style={{color:"black"}}>
                                    Meet the team
                        </span>
                    </NavLink>
                    <span style={{color:"black", marginLeft:"2px"}}>
                        <GroupsIcon fontSize="large"/>
                    </span>
                </div>
            </div>
            <div className='login-container' >
                <Signin />
            </div>
        </div>
       </Grid>
    )
}
export default login
