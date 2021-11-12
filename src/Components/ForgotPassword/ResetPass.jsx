import {useState, useEffect} from 'react'
import Axios from 'axios';
import {useParams, useHistory} from 'react-router-dom'
import './forgotpass.css'

const ResetPass = () => {
    const [showContent, setShowContent] = useState(false);
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [notificationColor, setNotificationColor] = useState(false);
    const [notificationOn, setNotificationOn] = useState(false);
    const [notification, setNotification] = useState('');
    const [reset, setReset] = useState(false);
    const { name } = useParams();

    const history = useHistory();
    const recoveryID = localStorage.getItem('recoveryID');

    const pendingStyle = {
        opacity: reset ? '.7' : '',
        pointerEvents: reset ? 'none' : 'all',
        boxShadow: reset ? 'inset 2px 2px 2px 2px rgba(0, 0, 0, 0.7)' : ''
    }

    useEffect(() => {
        if(recoveryID !== null) setShowContent(true);
        else setShowContent(false);
    }, [recoveryID]);

    const resetPassword = () => {
        if(password !== cpassword) return showNotification(`We're sorry. The process has been canceled because the passwords that you provided does not match.`, false);
        setReset(true);
        Axios.post(`http://localhost:3001/resetpassword/${name}`, {pass: password, recovery: recoveryID})
        .then(response => {
            console.log(response.data.message);
            if(response.data.message === 'Found') {
                localStorage.removeItem('recoveryID');
                showNotification('Your password has been succesfully restored! You may login now and feel free to do the things that you did before. If you have any other issues or questions, do not hesitate to contact us. You will be redirected...', true);
                setTimeout(() => {
                    history.push('/login');
                }, 10000);
            } else {
                showNotification(`Something went wrong and we couldn't restore your password. Please try again and if the problem persists, feel free to contact us.`);
            }
        })
        .catch(err => {
            console.log(err);
            setReset(false);
        });
    }

    const showNotification = (content, color) => {
        if(color) setNotificationColor(true)
        else setNotificationColor(false);
        setNotification(content);
        setNotificationOn(true);
        setTimeout(() => { setNotificationOn(false); }, 10000);
    }

    return (
        <div className='reset-page' style={{display: showContent ? 'flex' : 'none'}}>
            <div className="m-g-n" style={{left: notificationOn ? '2%' : '-50%', background: notificationColor ? '#6ec25d' : '#c25d5d'}}>
                <div className="mgn-content">
                    <h3>{notification}</h3>
                </div>
            </div>
            <div className="reset-container">
                <div className="reset-form">
                    <div className="reset-form-title">RESET YOUR PASSWORD</div>
                    <div className="reset-form-input">
                        <input type="password" className="reset-input" onChange={(e) => setPassword(e.target.value)} id='password'/>
                        <label htmlFor="password" className='reset-label'>New Password</label>
                    </div>
                    <div className="reset-form-input">
                        <input type="password" className="reset-input" onChange={(e) => setCPassword(e.target.value)} id='cpassword'/>
                        <label htmlFor="cpassword" className='reset-label'>Confirm Password</label>
                    </div>
                    <div className="reset-button">
                        <button className="reset" style={pendingStyle} onClick={resetPassword}>RESET</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPass
