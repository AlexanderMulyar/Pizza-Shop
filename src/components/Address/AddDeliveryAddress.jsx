import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddDeliveryAddress = ({
	showAddAddress, 
	handlerHideAddAddress, 
	setAddressShop, 
	addressShop, 
	addressState, 
	addressDelivery, 
	setAddressDelivery
}) => {
	const loading = useSelector(state => state.app.loading);
	const address_shop = useSelector(state => state.address_shop.address_shop)
	return (
		<>
			{showAddAddress === 'delivery' ?
			<div className="h-100 d-flex flex-column justify-content-between">
				<div>
					<button
						type="button"
						className="mb-3 address__btn_light rounded-pill fw-bold d-flex align-items-center gap-1"
						onClick={() => handlerHideAddAddress('delivery')}>
						<FontAwesomeIcon icon="fa-solid fa-arrow-left-long" />
						<span>До моїх адрес</span>
					</button>
					<FloatingLabel className="mb-2" controlId="town" label="Місто">
						<Form.Control
							placeholder="Місто"
							disabled={loading}
							required
							onChange={(e) => {setAddressDelivery({...addressDelivery, town: e.target.value})}}
							type="text" />
					</FloatingLabel>
					<FloatingLabel className="mb-2" controlId="street" label="Вулиця">
						<Form.Control
							placeholder="Вулиця"
							disabled={loading}
							required
							onChange={(e) => {setAddressDelivery({...addressDelivery, street: e.target.value})}}
							type="text" />
					</FloatingLabel>
					<FloatingLabel className="mb-2" controlId="house" label="Будинок">
						<Form.Control
							placeholder="Будинок"
							disabled={loading}
							required
							onChange={(e) => {setAddressDelivery({...addressDelivery, house: e.target.value})}}
							type="text" />
					</FloatingLabel>
					<FloatingLabel className="mb-2" controlId="flat" label="Квартира">
						<Form.Control
							placeholder="Квартира"
							disabled={loading}
							required
							onChange={(e) => {setAddressDelivery({...addressDelivery, flat: e.target.value})}}
							type="text" />
					</FloatingLabel>
				</div>
				<Button 
					type="submit"
					disabled={!(addressDelivery.town)?.trim() 
						|| !(addressDelivery.street)?.trim() 
						||!(addressDelivery.house)?.trim() 
						||!(addressDelivery.flat)?.trim()
						|| loading}
					className="btn_orange align-self-start rounded-pill py-2 px-4"
					>
					Додати
				</Button>
			</div>
			:
			<div className="h-100 d-flex flex-column justify-content-between">
				<div>
					<button
						type="button"
						className="mb-3 address__btn_light rounded-pill fw-bold d-flex align-items-center gap-1" 
						onClick={() => handlerHideAddAddress('shop')}
					>
						<FontAwesomeIcon icon="fa-solid fa-arrow-left-long" />
						<span>Повернутися до моїх ресторанів</span>
					</button>
					<FloatingLabel className="mb-2" controlId="select-town" label="Місто">
						<Form.Select
							value={addressShop.town ?? addressState.town}
							aria-label="Місто" 
							onChange={(e) => {setAddressShop(
								// get first street when change town
								{street: address_shop.filter(x => x.town === e.target.value)[0].shops[0],
									town: e.target.value
								})}}
						>
							{address_shop.map(item => {
								return (
									<option key={item.town} value={item.town}>{item.town}</option>
								)
							})}
						</Form.Select>
					</FloatingLabel>
					<FloatingLabel controlId="select-street" label="Вулиця">
						<Form.Select
							value={addressShop.street ?? addressState.shops[0]} 
							aria-label="Вулиця" 
							onChange={(e) => {setAddressShop({...addressShop, street: e.target.value})}}
						>
							{addressState.shops.map(street => {
								return (
									<option key={street} value={street}>{street}</option>
								)
							})}
						</Form.Select>
					</FloatingLabel>
				</div>
				<Button type="submit" className="btn_orange align-self-start rounded-pill py-2 px-4">
					Додати
				</Button>
			</div>}
		</>
	);
}
 
export default AddDeliveryAddress;