import {useState, useEffect} from 'react'

const ChangePass = () => {
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);
    return (
        <div className='profile-change-pass' style={{background: darkmode ? '#171717' : '#AAA'}}>
            <h3 className="grid-title smaller" style={{color: darkmode ? '#FF9900' : '#222'}}>CHANGE YOUR PASSWORD</h3>
            <input type="text" className='change-pass-input' style={{background: darkmode ? '#252525' : '#EEE'}} placeholder='Current password' />
            <input type="text" className='change-pass-input' style={{background: darkmode ? '#252525' : '#EEE'}} placeholder='New password' />
            <button className='change-pass-button'>CHANGE</button>
        </div>
    )
}

export default ChangePass
