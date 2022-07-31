import { createSlice } from '@reduxjs/toolkit';

const globalReducer = createSlice({
    name: 'globalReducer',
    initialState: {
        success: '',
        searchBar: false,
    },
    reducers: {   //For checking errors or success data msg from backend
        setSuccess: (state, action) => {
            // console.log(action);
            state.success = action.payload;
        },

        clearMessage: (state) => {  //Clear Message after Created Category
            state.success = '';
        },

        toggleSearchBar: (state) => { //For Search Bar
            state.searchBar = !state.searchBar;
        }

    }
})

//Create Hook here
//export our reducers function its Hook
export const { setSuccess, clearMessage, toggleSearchBar } = globalReducer.actions;

//export globalReducers 
export default globalReducer.reducer;