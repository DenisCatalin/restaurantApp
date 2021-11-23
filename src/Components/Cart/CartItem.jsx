import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { addItem, removeItem } from '../../redux/cart/cart.actions'

const CartItem = ({ cartItem, code, price }) => {
    const price2 = +price;

    const TOTAL_PRICE = price2*cartItem.quantity;

    const dispatch = useDispatch();

    const [totalProduct, setTotalProduct] = useState(price2);
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);
    const [message, setMessage] = useState('');

    console.log(totalProduct);

    useEffect(() => {
        (async function getIngredients() {
            if(code === '') { setMessage('No items yet') }
            else {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${code}`);
                const data = await res.json();
                setMessage('All Good');
                console.log(data);
            }
        }());
        return;
    }, [code]);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    return (
        <div className="cart-item">
            {message === 'All Good' ? 
                <><div className="product-details">
                    <img src={cartItem.strMealThumb} alt="" className='img-cart-item'/>
                    <div className="product-description">
                        <h3 className="product-name" style={{color: darkmode ? '' : '#AAA'}}>NAME: <span className="productSpan" style={{color: darkmode ? '' : 'gray'}}>{cartItem.strMeal}</span></h3>
                        <h3 className="product-category" style={{color: darkmode ? '' : '#AAA'}}>CATEGORY: <span className="productSpan" style={{color: darkmode ? '' : 'gray'}}>{cartItem.strArea}</span></h3>
                        <h3 className="product-id" style={{color: darkmode ? '' : '#AAA'}}>PRODUCT CODE: <span className="productSpan" style={{color: darkmode ? '' : 'gray'}}>{cartItem.idMeal}</span></h3>
                    </div>
                </div>
                <div className="product-quantity">
                    <button className="cart-item-decrease" id={code} onClick={() => {
                            dispatch(removeItem(cartItem));
                            setTotalProduct(price2*cartItem.quantity)
                        }}>{cartItem.quantity > 1 ? <i className="fas fa-minus"></i>: <i className="fas fa-trash"></i>}</button>
                    <h3 className="quantity-number" style={{color: darkmode ? '#FFF' : '#000'}}>{cartItem.quantity}</h3>
                    <button className="cart-item-increase" id={code} onClick={() => {
                            dispatch(addItem(cartItem));
                            setTotalProduct(price2*cartItem.quantity)
                        }}><i className="fas fa-plus"></i></button>
                </div>
                <div className="product-price">
                    <h3 className='cart-item-price'>$15.99</h3>
                </div>
                <div className="product-total">
                    <h3 className='cart-item-price' style={{color: darkmode ? '#FFF' : '#000'}}>${TOTAL_PRICE.toFixed(2)}</h3>
                </div></>
            :
            <div className="no-items-yet"><h3 style={{color: darkmode ? 'white' : 'black'}}>{message}</h3></div>
            }
        </div>
    )
}

export default CartItem
