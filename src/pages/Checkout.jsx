import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { makeOrder, setOrder } from "../redux/actions";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Agree from "../components/Checkout/Agree";
import Sidebar from "../components/Checkout/Sidebar";
import Payment from "../components/Checkout/Payment";
import Callback from "../components/Checkout/Callback";
import DateTime from "../components/Checkout/DateTime";
import AddressOrder from "../components/Checkout/AddressOrder";

const Checkout = () => {
	const order = useSelector(state => state.orders.currentOrder)
	const user = useSelector(state => state.user.user)
	
	const address = useSelector(state => state.user.personl.address);
	const address_shop = useSelector(state => state.address_shop.address_shop)
	const timeDeliveryData = useSelector(state => state.address_shop.timeDelivery)
	const timeShopData = useSelector(state => state.address_shop.timeShop)
	const active_address = useSelector(state => state.user.personl.address.active_address);
	const payments = useSelector(state => state.user.personl.payments);

	const [timeDelivery, setTimeDelivery] = useState([{}])
	const [timeShop, setTimeShop] = useState([{}])

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [time, setTime] = useState('')
	const [day, setDay] = useState(moment().hour() < 17 ? moment().format('L') : moment().add(1, 'days').format('L'))

	const [typeContact, setTypeContact] = useState(user.phoneNumber)
	const [userPhone, setUserProne] = useState(user.phoneNumber)
	const [userEmail, setUserEmail] = useState(user.email)

	const [typePayment, setTypePayment] = useState('card-on-web')
	const [card, setCard] = useState(payments.active_card)

	const [typeAddress, setTypeAddress] = useState(address.type ?? 'shop')
	const [addressDelivery, setAddressDelivery] = useState({})
	const [addressShop , setAddressShop] = useState({});
	const [addressState, setAddressState] = useState({shops: []}) // for fethed address shops
	
	const [newOrder, setNewOrder] = useState({})
	const [showFormAgree, setShowFormAgree] = useState(false)


	function handlerMessage(e){
		dispatch(setOrder({message: e.target.value}))
	}
	/*Collect order*/
	function handlerCollectOrder(e){
		e.preventDefault();
		const collectOrder = {
			...order,
			products: order.products.map(x => {
				return {id: x.id, count: x.count}
			}),
			date: {
				timeDelivery: time,
				dayDelivery: day,
				dateOrder: moment().format(),
			},
			contacts: typeContact,
			typePayment: {
				type: typePayment,
				card: typePayment === 'card-on-web' ? card : {}
			},
			address: typeAddress === 'shop' ? addressShop : addressDelivery
		}
		setNewOrder(collectOrder)
		setShowFormAgree(true)
	}
	/*Make order*/
	function handlerMakeOrder() {
		dispatch(makeOrder(newOrder))
		setShowFormAgree(false)
		navigate('/')
	}

	function handlerPayment(e) {
		setTypePayment(e.target.value)
	}
	function handlerAddress(e) {
		setTypeAddress(e.target.value)
		if(address.type === 'delivery') {
			setAddressDelivery(active_address)
		} else {
			setAddressDelivery({})
		}
		if(e.target.value === 'shop' && address.type !== 'shop') {
			setAddressShop({town: address_shop[0].town, street: address_shop[0].shops[0]})
		}

		if(e.target.value === 'delivery') {
			setTime(timeDeliveryData[0].text)
		} else {
			setTime(timeShopData[0].text)
		}
	}

	/*Set active address*/
	useEffect(() => {
		if(address.type === 'shop') {
			setAddressShop(active_address);
		} else{
			setAddressDelivery(active_address)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[address, address_shop])

	/*Set time */
	useEffect(() => {
		if(moment().format('L') === day) {
			setTimeDelivery(timeDeliveryData.filter(x => (moment().set({hour: x.value})).hour() > moment().hour()))
			setTimeShop(timeShopData.filter(x => (moment().set({hour: x.value})).hour() > moment().hour()))
			if(typeAddress === 'delivery') {
				setTime(timeDeliveryData.filter(x => (moment().set({hour: x.value})).hour() > moment().hour())[0]?.text)
			} else {
				setTime(timeShopData.filter(x => (moment().set({hour: x.value})).hour() > moment().hour())[0]?.text)
			}
		} else {
			setTimeDelivery(timeDeliveryData)
			setTimeShop(timeShopData)
			if(typeAddress === 'delivery') {
				setTime(timeDeliveryData[0]?.text)
			} else {
				setTime(timeShopData[0]?.text)
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[timeDeliveryData, timeShopData, day, typeAddress])

	/*Set day*/
	useEffect(() => {
		const checkTime = (t) => moment().set({'hour': t, 'second': '0', 'minute': '0'}).hour() > moment().hour()
		if(moment().hour() < 17) {		
			setTimeDelivery(timeDelivery.filter(time => checkTime(time.value)))
			setTimeShop(timeDelivery.filter(time => checkTime(time.value)))
		}
		if(!payments.cards.length) {
			setTypePayment('card')
		}
		// title for page
		document.title = `Замовлення | Pizza-Shop`;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	
	/*active card*/
	useEffect(() => {
		setCard(payments.active_card)
	},[payments.active_card])
	
	/* Set streets depends on town*/
	useEffect(() => {
		setAddressState(address_shop.filter(x => x.town === addressShop.town)[0] ?? address_shop[0])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addressShop])

	return (
		<section className="checkout">
			<Container fluid='md'>
				<Form onSubmit={handlerCollectOrder}>
					<div className="mb-3">
						<Link to='/cart' className="link">Кошик</Link>
						<span className="mx-1">|</span>
						<span className="fw-bold">Оформлення замовлення</span>
					</div>
					<h5>Отримання замовлення</h5>
					<div className="d-flex flex-lg-row flex-column gap-3">
						<div className="checkout__content">
							<AddressOrder
								typeAddress={typeAddress}
								handlerAddress={handlerAddress}
								addressDelivery={addressDelivery}
								setAddressDelivery={setAddressDelivery}
								addressShop={addressShop}
								setAddressShop={setAddressShop}
								addressState={addressState}
							/>
							<DateTime
								setDay={setDay}
								day={day}
								time={time}
								setTime={setTime}
								typeAddress={typeAddress}
								timeDelivery={timeDelivery}
								timeShop={timeShop}
							/>
							<Callback
								setTypeContact={setTypeContact}
								userPhone={userPhone}
								setUserProne={setUserProne}
								userEmail={userEmail}
								setUserEmail={setUserEmail}
							/>
							<Payment
								handlerPayment={handlerPayment}
								typePayment={typePayment}
								card={card}
								setCard={setCard}
							/>
						</div>
						<Sidebar
							handlerMessage={handlerMessage}
							typePayment={typePayment}
							typeAddress={typeAddress}
							addressDelivery={addressDelivery}
						/>
					</div>
				</Form>
			</Container>
			<Agree
				showFormAgree={showFormAgree}
				setShowFormAgree={setShowFormAgree}
				newOrder={newOrder}
				typePayment={typePayment}
				handlerMakeOrder={handlerMakeOrder}
			/>
		</section>
	);
}
 
export default Checkout;