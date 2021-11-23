import CartActionTypes from './cart.types'
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    cartItems: [],
    value: 0.00
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload),
                value: state.value + 15.99
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
            }    
        case CartActionTypes.REMOVE_ITEM: 
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload),
                value: state.value - 15.99
            }   
        case CartActionTypes.INCREASE_TOTAL_CART: 
            return {
                ...state,
                value: action.payload
            }
        case CartActionTypes.DECREASE_TOTAL_CART: 
            return {
                ...state,
                value: action.payload
            }    
        default:
            return state;    
    }
} 

export default cartReducer