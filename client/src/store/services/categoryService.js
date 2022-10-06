import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryService = createApi({
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/categories/' // api base route
    }),
    endpoints: (builder) => {
        return {
            // this is the function which will run when the category form is submitted
            createCategory: builder.mutation({
                query: (name) => {
                    return {
                        url: 'create-category',
                        method: 'POST',
                        body: name
                    }
                }
            })
        }
    }
});

// exporting authLogin function from the endpoints object
export const { useCreateCategoryMutation } = categoryService;
export default categoryService;