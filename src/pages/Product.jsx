import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getDownloadURL, ref } from 'firebase/storage';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment";
import { addToOrder, makeMark, removeFromOrder, updateMark } from '../redux/actions';
import { storage } from '../firebase';
import AddToCart from '../components/AddToCart';
import placeholder from '../img/placeholder.png'

const Product = () => {
	let location = useLocation()
	let product = location.state.product ?? {marks: [], info: []}
	let products = location.state.products ?? {contents: []}
	const dispatch = useDispatch();
	const order = useSelector(state => state.orders.currentOrder)
	const user = useSelector(state => state.user.user);
	const [imgUrl, setImgUrl] = useState('')
	const timeDeliveryData = useSelector(state => state.address_shop.timeDelivery)
	const [productInOrder, setProductInOrder] = useState(0)
	const [timeShop, setTimeShop] = useState([{}])
	const [mark, setMark] = useState(0);
	useEffect(() => {
		async function getImg(){
			const fileUrl = await getDownloadURL(ref(storage, product.imgUrl))
			setImgUrl(fileUrl)
		}
		getImg()
		setProductInOrder(order.products.find(x => x.id === product.id)?.count ?? 0)
		setMark(Math.round(
			product.marks.map(x => x.mark).reduce((a,b) => +a + +b, 0) / (!!product.marks.length ? product.marks.length : 1)
		))

		// title for page
		document.title = `${product.name} | Pizza-Shop`;
	// eslint-disable-next-line
	}, [])
	useEffect(() => {
		const checkTime = (t) => moment().set({'hour': t, 'second': '0', 'minute': '0'}).hour() > moment().hour()
		if(moment().hour() < 17) {
			setTimeShop(timeDeliveryData.filter(time => checkTime(time.value)))
		}
	}, [timeDeliveryData])
	function handlerAddToOrder(){
		setProductInOrder(productInOrder + 1);
		dispatch(addToOrder({...product, count: productInOrder + 1}))
	}
	function handlerRemoveFromOrder(){
		setProductInOrder(productInOrder - 1);
		if(productInOrder - 1 === 0) {
			dispatch(removeFromOrder(product))
		} else {
			dispatch(addToOrder({...product, count: productInOrder - 1}))
		}
	}

	function handlerMark(e) {
		if(product.marks.filter(x => x.userId === user.uid).length) { // if user already mark
			const allMarks = product.marks.filter(x => x.userId !== user.uid).map(x => x.mark)
			allMarks.push(e.target.value)
			const newMark = Math.round(allMarks.reduce((a,b) => +a + +b, 0) / allMarks.length)
			setMark(newMark)
			const array = [...product.marks.filter(x => x.userId !== user.uid), {mark: +e.target.value, userId: user.uid} ]
			dispatch(updateMark(+newMark, array, products, product))
		} else {
			const allMarks = product.marks.map(x => x.mark)
			allMarks.push(e.target.value)
			const newMark = Math.round(allMarks.reduce((a,b) => +a + +b, 0) / allMarks.length)
			setMark(newMark)
			dispatch(makeMark(+newMark, {mark: +e.target.value, userId: user.uid}, products, product))
		}
	}

	return (
		<section className="product">
			<Container fluid='md'>
				<div className="bg-white row p-5 justify-content-center">
					<div className="col-md-5 col-sm-7 col-12 product__img">
						<img className="w-100 h-100" src={imgUrl ? imgUrl : placeholder} alt={product.name} />
					</div>
					<div className="d-flex flex-column col-md-6 col-sm-7 col-12">
						<h2>{product.name}</h2>
						{product?.descriptions && <p>{product.descriptions}</p>}
						<div className='d-flex align-items-center'>
							{ user ? 
							<div className="ratting-product product__ratting d-flex" onChange={handlerMark}>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-0" 
									value="0" 
									type="radio" 
									checked={!mark}
									readOnly
								/>
								<label aria-label="1 star" className="ratting-product__label" htmlFor="rating-1">
									<FontAwesomeIcon 
										icon="fa-solid fa-star" 
										className="fs-4 ratting-product__icon ratting-product__icon_star"
									/>
								</label>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-1" 
									value="1" 
									type="radio"
									checked={mark === 1}
									readOnly
								/>

								<label aria-label="2 stars" className="ratting-product__label" htmlFor="rating-2">
									<FontAwesomeIcon 
										icon="fa-solid fa-star" 
										className="fs-4 ratting-product__icon ratting-product__icon_star"
									/>
								</label>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-2" 
									value="2" 
									type="radio"
									checked={mark === 2}
									readOnly
								/>

								<label aria-label="3 stars" className="ratting-product__label" htmlFor="rating-3">
									<FontAwesomeIcon 
										icon="fa-solid fa-star" 
										className="fs-4 ratting-product__icon ratting-product__icon_star"
									/>
								</label>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-3" 
									value="3" 
									type="radio"
									checked={mark === 3}
									readOnly
								/>

								<label aria-label="4 stars" className="ratting-product__label" htmlFor="rating-4">
									<FontAwesomeIcon 
										icon="fa-solid fa-star" 
										className="fs-4 ratting-product__icon ratting-product__icon_star"
									/>
								</label>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-4" 
									value="4" 
									type="radio"
									checked={mark === 4}
									readOnly
								/>
								<label aria-label="5 stars" className="ratting-product__label" htmlFor="rating-5">
									<FontAwesomeIcon 
										icon="fa-solid fa-star" 
										className="fs-4 ratting-product__icon ratting-product__icon_star"
									/>
								</label>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-5" 
									value="5" 
									type="radio"
									checked={mark === 5}
									readOnly
								/>
							</div>
							: <Link 
									to={`${location.pathname}/auth`} 
									state={{ backgroundLocation: location }} 
									className="ratting-product product__ratting d-flex"
								>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-0" 
									value="0" 
									type="radio" 
									checked={!mark}
									readOnly
								/>
								<label aria-label="1 star" className="ratting-product__label" htmlFor="rating-1">
									<FontAwesomeIcon 
										icon="fa-solid fa-star" 
										className="fs-4 ratting-product__icon ratting-product__icon_star"
									/>
								</label>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-1" 
									value="1" 
									type="radio"
									checked={mark === 1}
									readOnly
								/>

								<label aria-label="2 stars" className="ratting-product__label" htmlFor="rating-2">
									<FontAwesomeIcon 
										icon="fa-solid fa-star" 
										className="fs-4 ratting-product__icon ratting-product__icon_star"
									/>
								</label>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-2" 
									value="2" 
									type="radio"
									checked={mark === 2}
									readOnly
								/>

								<label aria-label="3 stars" className="ratting-product__label" htmlFor="rating-3">
									<FontAwesomeIcon 
										icon="fa-solid fa-star" 
										className="fs-4 ratting-product__icon ratting-product__icon_star"
									/>
								</label>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-3" 
									value="3" 
									type="radio"
									checked={mark === 3}
									readOnly
								/>

								<label aria-label="4 stars" className="ratting-product__label" htmlFor="rating-4">
									<FontAwesomeIcon 
										icon="fa-solid fa-star" 
										className="fs-4 ratting-product__icon ratting-product__icon_star"
									/>
								</label>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-4" 
									value="4" 
									type="radio"
									checked={mark === 4}
									readOnly
								/>
								<label aria-label="5 stars" className="ratting-product__label" htmlFor="rating-5">
									<FontAwesomeIcon 
										icon="fa-solid fa-star" 
										className="fs-4 ratting-product__icon ratting-product__icon_star"
									/>
								</label>
								<input 
									className="ratting-product__input" 
									name="rating" 
									id="rating-5" 
									value="5" 
									type="radio"
									checked={mark === 5}
									readOnly
								/>
							</Link>}
							<span className='me-3 ms-2 fw-bold'>{mark}</span>
							<span className='product__mark'>{product.marks.length} оцінки</span>		
						</div>
						
						<span className="fw-bold ln-1 mt-2 d-inline-block">{product.weight}{product.type}</span>
						<hr className='line mt-0 product__line' />
						{!product.oldPrice && 
							<div className='fs-3 fw-bold product__price my-3'>{product.price} <span className='fs-5 fw-normal'>грн</span></div>
						}
						{!!product.oldPrice && 
						<div className='d-flex flex-column my-3'>
							<div className='fs-5 text-decoration-line-through lh-1 product__price_through'>{product.oldPrice}</div>
							<div className='fs-3 fw-bold product__price'>{product.price} <span className='fs-5 fw-normal'>грн</span></div>
						</div>
						}					
						{!productInOrder ? <button 
							onClick={() => handlerAddToOrder()} 
								className='btn_orange rounded-pill py-2 px-4 d-flex align-items-center gap-2 product__cart'
							>
								<FontAwesomeIcon icon="fa-solid fa-cart-shopping" className='fs-5' />
								<span>В кошик</span>
							</button>
						: <div className="product__add-product">
							<AddToCart 
								count={productInOrder} 
								addToCart={handlerAddToOrder} 
								removeFromCart={handlerRemoveFromOrder} /> 
						</div>
						}
						<div className="row gap-3 mt-3">
							{product.info.map(info => {
								return (
									<div key={info.title} className="col-5 d-flex flex-column">
										<span>{info.title}</span>
										<span>{info.value}</span>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
 
export default Product;