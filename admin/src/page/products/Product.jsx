import React from 'react'
import './product.css'
import { MdDelete } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from 'axios';
import { backEndUrl } from '../../App.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';



function Product() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backEndUrl}/api/product/adminproducts`, {
          withCredentials: true,  
        });

        if (response.data.success) {
          setProductList(response.data.productData);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error.response.data.message);
        toast.error(error.response.data.message);
      }
    };

    fetchProducts();
  }, [])




  const deleteproduct = async (e, proName) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backEndUrl}/api/product/deleteproduct`, { "proName": proName }, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success) {
        toast.success("product deleted successfully");
        window.location.reload();
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='main-iteam-container'>
      <div className="iteam-list-inner-container">
        <div className="heading">
          <div className="image-heading"></div>
          <div className="name-heading">name</div>
          <div className="price-heading">price</div>
          <div className="stock-heading">Gender</div>
          <div className="delete-heading"></div>
        </div>
        <div className="iteam-list">
          {productList.map((iteam, index) => (
            <div className="iteam-list-container" key={index}>
              <div className="iteam-image"><img src={iteam.proImg} alt="not found" /></div>
              <div className="iteam-name">{iteam.proName}</div>
              <div className="iteam-price"><FaIndianRupeeSign className='rupees' size={18} />{iteam.proPrice}</div>
              <div className="iteam-stock">{iteam.proGender}</div>
              <div className="delete-btn" onClick={(e) => { deleteproduct(e, iteam.proName) }}><MdDelete size={30} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Product