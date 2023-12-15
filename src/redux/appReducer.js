import { SHOW_LOADER, HIDE_LOADER, SHOW_MESSAGE, HIDE_MESSAGE, SHOW_BG_LOADER, HIDE_BG_LOADER } from "./types"

const initialState = {
	loading: true,
	bg_loading: true,
	message: {},
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_LOADER: 
			return {...state, loading: true}
		case HIDE_LOADER: 
			return {...state, loading: false}
		case SHOW_BG_LOADER: 
			return {...state, bg_loading: true}
		case HIDE_BG_LOADER: 
			return {...state, bg_loading: false}
		case SHOW_MESSAGE: 
			return {...state, message: action.payload}
		case HIDE_MESSAGE: 
			return {...state, message: {}}
		default: return state
	}
}
 
export default appReducer;