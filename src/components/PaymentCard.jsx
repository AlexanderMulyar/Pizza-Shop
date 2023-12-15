import { Form, FloatingLabel } from "react-bootstrap";
import { useSelector } from "react-redux";

const PaymentCard = ({
	card,
	handlerNumber,
	handlerMonth,
	handlerCvv,
	required=true
}) => {
	const loading = useSelector(state => state.app.loading);
	return (
		<>
			<FloatingLabel className="payment-card__field_big" controlId="number" label="Номер картки">
				<Form.Control
					maxLength="19"
					placeholder="Номер картки"
					value={card.number ?? ''}
					disabled={loading}
					onChange={handlerNumber}
					required={required}
					type="text" />
			</FloatingLabel>
			<div className="d-flex gap-3 mt-3">
				<FloatingLabel className="payment-card__field" controlId="date" label="Дата">
					<Form.Control
						maxLength="5"
						placeholder="Дата"
						value={card.month ?? ''}
						disabled={loading}
						onChange={handlerMonth}
						required={required}
						type="text" />
				</FloatingLabel>
				<FloatingLabel className="payment-card__field" controlId="cvv" label="CVV">
					<Form.Control
						maxLength="3"
						placeholder="CVV"
						value={card.cvv ?? ''}
						disabled={loading}
						onChange={handlerCvv}
						required={required}
						type="password" />
				</FloatingLabel>
			</div>
		</>
	);
}
 
export default PaymentCard;