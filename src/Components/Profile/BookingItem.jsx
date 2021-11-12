import {useState, useEffect} from 'react'

const BookingItem = ({tables, seats, date, status}) => {
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);
    return (
        <div className="booking-field">
            <h3 className="booking-content" style={{color: darkmode ? '#FFF' : '#222'}}>Tables [{tables}] for {seats} seats</h3>
            <h3 className="booking-date" style={{color: darkmode ? '#FFF' : '#222'}}>{date}</h3>
            <div className="booking-status b-active">ACTIVE</div>
        </div>
    )
}

export default BookingItem
