import { Link } from 'react-router-dom'
import {useEffect, useState} from 'react'
import useResize from '../../customStates/useResize'
import Axios from 'axios'
import './contact.css'
// import ParticleBackground from '../../Particles/ParticleBackground'

const Contact = () => {

    const [compress, setCompress] = useState(false);
    const [message, setMessage] = useState('');
    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const { height, width } = useResize();
    const [iFrameHeight, setIFrameHeight] = useState(height);
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);
    const [notification, setNotification] = useState('');
    const [notificationOn, setNotificationOn] = useState(false);
    const [notificationColor, setNotificationColor] = useState(false);
    const [send, setSend] = useState(false);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    useEffect(() => {
        if(width > 1025) setIFrameHeight(height/1.45);
        else setIFrameHeight(height/5);

        if(width < 1700) setCompress(true);
        else setCompress(false);
    }, [height, width]);

    const showNotification = (content, color) => {
        setNotification(content);
        setNotificationOn(true);
        if(color === 'danger') setNotificationColor(false)
        else setNotificationColor(true);
        setTimeout(() => { setNotificationOn(false); setSend(false); }, 2000);
    }

    const sendMessage = () => {
        if(message === '' || formName === '' || formEmail === '') return showNotification('Please fill all the fields', 'danger');
        if(formName.length < 5) return showNotification('Please enter a real name.', 'danger');
        if(!formEmail.includes('@') || !formEmail.includes('.')) return showNotification('Please enter a valid e-mail address.', 'danger');
        if(message.length < 20) return showNotification('The message should be at least 20 characters long.', 'danger');
    
        setSend(true);

        Axios.post('http://localhost:3001/sendEmailFromContact', {name: formName, email: formEmail, message: message})
        .then(response => {
            if(response.data.notif === 'Sent') return showNotification('Your message has been sent.', 'succes');
            else return showNotification('Something went wrong', 'danger');
        }).catch(err => console.log(err));

        setFormEmail('');
        setFormName('');
        setMessage('');
    }

    return (
        <div className='contact-page' style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            {/* <ParticleBackground /> */}
            {height > 535
            ?
            <div className="background-contact" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <div className="m-g-n" style={{left: notificationOn ? '2%' : '-60%', background: notificationColor ? '#6ec25d' : '#c25d5d'}}>
                    <div className="mgn-content">
                        <h3>{notification}</h3>
                    </div>
                </div>
                <div className="contact-header" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                    <Link to='/' className="fas fa-arrow-left" style={{color: darkmode ? '#FFF' : '#000'}}></Link>
                </div>
                <div className="contact-container" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                    <div className="contact-form" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                        <div className="googlemaps" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                            <div className="map">
                                <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <iframe 
                                            width='100%'
                                            height={iFrameHeight} 
                                            id="gmap_canvas"
                                            src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            frameBorder="0" 
                                            scrolling="no" 
                                            marginHeight="0" 
                                            marginWidth="0" 
                                            style={{background: darkmode ? '#252525' : '#AAA'}}
                                            title='googlemaps'>
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-footer" style={{justifyContent: compress ? 'center' : 'space-between', flexDirection: compress ? 'column' : 'row', background: darkmode ? '#252525' : '#EEE'}}>
                                <div className="contact-text-space" style={{width: compress ? '100%' : '50%', background: darkmode ? '#171717' : '#DDD'}}>
                                    <i className="fas fa-envelope MyIcons"></i>
                                    <h3 className="text-contact-footer">ouremail@restaurant.com</h3>
                                </div>
                                <div className="contact-text-space" style={{width: compress ? '100%' : '50%', background: darkmode ? '#171717' : '#DDD'}}>
                                    <i className={compress ? "fas fa-phone-alt MyIcons" : "fas fa-phone-alt MyIcons iMargin"}></i>
                                    <h3 className="text-contact-footer">0777-777-777</h3>
                                </div>
                            </div>
                        </div>
                        <div className="form-contact" style={{background: darkmode ? '#171717' : '#AAA'}}>
                            <h3 className="contact-form-title">CONTACT FORM</h3>
                            <div className="contact-form-content">
                                <div className="contact-form-inputs">
                                    <input type="text" placeholder='Your name' className='input-contact' value={formName} onChange={(e) => setFormName(e.target.value)}/>
                                    <input type="text" placeholder='E-mail' className='input-contact' value={formEmail} onChange={(e) => setFormEmail(e.target.value)}/>
                                    <textarea name="message" id="" cols="30" rows="15" className='textarea-contact' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Your message...'></textarea>
                                </div>
                                <div className="contact-social-media">
                                    <div className="contact-social-start">
                                        <h3 style={{color: darkmode ? '' : '#FFF'}}>You can also reach us through</h3>
                                        <div className="social-media-contact-links">
                                            <i className="fab fa-facebook"></i>
                                            <i className="fab fa-google"></i>
                                            <i className="fab fa-instagram"></i>
                                        </div>
                                    </div>
                                    <button className="send-contact" onClick={sendMessage} style={{pointerEvents: send ? 'none' : 'all'}}>SEND</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="showMobileResize"><i className="fas fa-mobile-alt mobileContact"></i></div>
            }
        </div>
    )
}

export default Contact
