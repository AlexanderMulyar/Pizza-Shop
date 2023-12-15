import { FETCH_PRODUCTS, MAKE_MARK, UPDATE_MARK, FETCH_PRODUCTS_PAGINATION, FETCH_PRODUCTS_FILTERED, SEARCH_PRODUCTS } from "./types";

const initialState = {
	products : [],
	filtered: {
		content: [],
		lengthFiltered: 0,
		category: [],
		maxPrice: 0,
		minPrice: 0,
	},
	search: [],
};


const productsReducer = (state = initialState, action) => {
	let product = {};
	let newProductContents = [];
	let newProduct = {};
	let products = [];
	switch (action.type) {
		case FETCH_PRODUCTS:
			return {...state, products: action.payload}
		case MAKE_MARK:
			product = action.payload.product
			newProductContents = action.payload.products.contents.filter(x => x.id !== product.id)
			product.marks.push(action.payload.markData)
			newProductContents.push({...product, mark: action.payload.mark})
			newProduct = {...action.payload.products, contents: newProductContents} 
			products = state.products.filter(x => x.title !== newProduct.title)
			return {...state, products: [...products, newProduct]}
		case UPDATE_MARK:
			product = action.payload.product
			newProductContents = action.payload.products.contents.filter(x => x.id !== product.id)
			newProductContents.push({...product, mark: action.payload.mark, marks: action.payload.marks})
			newProduct = {...action.payload.products, contents: newProductContents} 
			products = state.products.filter(x => x.title !== newProduct.title)
			return {...state, products: [...products, newProduct]}
		case FETCH_PRODUCTS_PAGINATION:
			products = state.products
			for (const product of products) {
				if(product.id === action.payload.id) {
					product.contents.push(...action.payload.contents)
					const filteredArr = product.contents.reduce((acc, current) => {
						const x = acc.find(item => item.id === current.id);
						if (!x) {
							return acc.concat([current]);
						} else {
							return acc;
						}
						}, []);
						product.contents = filteredArr
				}
			}
			return {...state, products}
		case FETCH_PRODUCTS_FILTERED:
			return {...state, filtered: {...state.filtered,...action.payload} }
		case SEARCH_PRODUCTS:
			return {...state, search: action.payload}
		default:
			return state
	}
}

export default productsReducer;