import React, { memo } from 'react';
import images from "./../../assets/Discord-logo-removebg-preview.png";
import { FcGoogle } from "react-icons/fc";
import "./login.css"
import { auth, provider } from '../../firebaseConfig';
import { login } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
const Login = memo(() => {
    const dispatch = useDispatch();
    const signIn = e => {
        auth.signInWithPopup(provider)
            .then(res => {
                dispatch(login({
                    uid: res.user.uid,
                    email: res.user.email,
                    photo: res.user.photoURL,
                    displayName: res.user.displayName
                }))
            })
            .catch((error) => alert(error.message))
    }
    return (
        <div className='login'>

            <div className="login_logo">
                <img src={images} alt="" srcSet="" />
            </div>

            <button onClick={signIn} className='login_btn'> <FcGoogle />Google Sign </button>
        </div>
    );
});

export default Login;