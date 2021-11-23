import CartActionTypes from "./cart.types";

export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const clearItemFromCart = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
})

export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
})

export const increaseTotalCart = amount => ({
    type: CartActionTypes.INCREASE_TOTAL_CART,
    payload: amount
})

export const decreaseTotalCart = amount => ({
    type: CartActionTypes.DECREASE_TOTAL_CART,
    payload: amount
})