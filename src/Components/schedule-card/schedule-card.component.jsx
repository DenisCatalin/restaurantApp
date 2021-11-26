import {useState, useEffect} from 'react'
import { ScheduleCardImage, ScheduleDate, ScheduleDescription, ScheduleItem } from './schedule-card.styles';
import { OrangeUnderlined } from '../../pages/schedule/schedule.styles';

const ScheduleCard = ({ eventType, month, day, year, startHour, stopHour }) => {
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);
    
    return (
        <ScheduleItem style={{background: darkmode ? 'rgb(56, 56, 56)' : '#AAA'}}>
            <ScheduleCardImage></ScheduleCardImage>
            <h2 style={{color: darkmode ? '#FFF' : 'rgba(0, 0, 0, 0.7)', background: 'transparent'}}>{eventType}</h2>
            <ScheduleDate style={{color: darkmode ? '#FFF' : 'rgba(0, 0, 0, 1)'}}>Reservation for {month}/{day}/{year}</ScheduleDate>
            <ScheduleDescription style={{color: darkmode ? '#FFF' : 'rgba(0, 0, 0, 0.7)'}}>The event will start at <OrangeUnderlined style={{color: darkmode ? '' : 'rgb(255, 174, 0)'}}>{startHour}PM</OrangeUnderlined> and will last until <OrangeUnderlined style={{color: darkmode ? '' : 'rgb(255, 174, 0)'}}>{stopHour}AM</OrangeUnderlined></ScheduleDescription>
        </ScheduleItem>
    )
}

export default ScheduleCard
