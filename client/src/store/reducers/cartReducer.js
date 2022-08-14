import { createSlice } from '@reduxjs/toolkit';

const cartData = localStorage.getItem("cart");

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState: {
        cart: cartData ? JSON.parse(cartData) : [],
    },
    reducers: {
        addCart: (state, action) => {
            state.cart.push(action.payload);
        }
    }
})

//Create Hook here
//export our reducers function its Hook
export const { addCart } = cartReducer.actions;

//export cartReducers 
export default cartReducer.reducer;