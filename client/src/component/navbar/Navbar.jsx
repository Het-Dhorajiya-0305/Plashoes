import React, { useCallback, useContext } from 'react'
import { NavLink} from 'react-router-dom';
import './Navbar.css'
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { StoreContext } from '../../context/StoreContext';
import { FaUserAlt } from "react-icons/fa";

function  Navbar() {
  const {menu,setmenu,showmenu, setShowmenu,getCartCount} = useContext(StoreContext);


  return (
    <nav className='navbar'>
      <IoMenu className='menu_btn' size={30} onClick={() => setShowmenu(true)} />
      <span className='title_name'>plashoe</span>
      <div className="navlist">
        <ul className='navlist_iteam' id={showmenu ? 'show' : ''}>
          <IoClose size={30} className='inside-btn' onClick={() => setShowmenu(false)} />
          <li className='user'> <NavLink to="/singin" className='link'><FaUserAlt  size={25} color='black'/></NavLink></li>
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
          <NavLink to="/cart" className='orders'>
            <FaShoppingCart size={25} color='black' />
            <span className='iteam_count'>{getCartCount()}</span>
          </NavLink>
        </div>
        <div className="sing_in_btn">
          <NavLink to="/user/register" className='link'><FaUserAlt className="user" size={25} color='black'/></NavLink>
        </div>
      </div>
    </nav >
  )
}

export default Navbar
