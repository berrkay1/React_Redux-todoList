import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {toggle,deleteItem,getTodosAsync,toggleTodoAsync,removeTodoAsync} from '../redux/todos/todoSlice';
import Error from './Error';
import Loading from './Loading';


function TodoList() {

    


    const items = useSelector((state) => state.todos.items);

    const dispatch = useDispatch();

    // const handleDeleteItem = (id) => {
    //     if(window.confirm('Are you sure ?')){
    //         dispatch(deleteItem(id))
    //     }
    // }

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


    useEffect(()=>{
        dispatch(getTodosAsync());
    },[dispatch]);

    const isLoading = useSelector((state) => state.todos.isLoading);

    const error = useSelector((state) => state.todos.error);

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure ?')){
            await dispatch(removeTodoAsync(id))
        }
        
    }

    const handleToggle = async (id,completed) => {
        await dispatch(toggleTodoAsync({ id , data: {completed} }));
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <Error message={error} />
    }
    
    return (
        <ul className="todo-list">
            {filtered.map((item)=>(
                <li key={item.id} className={item.completed ? 'completed' : ''} >
                <div className="view">
                    <input className="toggle" type="checkbox" 
                    checked={item.completed}
                    onChange={()=>handleToggle(item.id,!item.completed)} />
                    <label>{item.title}</label>
                    <button onClick={()=>handleDelete(item.id)}  className="destroy"></button>
                </div>
            </li>
            ))}
            
        </ul>
    )
}

export default TodoList