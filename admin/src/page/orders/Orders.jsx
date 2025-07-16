import React from 'react';
import './adminOrders.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { backEndUrl } from '../../App.jsx';
import { toast } from 'react-toastify';
import parcelIcon from '../../assets/parcel-icon.jpg'
import { FaIndianRupeeSign } from "react-icons/fa6";


function Orders({token}) {

  const [orders, setOrders] = useState([]);

  const fetchAdminOrders = async () => {
    try {
      const response = await axios.get(`${backEndUrl}/api/orders/adminorders`, {
        withCredentials: true
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error.response.data.message);
      toast.error(error.response.data.message);
      setOrders([]);
    }
  }

  const changeStatus = async (event, orderId) => {
    try {
      const payload = {
        'orderId': orderId,
        'newStatus': event.target.value
      }

      const response = await axios.post(backEndUrl + '/api/orders/updatestatus', payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })

      console.log(response.data)
      if (response.data.success) {
        toast.success(response.data.message)
        fetchAdminOrders();
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      toast.error(error.response.data.message)
    }

  }
  useEffect(() => {
    fetchAdminOrders()
  }, [token])


  const arr = [
    {
      'address': {
        'city': 'fwfwefewfewf',
        'state': 'fewfwfewfwefewfw',
        'street': 'fewfwfewfewfewew',
        'phone': '568446846846',
        'firstName': 'fwfwfwefw',
        'lastName': 'wswsqsqsqsfhht'
      },
      'amount': 7520,
      'payment': false,
      'paymentMethod': 'COD',
      'status': 'out for delivery',
      'iteams': [
        {
          id: "13",
          size: "6UK",
          quantity: 2,
          gender: "male",
          name: "men's navy running",
          price: 8740,
          description: "A sleek and stylish navy blue running shoe designed for comfort and durability, perfect for both casual joggers and seasoned runners."
        },
        {
          id: "13",
          size: "6UK",
          quantity: 2,
          gender: "male",
          name: "men's navy running",
          price: 8740,
          description: "A sleek and stylish navy blue running shoe designed for comfort and durability, perfect for both casual joggers and seasoned runners."
        }
      ]
    },
    {
      'address': {
        'city': 'fwfwefewfewf',
        'state': 'fewfwfewfwefewfw',
        'street': 'fewfwfewfewfewew',
        'phone': '568446846846',
        'firstName': 'fwfwfwefw',
        'lastName': 'wswsqsqsqsfhht'
      },
      'amount': 7520,
      'payment': true,
      'paymentMethod': 'COD',
      'status': 'delivered',
      'iteams': [
        {
          id: "13",
          size: "6UK",
          quantity: 2,
          gender: "male",
          name: "men's navy running",
          price: 8740,
          description: "A sleek and stylish navy blue running shoe designed for comfort and durability, perfect for both casual joggers and seasoned runners."
        }
      ]
    },
    {
      'address': {
        'city': 'fwfwefewfewf',
        'state': 'fewfwfewfwefewfw',
        'street': 'fewfwfewfewfewew',
        'phone': '568446846846',
        'firstName': 'fwfwfwefw',
        'lastName': 'wswsqsqsqsfhht'
      },
      'amount': 7520,
      'payment': false,
      'paymentMethod': 'COD',
      'status': 'delivered',
      'iteams': [
        {
          id: "13",
          size: "6UK",
          quantity: 2,
          gender: "male",
          name: "men's navy running",
          price: 8740,
          description: "A sleek and stylish navy blue running shoe designed for comfort and durability, perfect for both casual joggers and seasoned runners."
        },
        {
          id: "13",
          size: "6UK",
          quantity: 2,
          gender: "male",
          name: "men's navy running",
          price: 8740,
          description: "A sleek and stylish navy blue running shoe designed for comfort and durability, perfect for both casual joggers and seasoned runners."
        }
      ]
    }, {
      'address': {
        'city': 'fwfwefewfewf',
        'state': 'fewfwfewfwefewfw',
        'street': 'fewfwfewfewfewew',
        'phone': '568446846846',
        'firstName': 'fwfwfwefw',
        'lastName': 'wswsqsqsqsfhht'
      },
      'amount': 7520,
      'payment': false,
      'paymentMethod': 'COD',
      'status': 'delivered',
      'iteams': [
        {
          id: "13",
          size: "6UK",
          quantity: 2,
          gender: "male",
          name: "men's navy running",
          price: 8740,
          description: "A sleek and stylish navy blue running shoe designed for comfort and durability, perfect for both casual joggers and seasoned runners."
        },
        {
          id: "13",
          size: "6UK",
          quantity: 2,
          gender: "male",
          name: "men's navy running",
          price: 8740,
          description: "A sleek and stylish navy blue running shoe designed for comfort and durability, perfect for both casual joggers and seasoned runners."
        }
      ]
    }, {
      'address': {
        'city': 'fwfwefewfewf',
        'state': 'fewfwfewfwefewfw',
        'street': 'fewfwfewfewfewew',
        'phone': '568446846846',
        'firstName': 'fwfwfwefw',
        'lastName': 'wswsqsqsqsfhht'
      },
      'amount': 7520,
      'payment': false,
      'paymentMethod': 'COD',
      'status': 'delivered',
      'iteams': [
        {
          id: "13",
          size: "6UK",
          quantity: 2,
          gender: "male",
          name: "men's navy running",
          price: 8740,
          description: "A sleek and stylish navy blue running shoe designed for comfort and durability, perfect for both casual joggers and seasoned runners."
        },
        {
          id: "13",
          size: "6UK",
          quantity: 2,
          gender: "male",
          name: "men's navy running",
          price: 8740,
          description: "A sleek and stylish navy blue running shoe designed for comfort and durability, perfect for both casual joggers and seasoned runners."
        }
      ]
    },
  ]


  return (
    <div className='order-main-container'>
      <div className="order-inner-container">
        <h2 className='orders-title'>
          <p></p>orders page<p></p>
        </h2>
        <div className="order-list">
          {orders.map((item, index) => (
            <div className="order-cont" key={index}>
              <div className="parcel-image">
                <img src={parcelIcon} alt="parcel icon" />
              </div>
              <div className="parcel-info">
                <div className="pro-details">
                  {item.iteams.map((it, ind) => (
                    <p className='iteam-name-info' key={ind}>
                      {it.proName} x {it.quantity} ({it.size})
                    </p>
                  ))}
                </div>
                <p className='customer-name'>{item.address.firstName} {item.address.lastName}</p>
                <div className="address-number">
                  <p className='street'>{item.address.street} , </p>
                  <p className='city-state'>{item.address.city} , {item.address.state}</p>
                  <p className='mobile-number'>{item.address.phone}</p>
                </div>
              </div>
              <div className="parcel-quantity">
                <p className='total-items'>Items : {item.iteams.length}</p>
                <div className="method-payment-date">
                  <p className='method'>Method : {item.paymentMethod}</p>
                  <p className='payment'>Payment : {item.payment ? "Done" : "Pending"}</p>
                  <p className='date'>Date : {item.createdAt.slice(0, 10)}</p>
                </div>
              </div>
              <div className="parcel-amount">
                <p className='total-amount'><FaIndianRupeeSign className='rupees' size={18} />{item.amount}</p>
              </div>
              <div className="parcel-status">
                <select onChange={(event) => changeStatus(event, item._id)} value={item.status}>
                  <option value="order placed">order placed</option>
                  <option value="packing">packing</option>
                  <option value="shipping">shipping</option>
                  <option value="out for delivery">out for delivery</option>
                  <option value="delivered">delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders
