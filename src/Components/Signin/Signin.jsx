import React, { useState } from 'react'
import { auth,signInWithGoogle } from '../../backend/firebase.config';
import FormInput from '../Form_input/form_input';
import './Signin.styles.scss';
function Signin() {
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const handleChange = (e) =>
    {
        const {value, name} = e.target;
        if (name === "email") setEmail(value)
        if (name === "password") setPassword(value)
    }
    const handleSubmit = async (e)=>
    {
        e.preventDefault();
        try 
        {
            await auth.signInWithEmailAndPassword(email, password);
            setEmail("")
            setPassword("")
        }
        catch (error)
        {
            // console.log(error)
            var errorbox = document.querySelector('.error-message')
            if(errorbox) {errorbox.innerHTML = error.message}
        }
    }
    return (
        <div className='sign-in'>
            {/* <h2> I already have an account ! </h2>
            <span> Sign in with  your email and password</span> */}

        {/* <form onSubmit={handleSubmit}>
        <FormInput
            name='email'
            type='email'
            handleChange={handleChange}
            value={email}
            label='email'
            required
        />
        <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={handleChange}
            label='password'
            required
        />
        <p className='error-message'></p>
        <div className = 'buttons'>
        <button  type='submit'> 
            Sign in
        </button>
        </div>
        </form> */}
        <p>or signin using google account</p>
        <button   className='sign-inUsingGoogle' onClick = {signInWithGoogle}>
        <img  src="https://image.flaticon.com/icons/png/512/281/281764.png" alt="google"/>
        </button>
    </div>  
    )
}
export default Signin