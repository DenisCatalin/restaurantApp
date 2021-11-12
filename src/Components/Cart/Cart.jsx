import {useState, useEffect} from 'react'
import Axios from 'axios'
import Cookie from 'js-cookie'
import {Link, useHistory} from 'react-router-dom'
import CartItem from './CartItem'
import './cart.css'

const Cart = () => {
    let cartArray = [];
    let deliveryOptions = ['Personal Pick-up - $0.00', 'Standard delivery - $4.00', 'Fast Delivery - $8.00'];
    const [delivery, setDelivery] = useState('');
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [cartPrice, setCartPrice] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [cartItems, setCartItems] = useState(0);
    const cartProducts = JSON.parse(localStorage.getItem('quantityCart'));

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    const getID = Cookie.get('_SecureAuth');
    useEffect(() => {
        Axios.get(`http://localhost:3001/getUsername/${getID}`)
        .then(response => {
            if(response.data.message === 'Not Found') history.push('/login');
        }).catch(err => console.log(err));

        Axios.get(`http://localhost:3001/getusercart/${getID}`)
        .then(response => {
            if(response.data.user !== '') {
                const string = response.data.user.Products;
                const array = string.split(',');
                if(array !== '') {
                    setProducts(array);
                    setCartItems(array.length);
                }
                if(response.data.user.TotalPrice < 0.99) setCartPrice(0);
                else setCartPrice(response.data.user.TotalPrice);
            }
        }).catch(err => console.log(err));
    }, [getID, history, cartProducts]);

    return (
        <div className='cart-page' style={{background: darkmode ? '#252525' : '#AAA'}}>
            <div className="opacity-space" style={{background: darkmode ? '#252525' : '#AAA'}}>
                <div className="cart-header" >
                    <Link to='/menu' className="fas fa-arrow-left arrow-modal" style={{color: darkmode ? '#fff' : '#000'}}></Link>
                </div>
                <div className="cart">
                    <div className="cart-items" style={{background: darkmode ? '#383838' : '#CCC'}}>
                        <div className="table">
                            <h3 className='table-product' style={{color: darkmode ? '#FF9900' : '#000'}}>Product</h3>
                            <h3 className='table-quantity' style={{color: darkmode ? '#FF9900' : '#000'}}>Quantity</h3>
                            <h3 className='table-price' style={{color: darkmode ? '#FF9900' : '#000'}}>Price</h3>
                            <h3 className='table-total' style={{color: darkmode ? '#FF9900' : '#000'}}>Total</h3>
                        </div>
                        {products.map((product, i) => {
                            if(localStorage.getItem('quantityCart') !== null) {
                                const cartProducts = JSON.parse(localStorage.getItem('quantityCart'));
                                localStorage.setItem('quantityCart', JSON.stringify(cartProducts));
                            }
                            cartArray.push({id: product, quantity: 1});
                            localStorage.setItem('quantityCart', JSON.stringify(cartArray));
                            return <CartItem code={product} key={i} price='15.99'/>
                        })}
                    </div>
                </div>
            </div>
            <div className="summary-space" style={{background: darkmode ? '#252525' : '#AAA'}}>
                <div className="summary" style={{background: darkmode ? '#383838' : '#CCC'}}>
                    <h3 className="summary-title" style={{color: darkmode ? '#CCC' : '#000'}}>ORDER SUMMARY</h3>
                    <div className="summary-items">
                        <h3 style={{color: darkmode ? '#CCC' : '#000'}}>YOU GOT {cartItems} ITEMS</h3>
                        <h3 style={{color: darkmode ? '#ccc' : '#000'}}>${cartPrice}</h3>
                    </div>
                    <div className="shipping-div">
                        <h3 style={{color: darkmode ? '#ccc' : '#000'}}>SHIPPING</h3>
                        <select className='select-delivery' style={{background: darkmode ? '#252525' : '#383838'}} name="month" id="month" value={delivery} 
                        onChange={(e) => { 
                            setDelivery(e.target.value); 
                            if(e.target.value === deliveryOptions[0]) { setDeliveryFee(0) }
                            if(e.target.value === deliveryOptions[1]) { setDeliveryFee(4) }
                            if(e.target.value === deliveryOptions[2]) { setDeliveryFee(8) }
                        }}>{deliveryOptions.map((del, i) => { return <option value={del} key={i}>{del}</option> })}</select>
                    </div> 
                    <div className="disccount-summary">
                        <h4 style={{color: darkmode ? '#CCC' : '#000'}}>APPLY A DISCCOUNT CODE</h4>
                        <div className="disccount-summary-input">
                            <input className='input-disccount' type="text" style={{background: darkmode ? '#252525' : '#EEE'}} placeholder='Apply disccount code'/>
                            <button className="apply-disccount" style={{background: darkmode ? '#252525' : '#EEE', color: darkmode ? '#CCC' : '#000'}}>APPLY</button>
                        </div>
                    </div>
                    <div className="total-summary">
                        <h3 style={{color: darkmode ? '#CCC' : '#000'}}>TOTAL COST</h3>
                        <h3 style={{color: darkmode ? '#CCC' : '#000'}}>${(cartPrice+deliveryFee).toFixed(2)}</h3>
                    </div>
                    <button className="checkout-summary" style={{background: darkmode ? '#252525' : '#EEE', color: darkmode ? '#CCC' : '#000'}}>CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}

export default Cart
