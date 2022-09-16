import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const paymentServices = createApi({
    reducerPath: 'payment',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
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