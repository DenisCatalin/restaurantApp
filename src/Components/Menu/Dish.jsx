import './dish.min.css'
import { useHistory } from 'react-router';
import Axios from 'axios'
import Cookie from 'js-cookie'

const Dish = ({ id, meal, image, pr }) => {

    const history = useHistory();

    const setIngredientID = () => { history.push(`/modal/${id}`); }

    let string = '';

    for(let i = 0; i < 30; i++) string += meal[i];

    const getID = Cookie.get('_SecureAuth');

    const addToCart = () => {
        Axios.post(`http://localhost:3001/addproducttocart/${getID}`, {meal: id})
        .then(response => {
            if(response.data.message === 'Cart updated') {
                console.log('Cart updated');
            } else console.log('Something went wrong');
        }).catch(err => console.log(err));
    }

    return (
        <div className='dish-card' id={id}>
            <div className="dish-details">
                <h1 className='dish-name'>{meal.length > 30 ? `${string}...` : `${meal}`}</h1>
                <img src={image} alt="" className='image-dish' />
            </div>
            <div className="dish-card-buttons">
                <button className="add-to-cart" onClick={addToCart}><i className="fas fa-shopping-cart"></i></button>
                <h1 className='dish-price'>{pr}</h1>
                <button className="ingredients-btn" onClick={setIngredientID}><i className="fas fa-question"></i></button>
            </div>
        </div>
    )
}

export default Dish
