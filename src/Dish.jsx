import './css/dish.min.css'
import { useHistory } from 'react-router';

const Dish = ({ id, meal, image }) => {

    const history = useHistory();

    let price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(id);

    const setIngredientID = (e) => {
        localStorage.removeItem('ingredient');
        localStorage.setItem('ingredient', JSON.stringify(e.target.parentElement.parentElement.id));
        history.push(`/modal`);
    }

    let string = '';

    for(let i = 0; i < 30; i++) string += meal[i];

    return (
        <div className='dish-card' id={id}>
            <div className="dish-details">
                <h1 className='dish-name'>{meal.length > 30 ? `${string}...` : `${meal}`}</h1>
                <img src={image} alt="" className='image-dish' />
            </div>
            <div className="dish-card-buttons">
                <button className="add-to-cart"><i className="fas fa-shopping-cart"></i></button>
                <h1 className='dish-price'>{price}</h1>
                <button className="ingredients-btn" onClick={setIngredientID}><i className="fas fa-question"></i></button>
            </div>
        </div>
    )
}

export default Dish
