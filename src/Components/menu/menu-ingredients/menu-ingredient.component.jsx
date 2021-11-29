import React, { useState, useEffect } from 'react'
import './ingredient.css'

const Ingredient = ({ text, img }) => {
    const [isLoading, setIsLoading] = useState(false);
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 1000);
    }, [isLoading]);
    return (
        <div className="ingredient" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <div className="lds-ripple" style={{display: isLoading ? 'none' : 'initial'}}><div></div><div></div></div>
            <img src={img} alt={text} className="ingredient-image" style={{display: isLoading ? 'initial' : 'none'}}/>
            <h2 style={{color: darkmode ? '#fff' : '#000'}}>{text}</h2>
        </div>
    )
}

export default Ingredient