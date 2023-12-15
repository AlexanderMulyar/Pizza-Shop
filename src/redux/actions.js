import { 
	getDocs,
	collection, 
	setDoc, 
	doc, 
	getDoc, 
	updateDoc,
	addDoc, 
	query, 
	limit, 
	where, 
	collectionGroup, 
	arrayUnion, 
	arrayRemove,
	startAt,
	orderBy,
	startAfter,
	endAt,
} from "firebase/firestore";
import { 
	RecaptchaVerifier, 
	signInWithPhoneNumber, 
	onAuthStateChanged, 
	signOut, 
	updateEmail,
	getAdditionalUserInfo, 
	updateProfile
} from "firebase/auth";
import { db, auth } from "../firebase";
import { 
	SHOW_MESSAGE, 
	HIDE_MESSAGE, 
	HIDE_LOADER, 
	SHOW_LOADER, 
	FETCH_PRODUCTS, 
	INIT_USER,
	GET_PERSONAL_USER, 
	SHOW_BG_LOADER,
	HIDE_BG_LOADER,
	SET_PERSONAL_USER,
	ADD_TO_ORDER,
	REMOVE_ORDER, 
	REMOVE_FROM_ORDER,
	SET_ORDER,
	MAKE_ORDER,
	FETCH_ORDER,
	UPDATE_ADDRESS_FIELD_USER,
	UPDATE_PAYMENTS_FIELD_USER,
	FETCH_ADDRESS,
	FETCH_TIME,
	MAKE_MARK,
	UPDATE_MARK,
	FETCH_PRODUCTS_PAGINATION,
	FETCH_PRODUCTS_FILTERED,
	SEARCH_PRODUCTS,
} from "./types";

/*App function*/
export function hideError(){
	return {
		type: HIDE_MESSAGE
	}
}
export function showMessage(text, title){
	return dispatch => {
		dispatch({
			type: SHOW_MESSAGE, 
			payload: {text, title}
		})
	}
}

function _getCategories(obj) {
	return [...obj.docs.map(doc => ({id: doc.id, ...doc.data()})).reduce( (mp, o) => {
		if (!mp.has(o.typeCategory)) mp.set(o.typeCategory, { name: o.typeCategory, count: 0 });
		mp.get(o.typeCategory).count++;
		return mp;
	}, new Map()).values()]
}
function _getMinPrice(allProductsList) {
	return Math.ceil(allProductsList.docs.map(doc => ({id: doc.id, ...doc.data()})).sort((a, b) => a.price - b.price)[0].price)
}
function _getMaxPrice(allProductsList) {
	return Math.ceil(allProductsList.docs.map(doc => ({id: doc.id, ...doc.data()})).sort((a, b) => b.price - a.price)[0].price)
}

/*Fetch Products*/
export function fetchProducts() {
	return async dispatch => {
		try{
			document.body.classList.add('overflow-hidden');
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_BG_LOADER});
			const allDocs = await getDocs(collection(db, "products2"));
			let result = [];
			let productsList = {};
			let productsListRef = {};
			let allProductsList = {};
			for (const item of allDocs.docs) {
				productsListRef = collection(db, "products2", item.id, 'contentsProducts') 
				productsList = (await getDocs(query(productsListRef, orderBy("name"), limit(7))))
				allProductsList = (await getDocs(query(productsListRef, orderBy("name"))))
				result.push({
					title: item.data().title,
					id: item.id,
					link: item.data().link,
					icon: item.data().icon,
					category: _getCategories(allProductsList),
					maxPrice: _getMaxPrice(allProductsList),
					minPrice: _getMinPrice(allProductsList),
					lengthProducts: allProductsList.docs.length,
					contents: productsList.docs.map(doc => ({id: doc.id, ...doc.data()}))
				})
			}
			dispatch({type: FETCH_PRODUCTS, payload: result})
			dispatch({type: HIDE_BG_LOADER});
			dispatch({type: HIDE_LOADER});
			document.body.classList.remove('overflow-hidden');
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			document.body.classList.remove('overflow-hidden');
			dispatch({type: HIDE_BG_LOADER});
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function makeMark(mark, markData, products, product){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});

			dispatch({type: MAKE_MARK, payload: {mark, markData, products, product}});
			const docRef = query(collectionGroup(db, "contentsProducts"), 
			where('id', '==', product.id))
			const refProduct = (await getDocs(docRef)).docs[0].ref.path
			await updateDoc(doc(db, refProduct), {
				mark,
				marks: arrayUnion(markData)
			})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function updateMark(mark, marks, products, product){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});

			const docRef = query(collectionGroup(db, "contentsProducts"), 
			where('id', '==', product.id))
			dispatch({type: UPDATE_MARK, payload: {mark, marks, products, product}});
			const refProduct = (await getDocs(docRef)).docs[0].ref.path
			await updateDoc(doc(db, refProduct), {
				mark,
				marks
			})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}

