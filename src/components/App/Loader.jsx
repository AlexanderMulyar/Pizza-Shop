import { Spinner } from "react-bootstrap";

const Loader = () => {
	return (
		<div>
			<Spinner animation="grow" size="sm" />
			<Spinner className="mx-2" animation="grow" size="sm" />
			<Spinner animation="grow" size="sm" />
		</div>
	);
}
 
export default Loader;