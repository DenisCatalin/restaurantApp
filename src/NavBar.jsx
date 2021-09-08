import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/navbar.min.css'
import image4 from './img/profile.png'

const NavBar = () => {
    const [logged] = useState(true);

    return (
        <div className='navbar' >
            {logged ? 
                <div className="navbar-profile-container">
                    <img src={image4} className="navbar-profile-pic" alt=''/>
                    <h2 className="navbar-profile-name">John Doe</h2>
                    <button className="navbar-profile-btn">Profile</button> 
                </div>
            :
                <div className="navbar-profile-container">
                    <button className="navbar-profile-btn">LOGIN</button> 
                </div>
            }
            <div className="navbar-links">
                <div className="angle-line"></div>
                <Link to='/menu' className="navbar-link" onClick={localStorage.removeItem('foodCategory')}>Menu</Link>
                <Link to='/' className="navbar-link">Gallery</Link>
                <Link to='/' className="navbar-link">Schedule</Link>
                <Link to='/' className="navbar-link">Reservations</Link>
                <Link to='/' className="navbar-link">Contact Us</Link>
                <Link to='/' className="navbar-link">About Us</Link>
                <div className="angle-line"></div>
            </div>
            <div className="navbar-news">
                <h2 className="navbar-news-text">Opening hours may vary depending on events or season. You can acces the 'Schedule' section for further details.</h2>
                <div className="angle-line"></div>
            </div>
        </div>
    )
}

export default NavBar
