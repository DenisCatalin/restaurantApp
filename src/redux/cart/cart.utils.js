export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.idMeal === cartItemToAdd.idMeal);

    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.idMeal === cartItemToAdd.idMeal 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem    
        )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.idMeal === cartItemToRemove.idMeal
    )

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.idMeal !== cartItemToRemove.idMeal)
    }

    return cartItems.map(
        cartItem => cartItem.idMeal === cartItemToRemove.idMeal ? 
        { ...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    )
}