import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import Axios from 'axios'
import './navbar.min.css'
import image4 from '../../img/profile.png'

const NavBar = () => {
    const [name, setName] = useState('');
    const [logged, setLogged] = useState(false);
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(true);

    const getID = Cookie.get('_SecureAuth');

    useEffect(() => {
        Axios.get(`http://localhost:3001/getUsername/${getID}`)
        .then(response => {
            if(response.data.message === 'Found') {
                setLogged(true);
                setName(response.data.user.Username);
            } else setLogged(false);
        })
        .catch(err => console.log(err));
    }, [getID]);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);  
        else setDarkmode(false);
    }, [darkmodeBool]);
    
    const clearLogin = () => {
        Cookie.remove('_SecureAuth', { path: '' });
        setLogged(false);
    }

    return (
        <div className='navbar' style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            {logged ? 
                <div className="navbar-profile-container">
                    <img src={image4} className="navbar-profile-pic" alt=''/>
                    <h2 className="navbar-profile-name" style={{color: darkmode ? '#fff' : '#000'}}>{name}</h2>
                    <button className="navbar-profile-btn" style={{background: darkmode ? 'rgba(224,224,224,.17)' : 'rgba(0,0,0,.5)'}}><Link to='/profile' style={{textDecoration: 'none', background: 'transparent', color: 'white'}}>PROFILE</Link></button>
                </div>
            :
                <div className="navbar-profile-container">
                <button className="navbar-profile-btn" style={{background: darkmode ? 'rgba(224,224,224,.17)' : 'rgba(0,0,0,.5)'}}><Link to='/login' className='login-link-text'>LOGIN</Link></button>
                </div>
            }
            <div className="navbar-links">
                <div className="angle-line" style={{background: darkmode ? 'rgba(138,138,138,.3)' : 'rgba(0,0,0,.3)'}}></div>
                <Link to='/menu' className="navbar-link" onClick={localStorage.removeItem('foodCategory')} style={{color: darkmode ? '#fff' : '#000'}}>Menu</Link>
                {logged
                ?
                <Link to='/gallery' className="navbar-link" style={{color: darkmode ? '#fff' : '#000'}}>Gallery</Link>
                :
                ''}
                <Link to='/schedule' className="navbar-link" style={{color: darkmode ? '#fff' : '#000'}}>Schedule</Link>
                {logged
                ?
                <Link to='/booking' className="navbar-link" style={{color: darkmode ? '#fff' : '#000'}}>Reservations</Link>
                :
                ''}
                <Link to='/contact' className="navbar-link" style={{color: darkmode ? '#fff' : '#000'}}>Contact Us</Link>
                <Link to='/about' className="navbar-link" style={{color: darkmode ? '#fff' : '#000'}}>About Us</Link>
                {logged
                ?
                <Link to='/' className="navbar-link" onClick={clearLogin} style={{color: darkmode ? '#fff' : '#000'}}>Logout</Link>
                :
                ''}
                <div className="angle-line" style={{background: darkmode ? 'rgba(138,138,138,.3)' : 'rgba(0,0,0,.3)'}}></div>
            </div>
            <div className="navbar-news">
                <h2 className="navbar-news-text" style={{color: darkmode ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.6)'}}>Opening hours may vary depending on events or season. You can acces the 'Schedule' section for further details.</h2>
                <div className="angle-line" style={{background: darkmode ? 'rgba(138,138,138,.3)' : 'rgba(0,0,0,.3)'}}></div>
            </div>
        </div>
    )
}

export default NavBar
