import {useState, useEffect} from 'react'
import Cookie from 'js-cookie'
import Axios from 'axios'
import OrderItem from './order-item/order-item.component'

const ProfileOrders = () => {
    const [user, setUser] = useState({});
    const [userOrders, setUserOrders] = useState([]);
    const [logged, setLogged] = useState(false);

    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    const getID = Cookie.get('_SecureAuth');

    const { Username } = user;

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
                setUserOrders(response.data);
            })
            .catch(err => console.log(err));
        }
    }, [logged, Username])
    return (
        <div className='profile-orders' style={{background: darkmode ? '#171717' : '#AAA'}}>
            <h3 className="grid-title" style={{color: darkmode ? '#FF9900' : '#222'}}>YOUR ORDERS SO FAR</h3>
            {userOrders.map((_item, i) => (
                <OrderItem 
                    key={i}
                />
            ))}
        </div>
    )
}

export default ProfileOrders
