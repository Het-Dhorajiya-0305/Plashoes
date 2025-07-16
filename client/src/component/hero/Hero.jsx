import React from 'react'
import './hero.css';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className='home' id='hero'>
            <div className="text_con">
                <h1>Love the Planet we walk on</h1>
                <p>Bibendum fermentum, aenean donec pretium aliquam blandit tempor imperdiet arcu arcu ut nunc in dictum mauris at ut.</p>
                <div className="shopping">
                    <Link to='/men' className='link'>shop men</Link>
                    <Link to='/women' className='link'>shop women</Link>
                </div>
            </div>
        </div>
    )
}

export default Hero
