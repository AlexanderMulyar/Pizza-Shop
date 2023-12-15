import { ADD_TO_ORDER, FETCH_ORDER, REMOVE_ORDER, REMOVE_FROM_ORDER, SET_ORDER, MAKE_ORDER } from "./types";
const initialState = {
	orders : {
		content: [],
		lengthOrders: 0,
	},
	currentOrder: JSON.parse(localStorage.getItem('currentOrder')) ?? 
	{ 
		userUid: JSON.parse(localStorage.getItem('user'))?.uid,
		products: [],
		price: 0.00,
		message: '',
		weight: 0
	}
};

function getPriceWeight(content){
	let price = 0;
	let weight = 0;
	for (const i of content.products) {
		price += +(i.price * i.count)
		if(i.type === 'г') {
			weight += i.weight * i.count / 1000 + (i.count * 0.02)
		} else {
			weight += i.weight * i.count + (i.count * 0.02)
		}
	}
	price = +(price.toFixed(2)) + 49.00
	weight = +(weight.toFixed(2))
	return {price, weight}
}


const ordersReducer = (state = initialState, action) => {
	let currentOrder = { 
		userUid: JSON.parse(localStorage.getItem('user'))?.uid ?? '',
		products: [],
		price: 49,
		message: '',
		weight: 0
	}
	let weightPrice = {};
	let updatedCurrentOrder = {};
	switch (action.type) {
		case FETCH_ORDER:
			return {...state, orders: {...action.payload}}
		case SET_ORDER:
			currentOrder = {...state.currentOrder, ...action.payload}
			localStorage.setItem('currentOrder', JSON.stringify(currentOrder))
			return {...state, currentOrder}
		case MAKE_ORDER:
			localStorage.setItem('currentOrder', JSON.stringify(currentOrder))
			return {...state, currentOrder }
		case ADD_TO_ORDER:
			currentOrder = {
				...state.currentOrder,
				products: [...state.currentOrder.products.filter(x => x.id !== action.payload.id),
				action.payload]
			}
			weightPrice = getPriceWeight(currentOrder)
			updatedCurrentOrder = {
				...currentOrder, 
				price: weightPrice.price, 
				weight: weightPrice.weight
			}
			localStorage.setItem('currentOrder', JSON.stringify(updatedCurrentOrder))
			return {...state, currentOrder: updatedCurrentOrder}	
		case REMOVE_FROM_ORDER:
			currentOrder = {
				...state.currentOrder, 
				products: [...state.currentOrder.products.filter(x => x.id !== action.payload.id)]
			}
			weightPrice = getPriceWeight(currentOrder)
			updatedCurrentOrder = {
				...currentOrder, 
				price: weightPrice.price, 
				weight: weightPrice.weight
			}
			localStorage.setItem('currentOrder', JSON.stringify(updatedCurrentOrder))
			return {...state, currentOrder: updatedCurrentOrder}		
		case REMOVE_ORDER:
			localStorage.setItem('currentOrder', JSON.stringify(currentOrder))
			return {...state, currentOrder}
		default:
			return state
	}
}

export default ordersReducer;