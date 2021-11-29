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
import Cookie from 'js-cookie'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GalleryContainer, GalleryContent, Photo, SeeImage } from './gallery.styles'
import PageHeader from '../../Components/page-header/page-header.component'
import './gallery.scss';

const GalleryPage = () => {

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
        <GalleryContainer style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <PageHeader path={'/'}/>
            <GalleryContent style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <div className='photo-container'>
                    <div className='photo-hover'><SeeImage id='0' onClick={toggleModal}><i className="fas fa-eye"></i></SeeImage></div>
                    <Photo src={image1} alt=""/>
                </div>
                <div className='photo-container'>
                    <div className='photo-hover'><SeeImage id='1' onClick={toggleModal}><i className="fas fa-eye"></i></SeeImage></div>
                    <Photo src={image2} alt=""/>
                </div>
                <div className='photo-container'>
                    <div className='photo-hover'><SeeImage id='2' onClick={toggleModal}><i className="fas fa-eye"></i></SeeImage></div>
                    <Photo src={image3} alt=""/>
                </div>
                <div className='photo-container'>
                    <div className='photo-hover'><SeeImage id='3' onClick={toggleModal}><i className="fas fa-eye"></i></SeeImage></div>
                    <Photo src={image4} alt=""/>
                </div>
                <div className='photo-container'>
                    <div className='photo-hover'><SeeImage id='4' onClick={toggleModal}><i className="fas fa-eye"></i></SeeImage></div>
                    <Photo src={image5} alt=""/>
                </div>
                <div className='photo-container'>
                    <div className='photo-hover'><SeeImage id='5' onClick={toggleModal}><i className="fas fa-eye"></i></SeeImage></div>
                    <Photo src={image6} alt=""/>
                </div>
                <div className='photo-container'>
                    <div className='photo-hover'><SeeImage id='6' onClick={toggleModal}><i className="fas fa-eye"></i></SeeImage></div>
                    <Photo src={image7} alt=""/>
                </div>
                <div className='photo-container'>
                    <div className='photo-hover'><SeeImage id='7' onClick={toggleModal}><i className="fas fa-eye"></i></SeeImage></div>
                    <Photo src={image8} alt=""/>
                </div>
                <div className='photo-container'>
                    <div className='photo-hover'><SeeImage id='8' onClick={toggleModal}><i className="fas fa-eye"></i></SeeImage></div>
                    <Photo src={image9} alt=""/>
                </div>
                <div className='photo-container'>
                    <div className='photo-hover'><SeeImage id='9' onClick={toggleModal}><i className="fas fa-eye"></i></SeeImage></div>
                    <Photo src={image10} alt=""/>
                </div>
                <div className='photo-container'>
                    <div className='photo-hover'><SeeImage id='10' onClick={toggleModal}><i className="fas fa-eye"></i></SeeImage></div>
                    <Photo src={image11} alt=""/>
                </div>
            </GalleryContent>
        </GalleryContainer>
    )
}

export default GalleryPage
