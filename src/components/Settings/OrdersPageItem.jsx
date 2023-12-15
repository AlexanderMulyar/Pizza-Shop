/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import placeholder  from '../../img/placeholder.png';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrdersPageItem = ({product}) => {
	const [imgUrl, setImgUrl] = useState([])
	const allProducts =  useSelector(state => state.products.products)
	const [products, setProducts] = useState({})
	useEffect(() => {
		async function getImg(){
			const fileUrl = await getDownloadURL(ref(storage, product.imgUrl))
			setImgUrl(fileUrl)
		}
		getImg()
		setProducts(
      allProducts.filter(
        (p) => p.contents.filter((x) => x.id === product.id).length
      )[0]
    );
	}, [])

	return (
		<div 
			className="d-flex flex-sm-row flex-column orders-item align-items-sm-center 
				py-2 px-4 ps-0 mb-4 gap-3">
			<Link to={`/product/${product.id}`} state={{ product, products }} className="orders-item__img">
				<img src={imgUrl ? imgUrl : placeholder} alt={product.name} />
			</Link>
			<span className="orders-item__name me-4">{product.name}</span>
			<span className="me-4"> <span className="d-sm-none">Кількість:</span> {product.count}</span> 
			<span>{(product.price * product.count)} грн</span>
		</div>
	);
}
 
export default OrdersPageItem;