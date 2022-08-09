import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const homeProductServices = createApi({
    reducerPath: 'homeProducts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
    }),

    endpoints: (builder) => {
        return {
            categoryProducts: builder.query({
                query: (params) => {
                    return {
                        url: `/categoryproducts/${params.name}/${params.page}`,
                        method: 'GET',
                    }
                },
            }),

            searchProducts: builder.query({
                query: (params) => {
                    return {
                        url: `/searchproducts/${params.keyword}/${params.page}`,
                        method: 'GET',
                    }
                },
            }),


        }
    }
})

export const { useCategoryProductsQuery, useSearchProductsQuery } = homeProductServices;
export default homeProductServices;