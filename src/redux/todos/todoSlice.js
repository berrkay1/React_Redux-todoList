import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:'todos',
    initialState:{
        items:[
            // {
            //     id:1,
            //     title:'learn react-redux',
            //     completed:true
            // },
            // {
            //     id:2,
            //     title:'read a book',
            //     completed:false
            // },

        ],
        activeFilter:'all',
    },
    
    reducers:{
        addTodo:(state,action) => {
            state.items.push(action.payload)
        },
        toggle: (state,action) => {
            const {id} = action.payload;
            const item = state.items.find(item => item.id === id);
            item.completed=!item.completed;
        },
        deleteItem: (state,action)=>{
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id)
            state.items = filtered;
        },
        changeActiveFilter:(state,action) => {
            state.activeFilter=action.payload
        },
        filterComleteted:(state) =>{
          const filter = state.items.filter(item => item.completed === false);
          state.items= filter;
        }
    },
    }
);


export default todoSlice.reducer;
export const {addTodo,toggle,deleteItem,changeActiveFilter,filterComleteted} = todoSlice.actions;