export function searchProducts(name) {
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			let result = [];
			if(name.trim().length) {
				const docsRef = query(collectionGroup(db, "contentsProducts"),
					orderBy('name'),
					startAt(name),
					endAt(name + '\uf8ff'),
					limit(7)
				);
				result = (await getDocs(docsRef)).docs.map(doc => ({id: doc.id, ...doc.data()}))
			}
			dispatch({type: SEARCH_PRODUCTS, payload: result})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}

/*Fetch Address*/
export function fetchAddress() {
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const allDocs = await getDocs(collection(db, "address"));
			let result = [];
			allDocs.forEach((doc) => {
				result.push(doc.data())
			});
			
			dispatch({type: FETCH_ADDRESS, payload: result})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_BG_LOADER});
			dispatch({type: HIDE_LOADER});
		}
	}
}

/*Fetch Time*/
export function fetchTime() {
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});

			const doc = await getDocs(collection(db, "time",));

			dispatch({type: FETCH_TIME, payload: doc.docs[0].data()})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_BG_LOADER});
			dispatch({type: HIDE_LOADER});
		}
	}
}

/*Auth*/
const generateRecapthca = () => {
	window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
	'size': 'invisible',
	'callback': (response) => {}
	}, auth);
}
export function requestOTP(phoneNumber) {
	return async dispatch => {
		if(phoneNumber.length >= 13) {
			try{
				dispatch({type: HIDE_MESSAGE});
				dispatch({type: SHOW_LOADER});
				generateRecapthca();
				let appVerifier = window.recaptchaVerifier;
				if(!window.confirmationResult) {
					const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
					window.confirmationResult = confirmationResult;
				}
				dispatch({type: HIDE_LOADER});
			} catch(e) {
				dispatch(showMessage(e.message, 'ERROR') );
				dispatch({type: HIDE_LOADER});
			}
		}
	}
}
export function verifyOTP(otp) {
	return async dispatch => {
		if(otp.length === 6) {
			const contacts = {
				firstName: '',
				secondName: '',
				surname: '',
				dateBirth: ''
			}
			const address = {
				active_address: {},
				delivery: [],
				shop: [],
			}
			const payments = {
				cards: [],
				active_card: {}
			}
			try{
				dispatch({type: HIDE_MESSAGE});
				dispatch({type: SHOW_LOADER});
				let confirmationResult = window.confirmationResult
				const result = await confirmationResult.confirm(otp)
				const uid = result.user.uid
				const { isNewUser } = getAdditionalUserInfo(result)
				if(isNewUser) {
					await setDoc(doc(db, 'users', uid), {contacts, address, payments})
					dispatch({type: SET_PERSONAL_USER, payload: {contacts, address, payments}});
				} else {
					dispatch(getUserData(result.user));
				}
				dispatch({type: INIT_USER, payload: result.user});
				dispatch({type: HIDE_LOADER});
			} catch(e) {
				dispatch(showMessage(e.message, 'ERROR') );
				dispatch({type: HIDE_LOADER});
			}
	} 
	}
}
export function logout(){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			await signOut(auth);
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
/*User*/
export function updateUserEmail(user, email = ''){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			await updateEmail(user, email)
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function updateUserData(user, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			await updateDoc(usersRef, data)
			if(!!data.contacts.firstName?.trim() && data.contacts.firstName !== user.displayName) {
				await updateProfile(user, {displayName: data.contacts.firstName})
				dispatch({type: INIT_USER, payload: user});
			}
			dispatch({type: SET_PERSONAL_USER, payload: data});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}

/*Payments*/
export function updateUserPayments(user, array , data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const cards = [...array.filter(x => x.number !== data.number), data]
			await updateDoc(usersRef, {
				'payments.cards': cards
			})
			dispatch({type: UPDATE_PAYMENTS_FIELD_USER, payload: {cards}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeUserPayments(user, array, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const cards = array.filter(x => x.number !== data.number)
			await updateDoc(usersRef, {
				'payments.cards': arrayRemove(data)
			})
			dispatch({type: UPDATE_PAYMENTS_FIELD_USER, payload: {cards}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function updateUserPaymentsField(user, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			await updateDoc(usersRef, {
				'payments.active_card': data.active_card,
			})
			dispatch({type: UPDATE_PAYMENTS_FIELD_USER, payload: data});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}


/*Address*/
export function updateUserAddressShop(user, array, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const shop = [...array.filter(x => x.id !== data.id), data]
			await updateDoc(usersRef, {
				'address.shop': shop
			})
			dispatch({type: UPDATE_ADDRESS_FIELD_USER, payload: {shop}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeUserAddressShop(user, array, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const shop = array.filter(x => x.id !== data.id)
			await updateDoc(usersRef, {
				'address.shop': arrayRemove(data)
			})
			dispatch({type: UPDATE_ADDRESS_FIELD_USER, payload: {shop}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function updateUserAddressDelivery(user, array, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const delivery = [...array.filter(x => x.id !== data.id), data]
			await updateDoc(usersRef, {
				'address.delivery': delivery
			})
			dispatch({type: UPDATE_ADDRESS_FIELD_USER, payload: {delivery}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeUserAddressDelivery(user, array, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const delivery = array.filter(x => x.id !== data.id)
			await updateDoc(usersRef, {
				'address.delivery': arrayRemove(data)
			})
			dispatch({type: UPDATE_ADDRESS_FIELD_USER, payload: {delivery}});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function updateUserAddressField(user, data = {}){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			await updateDoc(usersRef, {
				'address.type': data.type,
				'address.active_address': data.active_address,
			})
			dispatch({type: UPDATE_ADDRESS_FIELD_USER, payload: data});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}

export function getUserData(user){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const usersRef = doc(db, 'users', user.uid)
			const data = (await getDoc(usersRef)).data()
			dispatch({type: GET_PERSONAL_USER, payload: data});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}

/* Unsubscribe function*/
export function unsubscribe() {
	return async dispatch => {
		onAuthStateChanged(auth, async (user) => {
			if(user){
				dispatch({type: INIT_USER, payload: user});
				localStorage.setItem('user', JSON.stringify(user));
			} else{
				dispatch({type: INIT_USER, payload: null});
				dispatch({type: SET_PERSONAL_USER, payload: {
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
				}});
				localStorage.removeItem('user');
				localStorage.setItem('currentOrder', JSON.stringify({ 
					userUid: '',
					products: [],
					price: 49,
					message: '',
					weight: 0
				}));
				dispatch({type: HIDE_LOADER});
			}
		})
	}
}

/*orders*/
export function fetchOrders(limitNum = 6,id){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const lengthOrders = await getDocs(query(collection(db, "orders"),
				orderBy('price'),
				where('userUid', '==', id)
			))
			let ordersList = await getDocs(query(collection(db, "orders"),
				orderBy('price'),
				where('userUid', '==', id),
				limit(limitNum)
			));
			console.log(lengthOrders);
			let allIdProducts = []
			let allIdProductsSubList = [];
			let result = []
			let order = {}
			for (const orderDoc of ordersList.docs) {
				order = await getDoc(doc(db, "orders", orderDoc.id));
				allIdProducts.push(...order.data().products.map(x => x.id))
				result.push(order.data())
			}
			for (let i = 0; i < allIdProducts.length; i+=10) {
				allIdProductsSubList.push(allIdProducts.slice(i, i + 10))			
			}
			if(allIdProductsSubList.length) {
				let productsRef = []
				for (const sub of allIdProductsSubList) {
					productsRef = query(collectionGroup(db, "contentsProducts"), 
					where('id', 'in', sub))

					const productsById = (await getDocs(productsRef)).docs.map(x => x.data());
					for (const orderItem of result) {
						orderItem.products = orderItem.products.map(orderItemProduct => {
							let product = productsById.find(x => x.id === orderItemProduct.id);
							return {...orderItemProduct, ...product}
						})
					}
				}
			}
			dispatch({type: FETCH_ORDER, payload: {
				content: result, 
				lengthOrders: lengthOrders.docs.length}
			});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			console.log(e);
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function paginationOrders(limitNum = 1, ordersContent, id){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			const lengthOrders = await getDocs(query(collection(db, "orders"),
				orderBy('price'),
				where('userUid', '==', id)
			))
			const firsOrders  = (await getDocs(query(
				collection(db, "orders"), 
				orderBy("price"), 
				where('userUid', '==', id),
				limit(limitNum)),
			))
			const lastDoc = firsOrders.docs[firsOrders.docs.length-1]
			let ordersList = await getDocs(query(collection(db, "orders"),
				orderBy('price'),
				where('userUid', '==', id),
				startAt(lastDoc),
				limit(6)
			));
			let allIdProducts = []
			let allIdProductsSubList = [];
			let result = []
			let order = {}
			for (const orderDoc of ordersList.docs) {
				order = await getDoc(doc(db, "orders", orderDoc.id));
				allIdProducts.push(...order.data().products.map(x => x.id))
				result.push(order.data())
			}
			for (let i = 0; i < allIdProducts.length; i+=10) {
				allIdProductsSubList.push(allIdProducts.slice(i, i + 10))			
			}
			if(allIdProductsSubList.length) {
				let productsRef = []
				for (const sub of allIdProductsSubList) {
					productsRef = query(collectionGroup(db, "contentsProducts"), 
					where('id', 'in', sub))

					const productsById = (await getDocs(productsRef)).docs.map(x => x.data());
					for (const orderItem of result) {
						orderItem.products = orderItem.products.map(orderItemProduct => {
							let product = productsById.find(x => x.id === orderItemProduct.id);
							return {...orderItemProduct, ...product}
						})
					}
				}
			}
			dispatch({type: FETCH_ORDER, payload: {
				content: [...new Set([...ordersContent, ...result])], 
				lengthOrders: lengthOrders.docs.length}
			});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			console.log(e);
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function addToOrder(content){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			dispatch({type: ADD_TO_ORDER, payload: content});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeFromOrder(content){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});
			dispatch({type: REMOVE_FROM_ORDER, payload: content});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeOrder(){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});

			dispatch({type: REMOVE_ORDER});
			
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function setOrder(content){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});

			dispatch({type: SET_ORDER, payload: content});
			
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function makeOrder(content){
	return async dispatch => {
		try{
			dispatch({type: HIDE_MESSAGE});
			dispatch({type: SHOW_LOADER});

			dispatch({type: MAKE_ORDER, payload: content});
			const docRef = collection(db, "orders");
			const newDoc = await addDoc(docRef, content)
			await updateDoc(doc(db, newDoc.path), {
				orderId: newDoc.id
			})
			dispatch(showMessage(`Ваш номер замовлення ${newDoc.id}. Приємних покумок.`, 'Замовлення') 
			);
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
			dispatch({type: HIDE_LOADER});
		}
	}
}

/*Production action*/
export function addProducts(){
	return async dispatch => {
		try{

			const docRef = doc(db, "products2", "IVv4ryDhlcpcIopoZECH");
			const colRef = collection(docRef, "contentsProducts")	
			const newProduct = await addDoc(colRef, {
        imgUrl: "gs://shop-a76f5.appspot.com/snacks/Snaks (4).png",
        mark: 0, // do't touch
        marks: [], // do't touch
        descriptions: "сир дорблю, кляр, хрумка паніровка, сіль, соус.",
        info: [
          {
            title: "Білки",
            value: "20 г",
          },
          {
            title: "Вуглеводи",
            value: "24.4 г",
          },
          {
            title: "Жири",
            value: "20.7 г",
          },
          {
            title: "Калорійність",
            value: "249 ккал",
          },
        ],
        name: "Сирні кульки з соусом",
        price: 210,
        oldPrice: 0,
        type: "г",
        weight: 280,
        // typeCategory: 'test',
        id: "", // do't touch
      });
			console.log(newProduct);
			console.log(docRef);
			(await getDoc(docRef)).data();
			await updateDoc(doc(db, newProduct.path), {
				id: newProduct.id
			})
		} catch(e){
			dispatch(showMessage(e.message, 'ERROR') );
		}
	}
}