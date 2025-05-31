import React from 'react'
import './checkout.css'
import { Link } from 'react-router-dom'
import defaultarray from '../../component/Defaultarray'
import { FaRupeeSign } from "react-icons/fa";

function CheckOut() {
    const array = defaultarray("male");
    let total = 0;
    array.map((iteam) => {
        total += iteam.price * iteam.quantity;
    })
    return (
        <div className='checkout-main-container'>
            <div className="checkout-inner-container">
                <div className="checkout-title">
                    checkout
                </div>
                <div className="checkout-content">
                    <div className="customer-info mg-10">
                        <div className="billing-title">
                            billing details
                        </div>
                        <form action="">
                            <input type="text" name="" id="" placeholder='First name' />
                            <input type="text" name="" id="" placeholder='last name' />
                            <input type="text" name="" id="" placeholder='Mobile no.' />
                            <textarea name="" id="" placeholder='Address'></textarea>
                        </form>
                        <div className="payment">
                            <div className="payment-title">
                                payment
                            </div>
                            <div >
                                <Link className="payment-btn link">place order</Link>
                            </div>
                        </div>
                    </div>
                    <div className="customer-orders mg-10">
                        <div className="your-order">
                            your orders
                        </div>
                        <div className="orders-list">
                            <div className="order-title ">
                                <span>product</span>
                                <span>subtotal</span>
                            </div>
                            <div className="order-iteam-list">
                                {array.map((arr, index) => (
                                    <div className="orders-iteam pd-20" key={index}>
                                        <span><img src={arr.loc} alt={arr.name} />{arr.name} x {arr.quantity}</span>
                                        <span className='rupee'><FaRupeeSign />{arr.price * arr.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="count-main-cont">
                            <div className="subtotal-count pd-15 count-cont">
                                <span>subtotal</span>
                                <span className='rupee'>
                                    <FaRupeeSign />{total}
                                </span>
                            </div>
                            <div className="gst-count pd-15 count-cont">
                                <span>GST</span>
                                <span className='rupee'>
                                    <FaRupeeSign />{total * 0.18}
                                </span>
                            </div>
                            <div className="total-count pd-15 count-cont">
                                <span>total </span>
                                <span className='rupee'>
                                   <FaRupeeSign />{total + (total * 0.18)}
                                </span>
                            </div>
                        </div>
                        </div>
                       

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
