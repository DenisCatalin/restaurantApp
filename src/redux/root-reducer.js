import { combineReducers } from "redux";
import cartReducer from "./cart/cart.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'total']
}

const rootReducer = combineReducers({
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);