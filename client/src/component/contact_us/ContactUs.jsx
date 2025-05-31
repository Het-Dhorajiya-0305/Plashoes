import React from 'react'
import './contact_us.css';


function ContactUs() {
    return (
        <div className="contact-us-main-container">
            <div className="contact-us-inner-container">
                <h2 className='contact-us-title'>contact us</h2>
                <form action="" className='contact-us-form'>
                    <div className="full-name">
                        <div className="first-name input-container">
                            <label>First Name</label>
                            <input type="text" />
                        </div>
                        <div className="last-name input-container">
                            <label>Last Name</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="email-mobile-container">
                        <div className="email-container input-container">
                            <label >Email</label>
                            <input type="email" />
                        </div>
                        <div className="mobile-number input-container">
                            <label >Mobile Number</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="message input-container">
                        <label >Message</label>
                        <textarea name="" id="" cols="30" rows="6"></textarea>
                    </div>
                    <div className="send-btn">
                        <button type='submit'>Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactUs
