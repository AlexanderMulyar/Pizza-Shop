import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Sidebar = ({handlerMessage, typePayment, typeAddress, addressDelivery}) => {
	const order = useSelector(state => state.orders.currentOrder)
	const payments = useSelector(state => state.user.personl.payments);
	const loading = useSelector(state => state.app.loading);
	const [disableBtn, setDisableBtn] = useState(false);

	useEffect(() => {
		if(!payments.cards.length && typePayment === 'card-on-web') {
			setDisableBtn(true)
		} else if(typeAddress === 'delivery' &&
			(!(addressDelivery.town)?.trim() 
			|| !(addressDelivery.street)?.trim() 
			|| !(addressDelivery.house)?.trim() 
			|| !(addressDelivery.flat)?.trim())
		){
			setDisableBtn(true)
		} else {
			setDisableBtn(false)
		}
	}, [typePayment, payments, typeAddress, addressDelivery])
	
	return (
		<aside className="bg-white h-100 p-4 rounded-3 checkout__sidebar">
			<p>Доставка: <span className="fw-bold">{order.price.toFixed(2) >= 300 ? 0 : 49} грн</span></p>
			<p className="fw-bold">Всього: <span>{order.price.toFixed(2)} грн</span></p>
			<p>Вага з супутнім пакованням:<span className="fw-bold">{order.weight} кг</span></p>
			<Form.Group className="mb-3" controlId="order-info">
				<Form.Label>Коментар до замовлення</Form.Label>
				<Form.Control 
					as="textarea" rows={3}
					value={order.message} 
					onChange={handlerMessage} />
			</Form.Group>
			<Button disabled={loading || disableBtn} type="submit" className="btn_orange rounded-pill py-2 px-3">
				Підтвердети
			</Button>
		</aside>
	);
}
 
export default Sidebar;