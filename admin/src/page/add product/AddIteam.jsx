import React from 'react'
import './addIteam.css'
import Sidebar from '../../component/sidebar/Sidebar'

function AddIteam() {
  return (
    <div className='additeam-main-container'>
      <Sidebar></Sidebar>
      <div className="additeam-inner-container">
        <div className="additeam-form">
          <form action="">
            <div className="flex-column">
              <label>Product Image</label>
            </div>
            <div className="inputForm">
              {/* <img src= alt="" /> */}
              <input type="file" name="" id="" />
            </div>
            <div className="flex-column">
              <label>Product Name </label>
            </div>
            <div className="inputForm">
              <input type="text" className="input" placeholder="Enter your Product Name" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddIteam