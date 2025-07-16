import React from 'react'
import './forgotpassword.css';
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import { backEndUrl } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomizedProgressBars from '../../component/loader/Loader.jsx';



function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(true);


    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(backEndUrl + '/api/user/forgotpassword', { email: email }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }).then(setLoader(true))

            if (response.data.success) {
                toast.success(response.data.message);
                setLoader(false)
                return;
            }
        } catch (error) {
            console.log(error)
            setLoader(false)
            toast.error(error.response.data.message)
        }


    }
    return (
        <div className='forgot-password-container'>
            <div className="forgot-password-inner-cont">
                {loader ? <div className='loader'><CustomizedProgressBars></CustomizedProgressBars></div> : ''}
                <form className="form" onSubmit={onSubmitForm} >
                    <div className="name">
                        forgot password
                    </div>
                    <div className="flex-column">
                        <label>Email </label></div>
                    <div className="inputForm">
                        <FaUser />
                        <input required type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="input" placeholder="Enter your Email" />
                    </div>
                    <button type='submit' className="button-submit">submit</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword