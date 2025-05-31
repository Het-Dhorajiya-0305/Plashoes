import React from 'react'
import Sidebar from '../../component/sidebar/Sidebar.jsx'
import './product.css'
import defaultarray from '../../../../client/src/component/Defaultarray.js'
import { MdDelete } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";



function Product() {
  const arr = defaultarray("");
  return (
    <div className='main-iteam-container'>
      <Sidebar></Sidebar>
      <div className="iteam-list-inner-container">
        <div className="heading">
          <div className="image-heading"></div>
          <div className="name-heading">name</div>
          <div className="price-heading">price</div>
          <div className="stock-heading">stock</div>
          <div className="delete-heading"></div>
        </div>
        <div className="iteam-list">
          {arr.map((iteam, index) => (
            <div className="iteam-list-container" key={index}>
              <div className="iteam-image"><img src={iteam.loc} alt="not found" /></div>
              <div className="iteam-name">{iteam.name}</div>
              <div className="iteam-price"><FaIndianRupeeSign className='rupees' size={18}/>{iteam.price}</div>
              <div className="iteam-stock">{iteam.gender}</div>
              <div className="delete-btn" onClick={()=>{console.log("delte btn")}}><MdDelete  size={30}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Product