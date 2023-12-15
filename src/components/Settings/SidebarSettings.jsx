import { NavLink } from "react-router-dom";

const Sidebar = () => {
	return (
		<aside className="settings-sidebar p-4 mb-3 mb-md-0">
			<h2 className="d-none d-md-inline">PizzaShop</h2>
			<div className="d-flex flex-md-column gap-2 mt-md-4">
				<NavLink end className="link" to='profile'>Профіль</NavLink>
				<NavLink end className="link" to='payment'>Оплата</NavLink>
				<NavLink end className="link" to='purchases'>Мої замовлення</NavLink>			
			</div>
		</aside>
	);
}
 
export default Sidebar;