import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const paymentServices = createApi({
    reducerPath: 'payment', 
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000'  
    }),
  
    endpoints: (builder) => {   
        return {
             
            sendPayment: builder.mutation({
                query: () => {
                    return {
                        url: '/create-checkout-session',
                        method: 'POST',
                    }
                }
            })

        }
    }
})

export const { useSendPaymentMutation } = paymentServices;

export default paymentServices;