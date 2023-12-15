import { Form, FloatingLabel } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddressOrder = ({
	typeAddress,
	handlerAddress,
	addressDelivery,
	setAddressDelivery,
	addressShop,
	setAddressShop,
	addressState
}) => {
	const loading = useSelector(state => state.app.loading);
	const address_shop = useSelector(state => state.address_shop.address_shop)

	console.log(typeAddress);

	return (
		<div className="bg-white rounder-3 p-3">
			<h6>Адреса доставки</h6>
			<div className="d-flex flex-column gap-1 mb-3">
				<Form.Check
					name="address"
					type='radio'
					value={'shop'}
					label={`Самовивіз`}
					checked={typeAddress === 'shop'}
					onChange={handlerAddress}
					disabled={loading}
					id={`radio-address-shop`}
				/>
				<Form.Check
					name="address"
					type='radio'
					value={'delivery'}
					label={`Доставка`}
					checked={typeAddress === 'delivery'}
					onChange={handlerAddress}
					disabled={loading}
					id={`radio-address-delivery`}
				/>
			</div>
				{typeAddress === 'delivery' ?
				<div className="checkout__field">
					<FloatingLabel className="mb-2" controlId="town" label="Місто">
						<Form.Control
							placeholder="Місто"
							disabled={loading}
							value={addressDelivery.town}
							onChange={(e) => {setAddressDelivery({...addressDelivery, town: e.target.value})}}
							type="text" />
					</FloatingLabel>
					<FloatingLabel className="mb-2" controlId="street" label="Вулиця">
						<Form.Control
							placeholder="Вулиця"
							disabled={loading}
							value={addressDelivery.street}
							onChange={(e) => {setAddressDelivery({...addressDelivery, street: e.target.value})}}
							type="text" />
					</FloatingLabel>
					<FloatingLabel className="mb-2" controlId="house" label="Будинок">
						<Form.Control
							placeholder="Будинок"
							disabled={loading}
							value={addressDelivery.house}
							onChange={(e) => {setAddressDelivery({...addressDelivery, house: e.target.value})}}
							type="text" />
					</FloatingLabel>
					<FloatingLabel controlId="flat" label="Квартира">
						<Form.Control
							placeholder="Квартира"
							disabled={loading}
							value={addressDelivery.flat}
							onChange={(e) => {setAddressDelivery({...addressDelivery, flat: e.target.value})}}
							type="text" />
					</FloatingLabel>
				</div>
				:
				<div className="checkout__field">
					<FloatingLabel className="mb-2" controlId="select-town" label="Місто">
						<Form.Select
							value={addressShop?.town ?? addressState?.town}
							aria-label="Місто"
							disabled={loading} 
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
							value={addressShop?.street ?? addressState?.shops[0]} 
							aria-label="Вулиця"
							disabled={loading}
							onChange={(e) => {setAddressShop({...addressShop, street: e.target.value})}}
						>
							{addressState.shops.map(street => {
								return (
									<option key={street} value={street}>{street}</option>
								)
							})}
						</Form.Select>
					</FloatingLabel>
				</div>}
		</div>
	);
}
 
export default AddressOrder;