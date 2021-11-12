import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './main.min.css'
import Home from './Components/Others/Home'
import Menu from './Components/Menu/Menu'
import Modal from './Components/Menu/Modal'
import Gallery from './Components/Gallery/Gallery'
import Schedule from './Components/Schedule/Schedule'
import Contact from './Components/Contact/Contact'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import About from './Components/About/About'
import Booking from './Components/Booking/Booking'
import Confirmation from './Components/Register/Confirmation'
import ModalGallery from './Components/Gallery/ModalGallery'
import ForgotPass from './Components/ForgotPassword/ForgotPass'
import ResetPass from './Components/ForgotPassword/ResetPass'
import Profile from './Components/Profile/Profile'
import Cart from './Components/Cart/Cart'


const Landing = () => {
    
    return (
        <Router>
            <Route exact path='/' component={Home} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/about" component={About} />
            <Route path="/confirmation/:userID" component={Confirmation} />
            <Route exact path="/forgotpassword" component={ForgotPass} />
            <Route path="/resetpassword/:name" component={ResetPass} />
            <Route path="/menu" component={Menu} />
            <Route path="/modal/:mealID" component={Modal} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/booking" component={Booking} />
            <Route path="/viewgallery/:imageID" component={ModalGallery} />
            <Route path="/profile" component={Profile} />
            <Route path="/cart" component={Cart}/>
        </Router>
    )
}

export default Landing