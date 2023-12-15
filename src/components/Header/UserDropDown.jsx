import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function UserDropDown({handlerLogout}) {
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<div 
			className="fs-5 user-menu rounded-circle" 
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}>
			<FontAwesomeIcon icon="fa-solid fa-user" >
				{children}
			</FontAwesomeIcon>
		</div>
	));
	return (
		<Dropdown align={{ md: 'start' }}>
			<Dropdown.Toggle as={CustomToggle}>Custom toggle</Dropdown.Toggle>
			<Dropdown.Menu className='user-menu__menu'>
				<Dropdown.ItemText className="p-0">
					<Link className="user-menu__link w-100 w-100 d-inline-block" to='/settings/profile'>
						<FontAwesomeIcon 
							icon="fa-solid fa-address-book" 
							className="user-menu__icon me-1" 
						/> Персональна сторінка
					</Link>
				</Dropdown.ItemText>
				<Dropdown.ItemText className="p-0">
					<Link className="user-menu__link w-100 d-inline-block" to='/settings/purchases'>
						<FontAwesomeIcon 
							icon="fa-solid fa-rectangle-list" 
							className="user-menu__icon me-1" 
						/> Мої замовлення
					</Link>
				</Dropdown.ItemText>
				<Dropdown.ItemText 
					className="user-menu__link" 
					onClick={handlerLogout}
					><FontAwesomeIcon 
						icon="fa-solid fa-arrow-right-from-bracket" 
						className="user-menu__icon me-1" 
					/> Вихід
				</Dropdown.ItemText>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default UserDropDown;