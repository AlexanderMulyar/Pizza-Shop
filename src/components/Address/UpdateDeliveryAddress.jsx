import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UpdateDeliveryAddress = ({showUpdateAddress, handlerHideAddAddress, updateAddressItem, setUpdateAddressItem, addressState}) => {
	const loading = useSelector(state => state.app.loading);
	const address_shop = useSelector(state => state.address_shop.address_shop)

	return (
		<>
			{showUpdateAddress === 'delivery' ?
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
							value={updateAddressItem.town}
							required
							onChange={(e) => {setUpdateAddressItem({...updateAddressItem, town: e.target.value})}}
							type="text" />
					</FloatingLabel>
					<FloatingLabel className="mb-2" controlId="street" label="Вулиця">
						<Form.Control
							placeholder="Вулиця"
							disabled={loading}
							required
							value={updateAddressItem.street}
							onChange={(e) => {setUpdateAddressItem({...updateAddressItem, street: e.target.value})}}
							type="text" />
					</FloatingLabel>
					<FloatingLabel className="mb-2" controlId="house" label="Будинок">
						<Form.Control
							placeholder="Будинок"
							disabled={loading}
							required
							value={updateAddressItem.house}
							onChange={(e) => {setUpdateAddressItem({...updateAddressItem, house: e.target.value})}}
							type="text" />
					</FloatingLabel>
					<FloatingLabel controlId="flat" label="Квартира">
						<Form.Control
							placeholder="Квартира"
							disabled={loading}
							required
							value={updateAddressItem.flat}
							onChange={(e) => {setUpdateAddressItem({...updateAddressItem, flat: e.target.value})}}
							type="text" />
					</FloatingLabel>
				</div>
				<Button type="submit" className="btn_orange align-self-start rounded-pill py-2 px-4">
					Оновити
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
						<span>Повернутися</span>
					</button>
					<FloatingLabel className="mb-2" controlId="select-town" label="Місто">
						<Form.Select
							value={updateAddressItem.town}
							aria-label="Місто"
							onChange={(e) => {setUpdateAddressItem({
									street: address_shop.filter(x => x.town === e.target.value)[0].shops[0], 
									town: e.target.value,
									id: updateAddressItem.id
								})}}
						>
							{address_shop.map(item => {
								return (
									<option 
										selected={updateAddressItem.town === item.town} 
										key={item.town} 
										value={item.town}>{item.town}
									</option>
								)
							})}
						</Form.Select>
					</FloatingLabel>
					<FloatingLabel controlId="select-street" label="Вулиця">
						<Form.Select 
							aria-label="Вулиця"
							value={updateAddressItem.street}
							onChange={(e) => {setUpdateAddressItem({...updateAddressItem, street: e.target.value})}}
						>
							{addressState.shops.map(street => {
								return (
									<option 
										key={street}
										selected={updateAddressItem.street === street}
										value={street}>{street}
									</option>
								)
							})}
						</Form.Select>
					</FloatingLabel>
				</div>
				<Button type="submit" className="btn_orange align-self-start rounded-pill py-2 px-4">
					Оновити
				</Button>
			</div>}	
		</>
	);
}
 
export default UpdateDeliveryAddress;