import React from 'react'
import {NavLink} from 'react-router-dom'
import DarkShade from '../DarkShade/DarkShade.component'
import './navbar.style.scss'
function NavBar() {
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
        <div className='navbar_icon'>
            <a href='https://www.gitam.edu/gitam-at-glance'>
                <img src='https://www.gitam.edu/assets/images/GITAM-logo.png' width="140"></img>
                </a>
        </div>  
        <div className="navbar_Header">
            <h3>GITAM CAREER GUIDANCE CENTRE</h3>
        </div>
        <div className='navbar_links'>
            <NavLink className='navbar-link' activeStyle={selected}  exact to = '/'>
                Home
            </NavLink>
            <NavLink className='navbar-link' activeStyle={selected}  to = '/admin'>
                Admin
            </NavLink>
            <NavLink className='navbar-link' activeStyle={selected}  to = '/login'>
                Login
            </NavLink>
            {/* <NavLink className='navbar-link' activeStyle={selected}  to = '/team'>
                Team
            </NavLink> */}
    
        </div>

        </div>
    )
}

export default NavBar
