import {useState, useEffect} from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie'

const GalleryComments = ({name, date, text}) => {
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [logged, setLogged] = useState(false);
    const history = useHistory();
    const [comment, setComment] = useState(text);
    const [edit, setEdit] = useState(false);
    const [notification, setNotification] = useState('');
    const [notificationOn, setNotificationOn] = useState(false);
    const [notificationColor, setNotificationColor] = useState(false);

    const getID = Cookie.get('_SecureAuth');

    const showNotification = (content) => {
        setNotification(content);
        setNotificationOn(true);
        setTimeout(() => {
            setNotificationOn(false);
        }, 2000);
    }
    
    useEffect(() => {
        Axios.get(`http://localhost:3001/getUsername/${getID}`)
        .then(response => {
            if(response.data.message === 'Not Found') history.push('/login');
            if(name === response.data.user.Username) setLogged(true);
        }).catch(err => console.log(err));
    }, [getID, history, name]);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    const deleteComment = () => {
        Axios.post(`http://localhost:3001/deletecomment/${text}`)
        .then(response => {
            console.log(response.data.message);
        }).catch(err => console.log(err));
        window.location.reload();
    }

    const reportComment = () => {
        setNotificationColor(true);
        setEdit(false);
        setToggleEdit(false);
        Axios.post(`http://localhost:3001/reportcomment/${text}`)
        .then(response => {
            showNotification(response.data.message);
        }).catch(err => console.log(err));
    }

    return (
        <div className="gallery-modal-comment" style={{background: darkmode ? '#252525' : '#AAA'}} alt={date}>
            <div className="m-g-n" style={{left: notificationOn ? '2%' : '-60%', background: notificationColor ? '#6ec25d' : '#c25d5d', width: '50%', height: '100%', fontSize: '.8em'}}>
                <div className="mgn-content">
                    <h3>{notification}</h3>
                </div>
            </div>
            <div className="gallery-modal-comment-img"></div>
            {logged
            ?
            <div className="edit-comment" style={{display: toggleEdit ? 'flex' : 'none'}}>
                <button className="edit-comment-item" onClick={() => setEdit(!edit)}>Edit comment</button>
                <button className="edit-comment-item" onClick={deleteComment}>Delete comment</button>
            </div>
            :
            <div className="edit-comment" style={{display: toggleEdit ? 'flex' : 'none'}}>
                <button className="edit-comment-item" onClick={reportComment}>Report comment</button>
            </div>}
            <button className="mue" onClick={() => setToggleEdit(!toggleEdit)}><i className="fas fa-ellipsis-h"></i></button>
            <div className="gallery-modal-content-comment" style={{background: darkmode ? '#383838' : '#CCC'}}>
                <h2 style={{color: darkmode ? '#fff' : '#000'}}>{name}</h2>
                {
                edit
                ?
                <textarea 
                    className='edit-comment-field' 
                    style={{color: darkmode ? 'white' : 'black'}} 
                    name="" 
                    id="" 
                    cols="30" 
                    rows="10" 
                    onChange={(e) => setComment(e.target.value)} 
                    value={comment}
                    onKeyPress={e => {
                        if(e.key === 'Enter') {
                            setEdit(!edit);
                            Axios.post(`http://localhost:3001/editcomment/${text}`, {edit: comment})
                            .then(response => {
                                console.log(response.data.message);
                            }).catch(err => console.log(err));
                            window.location.reload();
                        }  
                    }}>
                </textarea>
                :
                <h3 style={{color: darkmode ? '#fff' : '#000'}}>{text}</h3>
                }
            </div>
        </div>
    )
}

export default GalleryComments
