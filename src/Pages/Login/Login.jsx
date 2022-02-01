import React from 'react'
import Signin from '../../Components/Signin/Signin'
import './Login.style.scss'
import {NavLink} from 'react-router-dom'
import Fab from '@mui/material/Fab';
import GroupsIcon from '@mui/icons-material/Groups';
function login() {
    return (
        <div className='login'>
            <div className='login-header'>
               <h3>
                   Welcome to CAREER FULFILLMENT STATISTICS 2022
               </h3>
               <p>
               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
               </p>
               <div className='login-header-buttons'>
                        <div className='meetTeam-btns'>
                            <NavLink className='navbar-link'  exact to = '/team'>
                            <span style={{color:"black"}}>
                                        Meet the team
                            </span>
                            </NavLink>
                            <span style={{color:"black"}}>
                                <GroupsIcon fontSize="large"/>
                            </span>
                        </div>

               </div>
            </div>
            <div className='login-container' >
                <Signin />
            </div>
           
        </div>
    )
}
export default login
