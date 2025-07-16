import React, { useEffect, useState } from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import './new_arrival.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { backEndUrl } from '../../App';
import { toast } from 'react-toastify';

function NewArrival() {

    const [new_arrival, setNewArrival] = useState([])

    useEffect(() => {
        const fetchNewArrival = async () => {
            try {
                const response = await axios.get(`${backEndUrl}/api/product/listproduct`)
                if (response.data.success) {
                    const arr = response.data.productData.filter((iteam) => iteam.newArrival === true)
                    setNewArrival(arr);
                }
                else {
                    toast.error(response.data.error)
                }
            } catch (error) {
                console.log("error in fetching new arrival", error.response.data.message)
                toast.error(error.response.data.message)
            }
        }
        fetchNewArrival();
    }, [])
    return (
        <div>
            <div className='arrival' id='new_arrivals'>
                <div className='new_arrival'>
                    <h2>new arrivals</h2>
                </div>
                <div className="iteam_list">
                    {new_arrival.map((iteam) => (
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
        </div>
    )
}

export default NewArrival
