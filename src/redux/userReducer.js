import { 
	INIT_USER, 
	GET_PERSONAL_USER, 
	SET_PERSONAL_USER,
	UPDATE_ADDRESS_FIELD_USER,
	UPDATE_PAYMENTS_FIELD_USER
} from "./types";

const initialState = {
	user : JSON.parse(localStorage.getItem('user')),
	personl: {
		address: {
			delivery: [],
			shop: [],
			type: 'shop',
			active_address: {}
		},
		contacts: {},
		payments: {
			active_card: {},
			cards: []
		}
	}
};


const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case INIT_USER:
			return {...state, user: action.payload}
		case GET_PERSONAL_USER:
			return {...state, personl: action.payload}
		case SET_PERSONAL_USER:
			return {...state, personl: {...state.personl, ...action.payload}}
		case UPDATE_ADDRESS_FIELD_USER:
			return {...state, personl: 
				{...state.personl, address:
					{...state.personl.address, ...action.payload}
				}}
		case UPDATE_PAYMENTS_FIELD_USER:
			return {...state, personl: 
				{...state.personl, payments:
					{...state.personl.payments, ...action.payload}
				}}
		default:
			return state
	}
}

export default userReducer;