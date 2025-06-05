import React, { useContext } from 'react'
import './sing-in.css'
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { backEndUrl } from '../../App.jsx';
import { StoreContext } from '../../context/StoreContext.jsx';


function SingIn() {

    const {navigate}=useContext(StoreContext);

    const [passwordLogin, setPasswordLogin] = useState(false);
    const [passwordSignUp, setPasswordSignUp] = useState(false);
    const [active, setActive] = useState(false);

    const [signUpUserName, setSignUpUserName] = useState('');
    const [loginCriteria, setLoginCriteria] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword,setSignUpPassword]=useState('');
    const [loginPassword,setLoginPassword]=useState('');


    const showPasswordLogin = () => {
        setPasswordLogin(Pre=>!Pre)
    }
    const showPasswordSingUp = () => {
        setPasswordSignUp(Pre=>!Pre)
    }

    const onSignInSubmit=(e)=>{
        e.preventDefault();
        setSignUpPassword('');
        setSignUpEmail('');
        setSignUpUserName('');
    
        // try {
        //     const formData=new FormData();

        //     formData.append('signUpUserName',signUpUserName)
        //     formData.append('email',email)
        //     formData.append("password",password);

        //     const response=axios.post(backEndUrl+"/user/register",formData)


        // } catch (error) {
            
        // }
    }

    const onLoginSubmit=(e)=>{
        e.preventDefault()
        navigate('/')
    }

    return (
        <div className={active ? 'sing-in-main-container active' : 'sing-in-main-container'}>
            <div className="inner-box">
                <form className="form" onSubmit={onLoginSubmit}>
                    <div className="name">
                        login
                    </div>
                    <div className="flex-column">
                        <label>Username </label></div>
                    <div className="inputForm">
                        <FaUser />
                        <input required onChange={(e)=>setLoginCriteria(e.target.value)} value={loginCriteria} type="text" className="input" placeholder="Enter your Username/Email" />
                    </div>
                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                        <FaLock />
                        <input required onChange={(e)=>setLoginPassword(e.target.value)} value={loginPassword} type={passwordLogin ? "text" : "password"} className="input" placeholder="Enter your Password" />
                        <span onClick={showPasswordLogin}>
                        {passwordLogin?( <FaEyeSlash size={20}/>):(<FaEye size={20}  />)} 
                        </span>
                    </div>
                    <div className="flex-row">
                        <span className="span">Forgot password?</span>
                    </div>
                    <button className="button-submit" type='submit'>Login</button>

                </form>
                <form className="form sing-up-container" onSubmit={onSignInSubmit} >
                    <div className="name">
                        sign up
                    </div>
                    <div className="flex-column">
                        <label>Username </label></div>
                    <div className="inputForm">
                        <FaUser />
                        <input required onChange={(e)=>setSignUpUserName(e.target.value)} value={signUpUserName} type="text" className="input" placeholder="Enter your Username" />
                    </div>
                    <div className="flex-column">
                        <label>Email </label></div>
                    <div className="inputForm">
                        <IoMdMail size={18} />
                        <input required onChange={(e)=>setSignUpEmail(e.target.value)} value={signUpEmail} type="email" className="input" placeholder="Enter your Email" />
                    </div>
                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                        <FaLock />
                        <input required onChange={(e)=>setSignUpPassword(e.target.value)} value={signUpPassword} tygn={passwordSignUp ? "text" : "password"} className="input" placeholder="Enter your Password" />
                        <span onClick={showPasswordSingUp}>
                           {passwordSignUp?( <FaEyeSlash size={20}/>):(<FaEye size={20}  />)} 
                        </span>
                    </div>
                    <div className="flex-row">
                        <span className="span">Forgot password?</span>
                    </div>
                    <button className="button-submit" type='submit'>Sign In</button>

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
