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

    // ✅ Get Single Blog Post by Slug
    singleBlogPostBySlug: builder.query({
      query: (slug) => ({
        url: `/blogPosts/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["blogPost"],
    }),

    // ✅ Get Blog Posts by Category ID
    blogPostsByCategory: builder.query({
      query: (categoryId) => ({
        url: `/blogPosts/category/${categoryId}`,
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
  useSingleBlogPostBySlugQuery,    // 👈 new hook
  useBlogPostsByCategoryQuery,     // 👈 new hook
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
} = blogPostApi;
