import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import Ingredient from '../menu-ingredients/menu-ingredient.component'
import useResize from '../../../customStates/useResize'
import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/cart/cart.actions';
import './modal.css'

const Modal = () => {
    const [modalData, setModalData] = useState({});
    const [showText, setShowText] = useState(true);
    const { mealID } = useParams();
    const { height, width } = useResize();
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);
    const dispatch = useDispatch();

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    let ingredients = [];
    let ingredients2 = [];

    useEffect(() => {
        (async function getIngredients() {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
            const data = await res.json();
            setModalData(data.meals[0]);
        }());
        return;
    }, [mealID]);

    useEffect(() => {
        if(width < 580) setShowText(false);
        else setShowText(true);
    }, [height, width]);

    for(let i = 1; i <= 20; i++) {
        if(modalData[`strIngredient${i}`]) {
            ingredients.push(`${modalData[`strIngredient${i}`]}`);
        } else break;
    }
    ingredients.sort();

    ingredients.forEach(item => { if(ingredients2.indexOf(item) < 0) { ingredients2.push(item); } });

    const comp = ingredients2.map((ing, i) => {
        const string = `https://www.themealdb.com/images/ingredients/${ing}.png`;
        return <Ingredient text={ing} img={string} key={i}/>
    });

    return (
        <div className='modal-container' style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <div className="modal-header" style={{background: darkmode ? '#252525' : '#EEEEEE'}}><Link to='/menu' className="fas fa-arrow-left arrow-modal" style={{color: darkmode ? '#fff' : '#000'}}></Link></div>
            <div className="modal-content">
                <div className="right-side-modal" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                    <img src={modalData.strMealThumb} alt="" className="image-modal" />
                    <div className="buttons-modal">
                        <button className="add-to-cart-modal" onClick={() => {
                        dispatch(addItem(modalData));
                        }}><i className="fas fa-shopping-cart"></i>{showText ? 'Add to cart' : ''}</button>
                        <button className="add-to-fav"><i className="fas fa-heart"></i>{showText ? 'Add to favourite' : ''}</button>
                    </div>
                </div>
                <div className="left-side-modal" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                    <div className="another-text" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                        <h3 className="reviews" style={{color: darkmode ? '#fff' : '#000'}}>Reviews<span className="reviewsSpan">(5 reviews)</span></h3>
                        <h3 className='mealName-modal' style={{color: darkmode ? '#fff' : '#000'}}>{modalData.strMeal} ($15.99)</h3>
                    </div>
                    <div className="review-container" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                        <div className="review-container-details">
                            <div className="review-details">
                                <h1 className="review-note" style={{color: darkmode ? '#fff' : '#000'}}>3.55</h1>
                                <div className="stars" style={{color: darkmode ? '#EEE' : '#252525'}}>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <h3 className="count-reviews" style={{color: darkmode ? '#fff' : '#000'}}>5 reviews</h3>
                            </div>
                            <button className="add-a-comment">{showText ? 'Add a review' : <i className="fas fa-comment-alt"></i>}</button>
                        </div>
                        <div className="reviews-progress" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                            <div className="count-stars" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                                <h4 style={{color: darkmode ? '#fff' : '#000'}}>1 star</h4>
                                <h4 style={{color: darkmode ? '#fff' : '#000'}}>2 stars</h4>
                                <h4 style={{color: darkmode ? '#fff' : '#000'}}>3 stars</h4>
                                <h4 style={{color: darkmode ? '#fff' : '#000'}}>4 stars</h4>
                                <h4 style={{color: darkmode ? '#fff' : '#000'}}>5 stars</h4>
                            </div>
                            <div className="progress-bar-review" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                                <div className="progress-bar" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                                    <div className="count-progress-bar"></div>
                                    <h4 className="count-bar-progress" style={{color: darkmode ? '#fff' : '#000'}}>(5)</h4>
                                </div>
                                <div className="progress-bar" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                                    <div className="count-progress-bar"></div>
                                    <h4 className="count-bar-progress" style={{color: darkmode ? '#fff' : '#000'}}>(5)</h4>
                                </div>
                                <div className="progress-bar" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                                    <div className="count-progress-bar"></div>
                                    <h4 className="count-bar-progress" style={{color: darkmode ? '#fff' : '#000'}}>(5)</h4>
                                </div>
                                <div className="progress-bar" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                                    <div className="count-progress-bar"></div>
                                    <h4 className="count-bar-progress" style={{color: darkmode ? '#fff' : '#000'}}>(5)</h4>
                                </div>
                                <div className="progress-bar" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                                    <div className="count-progress-bar"></div>
                                    <h4 className="count-bar-progress" style={{color: darkmode ? '#fff' : '#000'}}>(5)</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ingredients-container" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                        <h1 style={{color: darkmode ? '#fff' : '#000'}}>Origin: {modalData.strArea} - and contains</h1>
                        <div className="ingredients" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                            {comp}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal