import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Agree = ({
	showFormAgree,
	setShowFormAgree,
	newOrder,
	typePayment,
	handlerMakeOrder
}) => {
	const loading = useSelector(state => state.app.loading);
	return (
		<Modal show={showFormAgree} onHide={() => setShowFormAgree(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Підтвердження замовлення</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Доставка: <span className="fw-bold">{newOrder.price?.toFixed(2) >= 300 ? 0 : 49} грн</span></p>
				<p className="fw-bold">Всього: <span>{newOrder.price?.toFixed(2)} грн</span></p>
				<p>Вага з супутнім пакованням:<span className="fw-bold">{newOrder.weight} кг</span></p>
				<p>Адреса: 
				<span> {newOrder.address?.town} </span>
				<span>{newOrder.address?.street} </span>
				<span>{newOrder.address?.house}  </span>
				<span>{newOrder.address?.flat} </span>
				</p>
				<p>Час доставки: <span>{newOrder.date?.timeDelivery} {newOrder.date?.dayDelivery}</span>
				</p>
				<p>Тип оплати: <span>
					{typePayment === 'card-on-web' ? 'Карткою на сайті' : typePayment === 'card' ? 'Карткою при отриманні' : 'Готівкою'}
				</span>
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button disabled={loading} type="button" className="btn_light rounded-pill py-2 px-3" onClick={() => setShowFormAgree(false)}>
					Закрити
				</Button>
				<Button disabled={loading} type="button" className="btn_orange rounded-pill py-2 px-3" onClick={handlerMakeOrder}>
					Підтвердити
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
 
export default Agree;