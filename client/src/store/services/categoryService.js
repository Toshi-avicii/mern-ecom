import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryService = createApi({
    reducerPath: 'category',
    tagTypes: 'categories',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/categories/', // api base route,
        // this is how you send jwt through req header
        prepareHeaders: function(headers, { getState }) {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            // authorization bearer token
            headers.set('authorization', token ? `Bearer: ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            // this is the function which will run when the category form is submitted
            createCategory: builder.mutation({
                // mutation is used only when we want to post or patch or put something to the b.e.
                query: (name) => {
                    return {
                        url: 'create-category',
                        method: 'POST',
                        body: name
                    }
                },
                invalidatesTags: ['categories']
            }),
            getCategories: builder.query({
                // query is used when we want to get something from the b.e.
                query: (pageNo) => {
                    return {
                        url: `${pageNo}`, // page no. is dynamic
                        method: 'GET'
                    }
                },
                providesTags: ['categories']
            })
        }
    }
});

// exporting authLogin function from the endpoints object
export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryService;
export default categoryService;