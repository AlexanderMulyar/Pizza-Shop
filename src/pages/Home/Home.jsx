import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

import videoWebm from "../../video/pizzaShop.webm";
import ProductsList from '../../components/Home/ProductsList';
import HomeBanner from '../../components/Home/HomeBanner';
import { useEffect } from 'react';
import { addProducts } from "../../redux/actions";

function Home() {
	const products = useSelector(state => state.products.products);
	const dispatch = useDispatch();
	useEffect(() => {
		// title for page
		document.title = 'Pizza-Shop';
	// eslint-disable-next-line
	}, [])
	return ( 
		<div className="home">
			<div className="full-screan position-relative vh-100 mb-5">
				<video
					autoPlay
					muted
					loop
					preload="auto"
					src={videoWebm} 
					className="full-screan__video position-absolute top-0 start-0 w-100 h-100">
					</video>
			</div>
			<Container fluid='md'>
				{/* <button onClick={() => dispatch(addProducts())}>Add</button> */}
				{products && products.map(product => {
					return (
						<ProductsList product={product} key={product.id} />
					)
				})}
				<HomeBanner/>
			</Container>
		</div> 
	);
}

export default Home;