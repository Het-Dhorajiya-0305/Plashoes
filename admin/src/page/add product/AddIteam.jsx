import React from 'react'
import './addIteam.css'

function AddIteam() {
  return (
    <div className='additeam-main-container'>
      {/* <Sidebar></Sidebar> */}
      <div className="additeam-inner-container">
        <div className="additeam-form">
          <form action="">
            <div className="flex-column">
              <label>Product Image</label>
            </div>
            <div className="inputForm">
              <input type="file" name="" id="" ></input>
            </div>
            <div className="flex-column">
              <label>Product Name </label>
            </div>
            <div className="inputForm">
              <input type="text" className="input" placeholder="Product Name" />
            </div>
            <div className="flex-column">
              <label>Product Description </label>
            </div>
            <div className="inputForm">
              <input type="text" className="input" placeholder="Product Description" />
            </div>
            <div className="flex-column">
              <label>price</label>
            </div>
            <div className="inputForm">
              <input type="text" className="input" placeholder="Product price" />
            </div>
            <div className="flex-column">
              <label>gender</label>
            </div>
            <div className="inputForm">
              <input type="radio" className="input" id='male' value="male" name='gender' />
              <label htmlFor="male">male</label>
              <input type="radio" className="input" id='female' value="female" name='gender' />
              <label htmlFor="female">female</label>

            </div>
            <div className="flex-column">
              <label>size</label>
            </div>
            <div className="inputForm">
              
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddIteam