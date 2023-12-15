import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, ref } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import placeholder  from '../../img/placeholder.png';
import { storage } from '../../firebase';
import { addToOrder, removeFromOrder } from '../../redux/actions';
import AddToCart from '../AddToCart';
import { Link } from 'react-router-dom';

const CartPageItem = ({item}) => {
	const [imgUrl, setImgUrl] = useState([])
	const dispatch = useDispatch();
	const [productInOrder, setProductInOrder] = useState(item.count)
	const allProducts =  useSelector(state => state.products.products)
	const [products, setProducts] = useState({})

	function handlerAddToOrder(){
		setProductInOrder(productInOrder + 1);
		dispatch(addToOrder({...item, count: productInOrder + 1}))
	}
	function handlerRemoveFromOrder(){
		setProductInOrder(productInOrder - 1);
		if(productInOrder - 1 === 0) {
			dispatch(removeFromOrder(item))
		} else {
			dispatch(addToOrder({...item, count: productInOrder - 1}))
		}
	}
	useEffect(() => {
		async function getImg(){
			const fileUrl = await getDownloadURL(ref(storage, item.imgUrl))
			setImgUrl(fileUrl)
		}
		getImg()
		setProducts(
      allProducts.filter(
        (p) => p.contents.filter((x) => x.id === item.id).length
      )[0]
    );
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<div key={item.id} className="cart__item item-cart d-flex flex-md-row flex-column align-items-center bg-white rounded-3 py-2 px-4 position-relative w-100">
				<div className='d-flex align-items-center'>
					<Link to={`/product/${item.id}`} state={{ product: item, products }} className="item-cart__img">
						<img src={imgUrl ? imgUrl : placeholder} alt={item.name} />
					</Link>
					<div className='d-flex align-items-center flex-md-row flex-column justify-content-md-around'>
						<span className="item-cart__name">{item.name}</span>
						<span className='fw-light mt-md-0 mt-1 align-self-md-center align-self-start'>{item.weight}{item.type}</span>
					</div>
				</div>
				<div className='d-flex align-items-center justify-content-center justify-content-md-around w-100 gap-3 mt-md-0 mt-3'>
					<span className='fw-light'>{item.price} грн</span>
					<AddToCart 
						count={item.count} 
						addToCart={handlerAddToOrder} 
						removeFromCart={handlerRemoveFromOrder}
					/>
					<span className='fw-bold'>{(item.price * item.count).toFixed(2)} грн</span>
				</div>
				<button className='cart__remove' onClick={() => dispatch(removeFromOrder(item))}>
					<FontAwesomeIcon icon="fa-solid fa-xmark" />
				</button>
			</div>
		</>
	);
}
 
export default CartPageItem;