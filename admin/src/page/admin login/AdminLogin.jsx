import React from 'react'
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './adminLogin.css'



function AdminLogin() {


    const [passwordLogin, setPasswordLogin] = useState(false);

    const showPasswordLogin = () => {
        setPasswordLogin(Pre => !Pre)
    }


    return (
        <div className='admin-login-container'>
            <div className="admin-login-form">
                <form className="form" method='post' action='/admin' >
                    <div className="name">
                        Admin Login
                    </div>
                    <div className="flex-column">
                        <label>Username </label></div>
                    <div className="inputForm">
                        <FaUser />
                        <input type="text" className="input" placeholder="Enter your Username" />
                    </div>
                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                        <FaLock />
                        <input type={passwordLogin ? "text" : "password"} className="input" placeholder="Enter your Password" />
                        <span onClick={showPasswordLogin}>
                            {passwordLogin ? (<FaEyeSlash size={20} />) : (<FaEye size={20} />)}
                        </span>
                    </div>
                    <div className="flex-row">
                        <span className="span">Forgot password?</span>
                    </div>
                    <button className="button-submit"><Link to="/admin" className='link'>Login</Link></button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin