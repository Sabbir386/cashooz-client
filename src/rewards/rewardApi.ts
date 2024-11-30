import { baseApi } from "../redux/api/baseApi";

export const rewardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        claimBonus: builder.mutation({
            query: () => ({
                url: '/reward/claim',
                method: 'POST',
            }),
            invalidatesTags: ['Reward'],
        }),
        getUserReward: builder.query({
            query: () => ({
                url: '/reward/user',
                method: 'GET',
            }),
            providesTags: ['Reward'],
        }),
        taskCompleted: builder.mutation({
            query: ({ userId, taskReward }) => ({
                url: `/reward/taskCompleted?userId=${userId}&taskReward=${taskReward}`,
                method: 'POST',
            }),
            invalidatesTags: ['Reward'],
        }),
        surveyCompleted: builder.mutation({
            query: ({ userId, surveyReward }) => ({
                url: `/reward/surveyCompletedRewards?userId=${userId}&surveyReward=${surveyReward}`,
                method: 'POST',
            }),
            invalidatesTags: ['Reward'],
        }),
        socialMediaPostRewards: builder.mutation({
            query: ({ userId, socialMediaReward }) => ({
                url: `/reward/socialMediaPostRewards?userId=${userId}&socialMediaReward=${socialMediaReward}`,
                method: 'POST',
            }),
            invalidatesTags: ['Reward'],
        }),
        offerCompletedRewards: builder.mutation({
            query: ({ userId, offerReward }) => ({
                url: `/reward/offerCompletedRewards?userId=${userId}&offerReward=${offerReward}`,
                method: 'POST',
            }),
            invalidatesTags: ['Reward'],
        }),
        // Add referralCompletedRewards mutation
        referralCompletedRewards: builder.mutation({
            query: ({ userId, referralReward }) => ({
                url: `/reward/referralCompletedRewards?userId=${userId}&referralReward=${referralReward}`,
                method: 'POST',
            }),
            invalidatesTags: ['Reward'],
        }),
        userTotalRewards: builder.query({
            query: (userId) => ({
                url: `/reward/userTotalRewards?userId=${userId}`,
                method: 'GET',
            }),
            providesTags: ['Reward'],
        }),
    }),
});

export const {
    useClaimBonusMutation,
    useGetUserRewardQuery,
    useTaskCompletedMutation,
    useSurveyCompletedMutation,
    useSocialMediaPostRewardsMutation,
    useOfferCompletedRewardsMutation,
    useUserTotalRewardsQuery,
    useReferralCompletedRewardsMutation,
} = rewardApi;
