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
    }),
});

export const {
    useClaimBonusMutation,
    useGetUserRewardQuery,
} = rewardApi;
