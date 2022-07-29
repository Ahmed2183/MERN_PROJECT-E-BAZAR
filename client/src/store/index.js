import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authServices from './services/authServices';
import categoryServices from './services/categoryServices';
import productServices from './services/productServices';
import authReducer from './reducers/authReducer';
import globalReducer from './reducers/globalReducer';
import homeProductServices from './services/homeProductsServices';

const Store = configureStore({
  reducer: {

    //services import
    //reducerPath acces from services.js files
    [authServices.reducerPath]: authServices.reducer, //reducer is this on above reducer: {
    [categoryServices.reducerPath]: categoryServices.reducer,
    [productServices.reducerPath]: productServices.reducer,
    [homeProductServices.reducerPath]: homeProductServices.reducer,

    //reducers import
    //"authReducer" is key name from authReducer.js
    "authReducer": authReducer,
    "globalReducer": globalReducer,
  },

  //Create middleware, getDefaultMiddleware is function name
  //This code is for tagTypes,invalidatesTags, providesTags in categoryServices.js
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    categoryServices.middleware,
    productServices.middleware,
    homeProductServices.middleware,
  ])

})

export default Store;