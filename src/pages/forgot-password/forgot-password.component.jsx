import { useState, useEffect } from 'react'
import Axios from 'axios'
import { ForgotButton, ForgotContainer, ForgotContent, ForgotDescription, ForgotFormInput, ForgotFormTitle, ForgotFormWrapper, ForgotInput, ForgotLabel, ForgotMessage, ForgotSend } from './forgot-password.styles'
import PageHeader from '../../Components/page-header/page-header.component'

const ForgotPass = () => {
    // const history = useHistory();
    const [email, setEmail] = useState('');
    const [notificationOn, setNotificationOn] = useState(false);
    const [notification, setNotification] = useState('');
    const [message, setMessage] = useState('');
    const [send, setSend] = useState(false);
    const [verified, setVerified] = useState(false);
    const [ip, setIP] = useState('');
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    useEffect(() => {
        (async function () {
            const res = await fetch(`https://api.db-ip.com/v2/free/self`);
            const data = await res.json();
            setIP(data.ipAddress);
        }());
    }, []);

    const showNotification = (content) => {
        setNotification(content);
        setNotificationOn(true);
        setTimeout(() => { setNotificationOn(false); }, 6000);
    }
    const recoverPassword = () => {
        if(email === '') return showNotification('You need to fill the input box with your e-mail in order to recover your password.');
        if(email.length < 5 || !email.includes('@') || !email.includes('.')) return showNotification('Please enter a valid e-mail address.');
        Axios.post(`http://localhost:3001/recoverPassword/${email}`, {protocol: ip})
        .then(response => {
            if(response.data.message === 'Found') {
                setSend(true);
                setVerified(true);
                localStorage.setItem('recoveryID', response.data.row);
                setMessage(`An e-mail has been sent to ${email} and in that e-mail are provided the steps that you should follow to recover your password. If you have any other issues or questions, feel free to contact us.`);
            } else {
                setSend(true);
                setVerified(false);
                setMessage('The e-mail address has not been found in our database. Check the email address again for any mistakes that could occur.');
            }
        })
        .catch(err => console.log(err));
        setVerified(true);
    }

    const clickInput = () => { setSend(false); }

    return (
        <ForgotContainer style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <div className="m-g-n" style={{left: notificationOn ? '2%' : '-50%', background: '#c25d5d'}}>
                <div className="mgn-content">
                    <h3>{notification}</h3>
                </div>
            </div>
            <ForgotContent style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <PageHeader path={'/login'}/>
                <ForgotFormWrapper style={{background: darkmode ? '#171717' : '#AAA'}}>
                    <ForgotFormTitle>PASSWORD FORGOTTEN</ForgotFormTitle>
                    <ForgotDescription style={{background: darkmode ? '#252525' : '#CCC'}}>
                        <h4 style={{color: darkmode ? '#FFF' : '#000'}}>If you forgot your password, you will have to enter your e-mail that corresponds with your lost account. After that, an e-mail will be sent to you for further details in order to recover your password.</h4>
                    </ForgotDescription>
                    <ForgotFormInput>
                        <ForgotInput type="text" id='email'  onClick={clickInput} onChange={(e) => setEmail(e.target.value)} required='required'/>
                        <ForgotLabel htmlFor="email">E-mail</ForgotLabel>
                    </ForgotFormInput>
                    <ForgotMessage style={{opacity: send ? '1' : '0', zIndex: send ? '11' : '-1', background: verified ? '#549957' : '#ad4646', color: verified ? 'rgb(6, 46, 6)' : 'rgb(46, 6, 6)'}}>
                        <h4>{message}</h4>
                    </ForgotMessage>
                    <ForgotButton>
                        <ForgotSend style={{opacity: send ? '0' : '1'}} onClick={recoverPassword}>SEND</ForgotSend>
                    </ForgotButton>
                </ForgotFormWrapper>
            </ForgotContent>
        </ForgotContainer>
    )
}

export default ForgotPass
