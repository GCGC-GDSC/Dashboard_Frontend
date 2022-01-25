import React from 'react'
import {NavLink} from 'react-router-dom'
import DarkShade from '../DarkShade/DarkShade.component'
import './navbar.style.scss'
import gcgcLogo from "../../Components/images/gcgclogo.png"
import HeroText from "../HeroText/HeroText"
function NavBar() {
    const selected ={
        fontWeight:'bold',
        textDecoration:'underline'
    }
    // menu-bar open
    const openMenu = ()=>{
        const sidebar = document.querySelector('.sidebar')
        if(sidebar) sidebar.style.display = 'block'
    }
    //   window resizing
    window.addEventListener('resize', ()=>{
        if(window.innerWidth<=700)
        { 
            const nm= document.querySelector('.navbar_menu')
            if(nm) nm.style.display = 'block';
            document.querySelector('.navbar_links').style.display = 'none';
            // const nl= document.querySelector('.navbar_icon')
            // if(nl) nl.style.display = 'none';
        }
        else
        {
            document.querySelector('.darkshade').style.display = 'none';
            const nm = document.querySelector('navbar_menu')
            if(nm) nm.style.display = 'none';
            document.querySelector('.navbar_links').style.display = 'block';
            const nl= document.querySelector('.navbar_icon')
            if(nl) nl.style.display = 'block';
        }
    })
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
