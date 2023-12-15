const CustomRadioBtn = ({name, text, id, isChaked, handlerChange}) => {
	return (
		<>
			<input 
				type="radio" 
				name={name} 
				id={id} 
				className="d-none"
				checked={isChaked}
				onChange={handlerChange} />
			<label htmlFor={id} className="custom-radio__btn-radio rounded-pill py-2 px-3">
			{text}
			</label>
		</>
	);
}
 
export default CustomRadioBtn;