import { baseApi } from "../../redux/api/baseApi";
export const bonusRewardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBonusReward: builder.mutation({
            query: (bonusRewardData) => ({
                url: "/bonusReward/createBonusReward",
                method: "POST",
                body: bonusRewardData,
            }),
            invalidatesTags: ["bonusReward"],
        }),
        bonusRewardByUser: builder.query({
            query: (userId) => ({
                url: `/bonusReward/bonusRewardByUser?userId=${userId}`,
                method: "GET",
            }),
            providesTags: ["bonusReward"],
        }),
    }),
});

export const {
    useCreateBonusRewardMutation,
    useBonusRewardByUserQuery,
} = bonusRewardApi;
