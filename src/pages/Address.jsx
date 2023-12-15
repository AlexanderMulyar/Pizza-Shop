import { Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import deliveryBasket from "../img/pizza-removebg-preview.png";
import bannerImg from "../img/delivery.png"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAddressShop, updateUserAddressDelivery, showMessage } from "../redux/actions";
import AddDeliveryAddress from "../components/Address/AddDeliveryAddress";
import UpdateDeliveryAddress from "../components/Address/UpdateDeliveryAddress";
import ListAddress from "../components/Address/ListAddress";

const Address = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const address = useSelector(state => state.user.personl.address);
	const address_shop = useSelector(state => state.address_shop.address_shop)
	const user = useSelector(state => state.user.user);

	const [type, setType] = useState(address?.type ?? 'shop')
	const [title, setTitle] = useState(address?.type === 'delivery' ? 'Доставка' : 'Самовивіз')
	const [showAddAddress, setShowAddAddress] = useState('')
	const [showUpdateAddress, setShowUpdateAddress] = useState('')

	const [addressShop , setAddressShop] = useState({town: address_shop[0].town, street: address_shop[0].shops[0]});
	const [addressDelivery , setAddressDelivery] = useState({});
	const [updateAddressItem , setUpdateAddressItem] = useState({});
	const [addressState, setAddressState] = useState({shops: []}) // for fethed address shops

	const handleClose = () => navigate(-1);

	function handelSubmit(e) {
		e.preventDefault()
		/*Add address*/
		if(showAddAddress === 'shop'){
			if(address.shop.length < 5) {
				dispatch(updateUserAddressShop(user, address.shop, {...addressShop, id: Date.now()}))
			} else {
				dispatch(showMessage('Ви можете лише додати 5 адрессів', 'Попередження') );
			}
		} else if(showAddAddress === 'delivery') {
			if(address.delivery.length < 5) {
				dispatch(updateUserAddressDelivery(user, address.delivery, {...addressDelivery, id: Date.now()}))
			} else {
				console.log('d');
				dispatch(showMessage('Ви можете лише додати 5 адрессів', 'Попередження') );
			}
		}
		/*Update address*/
		if(showUpdateAddress === 'shop'){
			dispatch(updateUserAddressShop(user, address.shop, updateAddressItem))
		} else if(showUpdateAddress === 'delivery') {
			dispatch(updateUserAddressDelivery(user, address.delivery, updateAddressItem))
		}
		setShowAddAddress('')
		setAddressDelivery({})
		setAddressShop({town: address_shop[0].town, street: address_shop[0].shops[0]})
		setShowUpdateAddress('')
		setUpdateAddressItem({})
	}
	function handlerType(){
		setType(type === 'delivery' ? 'shop' : 'delivery')
		setTitle(type === 'delivery' ? 'Самовивіз' : 'Доставка')
	}
	function handlerShowAddAddress(){
		setShowAddAddress(type)
		setTitle(type === 'delivery' ? 'Додати адрес доставка' : 'Додати супермаркет')
	}
	function handlerHideAddAddress(){
		setShowAddAddress('')
		setShowUpdateAddress('')
		setTitle(type === 'delivery' ? 'Доставка' : 'Самовивіз')
	}
	function handlerUpdateAddress(item){
		setShowUpdateAddress(type)
		setTitle(type === 'delivery' ? 'Додати адрес доставка' : 'Додати супермаркет')
		setUpdateAddressItem(item)
	} 

	useEffect(() => {
		setType(address?.type ?? 'shop')
		setTitle(address?.type === 'delivery' ? 'Доставка' : 'Самовивіз')

		// title for page
		document.title = `Адреса | Pizza-Shop`;
	// eslint-disable-next-line
	}, [])
	useEffect(() => {
    /* Set streets depends on town*/
    setAddressState(address_shop.filter((x) => x.town === addressShop.town)[0]);
  }, [addressShop, address_shop]);
	useEffect(() => {
    /* Set streets depends on town*/
    setAddressState(
      address_shop.filter((x) => x.town === updateAddressItem.town)[0] ??
        address_shop[0]
    );
  }, [updateAddressItem, address_shop]);
	useEffect(() => {
		/*Default value for shop*/
		setAddressShop({town: address_shop[0].town, street: address_shop[0].shops[0]})
	}, [address_shop])

	return (
		<Modal className="address px-3" show onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handelSubmit} className='h-100'>
				<Modal.Body className="row p-0 w-100 m-0 h-100">
					<div className="col-md-6 col-12 address__img p-0">
						{type === 'delivery' 
							? <img className="w-100 h-100" src={bannerImg} alt="" />
							: <img className="w-100 h-100 p-5" src={deliveryBasket} alt="" />
						}
					</div>
					<div className="col-md-6 col-12 min-h-100 p-4">
						{!!showAddAddress && 
							<AddDeliveryAddress 
								showAddAddress={showAddAddress} 
								handlerHideAddAddress={handlerHideAddAddress}
								addressShop={addressShop}
								setAddressShop={setAddressShop}
								addressDelivery={addressDelivery}
								setAddressDelivery={setAddressDelivery}
								addressState={addressState}
							/>
						}
						{!!showUpdateAddress && 
							<UpdateDeliveryAddress
								showUpdateAddress={showUpdateAddress} 
								handlerHideAddAddress={handlerHideAddAddress}
								updateAddressItem={updateAddressItem}
								setUpdateAddressItem={setUpdateAddressItem}
								addressState={addressState}
							/>
						}
						{!showAddAddress && !showUpdateAddress && 
							<ListAddress
								type={type}
								handlerType={handlerType}
								address={address}
								handlerUpdateAddress={handlerUpdateAddress}
								handlerShowAddAddress={handlerShowAddAddress}
							/>
						}		
					</div>
				</Modal.Body>
			</Form>
		</Modal>
	);
}
 
export default Address;