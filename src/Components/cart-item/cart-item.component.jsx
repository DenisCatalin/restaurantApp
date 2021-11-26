import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { addItem, removeItem } from '../../redux/cart/cart.actions'
import { CartItemAddRemove, CartItemContainer, CartItemDetails, CartItemPrice, CartProductDescription, CartProductDetail, CartProductPrice, CartProductQuantity, CartProductTotal, ImageCartItem, ProductSpan } from './cart-item.styles';

const CartItem = ({ cartItem, code, price }) => {
    const price2 = +price;

    const TOTAL_PRICE = price2*cartItem.quantity;

    const dispatch = useDispatch();

    const [totalProduct, setTotalProduct] = useState(price2);
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    console.log(totalProduct);

    useEffect(() => {
        (async function getIngredients() {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${code}`);
            const data = await res.json();
            console.log(data);
        }());
        return;
    }, [code]);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    return (
        <CartItemContainer>
            <CartItemDetails>
                <ImageCartItem src={cartItem.strMealThumb} alt="" />
                <CartProductDescription>
                    <CartProductDetail style={{color: darkmode ? '' : '#AAA'}}>NAME: <ProductSpan style={{color: darkmode ? '' : 'gray'}}>{cartItem.strMeal}</ProductSpan></CartProductDetail>
                    <CartProductDetail style={{color: darkmode ? '' : '#AAA'}}>PRODUCT CODE: <ProductSpan style={{color: darkmode ? '' : 'gray'}}>{cartItem.idMeal}</ProductSpan></CartProductDetail>
                </CartProductDescription>
            </CartItemDetails>
            <CartProductQuantity>
                <CartItemAddRemove id={code} onClick={() => {
                    dispatch(removeItem(cartItem));
                    setTotalProduct(price2*cartItem.quantity)
                }}>{cartItem.quantity > 1 ? <i className="fas fa-minus"></i> : <i className="fas fa-trash"></i>}</CartItemAddRemove>
                <h3 style={{color: darkmode ? '#FFF' : '#000', background: 'transparent'}}>{cartItem.quantity}</h3>
                <CartItemAddRemove id={code} onClick={() => {
                    dispatch(addItem(cartItem));
                    setTotalProduct(price2*cartItem.quantity)
                }}><i className="fas fa-plus"></i></CartItemAddRemove>
            </CartProductQuantity>
            <CartProductPrice>
                <CartItemPrice>$15.99</CartItemPrice>
            </CartProductPrice>
            <CartProductTotal>
                <CartItemPrice style={{color: darkmode ? '#FFF' : '#000'}}>${TOTAL_PRICE.toFixed(2)}</CartItemPrice>
            </CartProductTotal>
        </CartItemContainer>
    )
}

export default CartItem
