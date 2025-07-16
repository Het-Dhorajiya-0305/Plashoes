import React, { useContext, useEffect, useState } from 'react'
import './checkout.css'
import { FaRupeeSign } from "react-icons/fa";
import { StoreContext } from '../../context/StoreContext';
import stripe_logo from '../../assets/Stripe-logo.png'
import axios from 'axios';
import { backEndUrl } from '../../App';
import { toast } from 'react-toastify';
import CustomizedProgressBars from '../../component/loader/Loader.jsx'

function CheckOut() {
    const { navigate, total, cartData, setCartData } = useContext(StoreContext);

    const [method, setMethod] = useState("COD")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailId, setEmailId] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("");
    const [mobileNumber, setMobileNumber] = useState('');

    const [loader,setLoader]=useState(false);

    const [formData, setFormData] = useState({
        'firstName': '',
        'lastName': '',
        'emailId': '',
        "street": '',
        "city": '',
        "state": '',
        'phone': ''
    })




    const checkoutSubmit = async (e) => {
        e.preventDefault();
        try {
            let newOrdersList = []

            cartData.map((iteam) => {
                const obj = structuredClone(iteam.product);
                obj.size = iteam.size;
                obj.quantity = iteam.quantity;
                newOrdersList.push(obj);
            })

            const payload = {
                iteams: newOrdersList,
                amount: total + (total * 0.05),
                address: formData
            }

            switch (method) {
                case "COD":
                    const response = await axios.post(backEndUrl + '/api/orders/place', payload, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true,
                    }).then(setLoader(true));


                    if (response.data.success) {
                        toast.success(response.data.message)
                        setCartData([])
                        navigate('/orders')
                        setLoader(false)
                    }
                    else {
                        toast.error(response.data.message)
                        setLoader(false)
                    }
                    break;
                case "stripe":
                    const responseStripe = await axios.post(backEndUrl + '/api/orders/stripe', payload, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true,
                    }).then(setLoader(true))
                    
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data;
                        window.location.replace(session_url)
                        setLoader(false)
                    }
                    else {
                        toast.error(responseStripe.data.message)
                        setLoader(false)
                    }
            }


        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
            setLoader(false)
        }
    }
    return (
        <form className='checkout-main-container' onSubmit={checkoutSubmit}>
            <div className="checkout-inner-container">
                {loader ? <div className='loader'><CustomizedProgressBars></CustomizedProgressBars></div> : ''}
                <div className="checkout-title">
                    checkout
                </div>
                <div className="checkout-content">
                    <div className="customer-info mg-10">
                        <div className="delivery-info-title">
                            delivery information
                        </div>
                        <div className="delivery-info">
                            <div className="customer-name two-input">
                                <input required type="text" onChange={(e) => { setFirstName(e.target.value); setFormData(pre => setFormData({ ...pre, ['firstName']: e.target.value })) }} value={firstName} placeholder='First name' />
                                <input required type="text" onChange={(e) => { setLastName(e.target.value); setFormData(pre => setFormData({ ...pre, ['lastName']: e.target.value })) }} value={lastName} placeholder='last name' />
                            </div>
                            <div className="customer-email">
                                <input required type="email" onChange={(e) => { setEmailId(e.target.value); setFormData(pre => setFormData({ ...pre, ['emailId']: e.target.value })) }} value={emailId} placeholder='Email Address' />
                            </div>
                            <div className="street">
                                <input required type="text" onChange={(e) => { setStreet(e.target.value); setFormData(pre => setFormData({ ...pre, ['street']: e.target.value })) }} value={street} placeholder='Street' />
                            </div>
                            <div className="city-state two-input">
                                <input required type="text" onChange={(e) => { setCity(e.target.value); setFormData(pre => setFormData({ ...pre, ['city']: e.target.value })) }} value={city} placeholder="City" />
                                <input required type="text" onChange={(e) => { setState(e.target.value); setFormData(pre => setFormData({ ...pre, ['state']: e.target.value })) }} value={state} placeholder='State' />
                            </div>
                            <div className="customer-number">
                                <input required type="number" onChange={(e) => { setMobileNumber(e.target.value); setFormData(pre => setFormData({ ...pre, ['phone']: e.target.value })) }} value={mobileNumber} placeholder='Mobile no.' />
                            </div>

                        </div>
                    </div>
                    <div className="customer-orders mg-10">
                        <div className="cart-total-title">
                            cart total
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
                                    <FaRupeeSign />{total * 0.05}
                                </span>
                            </div>
                            <div className="total-count pd-15 count-cont">
                                <span>total </span>
                                <span className='rupee'>
                                    <FaRupeeSign />{total + (total * 0.05)}
                                </span>
                            </div>
                        </div>
                        <div className="payment-method">
                            <div className="payment-method-title">
                                payment method
                            </div>
                            <div className="payment-method-cont" >
                                <div className="method-cont pay-cont" onClick={() => { setMethod("stripe") }}>
                                    <p className={`${method === "stripe" ? "selected-method" : ""}`}></p>
                                    <img src={stripe_logo} alt="" className='stripe-img' />
                                </div>
                                <div className="cod pay-cont" onClick={() => { setMethod("COD") }}>
                                    <p className={`${method === "COD" ? "selected-method" : ""}`}></p>
                                    cash on delivery
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="payment-btn">
                            place order
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CheckOut
