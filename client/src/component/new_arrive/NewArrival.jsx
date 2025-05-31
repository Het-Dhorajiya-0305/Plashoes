import React from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import './new_arrival.css'
import shoes7 from '../../assets/shoes7.jpg'
import shoes8 from '../../assets/shoes8.jpg'
import shoes9 from '../../assets/shoes9.jpg'
import shoes10 from '../../assets/shoes10.jpg'
import shoes11 from '../../assets/shoes11.jpg'
import shoes4 from '../../assets/shoes4.jpg'
import shoes13 from '../../assets/shoes13.jpg'
import shoes14 from '../../assets/shoes14.jpg'
import shoes3 from '../../assets/shoes3.jpg'
import { NavLink } from 'react-router-dom';

function NewArrival() {
    return (
        <div>
            <div className='arrival' id='new_arrivals'>
                <div className='new_arrival'>
                    <h2>new arrivals</h2>
                </div>
                <div className="iteam_list">
                    <div className="iteam1 iteam">
                        <NavLink to="/product/male/1">
                            <img src={shoes7} alt="" />
                        </NavLink>
                        <h2>Men’s Navy Running</h2>
                        <div className="price">

                            <span>
                                <FaIndianRupeeSign className='rupees' />

                                8740</span>
                        </div>
                    </div>
                    <div className="iteam2 iteam">
                        <NavLink to="/product/male/2">
                            <img src={shoes8} alt="" />
                        </NavLink>
                        <h2>Men’s Green Running</h2>
                        <div className="price">

                            <span>
                                <FaIndianRupeeSign className='rupees' />

                                7480</span>
                        </div>
                    </div>
                    <div className="iteam3 iteam">
                        <NavLink to="/product/female/11">
                            <img src={shoes9}></img>
                        </NavLink>
                        <span className='view_detail'>view detail</span>
                        <h2>Women’s Tan Sneaker
                        </h2>
                        <div className="price">

                            <span>
                                <FaIndianRupeeSign className='rupees' />

                                6720</span>
                        </div>
                    </div>
                    <div className="iteam4 iteam">
                        <NavLink to="/product/female/6">
                            <img src={shoes10} alt="" />
                        </NavLink>
                        <h2>Women’s Mint Sneaker
                        </h2>
                        <div className="price">

                            <span>
                                <FaIndianRupeeSign className='rupees' />

                                7478</span>
                        </div>
                    </div>
                    <div className="iteam5 iteam">
                        <NavLink to="/product/female/8">
                            <img src={shoes11} alt="" />
                        </NavLink>
                        <h2>Women’s Peach Training</h2>
                        <div className="price">

                            <span>
                                <FaIndianRupeeSign className='rupees' />

                                4789</span>
                        </div>
                    </div>
                    <div className="iteam6 iteam">
                        <NavLink to="/product/female/1">
                            <img src={shoes4} alt="" />
                        </NavLink>
                        <h2>Women’s Blue Training</h2>
                        <div className="price">

                            <span>
                                <FaIndianRupeeSign className='rupees' />

                                5041</span>
                        </div>
                    </div>
                    <div className="iteam7 iteam">
                        <NavLink to="/product/male/6">
                            <img src={shoes13} alt="" />
                        </NavLink>
                        <h2>Men’s Earth-Tone Sneaker
                        </h2>
                        <div className="price">

                            <span>
                                <FaIndianRupeeSign className='rupees' />

                                6218</span>
                        </div>
                    </div>
                    <div className="iteam8 iteam">
                        <NavLink to="/product/male/7">
                            <img src={shoes14} alt="" />
                        </NavLink>
                        <h2>Men’s Moonstone Sneaker</h2>
                        <div className="price">

                            <span>
                                <FaIndianRupeeSign className='rupees' />

                                6218</span>
                        </div>
                    </div>
                    <div className="iteam9 iteam">
                        <NavLink to="/product/female/2">
                            <img src={shoes3} alt="" />
                        </NavLink>
                        <h2>Women’s Candy City Run</h2>
                        <div className="price">

                            <span>
                                <FaIndianRupeeSign className='rupees' />

                                3350</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrival
