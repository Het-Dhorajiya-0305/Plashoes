import { useContext, useEffect, useState } from 'react'
import React from 'react'
import './product.css'
import { FaRupeeSign } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import defaultarray from '../../component/Defaultarray';


function Product() {
  const { pro_id, gender } = useParams();
  const {addToCart,cartItems} =useContext(StoreContext)
  const [size,setSize]=useState("6 UK")

  useEffect(()=>{
    console.log(size)
  },[size]);

  const arr=defaultarray("");

  const product = arr.find((item) => item.id === pro_id && item.gender === gender);

  if (!product) {
    return (
      <div className='product-main-container'>
        {/* <Navbar /> */}
        <div className="product-inner-container">
          <h2>Product not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='product-main-container'>
      <div className="product-inner-container">
        <div className="product-detail-container">
          <div className="product-image">
            <img src={product.loc} alt={product.name} />
          </div>
          <div className="product-detail">
            <h2 className='product-name'>{product.name}</h2>
            <h2 className='rupee'><FaRupeeSign />{product.price}</h2>
            <div className="description">
              {product.description}
            </div>
            <div className="add-to-cart">
              <div className="product-size">
                <select className='size-selector' name="" id="" onChange={(e)=>setSize(e.target.value)}>
                  <option value="6 UK">6 UK</option>
                  <option value="7 UK">7 UK</option>
                  <option value="8 UK">8 UK</option>
                  <option value="9 UK">9 UK</option>
                  <option value="10 UK">10 UK</option>
                  <option value="11 UK">11 UK</option>
                  <option value="12 UK">12 UK</option>
                </select>
              </div>
              <div className="add-to-cart-btn">
                <button onClick={()=>addToCart(product,size)}>add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;
