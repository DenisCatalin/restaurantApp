import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './main.min.css'
import Home from './Components/home/home.component'
import MenuPage from './pages/menu/menu.component'
import Modal from './Components/menu/menu-modal/menu-modal.component'
import GalleryPage from './pages/gallery/gallery.component'
import SchedulePage from './pages/schedule/schedule.component'
import ContactPage from './pages/contact/contact.component'
import RegisterPage from './pages/register/register.component'
import Login from './pages/login/login.component'
import AboutPage from './pages/about/about.component'
import BookingPage from './pages/booking/booking.component'
import ConfirmationPage from './pages/confirmation/confirmation.component'
import ModalGallery from './Components/gallery/gallery-modal/gallery-modal.component'
import ForgotPass from './pages/forgot-password/forgot-password.component'
import ResetPass from './pages/reset-password/reset-password.component'
import ProfilePage from './pages/profile/profile-component'
import CartPage from './pages/cart/cart.component'

// more reusable components, switch to styled-components in the whole app, split the app into smaller components that it is now

const Landing = () => {
    return (
        <Router>
            <Route exact path='/' component={Home} />
            <Route exact path="/schedule" component={SchedulePage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route path="/confirmation/:userID" component={ConfirmationPage} />
            <Route exact path="/forgotpassword" component={ForgotPass} />
            <Route path="/resetpassword/:name" component={ResetPass} />
            <Route path="/menu" component={MenuPage} />
            <Route path="/modal/:mealID" component={Modal} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/gallery" component={GalleryPage} />
            <Route exact path="/booking" component={BookingPage} />
            <Route path="/viewgallery/:imageID" component={ModalGallery} />
            <Route path="/profile" component={ProfilePage} />
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