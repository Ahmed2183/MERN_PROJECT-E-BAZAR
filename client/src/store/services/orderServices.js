import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderServices = createApi({
    reducerPath: 'orders',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',

        /* In prepareHeaders code we gave userToken menas user token kaa bina payment checkout nhi hoga */
        prepareHeaders: (headers, { getState }) => {

            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            // console.log(token);

            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;

        }
    }),

    endpoints: (builder) => {
        return {
          getOrders: builder.query({
            query: (page) => {
                return {
                    url: `/orders/${page}`,
                    method: 'GET'
                }
            }
          })
        }
    }
})

export const { useGetOrdersQuery } = orderServices;

export default orderServices;