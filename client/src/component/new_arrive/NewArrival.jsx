import React, { useEffect, useState } from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import './new_arrival.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { backEndUrl } from '../../App';

function NewArrival() {

    const [new_arrival, setNewArrival] = useState([])

    useEffect(() => {
        const fetchNewArrival = async () => {
            try {
                const response = await axios.get(`${backEndUrl}/product/listproduct`)
                console.log(response)
                if (response.data.success) {
                    const arr = response.data.productData.filter((iteam) => iteam.newArrival === true)
                    console.log(arr)
                    setNewArrival(arr);
                }
                else {
                    alert("error in fetching new arrival")
                }
            } catch (error) {
                console.log("error in fetching new arrival", error.message)
                alert("error in fetching new arrival")
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
                            <NavLink to="/product/male/1">
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
