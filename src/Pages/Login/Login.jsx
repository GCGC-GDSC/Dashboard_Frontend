import React from 'react'
import Signin from '../../Components/Signin/Signin'
import './Login.style.scss'
function login() {
    return (
        <div className='login'>
            <div className='login-container' >
                <Signin />
                {/* <h2>Signin using Google</h2> */}

            </div>
           
        </div>
    )
}
export default login
