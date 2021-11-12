import './schedule.css'
import {useState, useEffect} from 'react'

const ScheduleCard = ({ eventType, month, day, year, startHour, stopHour }) => {
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);
    return (
        <div className='schedule-card' style={{background: darkmode ? 'rgb(56, 56, 56)' : '#AAA'}}>
            <div className="schedule-card-image"></div>
            <h2 className="schedule-title" style={{color: darkmode ? '#FFF' : 'rgba(0, 0, 0, 0.7)'}}>{eventType}</h2>
            <h3 className="schedule-date" style={{color: darkmode ? '#FFF' : 'rgba(0, 0, 0, 1)'}}>Reservation for {month}/{day}/{year}</h3>
            <div className="schedule-description" style={{color: darkmode ? '#FFF' : 'rgba(0, 0, 0, 0.7)'}}>The event will start at <span className="important" style={{color: darkmode ? '' : 'rgb(255, 174, 0)'}}>{startHour}PM</span> and will last until <span className="important" style={{color: darkmode ? '' : 'rgb(255, 174, 0)'}}>{stopHour}AM</span></div>
        </div>
    )
}

export default ScheduleCard
