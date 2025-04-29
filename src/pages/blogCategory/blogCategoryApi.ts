import { baseApi } from "../../redux/api/baseApi";

export const blogCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Blog Category
    createBlogCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: "/blogs/createBlogCategory",
        method: "POST",
        body: categoryInfo,
      }),
      invalidatesTags: ["blogCategory"],
    }),

    // View All Blog Categories
    viewBlogCategory: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: ["blogCategory"],
    }),

    // Get Single Blog Category
    singleBlogCategory: builder.query({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["blogCategory"],
    }),

    // Update Blog Category
    updateBlogCategory: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["blogCategory"],
    }),

    // Delete Blog Category
    deleteBlogCategory: builder.mutation({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogCategory"],
    }),
  }),
});

export const {
  useCreateBlogCategoryMutation,
  useViewBlogCategoryQuery,
  useSingleBlogCategoryQuery,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
} = blogCategoryApi;
