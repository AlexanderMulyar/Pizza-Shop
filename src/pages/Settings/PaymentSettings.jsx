import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeUserPayments, showMessage, updateUserPayments, updateUserPaymentsField } from "../../redux/actions";
import PaymentCard from "../../components/PaymentCard";

const PaymentSettings = () => {
	const loading = useSelector(state => state.app.loading);
	const user = useSelector(state => state.user.user);
	const payments = useSelector(state => state.user.personl.payments);
	const dispatch = useDispatch();
	const [card, setCard] = useState({})
	function updatePaymentCard(e){
		e.preventDefault();
		if(payments.cards.find(x => x.number === card.number)){
			dispatch(showMessage('You can\'t add card twice', 'ERROR') );
			return
		}
		dispatch(updateUserPayments(user, payments.cards, card))
		setCard({})
	}
	function handlerNumber(e){
		setCard({...card, number: e.target.value?.replace(/[ \D]/gi, '').match(/.{1,4}/g)?.join(' ')});
	}
	function handlerMonth(e){
		setCard({...card, month: e.target.value.replace(/[/ \D]/gi, '').match(/.{1,2}/g)?.join('/')});
	}
	function handlerCvv(e){
		setCard({...card, cvv: e.target.value.replace(/\D/gi, '')});
	}
	function handlerRemoveCard(payment){
		dispatch(removeUserPayments(user, payments.cards, payment))
		if(payment.number === payments.active_card?.number) {
			dispatch(updateUserPaymentsField(user, {active_card: {}}))
		}
	}
	function handelCheckPayments(item) {
		dispatch(updateUserPaymentsField(user, {active_card: item}))
	}
	useEffect(() => {
		// title for page
		document.title = `Оплата | Pizza-Shop`;
	// eslint-disable-next-line
	}, [])
	return (
		<section className="w-100">
			<div className="bg-white p-4">
				<h4>Налаштування оплати</h4>
				<hr className="line my-2" />
				<ul className="p-0 d-flex flex-column gap-2 my-4">
					{payments.cards && payments.cards.map(payment => {
						return (
							<li key={payment.number} className='d-flex gap-3 align-items-center'>
								<Form.Check 
									type='radio' 
									name="card" 
									id={`card-${payment.number}`}
									checked={payment.number === payments.active_card?.number}
									onChange={() => handelCheckPayments(payment)}
								/>
								<span>{payment.number.replace(/[0-9](?=.{4})/g, "*")}</span>
								<button 
									className="remove-btn" 
									onClick={() => handlerRemoveCard(payment)}
								>
									<FontAwesomeIcon icon="fa-solid fa-xmark" />
								</button>
							</li>
						)
					})}
				</ul>
				<Form onSubmit={updatePaymentCard}>
					<PaymentCard
						card={card}
						handlerNumber={handlerNumber}
						handlerMonth={handlerMonth}
						handlerCvv={handlerCvv}
					/>
					<Button 
						type='submit'
						className="mt-5 btn_orange rounded-pill py-2 px-3"
						disabled={loading || card.cvv?.length !== 3 || card.number?.length !== 19 || card.month?.length !== 5}
					>Зберегти</Button>
				</Form>
			</div>
		</section>
	);
}
 
export default PaymentSettings;