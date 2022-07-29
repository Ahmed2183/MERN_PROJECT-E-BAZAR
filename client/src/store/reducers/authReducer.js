import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from "jwt-decode"; //For Decode Token


const customerToken = localStorage.getItem('user-token'); //user-token set in Login.js and Register.js

//Decode token and expire time check for token
function verifytoken(keyName) { //In keyName we have admin-token which is our token key

    const storage = localStorage.getItem(keyName); //get token from localStorage,In keyName we have admin-token which is our token key
    if (storage) {
        const decodetoken = jwtDecode(storage);
        //  console.log(decodetoken);
        const expiresIn = new Date(decodetoken.exp * 1000)  //For token expire check
        if (new Date() > expiresIn) {
            localStorage.removeItem(keyName);
            return null;
        }
        else {
            return storage;
        }
    }
    else {
        return null;
    }
}


//For Admin,User Login and Logout
const authReducer = createSlice({
    name: 'authReducer', //name should be unique
    initialState: {  //Create state
        //Here we gave State names
        adminToken: verifytoken('admin-token'), //call function and send admin-token key, adminToken in state name
        userToken: verifytoken('user-token'), //call function and send userToken key, userToken in state name
        user: customerToken ? jwtDecode(customerToken) : null,
    },
    reducers: { //We create functions in this reducers
        //We acess initialState and payload in this function
        setAdminToken: (state, action) => {  //-->state is initialState,setAdminToken is function name
            state.adminToken = action.payload; //In payload we have token that we access from AdminLogin.js
        },

        setUserToken: (state, action) => {
            state.userToken = action.payload;
            state.user = jwtDecode(action.payload);
        },

        logout: (state, { payload }) => {
            localStorage.removeItem(payload);
            //Condition for both admin and user
            if (payload === 'admin-token') //admin-token is token key
            {
                state.adminToken = null;
            }
            else if (payload === 'user-token') {
                state.userToken = null;
                state.user = null;
            }

        }

    }
})

//Create Hook here
//export our reducers function its Hook
export const { setAdminToken, setUserToken, logout } = authReducer.actions;

//export authReducers 
export default authReducer.reducer;