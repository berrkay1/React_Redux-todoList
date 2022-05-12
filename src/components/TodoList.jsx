import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {toggle,deleteItem} from '../redux/todos/todoSlice';


function TodoList() {

    const items = useSelector((state) => state.todos.items);

    const dispatch = useDispatch();

    const handleDeleteItem = (id) => {
        if(window.confirm('Are you sure ?')){
            dispatch(deleteItem(id))
        }
    }

    const activeFilter = useSelector((state)=> state.todos.activeFilter);
    

    let filtered = [];

    if(activeFilter !== 'all'){
        filtered = items.filter(todo => (
            activeFilter === 'active' 
            ? todo.completed === false 
            : todo.completed === true 
        ))
    }else{
        filtered=items;
    }
    
    return (
        <ul className="todo-list">
            {filtered.map((item)=>(
                <li key={item.id} className={item.completed ? 'completed' : ''} >
                <div className="view">
                    <input className="toggle" type="checkbox" 
                    checked={item.completed}
                    onChange={()=>dispatch(toggle({id:item.id}))} />
                    <label>{item.title}</label>
                    <button onClick={()=>handleDeleteItem(item.id)}  className="destroy"></button>
                </div>
            </li>
            ))}
            
        </ul>
    )
}

export default TodoList