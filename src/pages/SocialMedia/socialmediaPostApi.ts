import { baseApi } from "../../redux/api/baseApi";

export const socialMediaPostApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Delete Specific Social Media Post
        deleteSocialMediaPost: builder.mutation({
            query: (postId) => ({
                url: `/user/social-media/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SocialMediaPost"], // Invalidate relevant tags
        }),

        // 2. Update Social Media Post Status
        updateSocialMediaPostStatus: builder.mutation({
            query: ({ postId, status }) => ({
                url: `/user/social-media/${postId}`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["SocialMediaPost"], // Invalidate relevant tags
        }),

        // 3. Get User-Specific Social Media Posts
        getUserSpecificPosts: builder.query({
            query: (userId) => ({
                url: `/user/social-media`,
                method: "GET",
                params: { userId },
            }),
            providesTags: ["SocialMediaPost"], // Provides tags for caching
        }),

        // 4. Get All Social Media Posts
        getAllSocialMediaPosts: builder.query({
            query: () => ({
                url: `/user/social-media`,
                method: "GET",
            }),
            providesTags: ["SocialMediaPost"], // Provides tags for caching
        }),

        // 5. Create Social Media Post
        createSocialMediaPost: builder.mutation({
            query: (postDetails) => ({
                url: `/user/social-media`,
                method: "POST",
                body: postDetails,
            }),
            invalidatesTags: ["SocialMediaPost"], // Invalidate relevant tags
        }),
    }),
    overrideExisting: false,
});

export const {
    useDeleteSocialMediaPostMutation,
    useUpdateSocialMediaPostStatusMutation,
    useGetUserSpecificPostsQuery,
    useGetAllSocialMediaPostsQuery,
    useCreateSocialMediaPostMutation,
} = socialMediaPostApi;
