import React, { useContext } from 'react'
import './resetPassword.css'
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { backEndUrl } from '../../App';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
import CustomizedProgressBars from '../../component/loader/Loader.jsx';



function ResetPassword() {

  const { navigate } = useContext(StoreContext)
  const [newPassword, setNewPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [Npassword, setNPassword] = useState(false);
  const [Cpassword, setCPassword] = useState(false);

  const [loader, setLoader] = useState(false);




  const showNewPassword = () => {
    setNPassword(Pre => !Pre)
  }
  const showConformPassword = () => {
    setCPassword(Pre => !Pre)
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (newPassword != conformPassword) {
      toast.error("new password and conform password must be same")
      return;
    }
    try {
      const response = await axios.post(backEndUrl + `/api/user/reset-password`, { newPassword }, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      }).then(setLoader(true));

      if (response.data.success) {
        toast.success(response.data.message)
        setLoader(false)
        navigate('/user/register')
      }
    } catch (error) {

      console.error(error);
      toast.error(error.response.data.message)
      setLoader(false);
    }

  }

  return (
    <div className='reset-password-container'>
      <div className="reset-password-inner-cont">
        {loader ? <div className='loader'><CustomizedProgressBars></CustomizedProgressBars></div> : ''}
        <form className="form" onSubmit={onSubmitForm} >
          <div className="name">
            reset password
          </div>
          <div className="flex-column">
            <label>new password </label></div>
          <div className="inputForm">
            <FaLock />
            <input required onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type={Npassword ? "text" : "password"} className="input" placeholder="Enter your Password" />
            <span onClick={showNewPassword}>
              {Npassword ? (<FaEyeSlash size={20} />) : (<FaEye size={20} />)}
            </span>
          </div>
          <div className="flex-column">
            <label>conform password </label></div>
          <div className="inputForm">
            <FaLock />
            <input required onChange={(e) => setConformPassword(e.target.value)} value={conformPassword} type={Cpassword ? "text" : "password"} className="input" placeholder="Enter your Password" />
            <span onClick={showConformPassword}>
              {Cpassword ? (<FaEyeSlash size={20} />) : (<FaEye size={20} />)}
            </span>
          </div>
          <button type='submit' className="button-submit">submit</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword