import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateUserAddressField, removeUserAddressDelivery, removeUserAddressShop } from "../../redux/actions";

const ListAddress = ({type,handlerType, address,handlerUpdateAddress, handlerShowAddAddress}) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user.user);

	function handelDelete(item) {
		if(type === 'shop'){
			dispatch(removeUserAddressShop(user, address.shop, item))
		} else if(type === 'delivery') {
			dispatch(removeUserAddressDelivery(user, address.delivery, item))
		}
		if(item.id === address.active_address?.id) {
			dispatch(updateUserAddressField(user, {type, active_address: {}}))
		}
	}
	function handelCheckAddress(item) {
		dispatch(updateUserAddressField(user, {type, active_address: item}))
	}
	return (
		<div className="d-flex flex-column h-100">
			<div className="mx-auto mb-3">
				<div className="address__switch switch-address">
					<input 
						onChange={handlerType} 
						checked={type === 'shop'} 
						className="switch-address__checkbox" 
						type="checkbox"
					></input>
					<label className="switch-address__label">
						<span className="switch-address__label_span">Доставка</span>
					</label>
				</div>
			</div>
			{type === 'delivery' ?
				<>
					<p className="text-center address__text_light">Створіть список улюблених адрес й замовляйте ще зручніше</p>
					<ul className="p-0 d-flex flex-column gap-1">
						{address.delivery.map(item => {
							return (
								<li key={item.id} className="d-flex align-items-center justify-content-between">
									<div className="d-flex gap-3 w-100">
										<Form.Check 
											type='radio' 
											name="delivery" 
											id={`delivery-${item.id}`}
											checked={item.id === address.active_address?.id}
											onChange={() => handelCheckAddress(item)}
										/>
										<span className="address__link w-100" onClick={() => handlerUpdateAddress(item)}>
											{item.town} {item.street} {item.house} {item.flat}
										</span>
									</div>
									<button
										className="remove-btn"
										onClick={() => handelDelete(item)}
										type="button"
										><FontAwesomeIcon icon="fa-solid fa-xmark" />
									</button>
								</li>
							)
						})}
					</ul>
					<Button 
						className='btn_orange rounded-pill py-2 px-3 d-block mx-auto mt-auto' 
						onClick={handlerShowAddAddress}
					>
						<span className="me-2">
							<FontAwesomeIcon icon="fa-solid fa-plus" />
						</span> 
						<span>Додати адресу</span>
					</Button>
				</>
				:
				<div className="h-100 d-flex flex-column justify-content-between">
					<div>
						<p className="text-center address__text_light"
							>Створіть список улюблених ресторінів й замовляйте ще зручніше
						</p>
						<ul className="p-0 d-flex flex-column gap-1">
							{address.shop.map(item => {
								return (
									<li key={item.id} className="d-flex align-items-center justify-content-between">
										<div className="d-flex gap-3 w-100">
											<Form.Check 
												type='radio' 
												name="shop" 
												id={`shop-${item.id}`}
												checked={item.id === address.active_address?.id}
												onChange={() => handelCheckAddress(item)}
											/>
											<span
												className="address__link w-100"
												onClick={() => handlerUpdateAddress(item)}
											>{item.town} {item.street}</span>
										</div>
										<button
											className="remove-btn"
											onClick={() => handelDelete(item)}
											type="button"
											><FontAwesomeIcon icon="fa-solid fa-xmark" />
										</button>
									</li>
								)
							})}
						</ul>
					</div>
					<Button
						className='btn_orange rounded-pill py-2 px-3 mt-5 d-block mx-auto'  
						onClick={handlerShowAddAddress}
					>
						<span className="me-2">
							<FontAwesomeIcon icon="fa-solid fa-plus" />
						</span> 
						<span>Додати ресторан</span>
					</Button>
				</div>
			}
		</div>
	);
}
 
export default ListAddress;