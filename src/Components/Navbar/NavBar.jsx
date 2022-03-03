import React ,{useState} from 'react'
import {NavLink} from 'react-router-dom'
import './navbar.style.scss'
import gcgcLogo from "../../Components/images/gcgclogo.png"
import {firebase} from "../../backend/firebase.config"
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
function NavBar({user}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius:'10px',
        boxShadow: 24,
        p: 4,
      };
    const signoutfromapp = () =>{
        navigate('/')
           firebase.auth().signOut()
    }
    const selected ={
        fontWeight:'bold',
        textDecoration:'underline'
    }
    return (
    <div className = 'navbar'>
        <div className='navbar_icon' style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <a href='https://www.gitam.edu/gitam-at-glance'>
                <img src='https://www.gitam.edu/assets/images/GITAM-logo.png' alt="GITAM" width="140"></img>
                </a>
            <img src={gcgcLogo} alt="GCGC"  width={"153px"} height={"45px"} />
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
            <button className='navbar-link-btn' onClick={handleOpen}>
                Logout
            </button> 
            </div>:null}
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
             <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Confirmation
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to logout ?
                </Typography>
                <div className='modal_buttons_container'>
                    <button className='modal_buttons_container-btn-yes' onClick={signoutfromapp}>
                        Yes
                    </button>
                    <button  className='modal_buttons_container-btn-no' onClick={handleClose}>
                        No
                    </button>
                </div>
            </Box>
      </Modal>
        </div>
    )
}

export default NavBar
