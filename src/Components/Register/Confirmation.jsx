import React, {useState} from 'react'
import { useHistory } from 'react-router'
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import './confirmation.css'

const Confirmation = () => {
    const history = useHistory();
    const [content, setContent] = useState(false);
    const { userID } = useParams();
    
    Axios.get(`http://localhost:3001/confirmEmail/${userID}`, {userEmailID: userID})
    .then((response) => {
        if(response.data.message === "No validation needed") setContent(true);
        else {
            setTimeout(() => {
                history.push('/');
            }, 10000);
        }
    })
    .catch(err => console.log(err));

    return (
        <div className='confirmation-container'>
            <div className="confirmation-box" style={{alignItems: content ? 'center' : 'flex-start'}}>
                <h1 style={{display: content ? 'initial' : 'none'}}>No validation needed</h1>
                <h1 style={{display: content ? 'none' : 'initial'}}>Hello there,</h1>
                <div className="h2-text" style={{display: content ? 'none' : 'initial'}}>
                    <h2>Your confirmation #{userID} has been succesfully validated. You will have a full acces to your account on this platform from now on. He hope that you will be satisfied with all our services and if you ever have any problems or questions, feel free to write us an email in the <Link to='/contact' className='confirmation-link'>Contact Us</Link> page.</h2>
                    <h2>We look forward to be hearing from you!</h2>
                    <h2>You will be redirected to the landing page in few seconds...</h2>
                </div>
                <div className="h3-text" style={{display: content ? 'none' : 'initial'}}>
                    <h3>Best wishes,</h3>
                    <h3>Food Application Team.</h3> 
                </div>
            </div>
        </div>
    )
}

export default Confirmation
