import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { StoreContext } from '../../context/StoreContext';
import { FaUserAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';
import { backEndUrl } from '../../App';
import { useEffect } from 'react';

function Navbar() {
  const { cartCount, setCartCount, setmenu, showmenu, setShowmenu, showUser, setShowUser, navigate, setCartData,token,auth } = useContext(StoreContext);

  useEffect(() => {
    auth();
  }, [])

  const onClickUser = (e) => {
    e.preventDefault();
    setShowUser(!showUser);
  }

  const cartClick = (e) => {
    e.preventDefault()
    if (token) {
      navigate('/cart')
    }
    else {
      toast.error("please login first!!");
    }
  }

  const orderClick = (e) => {
    e.preventDefault();
    if (token) {
      setShowmenu(false);
      setShowUser(!showUser)
      navigate('/orders')
    }
    else {
      toast.error("please login first!!");
    }
  }

  const loginClick = (e) => {
    if (token) {
      setShowmenu(false);
      setShowUser(!showUser)
      const logOut = async () => {
        try {
          e.preventDefault();
          const response = await axios.get(`${backEndUrl}/api/user/logout`, {
            withCredentials: true,
          })

          if (response.data.success) {
            auth();
            toast.success(response.data.message)

            localStorage.removeItem('accessToken');
            setCartCount(0);
            setCartData([]);
          }
          else {
            toast.error(response.data.messsage)
          }
        } catch (error) {
          console.error(error);
          toast.error(error.response.data.messsage);
        }
      }
      logOut();
    }
    else {
      setShowmenu(false);
      setShowUser(!showUser)
      navigate('/user/register');
    }
  }


  return (
    <nav className='navbar'>
      <IoMenu className='menu_btn' size={30} onClick={() => setShowmenu(true)} />
      <span className='title_name'>plashoe</span>
      <div className="navlist">
        <ul className='navlist_iteam' id={showmenu ? 'show' : ''}>
          <IoClose size={30} className='inside-btn' onClick={() => setShowmenu(false)} />
          <li className='user'>
            <button className='link' onClick={onClickUser}><FaUserAlt className="user-icon" size={25} color='black' /></button>
            <div className={`${showUser ? "toggle-user-sm" : "none-sm"}`}>
              <button onClick={orderClick}>orders</button>
              <button onClick={loginClick}>{token ? 'logOut' : 'login'}</button>
            </div>
          </li>
          <li onClick={() => {
            setmenu("home");
            setShowmenu(false);
          }} ><NavLink to="/" className='menubar'>Home</NavLink></li>
          <li onClick={() => {
            setmenu("men");
            setShowmenu(false);
          }}><NavLink to="/men" className='menubar'>Men</NavLink></li>
          <li onClick={() => {
            setmenu("women");
            setShowmenu(false);
          }} ><NavLink to="/women" className='menubar'>Women</NavLink></li>

          <li onClick={() => {
            setmenu("contact");
            setShowmenu(false);
          }} ><NavLink to="/contactus" className='menubar'>Contact Us</NavLink></li>
        </ul>
      </div>
      <div className="nav_right">
        <div className="iteams">
          <button className='orders' onClick={cartClick}>
            <FaShoppingCart size={25} color='black' />
            <span className='iteam_count'>{cartCount}</span>
          </button>
        </div>
        <div className="sing_in_btn">
          <button className='link' onClick={onClickUser}><FaUserAlt className="user" size={25} color='black' /></button>
          <div className={`${showUser ? "toggle-user" : "none"}`}>
            <button onClick={orderClick}>orders</button>
            <button onClick={loginClick}>{token ? 'logOut' : 'login'}</button>
          </div>
        </div>
      </div>
    </nav >
  )
}

export default Navbar
