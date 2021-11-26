import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './main.min.css'
import Home from './Components/Others/Home'
import Menu from './Components/Menu/Menu'
import Modal from './Components/Menu/Modal'
import Gallery from './Components/Gallery/Gallery'
import SchedulePage from './pages/schedule/schedule.component'
import Contact from './pages/contact/Contact'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import About from './pages/about/About'
import Booking from './pages/booking/Booking'
import ConfirmationPage from './pages/confirmation/confirmation.component'
import ModalGallery from './Components/Gallery/ModalGallery'
import ForgotPass from './pages/forgot-password/forgot-password.component'
import ResetPass from './pages/reset-password/reset-password.component'
import Profile from './Components/Profile/Profile'
import CartPage from './pages/cart/cart.component'

// more reusable components, switch to styled-components in the whole app, split the app into smaller components that it is now

const Landing = () => {
    
    return (
        <Router>
            <Route exact path='/' component={Home} />
            <Route exact path="/schedule" component={SchedulePage} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/about" component={About} />
            <Route path="/confirmation/:userID" component={ConfirmationPage} />
            <Route exact path="/forgotpassword" component={ForgotPass} />
            <Route path="/resetpassword/:name" component={ResetPass} />
            <Route path="/menu" component={Menu} />
            <Route path="/modal/:mealID" component={Modal} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/booking" component={Booking} />
            <Route path="/viewgallery/:imageID" component={ModalGallery} />
            <Route path="/profile" component={Profile} />
            <Route path="/cart" component={CartPage}/>
        </Router>
    )
}

export default Landing


/*
    Resolutions to consider:

    1533x722
    1366x1024
    1300x800
    1280x670
    1024x768
    550x720
    411x823
    360x640
*/