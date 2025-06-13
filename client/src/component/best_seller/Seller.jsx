import React, { useEffect, useState } from 'react'
import './seller.css'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { backEndUrl } from '../../App.jsx';


function Seller() {
    const [best_seller, setBestSeller] = useState([]);

    useEffect(() => {
        const fetchBestSeller = async () => {
            try {
                const response = await axios.get(`${backEndUrl}/product/listproduct`);
                console.log(response)
                if (response.data.success) {
                    const arr = response.data.productData.filter((iteam) => iteam.bestSeller === true);
                    console.log(arr)
                    setBestSeller(arr)
                }
                else {
                    alert("error in fetching best seller products", response.data.message)
                }

            }
            catch (error) {
                alert("error in fetching best seller products", error.message)
            }
        }
        fetchBestSeller();
    }, [])

    return (
        <div className='seller'>
            <div className='best_seller'>
                <h2>our best seller</h2>
            </div>
            <div className="iteam_list">
                {best_seller.map((iteam) => (
                    <div className="iteam1 iteam" key={iteam._id}>
                        <NavLink to={`/product/${iteam._id}`}>
                            <img src={iteam.proImg} alt="" />
                        </NavLink>
                        <h2>{iteam.proName}</h2>
                        <div className="price">
                            <span>
                                <FaIndianRupeeSign className='rupees' />
                                {iteam.proPrice}</span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Seller
