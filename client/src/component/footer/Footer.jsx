import React from 'react'
import './footer.css'
import { FaLock } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';




function Footer() {
    return (
        <div className='footer-main-container'>
            <div className='footer'>
                <div className='title_footer'>
                    Better for People & the Planet
                </div>
                <div className='content_data'>Ut eget at et aliquam sit quis nisl, pharetra et ac pharetra est dictum in vulputate</div>
                <div className="button">
                    <Link to='/men' className='shopping_button'>shop men</Link>
                    <Link to='/women' className='shopping_button'>shop women</Link>
                </div>
            </div>
            <div className="process">
                <div className="secure_payment">
                    <FaLock size={22} className='process-icon' />
                    <h3>

                        secure payment
                    </h3>
                </div>
                <div className="express_shipping">
                    <FaTruck size={22} className='process-icon' />
                    <h3>

                        Express Shipping
                    </h3>
                </div>
                <div className="free_return">
                    <FaSyncAlt size={25} className='process-icon' />
                    <h3>

                        Free Return
                    </h3>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='main_box'>
                    <div className="plashoe_content">
                        <h3>plashoe</h3>
                        <p>Praesent eget tortor sit risus egestas nulla pharetra ornare quis bibendum est bibendum sapien proin nascetur</p>

                    </div>
                    <div className="all_detail">
                        <div className="shop">
                            <h3>shop</h3>
                            <li><Link to='/men' className='link'>shop men</Link></li>
                            <li><Link to='/women' className='link'>shop women</Link></li>
                            <li><Link className='link'>lookbook</Link></li>
                            <li><Link className='link'>sale</Link></li>
                        </div>
                        <div className="need_help">
                            <h3>need help?</h3>
                            <li><a href="#" className='link'>FAQs</a></li>
                            <li><a href="#" className='link'>size chart</a></li>
                            <li><Link to='/contactus' className='link'>contact us</Link></li>
                            <li><a href="#" className='link'>shipping & returns</a></li>
                        </div>
                    </div>
                </div>
                <div className="icons">
                    <a href="#" className='icon' target='blank'>
                        <FaInstagram size={23} />
                    </a>
                    <a href="#" className='icon' target='blank'>
                        <FaFacebook size={23} />
                    </a>
                    <a href="#" className='icon' target='blank'>
                        <FaTwitter size={23} />
                    </a>

                </div>
            </div>
        </div>
    )
}

export default Footer
