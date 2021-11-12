// import ParticleBackground from '../../Particles/ParticleBackground'
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './register.css'

const Register = () => {
    const styleMessage = {
        color: '#ff9900',
        background: 'transparent',
        fontSize: '1em',
        textAlign: 'center',
        marginBottom: '1em'
    }

    let months = ["Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
    const history = useHistory();

    const [month, setMonth] = useState('');
    const [day, setDay] = useState(0);
    const [year, setYear] = useState(0);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [email, setEmail] = useState('');
    const [ip, setIP] = useState('');
    const [gender, setGender] = useState(false);

    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    useEffect(() => {
        (async function getDishes() {
            const res = await fetch(`https://api.db-ip.com/v2/free/self`);
            const data = await res.json();
            setIP(data.ipAddress);
        }());
    }, []);

    const showMessage = (str) => {
        setMessage(str);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    }

    const register = () => {
        const getTheYear = new Date();
        const validYear = getTheYear.getFullYear();

        if(year === 0 || day === 0 || month.length === 0 || username.length === 0 || password.length === 0 || cpassword.length === 0 || email.length === 0) return showMessage('You should fill all the fields provided in order to register.');
        if(year < 4 && year > 0) return showMessage('The year must be filled by 4 digits.');
        if(year < validYear-100 || year > validYear) return showMessage(`You can't enter a year which is lower than ${validYear-100} or greater that ${validYear}.`);
        if(day < 1 || day > 31) return showMessage('The day must be between 0 and 31.');
        if(!email.includes('@') || !email.includes('.') || !email.includes('com') || email.length < 10) return showMessage('Please provide a valid address of e-mail in order to register.');
        if(password !== cpassword) return showMessage(`The passwords you provided don't match. Try again.`);

        Axios.post("http://localhost:3001/register", {username: username, password: password, email: email, gender: gender, birthDay: day, birthMonth: month, birthYear: year, ipAddress: ip})
        .then((response) => {
            if(response.data.message === "This email already exists in our database! Choose another one.") { return showMessage(`${response.data.message}`); } 
            else { 
                setMessage("You have registered succesfully on our website! You will be redirected...");
                setTimeout(() => {
                    history.push('/login');
                }, 5000); 
            }
        });
    }

    return (
        <div className='register-page' style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <Link to='/' className="fas fa-arrow-left backToLanding"></Link>
            {/* <ParticleBackground /> */}
            <div className="register-container">
                <Link to='/' className="fas fa-arrow-left backToLanding" style={{color: darkmode ? '#fff' : '#252525'}}></Link>
                <div className="register-form" style={{background: darkmode ? '#171717e3' : '#858585'}}>
                    <div className="register-form-title">REGISTER FORM</div>
                    <div className="login-instead">
                        <h3>Already a member?</h3>
                        <Link to='/login' className='non-link'><button className="login-btn">LOGIN</button></Link>
                    </div>
                    <div className="register-form-inputs">
                        <div className="registerForm">
                            <input type="text" className='input-register' id='username' onChange={(e) => setUsername(e.target.value)} required='required'/>
                            <label htmlFor="username" className='label-input'>Username</label>
                        </div>
                        <div className="registerForm">
                            <input type="password" className='input-register' id='password' onChange={(e) => setPassword(e.target.value)} required='required'/>
                            <label htmlFor="password" className='label-input'>Passsword</label>
                        </div>
                        <div className="registerForm">
                            <input type="password" className='input-register' id='cpassword' onChange={(e) => setCPassword(e.target.value)} required='required'/>
                            <label htmlFor="cpassword" className='label-input'>Confirm password</label>
                        </div>
                        <div className="registerForm">
                            <input type="text" className='input-register' id='email' onChange={(e) => setEmail(e.target.value)} required='required'/>
                            <label htmlFor="email" className='label-input'>E-mail</label>
                        </div>
                    </div>
                    <div className="gender-register-form">
                        <h3 className='damnH3'>I am a</h3>
                        <div className="select-gender-register">
                            <h3 className='male-register'>Male</h3>
                            <input type="checkbox" className="input-checkbox" id="gender" value={gender} onChange={(e) => setGender(!gender)}/>
                            <h3 className='female-register'>Female</h3>
                        </div>
                    </div>
                    <div className="birthday-register-form">
                        <h3 className='damnH3'>I was born in</h3>
                        <div className="birthday-register-inputs">
                            <select className={month ? 'input-birthday-month input-register-filled' : 'input-birthday-month'} value={month} onChange={(e) => setMonth(e.target.value)}>{months.map((month, i) => { return <option value={month} key={i}>{month}</option> })}</select>
                            <input type="text" maxLength='2' onChange={(e) => setDay(e.target.value)} className={day ? 'input-birthday-day input-register-filled' : 'input-birthday-day'} placeholder='Day'/>
                            <input type="text" minLength='4' maxLength='4' onChange={(e) => setYear(e.target.value)} className={year ? 'input-birthday-year input-register-filled' : 'input-birthday-year'} placeholder='Year'/>
                        </div>
                    </div>
                    <h3 style={styleMessage}>{message}</h3>
                    <button className="register" onClick={register}>REGISTER</button>
                </div>
            </div>
        </div>
    )
}

export default Register
