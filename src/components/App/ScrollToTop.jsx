import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ScrollToTop = () => {
	const [visible, setVisible] = useState(false)
  
	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300){
			setVisible(true)
		} 
		else if (scrolled <= 300){
			setVisible(false)
		}
	};
	
	const scrollToTop = () =>{
		window.scrollTo({
			top: 0, 
			behavior: 'smooth'
			/* you can also use 'auto' behaviour
				in place of 'smooth' */
		});
	};
	
	window.addEventListener('scroll', toggleVisible);
	return (
		<div 
			onClick={scrollToTop}
			className={`
				${visible ? 'scroll-btn__show' : ''}
				rounded-circle p-2 position-fixed 
				scroll-btn d-flex align-items-center justify-content-center`}>
			<FontAwesomeIcon icon="fa-solid fa-arrow-up" className="fs-2" />
		</div>
	);
}
 
export default ScrollToTop;