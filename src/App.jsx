import { Route, Routes, useLocation, Navigate} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { unsubscribe, fetchProducts, getUserData, fetchAddress, fetchTime } from "./redux/actions";

import Loader from "./components/App/Loader";
import Message from "./components/App/Message";
import AllStafsBottom from "./components/AllStafsBottom";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";

import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";
import Checkout from "./pages/Checkout";
import Address from "./pages/Address";

import Home from "./pages/Home/Home";

import Profile from "./pages/Settings/Profile";
import PaymentSettings from "./pages/Settings/PaymentSettings";
import Orders from "./pages/Settings/Orders";
import Product from "./pages/Product";
import ScrollToTop from "./components/App/ScrollToTop";
import NotFound from "./pages/NotFound";




function App() {
	const dispatch = useDispatch();
	let location = useLocation();
	const message = useSelector(state => state.app.message);
	const bg_loading = useSelector(state => state.app.bg_loading);
	const user = useSelector(state => state.user.user);
	const order = useSelector(state => state.orders.currentOrder)
	let state = location.state;
	let backgroundLocation = state?.backgroundLocation
	useEffect(() => {
		dispatch(unsubscribe());
		if(user) {
			dispatch(getUserData(user));
		}
		dispatch(fetchAddress())
		dispatch(fetchTime())
		dispatch(fetchProducts())
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	/*get personal data*/
	
  	return (
		<div className="wrapper min-vh-100 w-100 d-flex flex-column">
			{bg_loading && 
				<div className="loader position-fixed top-0 left-0 d-flex justify-content-center align-items-center w-100 h-100">
					<Loader/>
				</div>
			}
			<Message message={message} title={'Error'} />
			<Header/>
			<main className="main">
				{backgroundLocation && (
				<Routes>
					{location.pathname.includes('auth') && <Route path={location.pathname} element={<Auth />} />}
					{location.pathname.includes('address') &&
						<Route path={location.pathname} element={user ? <Address /> : <Navigate to="/" />} />
					}
				</Routes>
				)}
				<Routes location={backgroundLocation || location}>
					<Route path="/" element={<Home />} />
					<Route path="/settings" element={user ? <Settings /> : <Navigate to="/" />}>
						<Route index path="profile" element={<Profile />} />
						<Route path="payment" element={<PaymentSettings />} />
						<Route path="purchases" element={<Orders />} />
					</Route>
					<Route path="/product/:id" element={<Product />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={(user && order.products.length) ? <Checkout /> : <Navigate to="/" />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<AllStafsBottom/>
			<ScrollToTop/>
			<Footer/>
		</div>	
	);
}

export default App;
