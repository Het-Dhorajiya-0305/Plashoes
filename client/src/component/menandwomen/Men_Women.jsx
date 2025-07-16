import React from 'react'
import './men_women.css'
import { Link } from 'react-router-dom'


function Men_Women() {
    return (
        <div className='container'>
            <div className="men_iteam">
                <div className="center_data">
                    <h2>men</h2>
                    <Link to='/men' className='shop-btn'>shop Men</Link>
                </div>
            </div>
            <div className="women_iteam">
                <div className="center_data">

                    <h2>women</h2>
                    <Link to='/women' className='shop-btn'>shop women</Link>
                </div>
            </div>
        </div>
    )
}

export default Men_Women
