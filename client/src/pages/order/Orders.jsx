import React from 'react'
import './orders.css'
import { useEffect } from 'react';
import axios from "axios";
import { backEndUrl } from '../../App';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Orders() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(backEndUrl + '/api/orders/userorders', {
                withCredentials: true,
            })
            if (response.data.success) {
                setOrders(response.data.order);
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const trackOrder = (e) => {
        e.preventDefault();
        fetchOrders();
    }

    return (
        <div className='orders-main-container'>
            <div className="orders-inner-container">
                <div className="heading">
                    <div className="image-heading"></div>
                    <div className="name-heading">name</div>
                    <div className="size-heading">size</div>
                    <div className="quantity-heading">quantity</div>
                    <div className="method-heading">method</div>
                    <div className="status-heading">status</div>
                    <div className="tracker-heading">track order</div>
                </div>
                <div className="order-list">
                    {
                        orders.map((ord) => ord.iteams.map((iteam, index) => (
                            <div className="order-list-container" key={index}>
                                <div className="iteam-image"><img src={iteam.proImg} alt="not found" /></div>
                                <div className="iteam-name">{iteam.proName}</div>
                                <div className="iteam-size">{iteam.size}</div>
                                <div className="iteam-quantity">{iteam.quantity}</div>
                                <div className="payment-method">{ord.paymentMethod === 'COD' ? 'cash on delivery' : 'online'}</div>
                                <div className="status"><p className='dot'></p>{ord.status}</div>
                                <div className="tracker-btn"><button onClick={trackOrder}>track order</button></div>
                            </div>
                        )))
                    }
                    {
                        orders.map((ord) => ord.iteams.map((iteam, index) => (
                            <div className="order-list-container-v" key={index}>
                                <div className="iteam-image"><img src={iteam.proImg} alt="not found" /></div>
                                <div className="all-data">
                                    <div className="iteam-name"><span>Name : </span>{iteam.proName}</div>
                                    <div className="size-quantity-cont">
                                        <div className="iteam-size"><span>Size : </span>{iteam.size}</div>
                                        <div className="iteam-quantity"><span>quantity : </span>{iteam.quantity}</div>
                                    </div>
                                    <div className="payment-method"><span>method : </span>{ord.paymentMethod === 'COD' ? 'cash on delivery' : 'online'}</div>
                                    <div className="status"><span>status : </span><p className='dot'></p>{ord.status}</div>
                                    <div className="tracker-btn"><button onClick={trackOrder}>track order</button></div>
                                </div>
                            </div>
                        )))
                    }
                </div>
            </div>
        </div>
    )
}

export default Orders


