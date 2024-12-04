import { baseApi } from "../../redux/api/baseApi";

export const affiliateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch referred users
        getReferredUsers: builder.query({
            query: ({ referralId }) => ({
                url: `/affiliateReferral/referred-users?referralId=${referralId}`,
                method: "GET",
            }),
            providesTags: ["Affiliate"],
        }),

        // Create a new affiliate reward
        createAffiliateReward: builder.mutation({
            query: ({ userId, referralId, claimedAmount }) => ({
                url: `/affiliateRewards/createReward`,
                method: "POST",
                body: { userId, referralId, claimedAmount },
            }),
            invalidatesTags: ["Affiliate"], // Invalidate cache if necessary
        }),

        // Claim total rewards for a user
        claimAffiliateRewards: builder.query({
            query: ({ userId }) => ({

                url: `/affiliateRewards/totalRewards?userId=${userId}`, // Updated API endpoint
                method: "GET",
            }),
            providesTags: ["Affiliate"],
        }),
    }),
});

export const {
    useGetReferredUsersQuery,
    useCreateAffiliateRewardMutation,
    useClaimAffiliateRewardsQuery,
} = affiliateApi;
