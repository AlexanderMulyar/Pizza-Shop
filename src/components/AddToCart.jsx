import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddToCart = ({count, addToCart, removeFromCart}) => {
	return (
		<div className="add-to-cart p-1 rounded-pill d-flex align-items-center">
			<button className="add-to-cart__btn" onClick={addToCart}>
				<FontAwesomeIcon icon="fa-solid fa-plus" />
			</button>
			<span className="mx-2 fs-6">{count}</span>
			<button className="add-to-cart__btn" onClick={removeFromCart}>
				<FontAwesomeIcon icon="fa-solid fa-minus" />
			</button>
		</div>
	);
}
 
export default AddToCart;