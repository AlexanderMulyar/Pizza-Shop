import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { requestOTP, verifyOTP } from "../redux/actions";

function Auth() {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const handleClose = () => navigate(-1);
	const [phoneNumber, setPhoneNumber] = useState('+38');
	const [otp, setOtp] = useState('');
	const [otpForm, setOtpForm] = useState(false)

	function handelSubmit(e) {
		e.preventDefault();
		if(!otpForm) {
			dispatch(requestOTP(phoneNumber));
			setOtpForm(true)
		} else {
			dispatch(verifyOTP(otp));
			handleClose();
		}
	}	
	useEffect(() => {
		// title for page
		document.title = `Вхід | Pizza-Shop`;
	// eslint-disable-next-line
	}, [])
	return (
		<Modal show onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Вхід / Реєстрація</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handelSubmit}>
				<Modal.Body>
					{!otpForm ? 
					<FloatingLabel className='mb-3' controlId="tel" label="Номер телефону">
						<Form.Control
							placeholder="Номер телефону"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							required
							type="text" />
					</FloatingLabel>
					: <FloatingLabel className='mb-3' controlId="otp" label="OTP">
							<Form.Control
								placeholder="OTP"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								required
								type="text" />
						</FloatingLabel>
					}
					
				</Modal.Body>
				<Modal.Footer>
					{!otpForm ?
						<Button type="submit" className=" btn_orange rounded-pill py-2 px-3" disabled={phoneNumber.length !== 13}>
							Продовжити
						</Button>
						: <Button type="submit" className=" btn_orange rounded-pill py-2 px-3" disabled={otp.length !== 6}>
							Увійти
						</Button>}
					<div id="recaptcha-container"></div>
			</Modal.Footer>
			</Form>
		</Modal>
	);
}

export default Auth;