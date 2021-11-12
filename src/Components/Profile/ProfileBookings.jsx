import {useState, useEffect} from 'react'
import Cookie from 'js-cookie'
import Axios from 'axios'
import BookingItem from './BookingItem'

const ProfileBookings = () => {
    const [user, setUser] = useState({});
    const [userBookings, setUserBookings] = useState([]);
    const [logged, setLogged] = useState(false);

    const getID = Cookie.get('_SecureAuth');

    const { Username } = user;

    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/getUsername/${getID}`)
        .then(response => {
            if(response.data.message === 'Found') {
                setLogged(true);
                setUser(response.data.user);
            } else setLogged(false);
        })
        .catch(err => console.log(err));
    }, [getID]);

    useEffect(() => {
        if(logged === true) {
            Axios.get(`http://localhost:3001/getUserBookings/${Username}`)
            .then(response => {
                setUserBookings(response.data);
            })
            .catch(err => console.log(err));
        }
    }, [logged, Username])
    return (
        <div className='profile-bookings' style={{background: darkmode ? '#171717' : '#AAA'}}>
            <h3 className="grid-title" style={{color: darkmode ? '#FF9900' : '#222'}}>YOUR BOOKINGS SO FAR</h3>
            <div className="bookings-field">
                {userBookings.map((item, i) => (
                    <BookingItem 
                        key={i}
                        tables={item.bookingTables}
                        seats={item.bookingSeats}
                        date={item.bookingDate}
                        status={item.bookingStatus}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProfileBookings
