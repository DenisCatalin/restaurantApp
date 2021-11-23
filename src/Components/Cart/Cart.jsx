import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import CartItem from './CartItem'
import './cart.css'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal, selectCartItemsCount } from '../../redux/cart/cart.selectors'
import StripeCheckoutButton from '../stripe-button/stripe-button.component'

const Cart = () => {
    const cartItemss = useSelector(selectCartItems);
    const cartTotall = useSelector(selectCartTotal);
    const cartItemsCount = useSelector(selectCartItemsCount);

    let deliveryOptions = ['Personal Pick-up - $0.00', 'Standard delivery - $4.00', 'Fast Delivery - $8.00'];
    const [delivery, setDelivery] = useState('');
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);
    const [deliveryFee, setDeliveryFee] = useState(0);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

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
                        {
                            cartItemss.map(cartItem => (
                                <CartItem cartItem={cartItem} code={cartItem.idMeal} key={cartItem.idMeal} price='15.99'/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="summary-space" style={{background: darkmode ? '#252525' : '#AAA'}}>
                <div className="summary" style={{background: darkmode ? '#383838' : '#CCC'}}>
                    <h3 className="summary-title" style={{color: darkmode ? '#CCC' : '#000'}}>ORDER SUMMARY</h3>
                    <div className="summary-items">
                        <h3 style={{color: darkmode ? '#CCC' : '#000'}}>YOU GOT {cartItemsCount} ITEMS</h3>
                        <h3 style={{color: darkmode ? '#ccc' : '#000'}}>${cartTotall.toFixed(2)}</h3>
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
                        <h3 style={{color: darkmode ? '#CCC' : '#000'}}>${(cartTotall+deliveryFee).toFixed(2)}</h3>
                    </div>
                    <StripeCheckoutButton price={cartTotall}>CHECKOUT</StripeCheckoutButton>
                </div>
            </div>
        </div>
    )
}

export default Cart