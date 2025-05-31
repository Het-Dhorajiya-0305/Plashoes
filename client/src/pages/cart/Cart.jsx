import React, { useState } from 'react'
import defaultarray from '../../component/Defaultarray';
import './cart.css'
import { FaRupeeSign } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState(defaultarray("male"));

  function increamentOrder(index) {
    setCartItems((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreamentOrder(index) {
    setCartItems((prevCart) =>
      prevCart.map((item, i) =>
        i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  }

  let total = 0;
  cartItems.map((iteam) => {
    total += iteam.price * iteam.quantity;
  })

  function deleteIteam() {
    console.log("iteam deleted");
  }

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
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((arr, index) => (
                  <tr className='height-more' key={arr.id}>
                    <td className='empty-con'>
                      <MdDelete onClick={deleteIteam} className='delete-btn' />
                      <img className="img-fluid" src={arr.loc} alt={arr.name} />
                    </td>
                    <td className='black'>{arr.name}</td>
                    <td className='light-grey rupee'><FaRupeeSign />{arr.price}</td>
                    <td>
                      <div className="increament-btn">
                        <div className="minus" onClick={() => decreamentOrder(index)}>-</div>
                        <div className="orders-count">{arr.quantity}</div>
                        <div className="plus" onClick={() => increamentOrder(index)}>+</div>
                      </div>
                    </td>
                    <td className='light-grey rupee'><FaRupeeSign />{arr.price * arr.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {cartItems.map((arr, index) => (
              <div className="cart-iteam">
                <div className="delete">
                  <MdDelete onClick={deleteIteam} className='delete-btn' />
                </div>
                <div className="image-container">
                  <img className="img-fluid" src={arr.loc} alt={arr.name} />
                </div>
                <div className="common-div">
                  <span className='product-title'>product :</span>
                  <span className='product-data name'>{arr.name}</span>
                </div>
                <div className="common-div">
                  <span className='product-title'>price :</span>
                  <span className='product-data'><FaRupeeSign />{arr.price}</span>
                </div>
                <div className="common-div">
                  <span className='product-title'>quantity</span>
                  <span className='incre'>
                    <div className="increament-btn">
                      <div className="minus" onClick={() => decreamentOrder(index)}>-</div>
                      <div className="orders-count">{arr.quantity}</div>
                      <div className="plus" onClick={() => increamentOrder(index)}>+</div>
                    </div>
                  </span>
                </div>
                <div className="common-div">
                  <span className='product-title'>subtotal</span>
                  <span className='product-data'><FaRupeeSign />{arr.price * arr.quantity}</span>
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
                <span className='rupee'><FaRupeeSign />{total * 0.18}</span>
              </div>
              <div className="total">
                <span>total</span>
                <span className='rupee'><FaRupeeSign />{total + (total * 0.18)}</span>
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
