import React from 'react'
import {firebase} from "../../backend/firebase.config"
// import {ReactComponent as Login} from "../../assets/login.svg"
import './Signin.styles.scss';
function Signin() {
    const SiginiWithFirebase =() =>{
        const google_provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(google_provider)
    }
    return (

    <div className='sign-in'>
        <button type="button"  className="login-with-google-btn" onClick = {SiginiWithFirebase}>
            <span className='signin_content'>
            <i class="fa-brands fa-google"></i> &nbsp; Sign in with Google
            </span>
        </button>
    </div>  
 
    )
}
export default Signin