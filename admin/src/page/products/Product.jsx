import React from 'react'
import './product.css'
import defaultarray from '../../../../client/src/component/Defaultarray.js'
import { MdDelete } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from 'axios';
import { backEndUrl } from '../../App.jsx';
import { useState } from 'react';
import { useEffect } from 'react';



function Product({ token }) {
  const [productList, setProductList] = useState([]);

useEffect(()=>{
 const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backEndUrl}/product/listproduct`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      if (response.data.success) {
        setProductList(response.data.productData);
      } else {
        alert("Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
},[])
 



  const deleteproduct = async (e, proName) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backEndUrl}/product/deleteproduct`, {"proName":proName}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      if (response.data.success) {
        alert("product deleted successfully");
        window.location.reload();
      }
      else {
        alert("error in deleting product");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='main-iteam-container'>
      <div className="iteam-list-inner-container">
        <div className="heading">
          <div className="image-heading"></div>
          <div className="name-heading">name</div>
          <div className="price-heading">price</div>
          <div className="stock-heading">stock</div>
          <div className="delete-heading"></div>
        </div>
        <div className="iteam-list">
          {productList.map((iteam, index) => (
            <div className="iteam-list-container" key={index}>
              <div className="iteam-image"><img src={iteam.proImage} alt="not found" /></div>
              <div className="iteam-name">{iteam.proName}</div>
              <div className="iteam-price"><FaIndianRupeeSign className='rupees' size={18} />{iteam.proPrice}</div>
              <div className="iteam-stock">{iteam.proStock}</div>
              <div className="delete-btn" onClick={(e) => { deleteproduct(e, iteam.proName) }}><MdDelete size={30} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Product