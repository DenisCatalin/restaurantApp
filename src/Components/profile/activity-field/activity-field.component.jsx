import {useState, useEffect} from 'react'

const ProfileActivity = ({likes, comments, orders, bookings}) => {
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    let totalLikes = [];
    let likesTotal = 0;

    if(likes !== undefined) {
        totalLikes = likes.split('|');
        totalLikes.forEach(item => { if(item > 0) likesTotal++; });
    }

    return (
        <div className='profile-activity' style={{background: darkmode ? '#171717' : '#AAA'}}>
            <h3 className="grid-title" style={{color: darkmode ? '#FF9900' : '#222'}}>YOUR ACTIVITY</h3>
            <div className="activity-fields">
            <div className="activity-field">
                    <div className="field-activity"><h3 className="activity-require" style={{color: darkmode ? '#FFF' : '#222'}}>Likes</h3></div>
                    <div className="field-activity"><h3 className="activity-result" style={{color: darkmode ? '#FFF' : '#222'}}>{likesTotal}</h3></div>
                </div>
                <div className="activity-field">
                    <div className="field-activity"><h3 className="activity-require" style={{color: darkmode ? '#FFF' : '#222'}}>Comments</h3></div>
                    <div className="field-activity"><h3 className="activity-result" style={{color: darkmode ? '#FFF' : '#222'}}>{comments}</h3></div>
                </div>
                <div className="activity-field">
                    <div className="field-activity"><h3 className="activity-require" style={{color: darkmode ? '#FFF' : '#222'}}>Online Orders</h3></div>
                    <div className="field-activity"><h3 className="activity-result" style={{color: darkmode ? '#FFF' : '#222'}}>{orders}</h3></div>
                </div>
                <div className="activity-field">
                    <div className="field-activity"><h3 className="activity-require" style={{color: darkmode ? '#FFF' : '#222'}}>Online Bookings</h3></div>
                    <div className="field-activity"><h3 className="activity-result" style={{color: darkmode ? '#FFF' : '#222'}}>{bookings}</h3></div>
                </div>
            </div>
        </div>
    )
}

export default ProfileActivity
