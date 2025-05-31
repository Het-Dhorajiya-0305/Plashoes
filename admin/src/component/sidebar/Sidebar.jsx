import React from 'react'
import {NavLink} from 'react-router-dom'
import './sidebar.css'
import { IoIosAddCircle } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";



function Sidebar() {
    return (
        <div className='sidebar-main-container'>
            <div className='sidebar-container'>
                <h1 className='title-name'>PLASHOES</h1>
                <div className="sidebar">   
                    <ul className='sidebar_iteam' >
                        <div className="add-iteams">
                            <li className="add-iteam-li"><NavLink to="/addIteams" className='link'><IoIosAddCircle size={25} className='icon'/><span>add iteam</span></NavLink></li>
                        </div>
                        <div className="iteam-list">
                            <li className="iteam-list-li"><NavLink to="/iteamList" className='link'><FaList size={22} className='icon'/><span>iteams</span></NavLink></li>
                        </div>
                        <div className="orders">
                            <li className="orders-li"><NavLink to="/orders" className='link'><FaCartShopping size={25} className='icon'/><span>orders</span></NavLink></li>
                        </div>
                    </ul>
                </div>
                <div className="login-btn"><NavLink to="/adminLogin" className='link'>Login</NavLink></div>
            </div>
        </div>
    )
}

export default Sidebar;