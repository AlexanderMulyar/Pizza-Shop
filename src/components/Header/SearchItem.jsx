import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storage } from "../../firebase";
import placeholder  from '../../img/placeholder.png';
import { addToOrder, removeFromOrder } from "../../redux/actions";
import AddToCart from "../AddToCart";

const SearchItem = ({item, handlerSearchRemove}) => {
	const [imgUrl, setImgUrl] = useState('')
	const [productInOrder, setProductInOrder] = useState(0)
	const order = useSelector(state => state.orders.currentOrder)
	const allProducts =  useSelector(state => state.products.products)
	const [products, setProducts] = useState({})
	const dispatch = useDispatch();
	useEffect(() => {
		async function getImg(){
			const fileUrl = await getDownloadURL(ref(storage, item.imgUrl))
			setImgUrl(fileUrl)
		}
		getImg()
		setProductInOrder(order.products.find(x => x.id === item.id)?.count ?? 0)
		// eslint-disable-next-line array-callback-return
		setProducts(allProducts.filter((p) => {
			if (p.contents.filter(x => x.id === item.id).length) {
				return p;
			}
		})[0])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
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
	return (
		<div className="d-flex align-items-center">
			<Link 
				className='search-header__link d-flex align-items-center justify-content-between w-100 me-2' 
				to={`/product/${item.id}`}
				onClick={handlerSearchRemove}
				state={{ product: item, products }}
			>
				<div className="d-flex align-items-center gap-1">
					<div className="search-header__img">
						<img src={imgUrl ? imgUrl : placeholder} alt={item.name} />
					</div>
					<div className="d-inline-flex flex-column w-75">
						<span>{item.name}</span>
						<span>{item.weight} {item.type}</span>
					</div>
				</div>
				<div className="d-flex align-items-center w-25 justify-content-end">
					<div>{item.price} <span>грн</span></div>
				</div>
			</Link>
			{!productInOrder ? <button 
				onClick={() => handlerAddToOrder()} 
					className='item-products__cart shadow rounded-circle p-2'
				>
				<FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
				</button>
			: <AddToCart 
				count={productInOrder} 
				addToCart={handlerAddToOrder} 
				removeFromCart={handlerRemoveFromOrder} /> 
			}
		</div>
	);
}
 
export default SearchItem;