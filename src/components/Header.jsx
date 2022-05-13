import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {addTodo,addTodoAsync} from '../redux/todos/todoSlice';
import Error from './Error';
//import {nanoid} from '@reduxjs/toolkit';

function Header() {

	const [title,setTitle] = useState('');

	const isLoading = useSelector((state)=> state.todos.addNewTodoİsLoading);

	const error = useSelector((state)=> state.todos.addError);
	

	const dispatch = useDispatch();
	
	const handleSubmit = async (e) => {
		if(!title) return;
		e.preventDefault();
		await dispatch(addTodoAsync({title}))
		setTitle('');
	}

	
	
  return (
    <header className="header">
		<h1>todos</h1>
		<form onSubmit={handleSubmit} style={{display:'flex',alignItems:'center',marginRight:15}}>
			<input className="new-todo" 
			value={title}
			onChange={(e)=>setTitle(e.target.value)}
			placeholder="What needs to be done?" autoFocus/>

			 {isLoading && <span >Loading...</span>}
			 {error && <Error message={error}/>}
		</form>
	</header>
  )
}

export default Header