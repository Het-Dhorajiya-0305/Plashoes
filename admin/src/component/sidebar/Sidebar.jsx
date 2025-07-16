import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'
import { IoIosAddCircle } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { backEndUrl } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';



function Sidebar({token,setToken}) {

    const navigate = useNavigate();


    useEffect(()=>{
        setToken(localStorage.getItem('adminToken'));
    },[])

    const onLogOutClick=async (e)=>{
            // e.preventDefault();
        if(!token){
            navigate('/admin/login');
            return;
        }
        try {
            const response=await axios.get(backEndUrl+'/api/user/adminlogout',{
                withCredentials:true
            })

            if(response.data.success){
                localStorage.removeItem('adminToken');
                setToken(null);
            }
            else
            {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error("Error logging out:", error.response.data.message);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='sidebar-main-container'>
            <div className='sidebar-container'>
                <h1 className='title-name'>PLASHOES</h1>
                <div className="sidebar">
                    <div className="add-iteams">
                        <NavLink to="/admin/addIteams" className='link'><IoIosAddCircle size={25} className='icon' /><span>add iteam</span></NavLink>
                    </div>
                    <div className="iteam-list">
                        <NavLink to="/admin/iteamList" className='link'><FaList size={22} className='icon' /><span>iteams</span></NavLink>
                    </div>
                    <div className="orders">
                        <NavLink to="/admin/orders" className='link'><FaCartShopping size={25} className='icon' /><span>orders</span></NavLink>
                    </div>
                </div>
                <button className="login-btn"
                    onClick={(event) => onLogOutClick(event)}>{token ? "log out" : "login"}</button>
            </div>
        </div>
    )
}

export default Sidebar;