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
import './gallery.css'
import Cookie from 'js-cookie'
import Axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Gallery = () => {

    const history = useHistory();

    const [modalOn, setModalOn] = useState(false);
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    const getID = Cookie.get('_SecureAuth');

    useEffect(() => {
        Axios.get(`http://localhost:3001/getUsername/${getID}`)
        .then(response => {
            if(response.data.message === 'Not Found') history.push('/login');
        })
        .catch(err => console.log(err));
    }, [getID, history]);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    const toggleModal = (e) => {
        setModalOn(!modalOn);
        history.push(`/viewgallery/${e.target.id}`);
    }

    return (
        <div className="gallery-container" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <div className="gallery-header" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <Link to='/' className="fas fa-arrow-left arrow-modal" style={{color: darkmode ? '#fff' : '#000'}}></Link>
            </div>
            <div className="gallery-content" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <div className="photo-container">
                    <div className="photo-hover"><button className="see-image" id='0' onClick={toggleModal}><i className="fas fa-eye"></i></button></div>
                    <img src={image1} alt="" className='photo' />
                </div>
                <div className="photo-container">
                    <div className="photo-hover"><button className="see-image" id='1' onClick={toggleModal}><i className="fas fa-eye"></i></button></div>
                    <img src={image2} alt="" className='photo' />
                </div>
                <div className="photo-container">
                    <div className="photo-hover"><button className="see-image" id='2' onClick={toggleModal}><i className="fas fa-eye"></i></button></div>
                    <img src={image3} alt="" className='photo' />
                </div>
                <div className="photo-container">
                    <div className="photo-hover"><button className="see-image" id='3' onClick={toggleModal}><i className="fas fa-eye"></i></button></div>
                    <img src={image4} alt="" className='photo' />
                </div>
                <div className="photo-container">
                    <div className="photo-hover"><button className="see-image" id='4' onClick={toggleModal}><i className="fas fa-eye"></i></button></div>
                    <img src={image5} alt="" className='photo' />
                </div>
                <div className="photo-container">
                    <div className="photo-hover"><button className="see-image" id='5' onClick={toggleModal}><i className="fas fa-eye"></i></button></div>
                    <img src={image6} alt="" className='photo' />
                </div>
                <div className="photo-container">
                    <div className="photo-hover"><button className="see-image" id='6' onClick={toggleModal}><i className="fas fa-eye"></i></button></div>
                    <img src={image7} alt="" className='photo' />
                </div>
                <div className="photo-container">
                    <div className="photo-hover"><button className="see-image" id='7' onClick={toggleModal}><i className="fas fa-eye"></i></button></div>
                    <img src={image8} alt="" className='photo' />
                </div>
                <div className="photo-container">
                    <div className="photo-hover"><button className="see-image" id='8' onClick={toggleModal}><i className="fas fa-eye"></i></button></div>
                    <img src={image9} alt="" className='photo' />
                </div>
                <div className="photo-container">
                    <div className="photo-hover"><button className="see-image" id='9' onClick={toggleModal}><i className="fas fa-eye"></i></button></div>
                    <img src={image10} alt="" className='photo' />
                </div>
                <div className="photo-container">
                    <div className="photo-hover"><button className="see-image" id='10' onClick={toggleModal}><i className="fas fa-eye"></i></button></div>
                    <img src={image11} alt="" className='photo' />
                </div>
            </div>
        </div>
    )
}

export default Gallery
