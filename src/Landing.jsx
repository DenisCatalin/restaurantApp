import React, {  } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './css/main.min.css'
import Home from './Home'
import Menu from './Menu'
import Modal from './Modal'

const Landing = () => {
    
    return (
        <Router>
            <Route exact path='/' component={Home}/>
            <Route exact path="/menu" component={Menu}/>
            <Route exact path="/modal/" component={Modal}/>
        </Router>
    )
}

export default Landing
