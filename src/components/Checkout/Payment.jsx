import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showMessage, updateUserPayments } from "../../redux/actions";
import PaymentCard from "../PaymentCard";

const Payment = ({
	handlerPayment,
	typePayment,
	card,
	setCard
}) => {
	const payments = useSelector(state => state.user.personl.payments);
	const loading = useSelector(state => state.app.loading);
	const user = useSelector(state => state.user.user);
	const dispatch = useDispatch();
	const [newCard, setNewCard] = useState({})

	function handelCheckPayments(item) {
		setCard(item)
	}
	function handlerNumber(e){
		setNewCard({...newCard, number: e.target.value?.replace(/[ \D]/gi, '').match(/.{1,4}/g)?.join(' ')});
	}
	function handlerMonth(e){
		setNewCard({...newCard, month: e.target.value.replace(/[/ \D]/gi, '').match(/.{1,2}/g)?.join('/')});
	}
	function handlerCvv(e){
		setNewCard({...newCard, cvv: e.target.value.replace(/\D/gi, '')});
	}
	function addNewCard(){
		if(payments.cards.find(x => x.number === newCard.number)){
			dispatch(showMessage('You can\'t add card twice', 'ERROR') );
			return
		}
		dispatch(updateUserPayments(user, payments.cards, newCard))
		setNewCard({})
		setCard(newCard)
	}

	return (
		<div>
			<h5>Оплата</h5>
			<div className="bg-white rounder-3 p-3">
				<Form.Check
					name="payment"
					type='radio'
					checked={typePayment === 'card-on-web'}
					onChange={handlerPayment}
					value={'card-on-web'}
					label={`Карткою на сайті`}
					id={`radio-web-card`}
					disabled={loading}
				/>
				<Form.Check
					name="payment"
					type='radio'
					value={'card'}
					checked={typePayment === 'card'}
					onChange={handlerPayment}
					label={`Карткою при отриманні`}
					id={`radio-delivery-card`}
					disabled={loading}
				/>
				<Form.Check
					name="payment"
					type='radio'
					value={'cach'}
					checked={typePayment === 'cach'}
					onChange={handlerPayment}
					label={`Готівкою`}
					id={`radio-delivery-cash`}
					disabled={loading}
				/>
				
				{typePayment === 'card-on-web' && 
				<>
					<ul>
						{payments.cards && payments.cards.map(payment => {
						return (
							<li key={payment.number} className='d-flex gap-3 align-items-center'>
								<Form.Check 
									type='radio' 
									name="card"
									disabled={loading} 
									id={`card-${payment.number}`}
									checked={payment.number === card?.number}
									onChange={() => handelCheckPayments(payment)}
								/>
								<span>{payment.number.replace(/[0-9](?=.{4})/g, "*")}</span>
							</li>
						)
					})}
					</ul>
					<div className="mt-4">
						<PaymentCard
							card={newCard}
							handlerNumber={handlerNumber}
							required={false}
							handlerMonth={handlerMonth}
							handlerCvv={handlerCvv}
						/>
						<Button 
						type='button'
						onClick={addNewCard}
						className="mt-5 btn_orange rounded-pill py-2 px-3"
						disabled={loading || newCard.cvv?.length !== 3 || newCard.number?.length !== 19 || newCard.month?.length !== 5}
					>Додати картку</Button>
					</div>
				</>
				}
			</div>
		</div>
	);
}
 
export default Payment;