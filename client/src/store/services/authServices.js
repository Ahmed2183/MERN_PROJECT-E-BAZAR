import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authServices = createApi({
    reducerPath: 'auth',  //auth is key, We add key in reducerPath, use any name in key see this key name in Redux dev tool extension in google
    baseQuery: fetchBaseQuery({ //We add our backend URL in fetchBaseQuery
        baseUrl: 'http://localhost:5000'  //-->Our backend URL
    }),
    //For hack API we code inside endpoints function
    endpoints: (builder) => {   //builder is just name you use any name which you want
        return {
            //If we have GET method then we use query , builder.query
            //If we have POST,PUT method then we use mutation , builder.mutation 
            authLogin: builder.mutation({  //-->authLogin is function name you use any name which you want
                query: (LoginData) => { //LoginData is just name you use any name which you want
                    return {
                        url: '/login',  //-->/login is our Login Route URL in backend from UserRoute.js
                        method: 'POST', //Define Method which method used in login API
                        body: LoginData

                    }
                }
            }),

            userRegister: builder.mutation({
                query: data => {
                    return {
                        url: '/register',
                        method: 'POST',
                        body: data
                    }
                }
            }),

            userLogin: builder.mutation({
                query: LoginData => {
                    return {
                        url: '/login',
                        method: 'POST',
                        body: LoginData
                    }
                }
            })

        }
    }
})

//Create Hook here: Send request to Backend we using Hook
// AuthLogin is our function name in endpoints authLogin and Mutation is method name mutation
//Both function and method name first letter must be capital
//Used use keyword also 
export const { useAuthLoginMutation, useUserRegisterMutation, useUserLoginMutation } = authServices;

export default authServices;