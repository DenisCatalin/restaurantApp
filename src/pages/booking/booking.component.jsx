import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios'
import Cookie from 'js-cookie'
import { useState, useEffect } from 'react';
import './booking.css'

const BookingPage = () => {

    let months = ["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ['Day', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

    const currentYear = new Date();
    const cYear = currentYear.getFullYear()
    let years = ['Year', cYear, cYear+1];

    const seatReserved = {
        background: '#646464',
        pointerEvents: 'none'
    }

    const history = useHistory();
    const [notification, setNotification] = useState('');
    const [notificationOn, setNotificationOn] = useState(false);
    const [notificationColor, setNotificationColor] = useState(false);
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [seatsNumber, setSeatsNumber] = useState('');
    const [tablesNumber, setTablesNumber] = useState(0);
    const [tablesToSelect, setTablesToSelect] = useState(0);
    const [Table1, setTable1] = useState({selected: false, reserved: false});
    const [Table2, setTable2] = useState({selected: false, reserved: false});
    const [Table3, setTable3] = useState({selected: false, reserved: false});
    const [Table4, setTable4] = useState({selected: false, reserved: false});
    const [Table5, setTable5] = useState({selected: false, reserved: false});
    const [Table6, setTable6] = useState({selected: false, reserved: false});
    const [Table7, setTable7] = useState({selected: false, reserved: false});
    const [Table8, setTable8] = useState({selected: false, reserved: false});
    const [Table9, setTable9] = useState({selected: false, reserved: false});
    const [Bookings, setBookings] = useState([]);
    const [user, setUser] = useState({});
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    const showNotification = (content, color) => {
        if(color === 0) setNotificationColor(false);
        else setNotificationColor(true);
        setNotification(content);
        setNotificationOn(true);
        setTimeout(() => { setNotificationOn(false); }, 10000);
    }

    const getID = Cookie.get('_SecureAuth');

    useEffect(() => {
        Axios.get(`http://localhost:3001/getUsername/${getID}`)
        .then(response => {
            if(response.data.message === 'Found') {
                setUser(response.data.user);
            } else {
                setUser({});
                history.push('/login');
            }    
        })
        .catch(err => console.log(err));
    }, [getID, history]);

    const { Username } = user;

    const sendReservation = () => {
        if(month === '' || day === '' || year === '' || month === 'Month' || day === 'Day' || year === 'Year') return showNotification('You will have to select a date for your reservation in order to select a table.', 0);
        if(tablesNumber === 0) return showNotification('You will have to complete the reservation form and select at least a table in order to complete the reservation.', 0);
        if(Bookings.length === 0) return showNotification('You will have to select the table(s) in order to complete your reservation.', 0);
        if(Bookings.length !== tablesToSelect) return showNotification('You should select as many tables as you chose in order to complete your order.', 0);

        const dateString = `${month}-${day}-${year}`;
        Axios.post(`http://localhost:3001/addTablesToBooking/${dateString}`, {tables: Bookings, name: Username, seats: seatsNumber})
        .then(response => {
            console.log(response.data.message);
            if(response.data.message === 'Complete') return showNotification('Your order has been succesfully processed. We have sent you the details via e-mail. Thank you!', 1);
            else return showNotification(`We're sorry! It seems like another person already booked a table that you selected. Refresh the page and if the issue persists, feel free to contact us.`, 0);
        })
        .catch(err => console.log(err));

        setTable1(prevState => ({ ...prevState, selected: false }));
        setTable2(prevState => ({ ...prevState, selected: false }));
        setTable3(prevState => ({ ...prevState, selected: false }));
        setTable4(prevState => ({ ...prevState, selected: false }));
        setTable5(prevState => ({ ...prevState, selected: false }));
        setTable6(prevState => ({ ...prevState, selected: false }));
        setTable7(prevState => ({ ...prevState, selected: false }));
        setTable8(prevState => ({ ...prevState, selected: false }));
        setTable9(prevState => ({ ...prevState, selected: false }));
        setBookings([]);
        setSeatsNumber('');
        setTimeout(() => { setYear(year);}, 100);
        setYear('year');
    }

    useEffect(() => {
        if(seatsNumber < 0) return showNotification('Try to add a number of tables that is greater than 0.', 0);
        if(seatsNumber > 36) return showNotification(`We're very sorry! This number of seats exceeds the limit of tables in our restaurant.`, 0);
        setTablesNumber(Math.round((seatsNumber)/4));
        setTablesToSelect(Math.round((seatsNumber)/4));
    }, [seatsNumber]);

    useEffect(() => {
        if(month !== '' && day !== '' && year !== '' && month !== 'Month' && day !== 'Day' && year !== 'Year') {
            const dateString = `${month}-${day}-${year}`;
            Axios.get(`http://localhost:3001/checkBookingDate/${dateString}`)
            .then(response => {
                const seats = response.data.SeatsTaken.split('|');
                if(seats[0] === '1') setTable1(prevState => ({ ...prevState, reserved: true }));
                else setTable1(prevState => ({ ...prevState, reserved: false }));
                if(seats[1] === '1') setTable2(prevState => ({ ...prevState, reserved: true }));
                else setTable2(prevState => ({ ...prevState, reserved: false }));
                if(seats[2] === '1') setTable3(prevState => ({ ...prevState, reserved: true }));
                else setTable3(prevState => ({ ...prevState, reserved: false }));
                if(seats[3] === '1') setTable4(prevState => ({ ...prevState, reserved: true }));
                else setTable4(prevState => ({ ...prevState, reserved: false }));
                if(seats[4] === '1') setTable5(prevState => ({ ...prevState, reserved: true }));
                else setTable5(prevState => ({ ...prevState, reserved: false }));
                if(seats[5] === '1') setTable6(prevState => ({ ...prevState, reserved: true }));
                else setTable6(prevState => ({ ...prevState, reserved: false }));
                if(seats[6] === '1') setTable7(prevState => ({ ...prevState, reserved: true }));
                else setTable7(prevState => ({ ...prevState, reserved: false }));
                if(seats[7] === '1') setTable8(prevState => ({ ...prevState, reserved: true }));
                else setTable8(prevState => ({ ...prevState, reserved: false }));
                if(seats[8] === '1') setTable9(prevState => ({ ...prevState, reserved: true }));
                else setTable9(prevState => ({ ...prevState, reserved: false }));
            })
            .catch(err => console.log(err));
        }
    }, [month, day, year]);

    function tableButton(e) {
        if(tablesNumber === 0) return showNotification('You will have to complete the reservation form and select at least a table in order to complete the reservation.', 0);
        if(month === '' || day === '' || year === '' || month === 'Month' || day === 'Day' || year === 'Year') return showNotification('You will have to select a date for your reservation in order to select a table.', 0);
        const id = e.target.id;

        switch(+id) {
            case 1: {
                if(!Table1.selected) {
                    if(Bookings.length > tablesToSelect-1) return showNotification('You cannot select any more tables since you already chose the number of seats.', 0);
                    addBookingTable(id); 
                    setTable1(prevState => ({ ...prevState, selected: true })); 
                } else {
                    removeBookingTable(id);
                    setTable1(prevState => ({ ...prevState, selected: false })); 
                } break;
            }
            case 2: {
                if(!Table2.selected) {
                    if(Bookings.length > tablesToSelect-1) return showNotification('You cannot select any more tables since you already chose the number of seats.', 0);
                    addBookingTable(id); 
                    setTable2(prevState => ({ ...prevState, selected: true })); 
                } else {
                    removeBookingTable(id);
                    setTable2(prevState => ({ ...prevState, selected: false })); 
                } break;
            }
            case 3: {
                if(!Table3.selected) {
                    if(Bookings.length > tablesToSelect-1) return showNotification('You cannot select any more tables since you already chose the number of seats.', 0);
                    addBookingTable(id); 
                    setTable3(prevState => ({ ...prevState, selected: true })); 
                } else {
                    removeBookingTable(id);
                    setTable3(prevState => ({ ...prevState, selected: false })); 
                } break;
            }
            case 4: {
                if(!Table4.selected) {
                    if(Bookings.length > tablesToSelect-1) return showNotification('You cannot select any more tables since you already chose the number of seats.', 0);
                    addBookingTable(id); 
                    setTable4(prevState => ({ ...prevState, selected: true })); 
                } else {
                    removeBookingTable(id);
                    setTable4(prevState => ({ ...prevState, selected: false })); 
                } break;
            }
            case 5: {
                if(!Table5.selected) {
                    if(Bookings.length > tablesToSelect-1) return showNotification('You cannot select any more tables since you already chose the number of seats.', 0);
                    addBookingTable(id); 
                    setTable5(prevState => ({ ...prevState, selected: true })); 
                } else {
                    removeBookingTable(id);
                    setTable5(prevState => ({ ...prevState, selected: false })); 
                } break;
            }
            case 6: {
                if(!Table6.selected) {
                    if(Bookings.length > tablesToSelect-1) return showNotification('You cannot select any more tables since you already chose the number of seats.', 0);
                    addBookingTable(id); 
                    setTable6(prevState => ({ ...prevState, selected: true })); 
                } else {
                    removeBookingTable(id);
                    setTable6(prevState => ({ ...prevState, selected: false })); 
                } break;
            }
            case 7: {
                if(!Table7.selected) {
                    if(Bookings.length > tablesToSelect-1) return showNotification('You cannot select any more tables since you already chose the number of seats.', 0);
                    addBookingTable(id); 
                    setTable7(prevState => ({ ...prevState, selected: true })); 
                } else {
                    removeBookingTable(id);
                    setTable7(prevState => ({ ...prevState, selected: false })); 
                } break;
            }
            case 8: {
                if(!Table8.selected) {
                    if(Bookings.length > tablesToSelect-1) return showNotification('You cannot select any more tables since you already chose the number of seats.', 0);
                    addBookingTable(id);
                    setTable8(prevState => ({ ...prevState, selected: true }));  
                } else {
                    removeBookingTable(id);
                    setTable8(prevState => ({ ...prevState, selected: false })); 
                } break;
            }
            case 9: {
                if(!Table9.selected) {
                    if(Bookings.length > tablesToSelect-1) return showNotification('You cannot select any more tables since you already chose the number of seats.', 0);
                    addBookingTable(id); 
                    setTable9(prevState => ({ ...prevState, selected: true })); 
                } else {
                    removeBookingTable(id);
                    setTable9(prevState => ({ ...prevState, selected: false })); 
                } break;
            }
            default: {
                console.log('Something didnt work well', id);
                break; 
            }
        }
    }

    const addBookingTable = (id) => {
        if(tablesNumber === 0) {
            showNotification('You will have to complete the reservation form in order to select a table.', 0); 
            setTable1(prevState => ({ ...prevState, selected: false }));
            setTable2(prevState => ({ ...prevState, selected: false }));
            setTable3(prevState => ({ ...prevState, selected: false }));
            setTable4(prevState => ({ ...prevState, selected: false }));
            setTable5(prevState => ({ ...prevState, selected: false }));
            setTable6(prevState => ({ ...prevState, selected: false }));
            setTable7(prevState => ({ ...prevState, selected: false }));
            setTable8(prevState => ({ ...prevState, selected: false }));
            setTable9(prevState => ({ ...prevState, selected: false }));
            return;
        }
        setBookings(oldArray => [...oldArray, id]);
    }

    const removeBookingTable = (id) => {
        const index = Bookings.indexOf(id);
        Bookings.splice(index, 1);
    }

    return (
        <div className='booking-page' style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <div className="m-g-n" style={{left: notificationOn ? '2%' : '-50%', background: notificationColor ? '#6ec25d' : '#c25d5d'}}>
                <div className="mgn-content">
                    <h3>{notification}</h3>
                </div>
            </div>
            <div className="booking-header" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <Link to='/' className="fas fa-arrow-left arrow-modal" style={{color: darkmode ? '#fff' : '#000'}}></Link>
            </div>
            <div className="booking-container">
                <div className="booking-scheme" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                    <div className="book-place">
                        <div className={Table1.selected ? 'select-table tableSelected' : 'select-table'} style={Table1.reserved ? seatReserved : {}} id='1' onClick={tableButton}><h1 className='select-table-text'>1</h1></div>
                        <div className={Table2.selected ? 'select-table tableSelected' : 'select-table'} style={Table2.reserved ? seatReserved : {}} id='2' onClick={tableButton}><h1 className='select-table-text'>2</h1></div>
                        <div className={Table3.selected ? 'select-table tableSelected' : 'select-table'} style={Table3.reserved ? seatReserved : {}} id='3' onClick={tableButton}><h1 className='select-table-text'>3</h1></div>
                        <div className={Table4.selected ? 'select-table tableSelected' : 'select-table'} style={Table4.reserved ? seatReserved : {}} id='4' onClick={tableButton}><h1 className='select-table-text'>4</h1></div>
                        <div className={Table5.selected ? 'select-table tableSelected' : 'select-table'} style={Table5.reserved ? seatReserved : {}} id='5' onClick={tableButton}><h1 className='select-table-text'>5</h1></div>
                        <div className={Table6.selected ? 'select-table tableSelected' : 'select-table'} style={Table6.reserved ? seatReserved : {}} id='6' onClick={tableButton}><h1 className='select-table-text'>6</h1></div>
                        <div className={Table7.selected ? 'select-table tableSelected' : 'select-table'} style={Table7.reserved ? seatReserved : {}} id='7' onClick={tableButton}><h1 className='select-table-text'>7</h1></div>
                        <div className={Table8.selected ? 'select-table tableSelected' : 'select-table'} style={Table8.reserved ? seatReserved : {}} id='8' onClick={tableButton}><h1 className='select-table-text rotateZ'>8</h1></div>
                        <div className={Table9.selected ? 'select-table tableSelected' : 'select-table'} style={Table9.reserved ? seatReserved : {}} id='9' onClick={tableButton}><h1 className='select-table-text rotateZ'>9</h1></div>
                    </div>
                    <div className="historyc" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                        <div className="seat-text" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                            <div className="taken"></div>
                            <h3 style={{color: darkmode ? '#FFF' : '#000'}}>Taken</h3>
                        </div>
                        <div className="seat-text" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                            <div className="available"></div>
                            <h3 style={{color: darkmode ? '#FFF' : '#000'}}>Available</h3>
                        </div>
                        <div className="seat-text" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                            <div className="selected"></div>
                            <h3 style={{color: darkmode ? '#FFF' : '#000'}}>Selected</h3>
                        </div>
                    </div>
                </div>
                <div className="booking-form" style={{background: darkmode ? '#171717' : '#AAA'}}>
                    <div className="booking-input-form formToColumn">
                        <h3 style={{color: darkmode ? '#FFF' : '#000'}}>Reservation date</h3>
                        <div className="booking-input-date">
                            <select className='month-booking' name="month" id="month" value={month} onChange={(e) => setMonth(e.target.value)}>{months.map((month, i) => { return <option value={month} key={i}>{month}</option> })}</select>
                            <select className='day-booking' name="day" id="day" value={day} onChange={(e) => setDay(e.target.value)}>{days.map((day, i) => { return <option value={day} key={i}>{day}</option> })}</select>
                            <select className='year-booking' name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)}>{years.map((year, i) => { return <option value={year} key={i}>{year}</option> })}</select>
                        </div>
                    </div>
                    <div className="booking-input-form">
                        <h3 style={{color: darkmode ? '#FFF' : '#000'}}>Number of seats</h3>
                        <input type="text" maxLength='2' className='booking-input' value={seatsNumber} onChange={(e) => setSeatsNumber(e.target.value)} />
                    </div>
                    <div className="booking-input-form">
                        <h3 style={{color: darkmode ? '#FFF' : '#000'}}>Number of tables</h3>
                        <input type="text" maxLength='2' style={{pointerEvents: 'none'}} readOnly value={tablesNumber} className='booking-input' />
                    </div>
                    <div className="booking-input-form">
                        <h3 style={{color: darkmode ? '#FFF' : '#000'}}>{tablesToSelect > 1 ? 'Selected tables' : 'Selected table'}</h3>
                        <input type="text" maxLength='2' style={{pointerEvents: 'none'}} readOnly value={Bookings} className='booking-input' />
                    </div>
                    <button className="booking-order" onClick={sendReservation}>ORDER</button>
                </div>
            </div>
        </div>
    )
}

export default BookingPage