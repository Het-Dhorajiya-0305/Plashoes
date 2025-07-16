import React, { useContext, useEffect, useState } from 'react'
import './cart.css'
import { FaRupeeSign } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

function Cart() {
  const {fetchCartData,updateQuantity,deleteIteam,cartData,total,setTotal} = useContext(StoreContext)


  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    let calTotal = 0;
    cartData.map((iteam) => {
      calTotal += iteam.quantity * iteam.product.proPrice;
    })
    setTotal(calTotal);
  }, [cartData])

  return (
    <div className="main-cart-container">
      <div className="inner-cart-container">
        <div className="cart-title">
          Shopping Cart
        </div>
        <div className="cart-content">
          <div className="cart-left">
            <table>
              <thead>
                <tr>
                  <th className='image-header'></th>
                  <th className='product-detail'>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>size</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((arr, index) => (
                  <tr className='height-more' key={index}>
                    <td className='empty-con'>
                      <MdDelete className='delete-btn' onClick={()=>deleteIteam(arr._id)}/>
                      <img className="img-fluid" src={arr.product.proImg} alt={arr.product.proName} />
                    </td>
                    <td className='black'>{arr.product.proName}</td>
                    <td className='light-grey rupee'><FaRupeeSign />{arr.product.proPrice}</td>
                    <td>
                      <div className="increament-btn">
                        <div className="minus" onClick={() => updateQuantity(arr._id,arr.quantity===1?0:arr.quantity-1)}>-</div>
                        <div className="orders-count">{arr.quantity}</div>
                        <div className="plus" onClick={() => updateQuantity(arr._id,arr.quantity+1)}>+</div>
                      </div>
                    </td>
                    <td className='light-grey rupee'>{arr.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {cartData.map((arr, index) => (
              <div className="cart-iteam" key={index}>
                <div className="delete">
                  <MdDelete onClick={() => deleteIteam(arr)} className='delete-btn' />
                </div>
                <div className="image-container">
                  <img className="img-fluid" src={arr.product.proImg} alt={arr.product.proName} />
                </div>
                <div className="common-div">
                  <span className='product-title'>product :</span>
                  <span className='product-data name'>{arr.product.proName}</span>
                </div>
                <div className="common-div">
                  <span className='product-title'>price :</span>
                  <span className='product-data'><FaRupeeSign />{arr.product.proPrice}</span>
                </div>
                <div className="common-div">
                  <span className='product-title'>quantity</span>
                  <span className='incre'>
                    <div className="increament-btn">
                      <div className="minus" onClick={() => updateQuantity(arr._id,arr.quantity===1?0:arr.quantity-1)}>-</div>
                      <div className="orders-count">{arr.quantity}</div>
                      <div className="plus" onClick={() => updateQuantity(arr._id,arr.quantity+1)}>+</div>
                    </div>
                  </span>
                </div>
                <div className="common-div">
                  <span className='product-title'>size</span>
                  <span className='product-data'>{arr.size}</span>
                </div>
              </div>
            ))}

          </div>
          <div className="cart-right">
            <div className="cart-total">cart totals</div>
            <div className="cal">
              <div className="subtotal">
                <span>subtotal</span>
                <span className='rupee'><FaRupeeSign />{total}</span>
              </div>
              <div className="gst">
                <span>GST</span>
                <span className='rupee'><FaRupeeSign />{total * 0.05}</span>
              </div>
              <div className="total">
                <span>total</span>
                <span className='rupee'><FaRupeeSign />{total + (total * 0.05)}</span>
              </div>
            </div>
            <div className="payment-process-btn">
              <Link to='/checkout' className='checkout-btn link'>
                process to checkout
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
