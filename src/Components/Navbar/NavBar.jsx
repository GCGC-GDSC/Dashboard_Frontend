import React ,{useContext} from 'react'
import {NavLink} from 'react-router-dom'
import DarkShade from '../DarkShade/DarkShade.component'
import './navbar.style.scss'
import gcgcLogo from "../../Components/images/gcgclogo.png"
import HeroText from "../HeroText/HeroText"
import {firebase} from "../../backend/firebase.config"
import { UserContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

function NavBar({user}) {
    // const user = useContext(UserContext)
    const navigate = useNavigate();
    console.log(user)
    const signoutfromapp = () =>{
       const action =  window.confirm("Are you sure you want to signout !")
       if (action){
        navigate('/')
           firebase.auth().signOut()
        }
    }
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
            <h3>CAREER FULFILLMENT STATISTICS <span className="heading_year">2022</span></h3> 
        </div>
        <div className='navbar_links'>
            {user.isVerified?
            <div>
            <NavLink className='navbar-link' activeStyle={selected}  exact to = '/'>
                Home
            </NavLink>
            <NavLink className='navbar-link' activeStyle={selected}  to = '/admin'>
                Admin
            </NavLink>
            <NavLink className='navbar-link' activeStyle={selected}  to = '/team'>
                Team
            </NavLink>
            <button className='navbar-link-btn' onClick={signoutfromapp}>
                Logout
            </button> 
            </div>:
           <div className='navbar_links'>
                {/* <NavLink className='navbar-link navbar-link-login' activeStyle={selected}  to = '/login'>
                    Login
                </NavLink> */}
                <NavLink className='navbar-link' activeStyle={selected}  to = '/team'>
                    Team
                </NavLink>
                
            </div>
            }
        </div>

        </div>
    )
}

export default NavBar
