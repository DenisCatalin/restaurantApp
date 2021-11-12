import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Cookie from 'js-cookie'
import Axios from 'axios'
import './login.css'

const Login = () => {
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    const styleMessage = {
        color: '#ff9900',
        background: 'transparent',
        fontSize: '1em',
        textAlign: 'center',
        marginBottom: '1em'
    }

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false);
    const [ip, setIP] = useState('');

    useEffect(() => {
        (async function getDishes() {
            const res = await fetch(`https://api.db-ip.com/v2/free/self`);
            const data = await res.json();
            setIP(data.ipAddress);
        }());
    }, []);

    const pendingStyle = {
        opacity: pending ? '.7' : '',
        pointerEvents: pending ? 'none' : 'all',
        boxShadow: pending ? 'inset 2px 2px 2px 2px rgba(0, 0, 0, 0.7)' : ''
    }

    const showMessage = (str) => {
        setMessage(str);
        setTimeout(() => { setMessage(''); }, 3000);
    }

    const login = () => {
        setPending(true);
        const inThirtyMinutes = new Date().getTime() + 30 * 60 * 1000;
        const dateThirty = new Date(new Date().getTime() + 30 * 60 * 1000);
        Axios.post("http://localhost:3001/login", {password: password, email: email, date: inThirtyMinutes, protocol: ip})
        .then((response) => {
            setPending(false);
            if(response.data.message !== 'Logged') return showMessage(`${response.data.message}`);
            else {
                const { token } = response.data;
                Cookie.set('_SecureAuth', token, { expires: dateThirty, secure: true });
                history.push('/');
            }
        });
    }

    return (
        <div className='login-page' style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <div className="login-container">
                <Link to='/' className="fas fa-arrow-left backToLanding" style={{color: darkmode ? '#fff' : '#252525'}}></Link>
                <div className="login-form" style={{background: darkmode ? '#171717e3' : '#858585'}}>
                    <div className="login-form-title">LOGIN FORM</div>
                    <div className="register-instead">
                        <h3>Don't have an account??</h3>
                        <Link to='/register' className='non-link'><button className="register-btn">REGISTER</button></Link>
                    </div>
                    <div className="login-form-inputs">
                        <div className="loginForm">
                            <input 
                            type="text" 
                            className='input-login' 
                            id='email' 
                            onChange={(e) => setEmail(e.target.value)} 
                            required='required'
                            onKeyPress={event => {
                                if(event.key === 'Enter') login();
                            }}
                            />
                            <label htmlFor="email" className='label-login'>E-mail</label>
                        </div>
                        <div className="loginForm">
                            <input 
                            type="password"
                            className='input-login'
                            id='password'
                            onChange={(e) => setPassword(e.target.value)}
                            required='required'
                            onKeyPress={event => {
                                if(event.key === 'Enter') login();
                            }}
                            />
                            <label htmlFor="password" className='label-login'>Passsword</label>
                        </div>
                        <Link to='/forgotpassword' className="forgotPass">Forgot password?</Link>
                    </div>
                    <div className="gender-login-form">
                        <h3>Or login with:</h3>
                        <i className="fab fa-facebook altIcon"></i>
                        <i className="fab fa-google altIcon"></i>
                        <i className="fab fa-instagram altIcon"></i>
                    </div>
                    <h3 style={styleMessage}>{message}</h3>
                    <button className="login" style={pendingStyle} onClick={login}>LOGIN</button>
                </div>
            </div>
        </div>
    )
}

export default Login
