import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
	useEffect(() => {
		// title for page
		document.title = `Не знайденно | Pizza-Shop`;
	// eslint-disable-next-line
	}, [])
	return (
		<section className="vh-100 not-found">
			<Container fluid='md' className="d-flex justify-content-center align-items-center h-100 flex-column">
				<h2>Ви вийшли за межі нашого всесвіту</h2>
				<Link to='/' className="not-found__link">Рекомендумає вам повернутися додому</Link>
			</Container>
		</section>
	);
}
 
export default NotFound;