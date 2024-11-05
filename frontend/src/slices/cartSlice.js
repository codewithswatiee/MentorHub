import {createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
   totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")): 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setTotalItems(state, value){
            state.totalItems = value.payload;
        },
        addToCart(state, value){
            state.totalItems += value.payload;
        },
        removeCart(state, value){
            state.totalItems -= value.payload;
        },
        resetCart(state, value){
            state.totalItems = 0;
        }
    }
});

export const {setTotalItems, addToCart, removeCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;