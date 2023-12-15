import { memo } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { hideError } from "../../redux/actions";

const Message = ({message}) => {
	const dispatch = useDispatch();
	function hideMessage(){
		dispatch(hideError());
	}
	return (
		<Modal show={!!message.text} onHide={hideMessage}>
			<Modal.Header>
				<Modal.Title>{message.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{message.text}</Modal.Body>
			<Modal.Footer>
				<Button className='btn_orange rounded-pill py-2 px-3' onClick={hideMessage}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
 
export default memo(Message);