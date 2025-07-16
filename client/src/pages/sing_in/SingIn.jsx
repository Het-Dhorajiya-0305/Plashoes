import React, { useContext, useEffect } from 'react'
import './sing-in.css'
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { backEndUrl } from '../../App.jsx';
import { toast } from "react-toastify";
import { StoreContext } from '../../context/StoreContext.jsx';
import CustomizedProgressBars from '../../component/loader/Loader.jsx'
import { FcGoogle } from "react-icons/fc";


function SingIn() {

    const { navigate, fetchCartData,auth } = useContext(StoreContext);

    const [loader, setLoader] = useState(false);

    const [passwordLogin, setPasswordLogin] = useState(false);
    const [passwordSignUp, setPasswordSignUp] = useState(false);
    const [active, setActive] = useState(false);

    const [signUpUserName, setSignUpUserName] = useState('');
    const [loginCriteria, setLoginCriteria] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [loginPassword, setLoginPassword] = useState('');


    const showPasswordLogin = () => {
        setPasswordLogin(Pre => !Pre)
    }
    const showPasswordSingUp = () => {
        setPasswordSignUp(Pre => !Pre)
    }
    const forgotPasswordClick=()=>{
        navigate('/forgot-password');
    }

    const onSignInSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                userName: signUpUserName,
                email: signUpEmail,
                password: signUpPassword
            }

            const response = await axios.post(`${backEndUrl}/api/user/register`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(setLoader(true));

            if (response.data.success) {
                setActive(false);
                setSignUpUserName("");
                setSignUpEmail("");
                setSignUpPassword("");
                setLoader(false);
            }
            else {
                console.log("error in sign up ", response.data.message);
                toast.error(response.data.error);
                setActive(false);

            }
        } catch (error) {
            console.log("error in sign up ", error.message);
            toast.error(error.response.data.message)
            setActive(false);

        }

    }

    const onLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = {
                userName: loginCriteria,
                password: loginPassword
            }
            const response = await axios.post(`${backEndUrl}/api/user/login`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }).then(setLoader(true))


            if (response.data.success) {
                auth();
                setLoginCriteria('');
                setLoginPassword('');
                toast.success(response.data.message)
                setLoader(false)
                navigate('/')
                fetchCartData();
            }
            else {
                console.log("error in login ", response.data.message);
                toast.error(response.data.message)
                setActive(false);

            }
        } catch (error) {
            setLoader(false)
            toast.error(error.response.data.message)
            console.log(error)
            setActive(false);
        }
    }

    const googleLogin = () => {
        setLoader(true);
        window.location.href = `${backEndUrl}/api/user/auth/google`;
    };

    return (
        <div className={active ? 'sing-in-main-container active' : 'sing-in-main-container'}>
            <div className="inner-box">
                {loader ? <div className='loader'><CustomizedProgressBars></CustomizedProgressBars></div> : ''}
                <form className="form" onSubmit={onLoginSubmit}>
                    <div className="name">
                        login
                    </div>
                    <div className="flex-column">
                        <label>Username </label></div>
                    <div className="inputForm">
                        <FaUser />
                        <input required onChange={(e) => setLoginCriteria(e.target.value)} value={loginCriteria} type="text" className="input" placeholder="Enter your Username/Email" />
                    </div>
                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                        <FaLock />
                        <input required onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword} type={passwordLogin ? "text" : "password"} className="input" placeholder="Enter your Password" />
                        <span onClick={showPasswordLogin}>
                            {passwordLogin ? (<FaEyeSlash size={20} />) : (<FaEye size={20} />)}
                        </span>
                    </div>
                    <div className="flex-row">
                        <span className="span" onClick={forgotPasswordClick}>Forgot password?</span>
                    </div>
                    <button className="button-submit" type='submit'>Login</button>
                    <div className="or"><p className='line'></p> or <p className='line'></p></div>
                    <button onClick={googleLogin} className='google-button-submit'><FcGoogle size={25} /><span>login with google</span></button>
                </form>
                <form className="form sing-up-container" onSubmit={onSignInSubmit} >
                    <div className="name">
                        sign up
                    </div>
                    <div className="flex-column">
                        <label>Username </label></div>
                    <div className="inputForm">
                        <FaUser />
                        <input required onChange={(e) => setSignUpUserName(e.target.value)} value={signUpUserName} type="text" className="input" placeholder="Enter your Username" />
                    </div>
                    <div className="flex-column">
                        <label>Email </label></div>
                    <div className="inputForm">
                        <IoMdMail size={18} />
                        <input required onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} type="email" className="input" placeholder="Enter your Email" />
                    </div>
                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                        <FaLock />
                        <input required onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} type={passwordSignUp ? "text" : "password"} className="input" placeholder="Enter your Password" />
                        <span onClick={showPasswordSingUp}>
                            {passwordSignUp ? (<FaEyeSlash size={20} />) : (<FaEye size={20} />)}
                        </span>
                    </div>
                    <button className="button-submit" type='submit'>Sign In</button>
                    <div className="or"><p className='line'></p> or <p className='line'></p></div>
                    <button onClick={googleLogin} className='google-button-submit'><FcGoogle size={25} /><span>sing in with google</span></button>
                </form>

                <div className="toggle-box">

                    <div className="toggle-panel toggle-left" >
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an account?</p>
                        <button onClick={() => setActive(true)}>Register</button>
                    </div >
                    <div className="toggle-panel toggle-right" >
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button onClick={() => setActive(false)}>Login</button>
                    </div >
                </div>
            </div>

        </div>







    )
}

export default SingIn
