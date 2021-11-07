import React, { useState } from 'react'
import { auth,signInWithGoogle } from '../../backend/firebase.config';
import './Signin.styles.scss';
function Signin() {
    return (
        <div className='sign-in'>
        <button   className='sign-inUsingGoogle' onClick = {signInWithGoogle}>
        <img  src="https://image.flaticon.com/icons/png/512/281/281764.png" alt="google"/>
        </button>
    </div>  
    )
}
export default Signin