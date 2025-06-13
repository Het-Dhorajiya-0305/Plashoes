import { useContext, useEffect, useState } from 'react'
import React from 'react'
import './product.css'
import { FaRupeeSign } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import defaultarray from '../../component/Defaultarray';
import axios from 'axios';
import { backEndUrl } from '../../App';


function Product() {
  const { pro_id } = useParams();
  const { addToCart, cartItems } = useContext(StoreContext)
  const [size, setSize] = useState("6 UK")
  const [productDetail, setProductDetail] = useState({});
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${backEndUrl}/product/${pro_id}`)
        console.log(response)
        if (response.data.success) {
          setProductDetail(response.data.product);
        }
        else {
          console.log("error in fetching product detail", response.data.message)
          alert("error in fetching product detail", response.data.message)
          return;
        }
      } catch (error) {
        console.log("error in fetching product detail", error.message);
        alert("error in fetching product detail", error.message);
        return;
      }
    }
    fetchProductDetail();
  }, []);

  console.log("productDetail", productDetail)





  if (!productDetail) {
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
            <img src={productDetail.proImg} alt={productDetail.proName} />
          </div>
          <div className="product-detail">
            <h2 className='product-name'>{productDetail.proName}</h2>
            <h2 className='rupee'><FaRupeeSign />{productDetail.proPrice}</h2>
            <div className="description">
              {productDetail.proDescription}
            </div>
            <div className="add-to-cart">
              <div className="size-cont">
                <p className='label'>Size</p>
                <div className="size-inner-cont">
                  {productDetail.proSize.map((iteam)=>(
                    <div className={productDetail.proSize.includes(iteam) ? "selected-cont" : "not-in"} onClick={() => setProSize(pre => pre.includes(iteam) ? pre.filter((it) => it != iteam) : [...proSize, iteam])}><p className="size">{iteam}</p></div>
                  ))}d
                </div>
              </div>
              <div className="add-to-cart-btn">
                <button onClick={() => addToCart(product, size)}>add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;
