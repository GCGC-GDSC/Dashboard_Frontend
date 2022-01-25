import React, { useState } from 'react'
import {firebase} from "../../backend/firebase.config"

import './Signin.styles.scss';
function Signin() {
    const SiginiWithFirebase =() =>{
        const google_provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(google_provider)
        .then(user=>{
            console.log(user)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className='sign-in'>
        <button   className='sign-inUsingGoogle' onClick = {SiginiWithFirebase}>
        <img  src="https://image.flaticon.com/icons/png/512/281/281764.png" alt="google"/>
        </button>
    </div>  
    )
}
export default Signin