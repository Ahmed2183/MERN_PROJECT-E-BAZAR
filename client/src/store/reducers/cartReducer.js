import { createSlice } from '@reduxjs/toolkit';
import { discount } from '../../utils/discount';

const cartData = localStorage.getItem("cart");
const cartArray = cartData ? JSON.parse(cartData) : [];

//Show total numbers of cart items on Cart icon
function allItems(data) {
    let items = 0;
    for (let i = 0; i < data.length; i++) {
        items += data[i].quantity;
    }
    return items;
}

//For Total Price
function calculateTotal(data) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += discount(data[i].price, data[i].discount) * data[i].quantity;
    }
    return total;
}

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState: {
        cart: cartArray.length > 0 ? cartArray : [],
        items: cartArray.length > 0 ? allItems(cartArray) : 0,  //->For show total numbers of items on cart numbering
        total: cartArray.length > 0 ? calculateTotal(cartArray) : 0, //-->For calculate all items total prices
    },
    reducers: {
        addCart: (state, { payload }) => {
            state.cart.push(payload);
            state.items += payload.quantity;
            state.total += discount(payload.price, payload.discount) * payload.quantity;
        },
        incrementQuantity: (state, { payload }) => {
            const find = state.cart.find((item) => item._id === payload);  //-->Find item id in cart data
            if (find) {  //if item id find then increment following things
                find.quantity += 1;
                state.items += 1;
                state.total += discount(find.price, find.discount);
                //Also Updated data store in local Storage
                const index = state.cart.indexOf(find);  //-->Find index number of item jiska humna data update kia
                state.cart[index] = find; //-->Uss index par find object replace krdo
                localStorage.setItem("cart", JSON.stringify(state.cart));  //-->Again set in local Storage
            }
        },
        decrementQuantity: (state, { payload }) => {
            const find = state.cart.find((item) => item._id === payload);
            if (find && find.quantity > 1) {  //--<Dont less then 1
                find.quantity -= 1;
                state.items -= 1;
                state.total -= discount(find.price, find.discount);
                //Also Updated data store in local Storage
                const index = state.cart.indexOf(find);
                state.cart[index] = find;
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
        removeItem: (state, { payload }) => {
            const find = state.cart.find((item) => item._id === payload);
            if (find) {
                const index = state.cart.indexOf(find);
                state.items -= find.quantity;
                state.total -= discount(find.price, find.discount) * find.quantity;
                state.cart.splice(index, 1);  //-->iss index k baad 1 item remove kro
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }
        },
        /* For empty cart after payment successfull */
        emptyCart: (state) => {
            state.cart = [];
            state.items = 0;
            state.total = 0;
        }
    }
})

//Create Hook here
//export our reducers function its Hook
export const { addCart, incrementQuantity, decrementQuantity, removeItem, emptyCart } = cartReducer.actions;

//export cartReducers 
export default cartReducer.reducer;