import React from 'react'
import './review.css'
import { FaStar } from "react-icons/fa";
import women_image1 from '../../assets/women_image1.jpg'
import women_image2 from '../../assets/women_image2.jpeg'
import men_image from '../../assets/men_image.jpg'

function Review() {
    return (
        <div className='review-main_container'>
            <h1>Our Customers speak for us</h1>
            <div className="reviews">
                <div className="r1 rows">
                    <div className="stars">

                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                    </div>
                    <p>“Felis semper duis massa scelerisque ac amet porttitor ac tellus venenatis aliquam varius mauris integer”</p>
                    <div className="name_of_customer">
                        <img src={women_image1} alt="not found" width={50} height={50} />
                        lily martin
                    </div>
                </div>
                <div className="r2 rows">
                    <div className="stars">
                        <FaStar color='orange' />

                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                    </div>
                    <p>“Non malesuada fringilla non varius odio in id pellentesque aliquam volutpat sapien faucibus ”</p>
                    <div className="name_of_customer">
                        <img src={men_image} alt="not found" width={50} height={50} />

                        arden luis
                    </div>
                </div>
                <div className="r3 rows">
                    <div className="stars">
                        <FaStar color='orange' />

                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                        <FaStar color='orange' />
                    </div>
                    <p>“Tortor suspendisse tincidunt accumsan platea pellentesque hac.”</p>
                    <div className="name_of_customer">
                        <img src={women_image2} alt="not found" width={50} height={50} />

                        maria anna
                    </div>
                </div>
            </div>
            <div className="last_line">
                4.8 average rating from 1814 reviews
            </div>
        </div>
    )
}

export default Review
