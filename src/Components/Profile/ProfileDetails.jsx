import {useState, useEffect} from 'react'

const ProfileDetails = ({fullname, phone, mail, address, registeredAt}) => {
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);
    return (
        <div className='profile-details' style={{background: darkmode ? '#171717' : '#AAA'}}>
            <h3 className="grid-title" style={{color: darkmode ? '#FF9900' : '#222'}}>YOUR DETAILS</h3>
            <div className="profile-detail">
                <div className="detail-profile"><h3 className="profile-detail-require" style={{color: darkmode ? '#FFF' : '#222'}}>Full name</h3></div>
                <div className="detail-profile"><h3 className="profile-detail-result" style={{color: darkmode ? '#FFF' : '#222'}}>{fullname}</h3></div>
                <i className="fas fa-edit marginLeftEdit" style={{color: darkmode ? '#FFF' : '#222'}}></i>
            </div>
            <div className="profile-detail">
                <div className="detail-profile"><h3 className="profile-detail-require" style={{color: darkmode ? '#FFF' : '#222'}}>Phone</h3></div>
                <div className="detail-profile"><h3 className="profile-detail-result" style={{color: darkmode ? '#FFF' : '#222'}}>{phone}</h3></div>
                <i className="fas fa-edit marginLeftEdit" style={{color: darkmode ? '#FFF' : '#222'}}></i>
            </div>
            <div className="profile-detail">
                <div className="detail-profile"><h3 className="profile-detail-require" style={{color: darkmode ? '#FFF' : '#222'}}>E-mail</h3></div>
                <div className="detail-profile"><h3 className="profile-detail-result" style={{color: darkmode ? '#FFF' : '#222'}}>{mail}</h3></div>
                <i className="fas fa-edit marginLeftEdit" style={{color: darkmode ? '#FFF' : '#222'}}></i>
            </div>
            <div className="profile-detail">
                <div className="detail-profile"><h3 className="profile-detail-require" style={{color: darkmode ? '#FFF' : '#222'}}>Address</h3></div>
                <div className="detail-profile"><h3 className="profile-detail-result" style={{color: darkmode ? '#FFF' : '#222'}}>{address}</h3></div>
                <i className="fas fa-edit marginLeftEdit" style={{color: darkmode ? '#FFF' : '#222'}}></i>
            </div>
            <div className="profile-detail">
                <div className="detail-profile"><h3 className="profile-detail-require" style={{color: darkmode ? '#FFF' : '#222'}}>Member since</h3></div>
                <div className="detail-profile"><h3 className="profile-detail-result" style={{color: darkmode ? '#FFF' : '#222'}}>{registeredAt}</h3></div>
                <i className="fas fa-edit marginLeftEdit" style={{color: darkmode ? '#FFF' : '#222'}}></i>
            </div>
        </div>
    )
}

export default ProfileDetails
