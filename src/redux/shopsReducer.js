import { 
	FETCH_ADDRESS, FETCH_TIME, 
} from "./types";

const initialState = {
	address_shop: [
		{
			town: '',
			shops: []
		}
	],
	timeDelivery: [{}],
	timeShop: [{}],
};


const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ADDRESS:
			return {...state, address_shop: action.payload}
		case FETCH_TIME:
			return {...state, 
				timeDelivery: action.payload.timeDelivery, 
				timeShop: action.payload.timeShop
			}
		default:
			return state
	}
}

export default userReducer;