import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, InputGroup, FormControl, Button, ListGroup } from "react-bootstrap";
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../redux/actions';
import SearchItem from './SearchItem';


const Search = () => {
	const dispatch = useDispatch();
	let searchRef = useRef();
	const loading = useSelector(state => state.app.loading);
	const searchResult = useSelector(state => state.products.search)
	const [valueSearch, setValueSearch] = useState('')
	const [width, setWidth] = useState(window.innerWidth);
	const [showSearch, setShowSearch] = useState(false);

	function handlerSearch(e) {
		const value = e.target.value;
		setValueSearch(value)
		dispatch(searchProducts(value))
	}
	function handlerSearchRemove() {
		setValueSearch('')
		setShowSearch(false)
		dispatch(searchProducts(''))
	}
	function handlerShowSearch(){
		if(width < 1200) {
			setShowSearch(!showSearch)
		}
	}

	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [width]);

	return (
		<div className='header__search search-header' ref={searchRef}>
			<Form.Group 
				className={`
					${showSearch ? 'search-header__form-group_show' : ''}
					rounded-3 p-2 d-flex align-items-center search-header__form-group
				`}
				controlId="search-header"
				onChange={handlerSearch}>
				<Form.Label className="search-header__btn_search fs-6 mb-0" onClick={handlerShowSearch}>
					<FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
				</Form.Label>
				<InputGroup 
					className={`rounded-3 search-header__input-group 
						${showSearch ? 'search-header__input-group_show' : ''}
					`}
					>
					<FormControl
						className="search-header__input rounded-3" 
						placeholder="Пошук по сайту"
						onChange={handlerSearch}
						value={valueSearch}
					/>
					{!!valueSearch.trim().length && 
					<Button className='search-header__remove' onClick={handlerSearchRemove}>
						<FontAwesomeIcon icon="fa-solid fa-xmark" />
					</Button>}
				</InputGroup>
			</Form.Group>
			{!!valueSearch.trim().length && !loading &&
			<ListGroup 
				variant="flush" 
				className='bg-white rounded-3 position-absolute mt-4 w-100 p-3 shadow search-header__list'>
				{searchResult.map(item => {
					return (
						<ListGroup.Item key={item.id} className='search-header__item'>
							<SearchItem item={item} handlerSearchRemove={handlerSearchRemove} />
						</ListGroup.Item>
					)
				})}
			</ListGroup> }
			{!loading && !searchResult.length && !!valueSearch.trim().length &&
				<ListGroup 
					variant="flush" 
					className='bg-white rounded-3 position-absolute mt-4 w-100 p-3 shadow search-header__list'
				>
					<ListGroup.Item>Нічого не знайдено</ListGroup.Item>
				</ListGroup>
			}
		</div>
	);
}
 
export default Search;