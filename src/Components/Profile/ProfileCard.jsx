import {useState, useEffect} from 'react'
import image4 from '../../img/profile.png'

const ProfileCard = ({name, rank, address}) => {
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    return (
        <div className='profile-card' style={{background: darkmode ? '#171717' : '#AAA'}}>
            <img src={image4} className='img-profile' alt="" />
            <h2 className="profile-username" style={{color: darkmode ? '#FFF' : '#222'}}>{name}</h2>
            <h3 className="profile-rank" style={{color: darkmode ? '#FFF' : '#222'}}>{rank}</h3>
            <h3 className="profile-address" style={{color: darkmode ? '#FFF' : '#222'}}>{address}</h3>
        </div>
    )
}

export default ProfileCard
