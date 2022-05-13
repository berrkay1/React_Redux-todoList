import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// get todo from bakcend
export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const response = await axios('http://localhost:7000/todos');

    return response.data;

});

// add todo to backend
export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async(data) => {
    const res = await axios.post('http://localhost:7000/todos',data);
    return res.data;
} );


export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({id,data}) => {
    const res = await axios.patch(`http://localhost:7000/todos/${id}`,data);
    return res.data;
    
});

export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync',async (id) => {
    await axios.delete(`http://localhost:7000/todos/${id}`);
    return id;
})

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        activeFilter: 'all',
        isLoading:false,
        error:null,
        //add
        addNewTodoİsLoading:false,
        addError:null
    },

    reducers: {
        // addTodo: (state, action) => {  // backend den alacağımız için gerek yok bundan sonraki işlemler backend e eklenip silinecek
        //     state.items.push(action.payload)
        // },
        // toggle: (state, action) => {
        //     const { id } = action.payload;
        //     const item = state.items.find(item => item.id === id);
        //     item.completed = !item.completed;
        // },
        // deleteItem: (state, action) => {
        //     const id = action.payload;
        //     const filtered = state.items.filter((item) => item.id !== id)
        //     state.items = filtered;
        // },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },
        filterComleteted: (state) => {
            const filter = state.items.filter(item => item.completed === false);
            state.items = filter;
        }
    },
    // from backend data
    extraReducers:{
        // get todos
        [getTodosAsync.pending] : (state,action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled] : (state,action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected] : (state,action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },

        // add todos
        [addTodoAsync.pending] : (state,action) => {
            state.addNewTodoİsLoading = true
        },
        [addTodoAsync.fulfilled] : (state,action) => {
            state.items.push(action.payload ) 
            state.addNewTodoİsLoading = false
        },
        [addTodoAsync.rejected] : (state,action) => {
            state.addNewTodoİsLoading = false
            state.addError = action.error.message
        },
        // toggle todo
        [toggleTodoAsync.fulfilled] : (state,action) =>{
            const {id,completed } = action.payload
            const index = state.items.findIndex(item => item.id === id)
            state.items[index].completed = completed 
        },
        //delete todo
        [removeTodoAsync.fulfilled] : (state,action) =>{
            const id = action.payload;
           const filtered = state.items.filter(item => item.id !== id);

           state.items = filtered;
        
            
        }

        
    }


});



export default todoSlice.reducer;
export const { addTodo, toggle, deleteItem, changeActiveFilter, filterComleteted  } = todoSlice.actions;