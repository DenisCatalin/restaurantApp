import NavBar from './NavBar'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './toDarkMode.css'

const Home = () => {
    const [darkmode, setDarkmode] = useState(false);
    
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(false);  
        else setDarkmode(true);
    }, [darkmodeBool]);

    const darkmodeToggle = () => {
        setDarkmode(!darkmode);
        localStorage.setItem('darkmode', darkmode);
    }

    return (
        <div className='landing-page' >
            <div className="page">
                <NavBar/>
                <div className="main-container">
                    <div className="dark-mode-div">
                        <div className="darkmode-div">
                            <h3 style={{transform: darkmode ? 'translateX(50%)' : 'translateX(140%)', color: darkmode ? '#fff' : '#000'}}>{darkmode ? 'LIGHT' : 'DARK'}</h3>
                            <div className="forDarkMode" style={{left: darkmode ? '77.5%' : '44%'}}></div>
                            <input type="checkbox" className="darkmode-checkbox" style={{background: darkmode ? '#000000c7' : '#fff'}} id="gender" onClick={darkmodeToggle} />
                        </div>
                    </div>
                    <div className="center-landing-container">
                        <div className="text-section-landing">
                            <h3>WELCOME TO</h3>
                            <h1>THE NAME OF OUR RESTAURANT</h1>
                            <h2>THE FINEST RESTAURANT IN THE AREA</h2>
                        </div>
                        <div className="button-section-landing">
                            <button className="read-more-landing"><Link to='/about' className='unPisat'>READ MORE</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
