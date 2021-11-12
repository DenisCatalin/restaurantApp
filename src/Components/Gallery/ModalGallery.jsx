import {useState, useEffect, useRef, useCallback} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useResize from '../../customStates/useResize'
import Cookie from 'js-cookie'
import Axios from 'axios'
import './modalgallery.css'

import image1 from '../../img/1.jpeg'
import image2 from '../../img/2.jpg'
import image3 from '../../img/3.jpg'
import image4 from '../../img/4.jpg'
import image5 from '../../img/5.jpg'
import image6 from '../../img/6.jpg'
import image7 from '../../img/7.jpg'
import image8 from '../../img/8.jpg'
import image9 from '../../img/9.jpg'
import image10 from '../../img/10.jpg'
import image11 from '../../img/11.png'
import GalleryComments from './GalleryComments'

const ModalGallery = () => {

    const history = useHistory();
    const { imageID } = useParams();
    const { height, width } = useResize();
    const idImage = useRef(parseInt(imageID));
    const [actualImage, setActualImage] = useState();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [totalComments, setTotalComments] = useState(0);
    const totalLikes = useRef(0);
    const commentInput = useRef(null);
    const [notification, setNotification] = useState('');
    const [notificationOn, setNotificationOn] = useState(false);
    const [notificationColor, setNotificationColor] = useState(false);
    const [photoLike, setPhotoLike] = useState(false);
    const [getLikes, setGetLikes] = useState([]);
    const [somethingChange, setSomethingChange] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [seeComments, setSeeComments] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);
    const getID = Cookie.get('_SecureAuth');

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    const closeModal = () => { history.push('/gallery'); }

    const styleSeeComments = { 
        display: seeComments ? 'flex' : 'none',
        background: darkmode ? 'rgb(48, 48, 48)' : '#828282'
    }
    const styleShowForWidth = { 
        display: toggleMenu ? 'none' : 'flex',
        background: darkmode ? 'rgb(48, 48, 48)' : '#828282'
    }

    if(loaded === false) {
        setTimeout(() => {
            setSomethingChange(!somethingChange);
            setLoaded(true);
        }, 100);
    }

    const getPhotoLikes = useCallback((arg) => {
        if(getLikes[arg] > 0) setPhotoLike(true);
        else setPhotoLike(false);
    }, [getLikes]);

    useEffect(() => {
        if(width > 1400) setToggleMenu(false);
        else setToggleMenu(true);
    }, [height, width]);

    useEffect(() => {
        getImage(idImage.current);
        getPhotoLikes(idImage.current);

        Axios.get(`http://localhost:3001/viewgallery/${idImage.current}`)
        .then(response => {
            if(response.data.message === undefined) {
                setComments(response.data);
                setTotalComments(response.data.length);
            } else {
                setComments([]);
                setTotalComments(0);
            }    
        }).catch(err => console.log(err));

        Axios.get(`http://localhost:3001/getphotolikes/${idImage.current}`)
        .then(response => {
            totalLikes.current = response.data.Likes;
        }).catch(err => console.log(err));

        Axios.get(`http://localhost:3001/getuserlikes/${getID}`)
        .then(response => {
            let array = response.data.split("|").map(Number);
            setGetLikes(array);
        }).catch(err => console.log(err));
    }, [somethingChange, getID]);
    
    const increaseImageID = () => {
        idImage.current = idImage.current + 1;
        if(idImage.current > 10) idImage.current = 0;
        getImage(idImage.current);
        history.push(`/viewgallery/${idImage.current}`);
        setSomethingChange(!somethingChange);
    }

    const decreaseImageID = () => {
        idImage.current = idImage.current - 1;
        if(idImage.current < 0) idImage.current = 10;
        getImage(idImage.current);
        history.push(`/viewgallery/${idImage.current}`);
        setSomethingChange(!somethingChange);
    }

    function getImage(img) {
        switch(img) {
            case 0: {
                setActualImage(image1);
                break;
            }
            case 1: {
                setActualImage(image2);
                break;
            }
            case 2: {
                setActualImage(image3);
                break;
            }
            case 3: {
                setActualImage(image4);
                break;
            }
            case 4: {
                setActualImage(image5);
                break;
            }
            case 5: {
                setActualImage(image6);
                break;
            }
            case 6: {
                setActualImage(image7);
                break;
            }
            case 7: {
                setActualImage(image8);
                break;
            }
            case 8: {
                setActualImage(image9);
                break;
            }
            case 9: {
                setActualImage(image10);
                break;
            }
            case 10: {
                setActualImage(image11);
                break;
            }
            default: {
                idImage.current = 0;
                break;
            }
        }
    }

    const sendComment = () => {
        setComment('');
        if(comment.length < 4) {
            showNotification(`You cannot post a comment that has less than 5 characters. Try to add some content by pressing the 'Comment' button.`);
            setNotificationColor(false);
            return;
        }
        setNotificationColor(true);
        Axios.post(`http://localhost:3001/viewgallery/${idImage.current}`, { authorization: getID, comment: comment })
        .then(response => {
            setSomethingChange(!somethingChange);
            showNotification(response.data.message);
        })
        .catch(err => console.log(err));
    }

    const showNotification = (content) => {
        setNotification(content);
        setNotificationOn(true);
        setTimeout(() => {
            setNotificationOn(false);
        }, 5000);
    }

    const focusCommentInput = () => { commentInput.current.focus(); }

    const likePhoto = () => {
        setPhotoLike(!photoLike);
        if(photoLike === true) {
            totalLikes.current = totalLikes.current - 1;
            Axios.post(`http://localhost:3001/decreaseLike/${idImage.current}`, {authorization:getID})
            .then(response => { console.log(response.data.message); })
            .catch(err => console.log(err));
        } else {
            totalLikes.current = totalLikes.current + 1;
            Axios.post(`http://localhost:3001/increaseLike/${idImage.current}`, {authorization:getID})
            .then(response => { console.log(response.data.message); })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className="modal-gallery" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <div className="m-g-n" style={{left: notificationOn ? '2%' : '-50%', background: notificationColor ? '#6ec25d' : '#c25d5d'}}>
                <div className="mgn-content">
                    <h3>{notification}</h3>
                </div>
            </div>
            <div className="modal-gallery-header" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <button className='modal-gallery-close' style={{color: darkmode ? '#fff' : '#000'}} onClick={closeModal}>X</button>
            </div>
            <div className="gallery-modal-content" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <div className="image-content" style={{display: seeComments ? 'none' : 'flex', background: darkmode ? '#252525' : '#EEEEEE'}}>
                    <button className="prev-gallery-image" style={{color: darkmode ? '#fff' : '#000'}} onClick={decreaseImageID}> <i className="fas fa-chevron-circle-left"></i></button>
                    <div className="modal-image-container">
                        <img src={actualImage} alt="" className='modal-image-img' />
                    </div>
                    <button className="next-gallery-image" style={{color: darkmode ? '#fff' : '#000'}} onClick={increaseImageID}><i className="fas fa-chevron-circle-right"></i></button>
                </div>
                <button className="seeTheComments" style={{transform: seeComments ? 'translateY(-30%)' : 'translateY(-20%)', display: toggleMenu ? 'initial' : 'none'}} onClick={() => setSeeComments(!seeComments)}>{seeComments ? 'TO THE PHOTO' : 'TO THE COMMENT SECTION'}</button>
                <div className="gallery-modal-comments-container" style={toggleMenu ? styleSeeComments : styleShowForWidth}>
                    <div className="gallery-modal-profile">
                        <div className="gallery-modal-profile-image"></div>
                        <div className="gallery-modal-profile-details">
                            <h3>Our restaurant</h3>
                            <h4>19th Jul 2019</h4>
                        </div>
                    </div>
                    <div className="modal-gallery-tools">
                        <button 
                        className={photoLike ? 
                        'modal-gallery-tools-like liked'
                        :
                        'modal-gallery-tools-like'} 
                        onClick={likePhoto}
                        >
                            <i 
                            className={photoLike ? 
                            'fas fa-thumbs-up marginRight'
                            :
                            'far fa-thumbs-up marginRight'
                            }>
                            </i>Like ({totalLikes.current})
                        </button>
                        <button className="modal-gallery-tools-comment" onClick={focusCommentInput}>
                            <i className="fas fa-comment-alt marginRight"></i>Comment ({totalComments})
                        </button>
                    </div>
                    <div className="gallery-modal-comment-content" style={{background: darkmode ? '#252525' : '#AAA'}}>
                        {comments.map((comment, id) => (
                            <GalleryComments key={id} name={comment.Username} date={comment.Date} text={comment.Comment}/>
                        ))}
                    </div>
                    <div className="modal-gallery-input" style={{background: darkmode ? '#252525' : '#AAA'}}>
                        <input 
                            ref={commentInput} 
                            type="text" 
                            className='input-gallery-modal-post' 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)} 
                            onKeyPress={event => {
                                if(event.key === 'Enter') sendComment();
                            }}
                            placeholder='Type your comment here...' 
                            style={{background: darkmode ? '#252525' : '#AAA'}}
                        />
                        <button className="post-comment-gallery" style={{background: darkmode ? '#252525' : '#AAA'}} onClick={sendComment}><i className="fas fa-paper-plane" style={{textShadow: darkmode ? '' : '2px 2px #000'}}></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalGallery
