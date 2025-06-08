import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'
import { IoIosAddCircle } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import axios from 'axios';
import { backEndUrl } from '../../App';



function Sidebar({setToken}) {


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
                <button className="login-btn" onClick={()=>setToken("")}>Log Out</button>
            </div>
        </div>
    )
}

export default Sidebar;