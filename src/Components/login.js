import React, { memo } from 'react';
import images from "../assets/Discord-logo-removebg-preview.png";
import { FcGoogle } from "react-icons/fc";
import "./login.css"
import { auth, provider } from '../firebaseConfig';
const Login = memo(() => {

    const signIn = e => {
        auth.signInWithPopup(provider).catch((error)=>alert(error.message))
    }
    return (
        <div className='login'>
            <h1>Login here</h1>
            <div className="login_logo">
                <img src={images} alt="" srcSet="" />
            </div>

            <button onClick={signIn} className='login_btn'> <FcGoogle />Google Sign </button>
        </div>
    );
});

export default Login;