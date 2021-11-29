import {useState, useEffect} from 'react'
import ProfileActivity from '../../Components/profile/activity-field/activity-field.component'
import ProfileBookings from '../../Components/profile/booking-field/booking-field.component'
import ProfileCard from '../../Components/profile/card-field/card-field.component'
import ChangePass from '../../Components/profile/change-pass-field/change-pass-field.component'
import ProfileDetails from '../../Components/profile/details-field/details-field.component'
import ProfileOrders from '../../Components/profile/order-field/order-field.component'
import {Link, useHistory} from 'react-router-dom'
import Axios from 'axios'
import Cookie from 'js-cookie'
import './profile.css'

const ProfilePage = () => {

    const history = useHistory();
    const [user, setUser] = useState({});
    const [logged, setLogged] = useState(false);
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    const getID = Cookie.get('_SecureAuth');

    const {Username, Rank, Address, FullName, Phone, Email, RegisterDate, TotalOrders, TotalBookings, photoLikes, TotalComments} = user;

    useEffect(() => {
        Axios.get(`http://localhost:3001/getUsername/${getID}`)
        .then(response => {
            if(response.data.message === 'Found') {
                setLogged(true);
                setUser(response.data.user);
            } else {
                setLogged(false);
                history.push('/login');
            }    
        }).catch(err => console.log(err));
    }, [getID, history]);

    return (
        <div className='profile-page' style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <div className="back-to-home"><Link to='/' className="fas fa-arrow-left" style={{color: darkmode ? '#FFF' : '#000'}}></Link></div>
            {logged
            ?
            <div className="profile-grid" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <ProfileCard name={Username} rank={Rank} address={Address}/>
                <ProfileDetails fullname={FullName} phone={Phone} mail={Email} address={Address} registeredAt={RegisterDate} />
                <ProfileOrders />
                <ProfileBookings />
                <ProfileActivity likes={photoLikes} orders={TotalOrders} bookings={TotalBookings} comments={TotalComments}/>
                <ChangePass />
            </div>
            :
            ''}
        </div>
    )
}

export default ProfilePage
