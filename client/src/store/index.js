import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authServices from './services/authServices';
import categoryServices from './services/categoryServices';
import productServices from './services/productServices';
import homeProductServices from './services/homeProductsServices';
import paymentServices from './services/paymentServices';
import orderServices from './services/orderServices';
import userOrdersServices from './services/userOrdersServices';
import authReducer from './reducers/authReducer';
import globalReducer from './reducers/globalReducer';
import cartReducer from './reducers/cartReducer';

const Store = configureStore({
  reducer: {

    //services import
    //reducerPath acces from services.js files
    [authServices.reducerPath]: authServices.reducer, //reducer is this on above reducer: {
    [categoryServices.reducerPath]: categoryServices.reducer,
    [productServices.reducerPath]: productServices.reducer,
    [homeProductServices.reducerPath]: homeProductServices.reducer,
    [paymentServices.reducerPath]: paymentServices.reducer,
    [orderServices.reducerPath]: orderServices.reducer,
    [userOrdersServices.reducerPath]: userOrdersServices.reducer,

    //reducers import
    //"authReducer" is key name from authReducer.js
    "authReducer": authReducer,
    "globalReducer": globalReducer,
    "cartReducer": cartReducer,
  },

  //Create middleware, getDefaultMiddleware is function name
  //This code is for tagTypes,invalidatesTags, providesTags in filenameServices.js
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    categoryServices.middleware,
    productServices.middleware,
    homeProductServices.middleware,
    paymentServices.middleware,
    orderServices.middleware,
    userOrdersServices.middleware,
  ])

})

export default Store;