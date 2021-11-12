import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'
import Axios from 'axios'
import './schedule.css'
import ScheduleCard from "./ScheduleCard"

const Schedule = () => {
    const [month, setMonth] = useState('Select month');
    const [schedules, setSchedules] = useState([]);
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    useEffect(() => {
        Axios.get('http://localhost:3001/schedule')
        .then(response => { setSchedules(response.data); })
        .catch(err => console.log(err));
    }, []);

    const getMonth = (e) => {
        setMonth(e.target.textContent);
        Axios.get(`http://localhost:3001/schedule/${e.target.id}`)
        .then(response => { setSchedules(response.data); })
        .catch(err => console.log(err));
    }

    return (
        <div className='schedule-page' style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <div className="schedule-header" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <Link to='/' className="fas fa-arrow-left arrow-modal" style={{color: darkmode ? '#fff' : '#000'}}></Link>
                <h3 className="schedule-update" style={{color: darkmode ? '#fff' : '#000'}}>Autumn <span className="important">UPDATE</span>: Opening hours for our restaurant will be at <span className="important">10AM</span> everyday and the closing hour is <span className="important">1AM</span></h3>
                <div className="dropdown-menu">
                    <div className="comments-dropdown">
                        <div className="comments-dropdown-select" style={{background: darkmode ? '#FFF' : '#252525'}}>
                            <span className="dropdown-select" style={{color: darkmode ? '#000' : '#FFF'}}>{month}</span>
                            <i className="fa fa-caret-down" style={{color: darkmode ? '#252525' : '#EEEEEE'}}></i>
                        </div>
                        <div className="comments-dropdown-list" style={{background: darkmode ? '#EEEEEE' : '#252525'}}>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='1' onClick={getMonth}>January</div>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='2' onClick={getMonth}>February</div>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='3' onClick={getMonth}>March</div>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='4' onClick={getMonth}>April</div>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='5' onClick={getMonth}>May</div>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='6' onClick={getMonth}>June</div>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='7' onClick={getMonth}>July</div>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='8' onClick={getMonth}>August</div>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='9' onClick={getMonth}>September</div>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='10' onClick={getMonth}>October</div>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='11' onClick={getMonth}>November</div>
                            <div className="comments-dropdown-items" style={{color: darkmode ? '#252525' : '#EEEEEE'}} id='12' onClick={getMonth}>December</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="schedule-container" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <h1 className='schedule-page-title' style={{color: darkmode ? '#FFF' : '#000'}}>UPCOMING <span className="important">EVENTS</span> AT OUR RESTAURANT</h1>
                <div className="schedule-cards" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                {schedules.map((schedule, id) => (
                    <ScheduleCard 
                        key={id}
                        eventType={schedule.EventType}
                        month={schedule.EventMonth}
                        day={schedule.EventDay}
                        year={schedule.EventYear}
                        startHour={schedule.EventStartHour}
                        stopHour={schedule.EventStopHour}
                    />
                ))}
                </div>
            </div>
        </div>
    )
}

export default Schedule
