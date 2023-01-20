import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderServices = createApi({
    reducerPath: 'orders',
    tagTypes: 'orders',
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
                        url: `/orders?page=${page}`,
                        method: 'GET'
                    }
                },
                providesTags: ['orders']  //-->To refetch data again
            }),

            details: builder.query({
                query: id => {
                    return {
                        url: `/order-details/${id}`,
                        method: 'GET'
                    }
                },
                providesTags: ['orders'] //-->To refetch data again
            }),

            deliverOrder: builder.mutation({
                query: id => {
                    return {
                        url: `/order-update?id=${id}&status=delivered`,
                        method: 'PUT'
                    }
                },
                invalidatesTags: ['orders'] //-->To refetch data again
            }),
        }
    }
})

export const { useGetOrdersQuery, useDetailsQuery, useDeliverOrderMutation } = orderServices;

export default orderServices;