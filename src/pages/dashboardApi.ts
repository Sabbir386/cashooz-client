import { baseApi } from "../redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all offers
    totalOffer: builder.query({
      query: () => ({
        url: "/offer",
        method: "GET",
      }),
      providesTags: ["Offer"],
    }),

    // Fetch offers by network
    offerByNetwork: builder.query({
      query: ({ userId, userOS, userCountryCode }) => ({
        url: `/offer/networks-with-offers/bynetwork?userId=${userId}&userOS=${userOS}&userCountryCode=${userCountryCode}`,
        method: "GET",
      }),
      providesTags: ["networkOffers"],
    }),
    
    
    // Fetch specific offers by network ID
    specificAllOfferByNetwork: builder.query({
      query: ({ networkId, userId, userOS, userCountryCode }) => ({
        url: `/offer/viewAllNetworkoffer/specificNetworkOffers?networkId=${networkId}&userId=${userId}&userOS=${userOS}&userCountryCode=${userCountryCode}`,
        method: "GET",
      }),
      providesTags: ["networkOffers"], // Use the same tag for related queries
    }),
    
    

    // Fetch all completed offers
    completedOffer: builder.query({
      query: () => ({
        url: "/completedOffer",
        method: "GET",
      }),
      providesTags: ["completedOffer"],
    }),

    // Fetch logged user's total completed offers
    loggedUserTotalCompletedOffer: builder.query({
      query: () => ({
        url: "/completedOffer/loggedIn-user-total-offer-counts",
        method: "GET",
      }),
      providesTags: ["completedOffer"],
    }),

    // Fetch date-wise completed offers
    dateWiseCompletedOffer: builder.query({
      query: () => ({
        url: "/completedOffer/per-day-total-offer-count",
        method: "GET",
      }),
      providesTags: ["completedOffer"],
    }),

    // Fetch date and offer-wise completed offers
    dateAndOfferWiseCompletedOffer: builder.query({
      query: () => ({
        url: "/completedOffer/total-offer-counts",
        method: "GET",
      }),
      providesTags: ["completedOffer"],
    }),

    // Fetch specific user's total offer counts
    specificUserTotalOfferCounts: builder.query({
      query: () => ({
        url: "/completedOffer/specific-user-total-offer-counts",
        method: "GET",
      }),
      providesTags: ["completedOffer"],
    }),

    // Fetch specific offer's total counts
    specificOfferTotalCounts: builder.query({
      query: () => ({
        url: "/completedOffer/specific-offer-total-counts",
        method: "GET",
      }),
      providesTags: ["completedOffer"],
    }),

    // Fetch total admins
    totalAdmin: builder.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    // Fetch total users
    totalUser: builder.query({
      query: () => ({
        url: "/normalUsers",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    // Fetch total advertisers
    totalAdvertiser: builder.query({
      query: () => ({
        url: "/advertisers",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    // Fetch per-day completed offer counts
    perDayCompletedOffer: builder.query({
      query: () => ({
        url: "/completedOffer/daily-offer-totals",
        method: "GET",
      }),
      providesTags: ["completedOffer"],
    }),

    // Fetch logged-in user's daily completed offer counts
    loggedInUserDailycCompletedOfferCounts: builder.query({
      query: () => ({
        url: "/completedOffer/loggedIn-user-daily-completed-offer-counts",
        method: "GET",
      }),
      providesTags: ["completedOffer"],
    }),

    // Fetch logged-in user's offer names and total counts
    loggedInUserOfferNameandTotalCounts: builder.query({
      query: () => ({
        url: "/completedOffer/loggedIn-user-offer-name-counts",
        method: "GET",
      }),
      providesTags: ["completedOffer"],
    }),
  }),
});

export const {
  useTotalOfferQuery,
  useCompletedOfferQuery,
  useTotalAdminQuery,
  useTotalUserQuery,
  useTotalAdvertiserQuery,
  useDateWiseCompletedOfferQuery,
  useDateAndOfferWiseCompletedOfferQuery,
  useSpecificUserTotalOfferCountsQuery,
  useSpecificOfferTotalCountsQuery,
  usePerDayCompletedOfferQuery,
  useLoggedUserTotalCompletedOfferQuery,
  useLoggedInUserDailycCompletedOfferCountsQuery,
  useLoggedInUserOfferNameandTotalCountsQuery,
  useOfferByNetworkQuery,
  useSpecificAllOfferByNetworkQuery,
} = dashboardApi;
