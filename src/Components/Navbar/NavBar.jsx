import React from 'react'
import {NavLink} from 'react-router-dom'
import DarkShade from '../DarkShade/DarkShade.component'
import './navbar.style.scss'
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
        <DarkShade/>
        <div className='navbar_menu' onClick={openMenu}>
            <i className="fas fa-bars"></i>
        </div>
        <div className='navbar_icon'>
            {/* <h2>GITAM Logo</h2> */}
            {/* src='../../assets/GITAM-logo1.png' */}
            <a href='https://www.gitam.edu/gitam-at-glance'>
                <img src='https://www.gitam.edu/assets/images/GITAM-logo.png' width="200"></img>
                </a>
        </div>  
        <div className='navbar_links'>
            <NavLink className='navbar-link' activeStyle={selected}  exact to = '/'>
                Home
            </NavLink>
            {/* <NavLink className='navbar-link' activeStyle={selected}  to = '/admin'>
                Admin
            </NavLink> */}
            <NavLink className='navbar-link' activeStyle={selected}  to = '/login'>
                Login
            </NavLink>
        </div>

        </div>
    )
}

export default NavBar
