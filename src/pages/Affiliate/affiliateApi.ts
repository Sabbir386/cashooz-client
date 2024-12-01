import { baseApi } from "../../redux/api/baseApi";


export const affiliateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReferredUsers: builder.query({
            query: ({ referralId }) => ({
                url: `/affiliateReferral/referred-users?referralId=${referralId}`,
                method: "GET",
            }),
            providesTags: ["Affiliate"],
        }),
    }),
});

export const { useGetReferredUsersQuery } = affiliateApi;
