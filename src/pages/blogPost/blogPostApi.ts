import { baseApi } from "../../redux/api/baseApi";


export const blogPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Blog Post
    createBlogPost: builder.mutation({
      query: (postInfo) => ({
        url: "/blogPosts/createblogPosts",
        method: "POST",
        body: postInfo,
      }),
      invalidatesTags: ["blogPost"],
    }),

    // View All Blog Posts
    viewBlogPost: builder.query({
      query: () => ({
        url: "/blogPosts",
        method: "GET",
      }),
      providesTags: ["blogPost"],
    }),

    // Get Single Blog Post
    singleBlogPost: builder.query({
      query: (id: string) => ({
        url: `/blogPosts/${id}`,
        method: "GET",
      }),
      providesTags: ["blogPost"],
    }),

    // Update Blog Post
    updateBlogPost: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/blogPosts/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["blogPost"],
    }),

    // Delete Blog Post
    deleteBlogPost: builder.mutation({
      query: (id: string) => ({
        url: `/blogPosts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogPost"],
    }),
  }),
});

export const {
  useCreateBlogPostMutation,
  useViewBlogPostQuery,
  useSingleBlogPostQuery,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
} = blogPostApi;
