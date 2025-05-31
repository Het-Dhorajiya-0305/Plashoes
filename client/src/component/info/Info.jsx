import React from 'react'
import './info.css'
import recylce1 from '../../assets/recycle.jpg'
import recylce2 from '../../assets/recycle2.svg'
import vegan from '../../assets/vegan.svg'
import handmade from '../../assets/handmade.svg'


function Info() {
    return (
        <div className='info'>
            <div className="info-content">
                <p>Eu eget felis erat mauris aliquam mattis lacus, arcu leo aliquam sapien pulvinar laoreet vulputate sem aliquet phasellus egestas felis, est, vulputate morbi massa mauris vestibulum dui odio.</p>
                <div className="info-logo">
                    <img src={vegan} alt="not found" />
                    <img src={recylce2} alt="not found" />
                    <img src={handmade} alt="not found" />
                </div>
            </div>
            <div className="recycle">
                <img src={recylce1} alt="not found" />
            </div>

        </div>
    )
}

export default Info
