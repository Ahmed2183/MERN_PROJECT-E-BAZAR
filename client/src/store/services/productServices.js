import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productServices = createApi({
    reducerPath: 'products',
    tagTypes: 'products',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',

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
            createProduct: builder.mutation({
                query: (data) => {
                    return {
                        url: '/createproduct',
                        method: 'POST',
                        body: data

                    }
                },

                invalidatesTags: ['products']

            }),

            //Get All Products
            getProducts: builder.query({  // builder.query here we use query for GET method fetch data
                query: (page) => {  //For Pagination
                    return {
                        url: `/products/${page}`,
                        method: 'GET'
                    }
                },
                //Jis query ko rerender krna ha waha providesTags use kra ga
                providesTags: ['products'] //refetch data,  providesTags used in query
            }),

            updateProduct: builder.mutation({
                query: (data) => {
                    return {
                        url: '/updateproduct',
                        method: 'PUT',
                        body: data
                    }
                },
                invalidatesTags: ['products']
            }),

            //Get Single Product
            getProduct: builder.query({
                query: (id) => {
                    return {
                        url: `/product/${id}`,
                        method: 'GET'
                    }
                },
                providesTags: ['products']
            }),

            deleteProduct: builder.mutation({
                query: id => {
                    return {
                        url: `/delete/${id}`,
                        method: 'DELETE'
                    }
                },
                invalidatesTags: ['products']
            })
        }
    }
})

export const { useCreateProductMutation, useUpdateProductMutation, useGetProductsQuery,
    useGetProductQuery, useDeleteProductMutation } = productServices;

export default productServices;