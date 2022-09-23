import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const paymentServices = createApi({
    reducerPath: 'payment',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',

        /* In prepareHeaders code we gave userToken menas user token kaa bina payment checkout nhi hoga */
        prepareHeaders: (headers, { getState }) => {

            const reducers = getState();
            const token = reducers?.authReducer?.userToken;
            // console.log(token);

            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;

        }
    }),

    endpoints: (builder) => {
        return {

            sendPayment: builder.mutation({
                query: (cart) => {
                    return {
                        url: '/create-checkout-session',
                        method: 'POST',
                        body: cart,
                    }
                }
            }),

            verifyPayment: builder.query({
                query: id => {
                    return {
                        url: `verify-payment/${id}`,
                        method: 'GET'
                    }
                }
            })

        }
    }
})

export const { useSendPaymentMutation, useVerifyPaymentQuery } = paymentServices;

export default paymentServices;