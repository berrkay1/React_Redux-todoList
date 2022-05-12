import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import {addTodo} from '../redux/todos/todoSlice';
import {nanoid} from '@reduxjs/toolkit';

function Header() {

	const [title,setTitle] = useState('');

	const dispatch = useDispatch();
	
	const handleSubmit = (e) => {
		if(!title) return;
		e.preventDefault();
		dispatch(addTodo({id:nanoid(),title,completed:false}))
		setTitle('');
	}
	
  return (
    <header className="header">
		<h1>todos</h1>
		<form onSubmit={handleSubmit}>
			<input className="new-todo" 
			value={title}
			onChange={(e)=>setTitle(e.target.value)}
			placeholder="What needs to be done?" autoFocus/>
		</form>
	</header>
  )
}

export default Header