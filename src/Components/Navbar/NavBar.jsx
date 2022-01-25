import React from 'react'
import {NavLink} from 'react-router-dom'
import DarkShade from '../DarkShade/DarkShade.component'
import './navbar.style.scss'
import gcgcLogo from "../../Components/images/gcgclogo.png"
import HeroText from "../HeroText/HeroText"
import {firebase} from "../../backend/firebase.config"
function NavBar({user}) {
    const selected ={
        fontWeight:'bold',
        textDecoration:'underline'
    }
    return (
    <div className = 'navbar'>
        {/* <DarkShade/>
        <div className='navbar_menu' onClick={openMenu}>
            <i className="fas fa-bars"></i>
        </div> */}
        <div className='navbar_icon' style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <a href='https://www.gitam.edu/gitam-at-glance'>
                <img src='https://www.gitam.edu/assets/images/GITAM-logo.png' width="140"></img>
                </a>
            <img src={gcgcLogo} alt=""  width={"153px"} height={"45px"} />
        </div>  
        <div className="navbar_Header">
            <HeroText year={2022}/>
        </div>
        <div className='navbar_links'>
            {user?
            <div>
            <NavLink className='navbar-link' activeStyle={selected}  exact to = '/'>
                Home
            </NavLink>
            <NavLink className='navbar-link' activeStyle={selected}  to = '/admin'>
                Admin
            </NavLink>
            {/* <button className='navbar-link' onClick={()=>firebase.auth().signOut()}>
                Logout
            </button> */}
            </div>:
            <NavLink className='navbar-link' activeStyle={selected}  to = '/'>
                Login
            </NavLink>}
            {/* <NavLink className='navbar-link' activeStyle={selected}  to = '/team'>
                Team
            </NavLink> */}
    
        </div>

        </div>
    )
}

export default NavBar
