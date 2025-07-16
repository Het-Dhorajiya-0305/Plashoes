import React from 'react'
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import './adminLogin.css'
import { backEndUrl } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function AdminLogin({setToken}) {

    const navigate =useNavigate();

    const [passwordLogin, setPasswordLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitForm = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backEndUrl + "/api/user/adminlogin", { email, password },{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            console.log(response)
            if (response.data.success) {
                localStorage.setItem('adminToken',response.data.accessToken);
                navigate('/admin/addIteams')
                setToken(response.data.accessToken);
            }
            else {
                toast.error(error.response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const showPasswordLogin = () => {
        setPasswordLogin(Pre => !Pre)
    }


    return (
        <div className='admin-login-container'>
            <div className="admin-login-form">
                <form className="form" onSubmit={onSubmitForm} >
                    <div className="name">
                        Admin Login
                    </div>
                    <div className="flex-column">
                        <label>Email </label></div>
                    <div className="inputForm">
                        <FaUser />
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input" placeholder="Enter your Username" />
                    </div>
                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                        <FaLock />
                        <input type={passwordLogin ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} className="input" placeholder="Enter your Password" />
                        <span onClick={showPasswordLogin}>
                            {passwordLogin ? (<FaEyeSlash size={20} />) : (<FaEye size={20} />)}
                        </span>
                    </div>
                    <div className="flex-row">
                        <span className="span">Forgot password?</span>
                    </div>
                    <button className="button-submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin