import { useEffect, useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CustomRadioBtn from "../../components/CustomRadioBtn";
import { updateUserData, updateUserEmail } from "../../redux/actions";

const Profile = () => {
	const user = useSelector(state => state.user.user);
	const loading = useSelector(state => state.app.loading);
	const contacts = useSelector(state => state.user.personl.contacts);
	const dispatch = useDispatch();

	/*update state after changes contacts*/
	useEffect(() => {
		setContactsData(contacts)
	}, [contacts])

	/*Contacts*/
	const [email, setEmail] = useState(user.email)

	/*Contacts Data*/
	const [contactsData, setContactsData] = useState(contacts)

	function updateEmail(e){
		e.preventDefault();
		dispatch(updateUserEmail(user, email))
		setEmail(email)
	}
	function updateDataContacts(e){
		e.preventDefault();
		dispatch(updateUserData(user, {contacts: contactsData}))
	}
	useEffect(() => {
		setEmail(user.email)

		// title for page
		document.title = `Профіль | Pizza-Shop`;
		// eslint-disable-next-line
	}, [])
	return (		
		<section>
			<div className="bg-white p-4">
				<h4>Персональні дані</h4>
				<hr className="line my-2" />
				<p>Будь ласка, заповніть всі поля, аби ми знали, як до вас звертатись, та готували пропозиції, які вас зацікавлять</p>
				<Form onSubmit={updateDataContacts}>
					<div className="d-flex gap-3 custom-radio">
						<CustomRadioBtn 
							text='ЧОЛ.' 
							id='male' 
							name='sex'
							isChaked={contactsData.sex === 'male'}
							handlerChange={(e) => {
								setContactsData({...contactsData, sex: 'male'})
							}}
						/>
						<CustomRadioBtn 
							text='ЖІН.' 
							id='female' 
							name='sex'
							isChaked={contactsData.sex === 'female'}
							handlerChange={(e) => {
								setContactsData({...contactsData, sex: 'female'})
							}}
						/>
					</div>
					<div className="mt-4 row gap-4">
						<div className="col-lg-4 col-12">
							<FloatingLabel controlId="name" label="Ім'я">
								<Form.Control
									placeholder="Ім'я"
									disabled={loading} 
									value={contactsData.firstName ?? ''}
									onChange={(e) => {
										setContactsData({...contactsData, firstName: e.target.value})
									}}
									type="text" />
							</FloatingLabel>
							<FloatingLabel className="mt-4" controlId="secondname" label="Прізвище">
								<Form.Control
									placeholder="Прізвище"
									disabled={loading} 
									value={contactsData.secondName ?? ''}
									onChange={(e) => {
										setContactsData({...contactsData, secondName: e.target.value})
									}}
									type="text" />
							</FloatingLabel>
						</div>
						<div className="col-lg-4 col-12">
							<FloatingLabel controlId="surname" label="По батькові">
								<Form.Control 
									disabled={loading}
									placeholder="По батькові"
									value={contactsData.surname ?? ''}
									onChange={(e) => {
										setContactsData({...contactsData, surname: e.target.value})
									}}
									type="text" />
							</FloatingLabel>
							<FloatingLabel className="mt-4" controlId="date" label="Дата народження">
								<Form.Control 
									disabled={loading} 
									value={contactsData.dateBirth ?? ''}
									onChange={(e) => {
										setContactsData({...contactsData, dateBirth: e.target.value})
									}}
									type="date" />
							</FloatingLabel>
						</div>
					</div>
					<Button 
						type='submit'
						className="mt-5 btn_orange rounded-pill py-2 px-3"
						disabled={JSON.stringify(contacts) === JSON.stringify(contactsData) || loading}
					>Зберегти</Button>
				</Form>
			</div>
			<div className="bg-white p-4 mt-4">
				<h4>Контактні дані</h4>
				<hr className="line mt-2" />
				<Form onSubmit={updateEmail}>
					<div className="mt-4">
						<FloatingLabel controlId="phone" label="Мобільний номер">
							<Form.Control
								placeholder="Мобільний номер"
								disabled={true} 
								value={user.phoneNumber}
								onChange={(e) => {
									setContactsData({...contactsData, firstName: e.target.value})
								}}
								type="text" />
						</FloatingLabel>
						<FloatingLabel className="mt-4" controlId="email" label="Електронна адреса">
							<Form.Control
								placeholder="Електронна адреса"
								value={email ?? ''}
								disabled={loading}
								onChange={((e) => setEmail(e.target.value))}
								type="email" />
						</FloatingLabel>
					</div>
					<Button 
						type='submit'
						disabled={email === user.email}
						className="mt-5 btn_orange rounded-pill py-2 px-3"
					>Зберегти</Button>
				</Form>
			</div>
		</section>
	);
}
 
export default Profile;