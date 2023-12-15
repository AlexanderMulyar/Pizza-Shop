import { combineReducers } from "redux";
import userReducer from './userReducer'
import productsReducer from './productsReducer'
import appReducer from './appReducer'
import ordersReducer from "./ordersReducer";
import shopsReducer from "./shopsReducer";

const rootReducer = combineReducers({
	user: userReducer,
	app: appReducer,
	products: productsReducer,
	orders: ordersReducer,
	address_shop: shopsReducer,
})

export default rootReducer;