import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryServices = createApi({
    reducerPath: 'category',

    //With the help of tagTypes we refetch queries,Data add krna ka baad bowser ko refresh nhi krna pra ga
    tagTypes: 'categories', //Give unique name

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        //With the help of prepareHeaders we set token inside the API headers
        // prepareHeaders takes 2 argument headers,state
        prepareHeaders: (headers, { getState }) => {
            //In console in state we have getState so we access them,
            // console.log(state); 
            //In getState() we have list of all reducers auth,authReducer,globalReducer etc.
            // console.log(state.getState()); //Our token is in authReducer

            //For token we access authReducer in getState which show in console
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            // console.log(token);

            //Send token to backend header req in Authorization.js
            //Set token in headers ,authorization is just name use nay name
            //Bearer means yai js sever ko batata hai yai eik API token ha
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;

        }
    }),

    endpoints: (builder) => {
        return {

            createCategory: builder.mutation({   //For Add Category, createCategory is function name
                query: (name) => {
                    return {
                        url: '/createcategory',
                        method: 'POST',
                        body: name

                    }
                },
                // invalidatesTags: ['categories']  means Agar builder.mutation ka through data Add,delete,update kra 
                //to go to builder.query where we fetch data to wo usko rerender krday ga
                //tagTypes,invalidatesTags, providesTags name should be same
                //For this code also create middleware in store>index.js
                invalidatesTags: ['categories']   //refetch data,  invalidatesTags used in mutation
            }),

            //For Update Category
            updateCategory: builder.mutation({
                query: (data) => {
                    return {
                        url: `/updatecategory/${data.id}`,//data.id is access from UpdateCategory.js
                        method: 'PUT',
                        body: { name: data.name }  //data.name is access from UpdateCategory.js using query:(data)
                    }
                },
                invalidatesTags: ['categories'] //refetch data,  invalidatesTags used in mutation
            }),

            //For Delete Category
            deleteCategory: builder.mutation({
                query: (id) => {
                    return {
                        url: `/deletecategory/${id}`,
                        method: 'DELETE',
                    }
                },
                invalidatesTags: ['categories'] //refetch data, invalidatesTags used in mutation
            }),


            getCategory: builder.query({  // builder.query here we use query for GET method fetch data
                query: (page) => {  //For Pagination
                    return {
                        url: `/categories/${page}`,
                        method: 'GET'
                    }
                },
                //Jis query ko rerender krna ha waha providesTags use kra ga
                providesTags: ['categories'] //refetch data,  providesTags used in query
            }),

            fetchCategory: builder.query({  //For Fetch category name
                query: (id) => {
                    return {
                        url: `/fetchcategory/${id}`,
                        method: 'GET'
                    }
                },
                providesTags: ['categories'] //refetch data,  providesTags used in query
            }),

            allCategories: builder.query({ //For Get all Categories
                query: () => {
                    return {
                        url: "/allcategories",
                        method: 'GET'
                    }
                }
            }),

            randomCategories: builder.query({
                query: () => {
                    return {
                        url: "randomcategories",
                        method: 'GET'
                    }
                }
            })

        }
    }
})


export const { useCreateCategoryMutation, useGetCategoryQuery, useFetchCategoryQuery,
    useUpdateCategoryMutation, useDeleteCategoryMutation, useAllCategoriesQuery, useRandomCategoriesQuery } = categoryServices;

export default categoryServices;