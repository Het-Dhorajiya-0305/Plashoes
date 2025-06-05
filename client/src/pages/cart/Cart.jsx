import React, { useContext, useEffect, useState } from 'react'
import './cart.css'
import { FaRupeeSign } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

function Cart() {
  const { cartIteam, increamentOrder, decreamentOrder, deleteIteam } = useContext(StoreContext)

  const [cartData, setCartData] = useState(cartIteam);

  let total = 0;
  useEffect(() => {
    setCartData(cartIteam);

  }, [cartIteam])

  cartData.map((iteam) => {
    total += iteam.price * iteam.quantity;
  })

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
                      <MdDelete onClick={() => deleteIteam(arr)} className='delete-btn' />
                      <img className="img-fluid" src={arr.loc} alt={arr.name} />
                    </td>
                    <td className='black'>{arr.name}</td>
                    <td className='light-grey rupee'><FaRupeeSign />{arr.price}</td>
                    <td>
                      <div className="increament-btn">
                        <div className="minus" onClick={() => decreamentOrder(arr)}>-</div>
                        <div className="orders-count">{arr.quantity}</div>
                        <div className="plus" onClick={() => increamentOrder(arr)}>+</div>
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
                      <div className="minus" onClick={() => decreamentOrder(arr)}>-</div>
                      <div className="orders-count">{arr.quantity}</div>
                      <div className="plus" onClick={() => increamentOrder(arr)}>+</div>
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
