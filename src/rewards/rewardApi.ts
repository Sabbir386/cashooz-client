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
    }),
});

export const {
    useClaimBonusMutation,
    useGetUserRewardQuery,
    useTaskCompletedMutation,
} = rewardApi;
