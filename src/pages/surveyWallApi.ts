import { baseApi } from "../redux/api/baseApi";

export const surveyWallApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilteredSurveys: builder.query({
      query: ({ networkName, userId, userOS, userCountryCode }) => {
        const params = new URLSearchParams();
    
        if (networkName) params.append('networkName', networkName);
        if (userId) params.append('userId', userId); // Append userId to query params
        if (userOS) params.append('userOS', userOS);  // Append userOS to query params
        if (userCountryCode) params.append('userCountryCode', userCountryCode);  // Append userCountryCode to query params
    
        return {
          url: `/offer/surveyWall/networks-offers-filter-by-survey-wall?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ['SurveyWall'],
    }),
    
    
    createSurveyCompleted: builder.mutation({
      query: (newSurvey) => ({
        url: `/surveys/create-survey`,
        method: "POST",
        body: newSurvey,
      }),
      invalidatesTags: ["SurveyWall"],
    }),
    getAllSurveyCompleted: builder.query({
      query: ({ userId }) => ({
        url: `/surveys/all-surveys?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["SurveyWall"],
    }),
  }),
});

export const {
  useGetFilteredSurveysQuery,
  useCreateSurveyCompletedMutation,
  useGetAllSurveyCompletedQuery,
} = surveyWallApi;
