import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {changeActiveFilter,filterComleteted} from '../redux/todos/todoSlice';


function ContentFooter() {

	const items = useSelector((state)=> state.todos.items);
	
	const itemleft = items.filter(item =>!item.completed).length;
	
	const activeFilter = useSelector((state)=> state.todos.activeFilter);

	const dispatch = useDispatch();	
	

  return (
    <footer className="footer">

		
		<span className="todo-count">
			<strong>{itemleft}</strong> {''}
			item{itemleft > 1 ? 's' : ''} left
		</span>

		<ul className="filters">
			<li>
				<a
				onClick={()=>dispatch(changeActiveFilter('all'))}
				 className={activeFilter === 'all' ? 'selected' : ''}>All</a>
			</li>
			<li>
				<a
				onClick={()=>dispatch(changeActiveFilter('active'))}
				 className={activeFilter === 'active' ? 'selected' : ''}>Active</a>
			</li>
			<li>
				<a 
				onClick={()=>dispatch(changeActiveFilter('completed'))}
				className={activeFilter === 'completed' ? 'selected' : ''}>Completed</a>
			</li>
		</ul>

		
		<button onClick={()=>dispatch(filterComleteted())} className="clear-completed">
			Clear completed
		</button>
	</footer>
  )
}

export default ContentFooter