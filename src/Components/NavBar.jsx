import React from 'react'
import {NavLink} from 'react-router-dom'

function NavBar() {
    const selected ={
        fontWeight:'bold',
        borderBottom:'4px solid white',
    }

    return (
        <div>
          <NavLink className='navbar-links' activeStyle={selected}  to = '/'>
                    Home
                    </NavLink>

                    <NavLink className='navbar-links' activeStyle={selected}  to = '/admin'>
                    Admin
                    </NavLink>
  
        </div>
    )
}

export default NavBar
