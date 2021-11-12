import Axios from 'axios';
import Cookie from 'js-cookie'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const CartItem = ({ code, price }) => {
    const price2 = +price;

    const [quantity, setQuantity] = useState(1);
    const [totalProduct, setTotalProduct] = useState(price2);
    const [product, setProduct] = useState({});
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);
    const [message, setMessage] = useState('');
    const history = useHistory();
    const cartProducts = JSON.parse(localStorage.getItem('quantityCart'));

    useEffect(() => {
        (async function getIngredients() {
            if(code === '') { setMessage('No items yet') }
            else {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${code}`);
                const data = await res.json();
                setProduct(data.meals[0]);
                setMessage('All Good');
            }
        }());
        return;
    }, [code]);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    const increaseQuantity = (e) => {
        const mealID = e.target.id;
        setQuantity(quantity+1);
        setTotalProduct(totalProduct+price2);
        Axios.post(`http://localhost:3001/updatecartprice/${getID}`, {condition: 'increase'})
        .then(response => {
            console.log(response.data.message);
        }).catch(err => console.log(err));

        cartProducts.forEach(item => {
            if(item.id === mealID) { item.quantity += 1; }
        });
        localStorage.setItem('quantityCart', JSON.stringify(cartProducts));
        console.log(cartProducts);
    }

    const getID = Cookie.get('_SecureAuth');

    const decreaseQuantity = (e) => {
        const mealID = e.target.id;

        cartProducts.forEach(item => {
            console.log(item.id);
        });

        Axios.post(`http://localhost:3001/updatecartprice/${getID}`, {condition: 'decrease'})
        .then(response => {
            console.log(response.data.message);
        }).catch(err => console.log(err));

        if(quantity === 1) {
            Axios.post(`http://localhost:3001/removeproductfromcart/${getID}`, {meal: mealID})
            .then(response => {
                if(response.data.message === 'Cart updated') { window.location.reload(); }
                else if(response.data.message === 'Not found') { history.push('/login'); }
                else { console.log('Something went wrong'); }
            })
            .catch(err => console.log(err));
        }

        setQuantity(quantity-1);
        setTotalProduct(totalProduct-price2);
    }

    return (
        <div className="cart-item">
            {message === 'All Good' ? 
                <><div className="product-details">
                    <img src={product.strMealThumb} alt="" className='img-cart-item'/>
                    <div className="product-description">
                        <h3 className="product-name" style={{color: darkmode ? '' : '#AAA'}}>NAME: <span className="productSpan" style={{color: darkmode ? '' : 'gray'}}>{product.strMeal}</span></h3>
                        <h3 className="product-category" style={{color: darkmode ? '' : '#AAA'}}>CATEGORY: <span className="productSpan" style={{color: darkmode ? '' : 'gray'}}>{product.strArea}</span></h3>
                        <h3 className="product-id" style={{color: darkmode ? '' : '#AAA'}}>PRODUCT CODE: <span className="productSpan" style={{color: darkmode ? '' : 'gray'}}>{product.idMeal}</span></h3>
                    </div>
                </div>
                <div className="product-quantity">
                    <button className="cart-item-decrease" id={code} onClick={decreaseQuantity}>{quantity > 1 ? <i className="fas fa-minus"></i>: <i className="fas fa-trash"></i>}</button>
                    <h3 className="quantity-number" style={{color: darkmode ? '#FFF' : '#000'}}>{quantity}</h3>
                    <button className="cart-item-increase" id={code} onClick={increaseQuantity}><i className="fas fa-plus"></i></button>
                </div>
                <div className="product-price">
                    <h3 className='cart-item-price'>$15.99</h3>
                </div>
                <div className="product-total">
                    <h3 className='cart-item-price' style={{color: darkmode ? '#FFF' : '#000'}}>${totalProduct.toFixed(2)}</h3>
                </div></>
            :
            <div className="no-items-yet"><h3 style={{color: darkmode ? 'white' : 'black'}}>{message}</h3></div>
            }
        </div>
    )
}

export default CartItem
