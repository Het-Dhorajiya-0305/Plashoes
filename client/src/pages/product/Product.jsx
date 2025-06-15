import { useContext, useEffect, useState } from 'react'
import React from 'react'
import './product.css'
import { FaRupeeSign } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { backEndUrl } from '../../App';


function Product() {
  const { pro_id } = useParams();
  const [size, setSize] = useState([])
  const [productDetail, setProductDetail] = useState({});
  const [sizeContainer, setSizeContainer] = useState([]);



  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${backEndUrl}/api/product/${pro_id}`)
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



  useEffect(() => {
    if (productDetail && Array.isArray(productDetail.proSize)) {
      const sizes = productDetail.proSize.map((iteam, index) => (
        <div key={index} className={size.includes(iteam) ? "selected-cont" : "not-in"} onClick={() => sizeOnClick(iteam)}><p className="size">{iteam}</p></div>
      ));
      setSizeContainer(sizes);
    } else {
      setSizeContainer([]);
    }
  }, [productDetail, size]);

  const sizeOnClick = (item) => {
    setSize((prevSizes) => {
      if (prevSizes.includes(item)) {
        return prevSizes.filter((it) => it !== item);
      } else {
        return [...prevSizes, item];
      }
    });
  };


  const addToCart = async (e) => {
    e.preventDefault();
    try {
      if (size.length === 0) {
        alert("Please select at least one product size!");
        return;
      }

      // Send JSON instead of FormData for simplicity
      const payload = {
        proName: productDetail.proName,
        proSize: size, // Send as array
        proDetails: productDetail,
      };

      const response = await axios.post(`${backEndUrl}/api/cartIteam/addtocart`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Add to cart response:", response.data);
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error.response?.data || error.message);
      alert(`Error adding product to cart: ${error.response?.data?.message || error.message}`);
    }
  };

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
            <div className="size-cont">
              <div className="size-inner-cont">
                {sizeContainer}
              </div>
            </div>
            <div className="add-to-cart-btn">
              <button onClick={addToCart}>add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;
