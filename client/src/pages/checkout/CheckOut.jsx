import React, { useContext } from 'react'
import './checkout.css'
import { FaRupeeSign } from "react-icons/fa";
import { StoreContext } from '../../context/StoreContext';
import { NavLink } from 'react-router-dom';


function CheckOut() {
    const { cartIteam } = useContext(StoreContext);
    let total = 0;
    cartIteam.map((iteam) => {
        total += iteam.price * iteam.quantity;
    })


    const submit = () => {
        console.log("form submites")
    }
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
                        <form action="" onSubmit={submit}>
                            <input required type="text" placeholder='First name' />
                            <input required type="text" placeholder='last name' />
                            <input required type="text" placeholder='Mobile no.' />
                            <textarea required name="" id="" placeholder='Address'></textarea>
                            <button type="submit" className="payment-btn">
                                    place order
                            </button>
                        </form>
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
                                {cartIteam.map((arr, index) => (
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
