import React from 'react'
import Signin from '../../Components/Signin/Signin'
import './Login.style.scss'
import {NavLink} from 'react-router-dom'
import GroupsIcon from '@mui/icons-material/Groups';
import gcgcLogo from "../../Components/images/gcgclogo.png"
import dsc from "../../assets/DSC.png"

function login() {
    return (
        <div className="loginPageMain">
        <div className='logo'>
        <div>
            <img src="https://www.gitam.edu/assets/images/GITAM-logo.png" alt="This is gitam logo" />
            <img src={gcgcLogo} alt="GCGC logo should be here" />
            </div>
            <div className='dsc'>
            <img src={dsc} alt="" />
            </div>
            
        </div>
        <div className='login'>
            <div className='login-header'>
               <h2>
                   Welcome to CAREER FULFILLMENT STATISTICS 
               </h2>
               {/* <h2>2022 🎓</h2> */}
               <p>
               This website is  created to make the Career Fulfillment Statistics accessible
and easy to analyze.
It includes tabular data and a visual representation of the
data in interactive charts and drawings. Data may be seen on
the website in three ways: campus-wide, overall, and governing
body statistics. The apex team has access to the admin panel, which allows
them to edit data and download it in the form of an excel file
for further use..
               </p>
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
            </div>
            <div className='login-container' >
                <Signin />
            </div>
           
        </div>
        </div>
    )
}
export default login
