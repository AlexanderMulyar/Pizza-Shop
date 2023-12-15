import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AllStafs from "./AllStafs";
import UserDropDown from "./UserDropDown";
import { logout } from "../../redux/actions";
import HeaderCart from "./HeaderCart";
import Search from "./Search";
import logo from "../../img/logo.png";


function Header() {
	const user = useSelector(state => state.user.user);
	const contacts = useSelector(state => state.user.personl.contacts);
	const address = useSelector(state => state.user.personl.address);
	const location = useLocation();
	const dispatch = useDispatch();
	const navigator = useNavigate();
	function handlerLogout(){
		dispatch(logout())
		navigator('/')
	}

	return (
    <header className="header">
      <Navbar expand="md" fixed="top" className="py-3">
        <Container fluid="md" className="position-relative flex-column">
          <Navbar.Offcanvas className="sidebar" placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <div className="d-flex align-items-center sidebar__top">
                  <FontAwesomeIcon icon="fa-solid fa-user" className="fs-4" />
                  {user ? (
                    <NavLink
                      to="/settings/profile"
                      className="ms-2 d-flex flex-column sidebar__text sidebar__link"
                    >
                      <span className="lh-1">
                        {contacts.firstName ?? "Гість"}
                      </span>
                    </NavLink>
                  ) : (
                    <NavLink
                      to={`${
                        location.pathname === "/"
                          ? location.pathname
                          : location.pathname + "/"
                      }auth`}
                      state={{ backgroundLocation: location }}
                      className="ms-2 d-flex flex-column sidebar__text sidebar__link"
                    >
                      <span className="lh-1">Вхід/</span>
                      <span className="lh-2">Реєстрація</span>
                    </NavLink>
                  )}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column p-0">
              {/*if user sing in, we show the links*/}
              <Nav className="flex-grow-1 pe-3 px-3">
                {user && (
                  <Fragment>
                    <Link className="sidebar__link mb-2" to="/settings/profile">
                      <FontAwesomeIcon
                        icon="fa-solid fa-address-book"
                        className="me-2"
                      />{" "}
                      Персональна сторінка
                    </Link>
                    <Link
                      to="/settings/purchases"
                      className="sidebar__link mb-2"
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-rectangle-list"
                        className="me-2"
                      />{" "}
                      Мої замовлення
                    </Link>
                    <div className="sidebar__link" onClick={handlerLogout}>
                      <FontAwesomeIcon
                        icon="fa-solid fa-arrow-right-from-bracket"
                        className="me-2"
                      />{" "}
                      Вихід
                    </div>
                  </Fragment>
                )}
              </Nav>
              <div className="contacts-block">
                <div className="my-4 px-3">
                  <p>Поширені питання</p>
                  <a
                    href="tel:0800301706"
                    className="d-flex align-items-center contacts-block__link"
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-phone"
                      className="me-2 fs-3 contacts-block__link_light"
                    />
                    <span className="fw-bold">0 800 301 706</span>
                  </a>
                </div>
                <div className="d-flex justify-content-center gap-3 fs-1 contacts-block__socials py-3">
                  <a href="/facebook" className="contacts-block__link">
                    <FontAwesomeIcon icon="fa-brands fa-facebook-square" />
                  </a>
                  <a href="/telegram" className="contacts-block__link">
                    <FontAwesomeIcon icon="fa-brands fa-telegram" />
                  </a>
                  <a href="/instagram" className="contacts-block__link">
                    <FontAwesomeIcon icon="fa-brands fa-instagram" />
                  </a>
                  <a href="/viber" className="contacts-block__link">
                    <FontAwesomeIcon icon="fa-brands fa-viber" />
                  </a>
                </div>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Brand className="m-0">
              <NavLink
                className="navbar-brand d-flex align-items-center"
                to="/"
              >
                <div className="header__logo">
                  <img src={logo} alt="logo" />
                </div>
                Pizza-Shop
              </NavLink>
            </Navbar.Brand>
            {/*All Products*/}
            <div className="d-none d-md-block">
              <AllStafs />
            </div>
            {/*Search*/}
            <Search />
            {/*User*/}
            {!user ? (
              <NavLink
                className="fs-5 user-menu rounded-circle"
                to={`${
                  location.pathname === "/"
                    ? location.pathname
                    : location.pathname + "/"
                }auth`}
                state={{ backgroundLocation: location }}
              >
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </NavLink>
            ) : (
              <UserDropDown handlerLogout={handlerLogout} />
            )}
            {/*Address*/}
            {user && (
              <NavLink
                to={`${
                  location.pathname === "/"
                    ? location.pathname
                    : location.pathname + "/"
                }address`}
                state={{ backgroundLocation: location }}
                className="fs-4 px-3 header__btn_light align-items-center rounded-pill d-none d-sm-flex"
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-location-dot"
                  className="fs-4"
                />
                <div className="d-flex flex-column ms-2 header__description">
                  {!address.active_address.town ? (
                    <>
                      <span className="lh-1 fw-bold">Самовивіз:</span>
                      <span className="lh-2">Додати адресу</span>
                    </>
                  ) : (
                    <>
                      <span className="lh-1 fw-bold">
                        {address.type === "shop" ? "Самовивіз" : "Доставка"}
                      </span>
                      <span className="lh-2 header__address">
                        {address.active_address?.town}{" "}
                        {address.active_address?.street}{" "}
                        {address.active_address?.house}{" "}
                        {address.active_address?.flat}
                      </span>
                    </>
                  )}
                </div>
              </NavLink>
            )}
            {/*Cart*/}
            <HeaderCart />
          </div>
          {/*Address for mobile*/}
          {user && (
            <NavLink
              to={`${
                location.pathname === "/"
                  ? location.pathname
                  : location.pathname + "/"
              }address`}
              state={{ backgroundLocation: location }}
              className="fs-1 header__btn_light align-items-center d-sm-none d-flex mt-4 w-100"
            >
              <FontAwesomeIcon icon="fa-solid fa-location-dot" />
              <div className="d-flex flex-column ms-2 header__description">
                {!address.active_address ? (
                  <>
                    <span className="lh-1 fw-bold">Самовивіз:</span>
                    <span className="lh-2">Додати адресу</span>
                  </>
                ) : (
                  <>
                    <span className="lh-1 fw-bold">
                      {address.type === "shop" ? "Самовивіз" : "Доставка"}
                    </span>
                    <span className="lh-2">
                      {address.active_address?.town}{" "}
                      {address.active_address?.street}{" "}
                      {address.active_address?.house}{" "}
                      {address.active_address?.flat}
                    </span>
                  </>
                )}
              </div>
            </NavLink>
          )}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;