import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const Callback = ({
	setTypeContact,
	userPhone,
	setUserProne,
	userEmail,
	setUserEmail
}) => {
	const user = useSelector(state => state.user.user)
	const loading = useSelector(state => state.app.loading)
	return (
		<div>
			<h5>Зворотній зв'язок</h5>
			<div className="bg-white rounder-3 p-3">
				<h6>Як зв'язатись з вами у разі виникнення питань?</h6>
				<Form.Check type='radio'>
				<Form.Check.Input
					className="checkout__field"
					onChange={(e) => setTypeContact(e.target.value)} 
					defaultChecked 
					name="callback"
					disabled={loading}
					value={userPhone}
					type='radio'
					id='callback-tel'
				/>
				<Form.Check.Label>
					Зателефонуйте мені
					<Form.Control 
						type="text"
						disabled={loading}
						onChange={(e) => setUserProne(e.target.value)} 
						value={userPhone} 
					/>
				</Form.Check.Label>
				</Form.Check>
				{user.email &&
				<Form.Check type='radio'>
					<Form.Check.Input
						className="checkout__field"
						onChange={(e) => setTypeContact(e.target.value)} 
						value={userEmail}
						disabled={loading}
						name="callback"
						id='callback-email' 
						type='radio' 
					/>
					<Form.Check.Label>
						Напишіть мені
						<Form.Control 
							type="email"
							disabled={loading}
							onChange={(e) => setUserEmail(e.target.value)} 
							value={userEmail} 
						/>
					</Form.Check.Label>
				</Form.Check>
				}
			</div>
		</div>
	);
}
 
export default Callback;