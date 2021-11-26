import React, {useState} from 'react'
import { useHistory } from 'react-router'
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { ConfirmationBox, ConfirmationContainer } from './confirmation.styles'

const ConfirmationPage = () => {
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
        <ConfirmationContainer>
            <ConfirmationBox style={{alignItems: content ? 'center' : 'flex-start'}}>
                <h1 style={{display: content ? 'initial' : 'none', color: 'white'}}>No validation needed</h1>
                <h1 style={{display: content ? 'none' : 'initial', color: 'white'}}>Hello there,</h1>
                <div style={{display: content ? 'none' : 'initial', color: 'white'}}>
                    <h2>Your confirmation #{userID} has been succesfully validated. You will have a full acces to your account on this platform from now on. He hope that you will be satisfied with all our services and if you ever have any problems or questions, feel free to write us an email in the <Link to='/contact' className='confirmation-link'>Contact Us</Link> page.</h2>
                    <h2>We look forward to be hearing from you!</h2>
                    <h2>You will be redirected to the landing page in few seconds...</h2>
                </div>
                <div style={{display: content ? 'none' : 'initial', color: 'white'}}>
                    <h3>Best wishes,</h3>
                    <h3>Food Application Team.</h3> 
                </div>
            </ConfirmationBox>
        </ConfirmationContainer>
    )
}

export default ConfirmationPage
