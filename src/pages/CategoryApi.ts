import { baseApi } from "../redux/api/baseApi";
export const createCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: "/category/create-category/",
        method: "POST",
        body: categoryInfo,
      }),
      invalidatesTags: ["category"],
    }),
    viewCategory: builder.query({
      query: () => ({
        url: "/category/",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useCreateCategoryMutation, useViewCategoryQuery } =
  createCategoryApi;
